---
type: source
author: ai
tags: ["domain/react", "topic/component", "topic/rendering", "status/draft"]
summary: "整理 React 函式元件重繪、Virtual DOM、shallow comparison 與 Concurrent render 特性"
sources: ["raw/React/react-yuan-jian.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React 元件

## 核心要點

- React 元件本質上是函式；props 或 state 變更時，元件函式會重新執行並產生新的 Virtual DOM。
- JSX 中以大寫開頭的函式名稱，且以 `<MyComponent />` 形式使用時，才會被 React 視為元件。
- React 以 shallow comparison 判斷 props，父層狀態更新可能連帶讓不相關子元件重繪。
- 初次 render 先依目前 state 顯示畫面，commit 後執行 effect；資料回來後再 setState 進入更新 render。
- React 可能批次處理、預先計算、甚至中斷與重新執行 render，因此 render 函式應保持可重複執行。

