# 9+1=10 电子产品图册

独立于官网的静态电子图册。手机单页滑动、电脑双页阅读、目录、缩略图、放大、全屏及页面链接分享。

## 预览
本目录的 `index.html` 内置 8 页设计示例，**仅是演示排版，不是最终的产品图片或正式产品画册**。正式使用前请导入自己的产品图片。打开网站首页选择“开启图册”即可浏览。

## 替换正式图片
在本目录建立 `books/chef-2026/`，依次上传 `001.webp`、`002.webp` 等图片；然后将 `catalog-manifest.json` 改成：

```json
{
  "books": [
    {
      "id": "chef-2026",
      "title": "2026 厨师职业装系列",
      "subtitle": "PROFESSIONAL UNIFORM · COLLECTION",
      "category": "厨师服",
      "year": "2026",
      "pages": [
        {"src": "books/chef-2026/001.webp", "title": "封面"},
        {"src": "books/chef-2026/002.webp", "title": "品牌故事"}
      ],
      "chapters": [
        {"title": "封面", "page": 1},
        {"title": "品牌故事", "page": 2}
      ]
    }
  ]
}
```

也可使用 ZIP 中的 `tools/import_pdf.py` 将自己的 PDF 转换为 WebP 图片并自动生成目录配置：
`pip install pymupdf pillow`
`python tools/import_pdf.py "自己的画册.pdf" chef-2026 --title "2026 厨师职业装系列"`。

## GitHub 与域名
项目位于 `electronic-catalog/` 文件夹，**没有改变原仓库根目录的首页 index.html 和 CNAME 配置**。
若 GitHub Pages 已托管根站点且路径可达，可尝试 `https://www.shifangjudian.com/electronic-catalog/`；如实际官网部署在另一平台，该路径不保证可用。
推荐未来另建专用 Pages 仓库，将其根目录关联 `book.shifangjudian.com`，只增加 DNS 的 book 子域记录，不动官网原记录。
当前版本只是源码已提交，域名 DNS 尚未调整；本仓库部署状态须在 GitHub Pages 设置中确认。

静态托管无后台访问控制。公开奖册图片可被浏览器保存，不应包含保密数据。中国大陆访问 GitHub Pages 的稳定性不能保证。
