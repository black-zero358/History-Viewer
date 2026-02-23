
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
   git clone https://github.com/black-zero358/History-Viewer.git

   ```

*(注意：确保仓库内已包含 `xlsx.full.min.js` 文件。如果没有，可以使用 pwsh 运行 `Invoke-WebRequest -Uri "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js" -OutFile "xlsx.full.min.js"` 获取)*

2. **打开扩展管理页面**：
* Chrome 浏览器地址栏输入：`chrome://extensions/`
* Edge 浏览器地址栏输入：`edge://extensions/`


3. **开启“开发者模式”**（通常在页面右上角或左下角的开关）。
4. 点击 **“加载已解压的扩展程序” (Load unpacked)** 按钮。
5. 选择你刚刚下载/克隆的 `History-Viewer` 文件夹即可完成安装。
6. 点击浏览器工具栏的拼图图标 🧩，将本插件固定在外面，点击即可开始查询和导出！

## 📂 目录结构

```text
History-Viewer/
├── manifest.json       # 扩展配置文件 (Manifest V3)
├── popup.html          # 扩展弹窗用户界面
├── popup.js            # 核心业务逻辑 (历史记录读取、去重、导出)
├── xlsx.full.min.js    # SheetJS 本地依赖库
└── README.md           # 项目说明文档

```


## 📄 许可证

本项目采用 MIT License 开源许可证。

