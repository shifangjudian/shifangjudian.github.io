# 9+1=10 图册 — Cloudflare Pages 部署说明

本图册作为独立的 **Cloudflare Pages 纯静态网站**，内容仍保留在 GitHub 仓库 `shifangjudian/shifangjudian.github.io` 的 `electronic-catalog/` 目录。只发布该目录，不发布仓库根目录的官网文件。

## 1. 创建 Pages 项目（使用 GitHub 连接）
1. 登录 https://dash.cloudflare.com/ → Workers & Pages → Create application → Pages → Connect to Git。
2. 授权 GitHub，选择仓库 `shifangjudian/shifangjudian.github.io`。
3. **项目名称**：`nine-plus-one-books`（如被占用，换一个唯一名称）。
4. **生产分支**：`main`。
5. **Framework preset**：`None` / 无框架。
6. **Root directory（高级）**：`electronic-catalog`。
7. **Build command**：留空（如果控制台要求填写，可用 `exit 0`）。
8. **Build output directory**：`.`（相对于 Root directory，表示发布整个 `electronic-catalog` 目录）。
9. 点击 Save and Deploy，先在 Cloudflare 分配的 `*.pages.dev` 网址测试首页、40 页图片、后台登录页、单本分享页。

**注意**：不要把 Root directory 留空，否则可能把现有官网根目录当成图册部署；也不要把 Build output directory 填成仓库根目录。

## 2. 绑定独立子域名
1. Pages 项目 → Custom domains → Set up a domain。
2. 填 `book.shifangjudian.com`，按提示确认。
3. 如果 DNS 区域已在相同 Cloudflare 账户，平台通常会自动创建该子域名的 CNAME；否则在实际 DNS 管理商处新增 **book** 的 CNAME，目标为 Pages 实际分配的 `<项目名>.pages.dev`。
4. 不修改 `www.shifangjudian.com`、根域名、原 Workers 路由、官网 DNS 或 GitHub 根目录的 `CNAME`。
5. 等待 Pages 控制台 Custom domain 显示 Active，再验证以下网址：

- 图册首页：`https://book.shifangjudian.com/`
- 管理后台：`https://book.shifangjudian.com/admin/`
- 2026 厨师服分享页：`https://book.shifangjudian.com/share/chef-2026.html`

以上网址在 Pages 发布及域名绑定完成**之前**不能当作已经可访问的正式链接。

## 3. 管理与自动更新
- 管理后台登录：在 `/admin/` 输入你个人创建的 GitHub Fine-grained Token（只授权本仓库的 Contents: Read and write）。
- 上传 PDF / 图片、设置封面或新增图册时，后台会写入同一个 GitHub 仓库的 `electronic-catalog` 目录。
- 如果 Pages 配置了 Git 自动部署，新的 main 分支提交会触发 Pages 更新。发布完成后读者才能看到新图册。
- 推荐在 Pages → Settings → Builds → Build watch paths 中只包含 `electronic-catalog/**`，避免官网其他文件变化也触发图册发布。
- 不上传 GitHub Token 到源码、Cloudflare 环境变量或公开分享链接。
- 独立分享页为静态 HTML，使用不同封面/标题的 OG 元数据。实际社交平台能否显示预览由该平台决定。
- 本方案不需要 Pages Functions / Workers / R2 / D1，也不需要 Workers 代理图片。用户阅读、翻页和本地图片缩放不会产生 Workers 请求计费；GitHub 提交会消耗 Pages 的构建次数。
- 免费计划仍受 Pages 构建次数、文件数量/尺寸等限制（见 Cloudflare 官方 limits 文档）。

## 4. 部署后检查
1. 首页是否显示 2026 厨师服图册封面；
2. `/admin/` 是否能打开登录页（不要把令牌截图分享）；
3. `/books/chef-2026/001.webp`、`/books/chef-2026/040.webp` 是否显示图片；
4. `/share/chef-2026.html` 是否打开对应图册且不显示其他图册导航；
5. 首次管理后台保存后，在 Pages 的 Deployments 中确认新提交自动发布；
6. 确认原官网 `www.shifangjudian.com` 正常工作。

参考：
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/platform/limits/
