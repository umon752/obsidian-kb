---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/state", "status/draft"]
summary: "整理 useState updater function、批次更新與 React 18 startTransition 的狀態優先序"
sources: ["raw/React/usestate.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useState

## 核心要點

- `setState` 會讓 React 重新渲染；需要依賴最新 state 時，使用 `setCount(prev => prev + 1)` updater function。
- updater function 適合非同步、多次連續更新與依目前狀態計算下一值的情境，可避免閉包拿到舊值。
- React 會集中收集更新並批次處理，以降低不必要的重繪。
- React 18 可用 `startTransition` 將不急迫的列表或資料更新降為低優先，保留輸入等互動的即時回應。

