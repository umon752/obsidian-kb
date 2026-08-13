---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/ref", "status/draft"]
summary: "useRef 以持久 reference 保存資料或 DOM，不因 current 變更觸發重新渲染"
sources: ["raw/React/useref.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useRef

## 核心要點

- `useRef` 回傳只有 `.current` 的持久 reference object，可保存跨 render 的資料。
- 修改 `.current` 不會觸發重新渲染，亦可用來取得 DOM 元素。
- 非同步 callback 容易捕捉舊 state；素材示範先把最新 state 同步到 ref，再從 `ref.current` 讀取。
- 需要畫面更新時仍應使用 `useState`，不要把 ref 當成狀態替代品。

