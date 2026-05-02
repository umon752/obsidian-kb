---
type: source
author: ai
tags: ["domain/frontend", "topic/coding-style", "topic/命名規範", "status/draft"]
summary: "前端 Coding Style Guide：CSS 以 BEM 規範命名、JS 單引號與 jQuery 前綴、資料夾結構規劃與檔案命名方式"
sources: ["raw/文件/Coding Style Guide.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# Coding Style Guide

## 核心要點

### CSS classname
- 使用 BEM：`block__element--modifier`，超過三層時從最後一層重新開頭
- 前綴分類：`c-`（component）、`l-`（layout）、`u-`（utilities）、`m-`（module）
- 多字以 kebab-case 連接：`c-btn-back__text`
- 狀態類：`is-active`、`is-open`、`has-animate`（用於 JS 動態切換）
- 變體：`--modifier` 或 `sty-modifier`

### JS 命名
- jQuery 選取元素變數加 `$` 前綴：`const $select = $('select')`
- 一律使用單引號（除樣板字串外）

### 資料夾結構（Sass）
`base/`、`grid/`、`plugins/`、`forward/`（variables/mixins）、`helpers/`、`components/`、`modules/`、`layout/`、`pages/`、`lang/`、`supports/`

### 檔案命名
- kebab-case：`news-content.php`
- demo 檔案加 `—` 前綴：`—components.php`
- 共用檔案同 classname 規則：`_l-footer.php`
- JS 以駝峰命名：`setDefaultImg.js`

### 格式
- Tab = 2 spaces，JS 單引號

## 關聯頁面
- [[concepts/概念_BEM命名規範]]
