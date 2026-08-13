---
type: source
author: ai
tags: ["domain/vue", "topic/reactivity", "topic/performance", "status/draft"]
summary: "以 effect、track、trigger 與依賴清理解析 Vue 3 響應式系統及其效能特性。"
sources: ["raw/notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Vue 3 響應式系統

## 核心要點

- effect 是更新的基本單位；getter 執行 `track` 建立依賴，setter 執行 `trigger` 通知訂閱者。
- 依賴關係是多對多，動態依賴需要在每次 effect 執行前清理舊關係，避免不再使用的資料仍觸發更新。
- 已知節點時，linked list 可讓訂閱新增與移除達到 O(1)；觸發所有訂閱者仍需 O(n)。
- 巢狀 effect 必須保存並恢復 active effect 上下文，否則追蹤會連到錯誤的 effect。
