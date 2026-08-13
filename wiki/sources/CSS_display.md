---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/display", "status/draft"]
summary: "整理 display 的 multi-value 概念與 display: contents 讓子元素參與父層排版的用法"
sources: ["raw/CSS/display.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# CSS display

## 核心要點

- `display` 支援 multi-value 表達方式，可同時描述外部與內部排版模型。
- `display: contents` 會讓元素自身不參與盒模型，子元素視為父元素的直接排版子項。
- 使用 `display: contents` 時仍需檢查語意與無障礙樹是否符合預期。

## 參考資源

- [MDN：display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

