---
type: source
author: ai
tags: ["domain/frontend", "topic/html", "topic/accessibility", "status/draft"]
summary: "HTML inert 屬性讓 DOM 暫時失去互動效果，避免 JavaScript 意外觸發不可操作內容"
sources: ["raw/HTML/inert.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# HTML inert

## 核心要點

- `inert` 會讓指定 DOM 進入惰性狀態，在互動上無效。
- 適合在 modal、載入或暫時禁用區域時，避免使用者或 JavaScript 觸發其中內容。
- 實作前應確認瀏覽器支援度與對無障礙樹的影響。

## 參考資源

- [MDN：inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)
- [Can I Use：inert](https://caniuse.com/?search=inert)

