---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/border", "status/draft"]
summary: "整理 border-image 的漸層邊框寫法，以及用偽元素與 mask 製作圓角漸層邊框"
sources: ["raw/CSS/border-image.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# CSS border-image

## 核心要點

- `border-image` 可使用漸層或圖片作為邊框來源，搭配 `border-image-slice` 控制切片。
- 漸層線條可先設定透明 border，再以 `border-image` 套用漸層。
- 圓角漸層邊框可改用偽元素、`background-origin` 與 mask 組合，避免 `border-image` 圓角限制。

## 參考資源

- [MDN：border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image)
- [Can I Use：border-image](https://caniuse.com/?search=border-image)

