# 9+1=10｜2026 厨师服电子产品图册

本项目是独立静态电子画册，基于用户提供的《2026厨师服.pdf》制作。**40 页内容完整保留**：

- 第 1 页：封面。
- 第 2–35 页：厨师服各款式（按原 PDF 排序）。
- 第 36–40 页：厨师围裙（原 PDF 自带，未删去）。

以相同顺序渲染为 WebP 图片，不改变服装设计或原版文字。各页图片尺寸约 973 × 1459 像素，全部 40 页压缩后约 2.4 MB。若原 PDF 内图片本身分辨率较低，电子版无法凭空补回拍摄细节。

## 阅读功能

手机和桌面单页阅读、手机左右滑动、点击放大、目录跳转、缩略图选页、键盘左右翻页、全屏、当前页面分享。首页会展示原 PDF 的第一张封面。

## 本地预览

下载 ZIP，解压后打开 `index.html`。因页面含内置图册目录配置，即使离线打开，也可阅读本地的图片。亦可使用 HTTP 静态服务器：

```sh
python -m http.server 8000
```

浏览 `http://localhost:8000/`。

## GitHub Pages

目前提交到现有仓库 `shifangjudian/shifangjudian.github.io` 的 `electronic-catalog/` 目录（不修改官网根目录及其 `CNAME` 文件）。

页面所在的路径会随仓库的 Pages 设置和现有主站托管方式变化。现有 `CNAME` 是 `www.shifangjudian.com`，所以 **不能在同一 GitHub Pages 站点里仅靠这个子目录直接绑定 `book.shifangjudian.com`**。推荐另外建立专属 Pages 仓库，用这个 ZIP 的内容作为新仓库根目录，在新仓库中添加 `CNAME` 为 `book.shifangjudian.com`，然后只对该子域名新增 DNS 记录，不修改官网主域名现有记录。

注意：GitHub Pages 在中国大陆访问稳定性不能保证。

## 后续更新画册

`catalog-manifest.json` 管理书名、年号、分页、目录。`books/chef-2026/001.webp` 至 `040.webp` 是实际页面。替换图片后需要同步更新 manifest 信息。`tools/import_pdf.py` 提供导入后续 PDF 的批处理工具：

```sh
pip install pymupdf pillow
python tools/import_pdf.py '2027新版画册.pdf' chef-2027 --title '2027 厨师服产品图册'
```

浏览器仅支持公开阅读，没有上传后台或页面防复制机制。GitHub 仓库的改动需要通过 GitHub 账号提交，图册网站访客不能修改内容。


## 手机端原比例全宽展示（2026-11-06 更新）
手机端 40 页均按原始纵向 973:1459 比例展示，屏幕左右各留 5px，不裁切，不使用固定 16:9 容器；页面高度随图片原始比例自适应。桌面仍保留 16:9 阅读区。手机翻页使用左右滑动或底部箭头。