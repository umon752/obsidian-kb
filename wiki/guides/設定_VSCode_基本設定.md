---
type: guide
author: collaborative
tags: ["domain/devtools", "topic/vscode", "status/draft"]
summary: "VS Code 核心 settings.json 設定，涵蓋 Sass 編譯、Todo Tree、Emmet、Prettier 格式化與基本編輯器選項"
sources: ["raw/VS Code 2b3b9bff19ce80ccbc63de9ad1532196.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 設定：VS Code 基本設定

> 此頁為 settings.json 設定參考。完整清單見 `raw/VS Code...md`。

## Sass（Live Sass Compiler）

```json
"liveSassCompile.settings.formats": [
    { "format": "compressed", "extensionName": ".min.css", "savePath": "assets/**/css" }
],
"liveSassCompile.settings.generateMap": false,
"liveSassCompile.settings.includeItems": ["assets//**/*.sass", "assets//**/*.scss"],
"liveSassCompile.settings.excludeItems": ["assets/**/_*.sass", "assets/**/_*.scss"]
```

## Todo Tree

```json
"todo-tree.general.tags": ["BUG","HACK","FIX","TODO","XXX","[ ]","[x]","圖片建議","新式編輯器","編輯器"],
"todo-tree.highlights.defaultHighlight": { "type": "whole-line" }
```

## Emmet

```json
"emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "vue": "html"
},
"emmet.triggerExpansionOnTab": true
```

## 格式化（Prettier）

```json
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"prettier.singleQuote": true,
"prettier.tabWidth": 2,
"prettier.semi": true
```

## 其他

```json
"editor.wordWrap": "on",
"editor.tabSize": 2,
"editor.linkedEditing": true,
"diffEditor.codeLens": true
```

## MCP 設定

```json
"chat.mcp.serverSampling": {
    "mcpServers": {
        "chrome-devtools": { "command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"] }
    }
}
```

## 相關工具 / 頁面
- [[entities/工具_VSCode]]
- [[guides/設定_VSCode_Extensions]]
- [[guides/設定_VSCode_Snippets]]
