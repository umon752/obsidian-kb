---
type: source
author: ai
tags: ["domain/frontend", "topic/accessibility", "topic/keyboard", "topic/skip-link", "status/draft"]
summary: "整理 AccessKey、Skip Link、語意結構、focus 管理與 ARIA 屬性的無障礙實作。"
sources: ["raw/無障礙/AccessKey、Skip-Link 與鍵盤無障礙.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# AccessKey、Skip Link 與鍵盤無障礙

## 核心要點

- `accesskey` 的組合鍵會因瀏覽器與作業系統而不同，設計前應避免與使用者既有快捷鍵衝突；素材建議以 U/C/Z 分配常用功能。
- Skip Link 讓鍵盤使用者跳過重複導覽，通常比大量 AccessKey 更容易理解與維護。
- Nuxt layout 應使用語意化的 `header`、`nav`、`main`、`footer`，並在路由切換或互動元件中管理 focus。
- `aria-label` 用於補充可存取名稱，`title` 不是替代方案；表單元件仍需有正確的 label、name 與鍵盤操作。

## 實務提醒

優先確保自然 tab 順序、可見 focus、語意結構與跳過連結，再視明確需求增加快捷鍵，並以鍵盤與螢幕閱讀器實測。
