---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/context", "status/draft"]
summary: "以 createContext、Provider 與 useContext 在 React 元件樹共享資料，避免逐層傳 props"
sources: ["raw/React/usecontext.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useContext

## 核心要點

- `createContext` 建立共享資料的 Context 與預設值。
- Provider 以 `value` 將資料向下廣播給元件樹。
- 子元件用 `useContext(Context)` 取得資料，不必經過中間元件逐層傳 props。
- 素材以主題色 `light`／`dark` 作為最小實例。

