---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/dialog", "status/draft"]
summary: "CSS ::backdrop 偽元素搭配 dialog modal 使用的參考與基本開關方式"
sources: ["raw/CSS/backdrop.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# CSS ::backdrop

## 核心要點

- `::backdrop` 用於設定 modal 元件後方的背景層樣式。
- HTML 需使用 `<dialog>`，以 JavaScript 的 `.showModal()` 開啟、`.close()` 關閉，才會產生對應 backdrop。
- 實作前應檢查瀏覽器支援度與 MDN 定義。

## 參考資源

- [MDN：::backdrop](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)
- [Can I Use：::backdrop](https://caniuse.com/?search=%3A%3Abackdrop)

