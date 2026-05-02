---
type: concept
author: ai
tags: ["domain/frontend", "topic/security", "topic/csp", "topic/弱點掃描", "status/draft"]
summary: "前端資安規範核心概念：CSP（Content Security Policy）白名單機制，搭配 nonce、禁止 inline/CDN 等守則防範 XSS"
sources: ["raw/文件/弱點掃描規範說明.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# 弱點掃描 / CSP 規範

## 定義
CSP（Content Security Policy）是瀏覽器的白名單機制，讓網站宣告哪些來源的資源可以載入，以防範 XSS 等注入攻擊。設定於 `<meta>` 或 HTTP Header。

## 核心規則

### CSP 設定原則
- 避免 `unsafe-inline`、`unsafe-eval`（太寬鬆會被弱掃警示）
- `<script>` 與 `<style>` 加 `nonce="後端生成隨機碼"`
- 只允許同源或明確白名單來源

### 禁止事項
| 禁止 | 原因 |
|------|------|
| CDN 引入 | 防止 CDN 業者篡改 |
| inline style | CSP 規範；例外：後台編輯器（需與客戶說明）|
| HTML `onClick` | 弱掃誤判為可執行內容 |
| `href="javascript:..."` | 弱掃視為注入風險 |
| `innerHTML` | XSS 風險，改用 `createElement` |

### 必要設定
- `target="_blank"` 連結加 `rel="noopener noreferrer"`（防 tab nabbing）

## 關聯概念
- 相關：[[concepts/概念_無障礙設計規範]]

## 相關來源
- [[sources/弱點掃描規範]]
