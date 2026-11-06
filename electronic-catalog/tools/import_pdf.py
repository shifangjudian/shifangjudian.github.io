#!/usr/bin/env python3
"""Convert the user's own PDF into optimized static page images for the flipbook."""
import argparse
import io
import json
import pathlib
import sys
from PIL import Image
try:
    import fitz
except ImportError:
    print('Please install dependencies: pip install pymupdf pillow', file=sys.stderr)
    sys.exit(2)

parser = argparse.ArgumentParser(description='Import a PDF into the 9+1=10 electronic catalog.')
parser.add_argument('pdf', type=pathlib.Path)
parser.add_argument('book_id', help='URL-safe catalog identifier, e.g. chef-2026')
parser.add_argument('--title', required=True)
parser.add_argument('--category', default='厨师服')
parser.add_argument('--year', default='2026')
parser.add_argument('--dpi', type=int, default=200)
parser.add_argument('--quality', type=int, default=84)
args = parser.parse_args()
if not args.pdf.is_file():
    parser.error(f'PDF not found: {args.pdf}')
if not args.book_id or not all(c.isalnum() or c in '-_' for c in args.book_id):
    parser.error('book_id must contain only letters, digits, hyphens, underscores')
if not 72 <= args.dpi <= 360:
    parser.error('--dpi must be in the range 72..360')
if not 50 <= args.quality <= 100:
    parser.error('--quality must be in the range 50..100')
root = pathlib.Path(__file__).resolve().parent.parent
out = root / 'books' / args.book_id
out.mkdir(parents=True, exist_ok=True)
pages = []
with fitz.open(args.pdf) as doc:
    if doc.needs_pass:
        parser.error('Encrypted PDF cannot be imported without its password')
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(args.dpi / 72, args.dpi / 72), alpha=False)
        with Image.frombytes('RGB', (pix.width, pix.height), pix.samples) as im:
            filename = f'{i + 1:03d}.webp'
            im.save(out / filename, 'WEBP', quality=args.quality, method=6)
        pages.append({'src': f'books/{args.book_id}/{filename}', 'title': f'第 {i+1} 页'})
        print(f'Converted page {i+1}/{len(doc)}: {filename}')
manifest_path = root / 'catalog-manifest.json'
try:
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
except (FileNotFoundError, json.JSONDecodeError):
    manifest = {'books': []}
manifest.pop('note', None)
books = manifest.setdefault('books', [])
entry = {'id': args.book_id, 'title': args.title, 'subtitle': 'PROFESSIONAL UNIFORM · COLLECTION', 'category': args.category,
         'year': args.year, 'pages': pages,
         'chapters': [{'title': '封面', 'page': 1}]}
books[:] = [b for b in books if b.get('id') != args.book_id] + [entry]
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Done: {len(pages)} page(s) in {out}; manifest updated.')