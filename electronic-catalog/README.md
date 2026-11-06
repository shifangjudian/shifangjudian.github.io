# 9+1=10｜电子产品图册（多图册管理版）

本项目基于已有 2026 年《厨师服产品图册》升级，完整保留 40 页图片、原手机端全宽不裁切展示、左右各 5px 空白和底部阅读工具栏。已支持**多本图册、单本封面、单本分享和 GitHub 授权管理后台**。

## 目录与入口

- `index.html`：公开图册首页、封面展示及单本图册阅读器。
- `admin/index.html`：图册管理后台（使用 GitHub 细粒度令牌登录）。
- `catalog-manifest.json`：全部图册目录、发布状态、排序、页面和封面配置。
- `books/chef-2026/`：原版《2026 厨师服产品图册》40 页图片，不做重绘或删除。
- `tools/import_pdf.py`：不使用管理后台时的本地 PDF 批处理脚本。
- `share/图册ID.html`：每本独立分享入口，包含各自封面的社交预览元信息，跳转到单本阅读页。

## 管理后台功能

1. 新建、编辑、移除多本独立图册。
2. 导入 PDF（浏览器按页转 WebP）或上传多张 JPG、PNG、WebP 图片；拖不动图片时可通过 ← / → 调整页序，也可删除单页。
3. 选择任意一页作为封面，或上传独立封面图（不影响图册内图片）。
4. 设置名称、年份、分类、英文副标题、首页排序、是否在首页显示封面、是否作为精选图册展示。
5. 发布／下架，复制每本图册的独立分享链接，打开单本预览。专属链接格式为 `share/图册ID.html`，由 GitHub 同步生成各自的书名、封面预览信息，再跳转到 `?book=图册ID&p=1&only=1` 的阅读界面。单本分享阅读界面不提供返回其他图册列表的按钮。不同社交平台是否显示预览封面取决于其抓取机制。
6. 保存时将新图片及更新后的 `catalog-manifest.json` 一次提交到 GitHub main 分支；检测配置文件被其他管理员修改时阻止覆盖。

## 使用后台（首次配置 GitHub 令牌）

后台页面地址取决于你的实际部署地址，例如静态网站发布在 `/electronic-catalog/`，则管理入口为 `/electronic-catalog/admin/`。

1. 用拥有仓库管理权限的 GitHub 账号访问 https://github.com/settings/personal-access-tokens/new ，创建 **Fine-grained personal access token**。
2. 选择 Repository access → **Only select repositories** → `shifangjudian/shifangjudian.github.io`。
3. 在 Repository permissions 中将 **Contents** 设为 **Read and write**。不需要授予所有仓库权限，不需要工作流管理权限。
4. 设定合理到期日，生成后妥善保管令牌。打开管理入口，将令牌粘贴到登录框，即可进入管理页面。
5. 新建图册 → 填写信息 → 导入 PDF 或图片 → 选择封面 → 保存至 GitHub → 复制该本专属链接分享。

**安全说明：** 此版本是纯静态托管，没有服务端用户名密码系统。网站本身不会把令牌写入源码、`localStorage` 或 `sessionStorage`；令牌仅在当前页面运行内存里使用，刷新页面会要求重新输入。公开访问 `/admin/` 只能看到登录界面，不能在没有有效 GitHub 写入授权时修改内容。不要在不可信设备输入令牌。GitHub Token 可在 GitHub 设置中随时撤销。

**上传说明：** PDF 转图片使用浏览器加载 `pdf.js` 3.11.174（来自 cdnjs）；如果某些网络无法加载 PDF 组件，可以改为先导出 JPG/PNG 再批量上传。转换和上传需要管理页面保持打开，不会后台异步处理。单本图册最多 160 页，单份 PDF 不超过 50 MB；GitHub 原生储存适合轻量展示画册，不适合大量超高清大文件或复杂多人协同。

**公开访问说明：** 图册图片放在公开 GitHub 仓库，已发布／未发布的文件都不具备真正的文件级私密性。下架或删除会更新网站的公开入口，但历史提交中旧图片仍可能存在。`only=1` 只是隐藏跨图册导航，并非访问控制或防转发机制。

## 站点地址与域名

**当前采用 GitHub 存储 + Cloudflare Pages 独立静态托管方案。**

- GitHub 仓库：`shifangjudian/shifangjudian.github.io`，只发布其中 `electronic-catalog/` 目录作为 Pages 站点根目录。
- 计划绑定 `book.shifangjudian.com`（**尚未完成实际 Cloudflare Pages 创建和域名验证**）。
- 完成后首页为 `https://book.shifangjudian.com/`，后台为 `https://book.shifangjudian.com/admin/`。
- 管理后台写入该 GitHub 仓库 `electronic-catalog/`，Cloudflare Pages 通过 Git 集成自动发布，无需运行 Workers 或 Functions。
- 原官网 `www.shifangjudian.com`、GitHub 仓库根目录 `index.html` / `CNAME` 和原 Cloudflare Worker 均不修改。

**详细操作请查看 [Cloudflare Pages 部署指南](./CLOUDFLARE_PAGES_%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.md)。**

请优先完成 Pages `*.pages.dev` 预览验证，确认正常后再绑定自定义子域名。中国大陆访问 Cloudflare Pages 的连通性仍需通过实际网络测试。


## 2026-11-06 阅读器体验优化

- 手机和电脑均可使用页面两侧的小型半透明上一页/下一页按钮（保留左右各 5px 的手机图片留白）。
- 翻页使用轻量 CSS 3D 纸张转动动画，不额外下载动画视频或第三方库。
- 用户主动翻页时通过 Web Audio API 合成轻微纸张翻动声音；浏览器必须允许音频播放，首次用户操作前不会自动响。右下角“更多”可关闭/开启音效。
- 当前页图片采用高优先级请求；加载成功后，用单一后台任务从当前页的下一页开始按顺序预加载，直到最后一页，再回补之前未加载的页面。
- 使用目录、缩略图或拖动进度条跳页时，取消尚未完成的后台预加载请求；先由阅读器加载跳转目标页，然后重新安排“后续页 → 前面遗漏页”队列。
- 预加载过程仅通过浏览器静态 GET 请求访问 Cloudflare Pages 已有图片文件，不使用 Pages Functions、Workers、R2 或 D1。
- 浏览器缓存仍由实际 Cache-Control、设备可用内存和网络环境决定，预加载不能承诺离线永久可用。
- 开发测试：Chrome 手机 390px 和桌面 1280px 模拟环境，验证翻页、跳页、重新排序、按钮、音效开关与渲染，没有观察到 JS 异常。
