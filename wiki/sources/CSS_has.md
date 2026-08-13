---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/has", "status/draft"]
summary: "CSS :has() 關係選擇器依子元素狀態套用父層樣式的範例"
sources: ["raw/CSS/has.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# CSS :has()

## 核心要點

- `:has()` 可依元素是否包含特定後代或符合條件的子元素，選取並設定外層樣式。
- 範例包含 `.btn:has(.icon)` 與依 `option[value="dark"]:checked` 切換暗色模式。
- 這種關係選擇器可減少為了同步父子狀態而加入的 JavaScript。

## 參考資源

- [MDN：:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [Can I Use：:has](https://caniuse.com/?search=%3Ahas)

