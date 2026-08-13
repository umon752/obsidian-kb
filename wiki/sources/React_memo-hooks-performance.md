---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/performance", "status/draft"]
summary: "比較 useMemo、useCallback 與 memo 分別記憶值、函式參考與元件渲染結果的情境"
sources: ["raw/React/usememo-and-usecallback-and-memo-xiao-neng-you.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useMemo、useCallback 與 memo

## 核心要點

- `useMemo` 記憶計算結果，適合昂貴的排序、過濾或資料轉換。
- `useCallback` 記憶函式 reference，常用於傳給 `memo` 化子元件或作為 effect 依賴。
- `memo` 是高階元件方法，不是 Hook；它以淺層比較 props，避免 props 未變時重繪子元件。
- 不應為每個函式都加 `useCallback`；若沒有穩定 reference 的需求，記憶成本可能反而增加。

