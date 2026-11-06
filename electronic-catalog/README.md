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

代码目前位于 `shifangjudian/shifangjudian.github.io` 的 `electronic-catalog/` 独立目录。项目保留仓库根目录 `index.html` 以及 `CNAME` 文件不变。**只有当这个 GitHub Pages 分支实际被发布时，仓库内容才能成为在线管理页面。** 如果 `www.shifangjudian.com` 实际托管在其他平台，GitHub 源码更新不会自动更新那个平台，需要在该平台同步部署或关联 GitHub 持续部署。

如果以后改用 `book.shifangjudian.com`，建议单独托管图册：同步本目录作为独立站点根目录，并修改管理后台 JS 中的 `OWNER`、`REPO`、`BRANCH`、`DIR`（`DIR` 用于仓库路径；独立仓库根目录时须为空并同步检查构建路径），避免同一个站点多个不同自定义域名相互覆盖。现阶段**没有自动设置任何 DNS**。

GitHub Pages 的中国大陆访问稳定性不可保证，可按需要迁移到可稳定访问大陆地区的静态托管平台。