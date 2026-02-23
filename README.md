# 🌐 浏览器历史记录去重查看器 (History Deduplicator)

一个轻量级的 Chrome / Edge 浏览器扩展，用于按时间段读取浏览历史，并按**“同一天 + 主域名”**进行精准去重合并，支持一键导出为功能丰富的 Excel 数据表。

## ✨ 核心功能

- 📅 **自定义时间段查询**：自由选择起始和结束日期拉取历史记录。
- 🔍 **智能主域名去重**：自动解析 URL，将 `aaa.example.com` 和 `bbb.example.com` 等子域名智能合并为 `example.com`，让浏览记录更清晰。
- 📊 **一键导出 Excel**：采用纯前端方案（SheetJS）生成 `.xlsx` 文件。
- 🔒 **隐私安全**：完全纯本地运行，所有数据只在你的浏览器内处理，无需任何后端服务器。
- 📈 **丰富的数据指标**：导出的表格内包含：访问日期、主域名、页面标题、完整 URL、历史总访问次数、手动输入次数以及最后访问精确时间。

## 🛠️ 技术栈

- 原生 HTML / CSS / JavaScript (无框架，极简轻量)
- Chrome Extension API (Manifest V3)
- [SheetJS (xlsx)](https://sheetjs.com/) - 用于纯前端生成 Excel 文件

## 🚀 安装与使用 (开发者模式)

由于本插件未上架 Chrome 应用商店，请通过“开发者模式”本地加载使用：

1. **克隆或下载此仓库**到你的本地电脑：
   ```bash
   git clone [https://github.com/你的用户名/History-Viewer.git](https://github.com/你的用户名/History-Viewer.git)