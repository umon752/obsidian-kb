---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/side-effect", "status/draft"]
summary: "整理 useEffect 的執行時機、依賴陣列、清除副作用與閉包陷阱"
sources: ["raw/React/useeffect.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useEffect

## 核心要點

- `useEffect` 在函式元件 render 後執行副作用，可回傳 cleanup function 清理資源。
- 不帶依賴陣列會在每次 render 後執行；空陣列只在初次掛載後執行；指定依賴則在依賴變更後執行。
- 它可對應 class component 的 mount／update 類型工作，但仍應以函式元件的 render 與 effect 模型思考。
- 閉包會記住建立當下的變數值，非同步 effect 需正確處理依賴，避免讀到過期狀態。

