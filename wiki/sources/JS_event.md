---
type: source
author: ai
tags: ["domain/javascript", "topic/event", "topic/browser-api", "status/draft"]
summary: "整理事件捕獲、目標、冒泡、監聽選項、AbortController 與 CustomEvent"
sources: ["raw/JS/shi-jian-event.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript Event

## 核心要點

- 事件流程依序經過 capturing、target 與 bubbling；`stopPropagation()` 與 `stopImmediatePropagation()` 的阻止範圍不同。
- `addEventListener` 可設定 `capture`、`once`、`passive` 與 `signal`；`passive: true` 適合改善 touch／scroll 監聽的滑動回應。
- `AbortController` 可透過 `signal` 一次取消 request 或多個事件監聽。
- `CustomEvent` 搭配 `detail` 可建立解耦、可一對多傳遞資料的自訂事件系統。

## 參考資源

- [MDN：stopImmediatePropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)
- [MDN：AbortController](https://developer.mozilla.org/zh-TW/docs/Web/API/AbortController)

