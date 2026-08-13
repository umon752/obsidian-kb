---
type: source
author: ai
tags: ["domain/javascript", "topic/url", "topic/search-params", "status/draft"]
summary: "以 URLSearchParams 與 History API 讀寫 query string，並處理瀏覽器前進後退"
sources: ["raw/JS/wang-zhi-cha-xun-can-shu-searchparams.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# URLSearchParams

## 核心要點

- `new URLSearchParams(location.search)` 可將 URL query 轉成可操作的參數物件。
- `.get()`、`.set()`、`.delete()`、`.has()` 與 `.toString()` 涵蓋常見查詢參數操作。
- `Object.fromEntries(params.entries())` 可轉成物件；`new URLSearchParams(obj)` 可由物件建立 query string。
- `history.pushState`／`replaceState` 可更新網址但不會觸發 `popstate`；前進後退則需監聽 `popstate`。

## 參考資源

- [MDN：popstate](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

