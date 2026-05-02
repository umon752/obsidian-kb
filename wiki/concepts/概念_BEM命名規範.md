---
type: concept
author: ai
tags: ["domain/frontend", "topic/css", "topic/命名規範", "status/draft"]
summary: "BEM（Block Element Modifier）是一種 CSS class 命名方法論，透過 block__element--modifier 結構提升可讀性與維護性"
sources: ["raw/文件/Coding Style Guide.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# BEM 命名規範

## 定義
BEM（Block Element Modifier）是一套 CSS class 命名規範，格式為 `block__element--modifier`，目的是透過命名傳達結構關係，提高可讀性與重用性。

## 本專案使用方式

### 基本格式
```
block__element--modifier
menu__list__item  → 超過三層時從最後一層重新開頭
item__link__text
```

### 前綴分類
| 前綴 | 類型 | 範例 |
|------|------|------|
| `c-` | Component（元件） | `c-card`、`c-btn` |
| `l-` | Layout（版型） | `l-footer`、`l-header` |
| `u-` | Utilities（通用） | `u-link-range` |
| `m-` | Module（模組） | `m-editor` |

### 狀態類（JS 動態切換）
- `is-active`、`is-open`、`has-animate`

### 變體（Modifier）
- BEM 格式：`c-btn--lg`
- 舊式：`sty-lg`（較少使用）

## 關聯概念
- 相關：[[concepts/概念_網頁設計規範]]

## 相關來源
- [[sources/CodingStyleGuide]]
- [[sources/自訂規範]]
