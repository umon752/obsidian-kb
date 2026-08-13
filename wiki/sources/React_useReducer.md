---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/reducer", "status/draft"]
summary: "useReducer 以純 reducer 集中處理互相關聯的狀態與 action，適合複雜流程與表單"
sources: ["raw/React/usereducer.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useReducer

## 核心要點

- 當多個 state 互相影響、流程或表單邏輯複雜，或希望集中管理狀態時，可考慮 `useReducer`。
- reducer 接收 `state` 與 `action`，回傳新的 state；不可直接修改舊 state，也不應包含 fetch、timer 或 console 等副作用。
- `dispatch` 是送出 action 的觸發器，reducer 再依 action type 決定狀態變化。
- 這種 action／reducer 結構也可作為未來導入 Redux 的基礎。

