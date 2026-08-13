---
type: source
author: ai
tags: ["domain/frontend", "topic/page-lifecycle", "topic/browser-api", "status/draft"]
summary: "整理 pageshow、pagehide、load、unload 與瀏覽器快取恢復時的頁面生命週期差異"
sources: ["raw/JS/wang-ye-sheng-ming-zhou-qi.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 網頁生命週期

## 核心要點

- `pageshow`／`pagehide` 與瀏覽器往返快取（BFCache）恢復情境有關。
- `pageshow` 的 `event.persisted` 可用來判斷頁面是否由瀏覽器快取載入。
- 原始案例指出返回上一頁時，畫面上的 checkbox 狀態可能與實際 `checked` 屬性不同，因此需在頁面恢復時重新同步狀態。
- `load`／`unload` 不適合單獨涵蓋所有快取恢復流程，應依頁面生命週期需求選擇事件。

## 參考資源

- [Page Lifecycle API](https://developer.chrome.com/docs/web-platform/page-lifecycle-api?hl=zh-tw)

