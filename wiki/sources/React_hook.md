---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/component", "status/draft"]
summary: "比較 React Hook 與一般函式，整理 Hook 的狀態、重繪與只能在頂層呼叫的限制"
sources: ["raw/React/hook.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React Hook

## 核心要點

- React Hook 是連結元件生命週期、狀態與畫面更新的函式；一般函式只處理資料或工具邏輯。
- Hook 只能在 React 函式元件或自訂 Hook 的頂層呼叫，不能放在迴圈、條件或巢狀函式中。
- `useState`、`useEffect` 等 Hook 能保存狀態並觸發重繪；一般函式不會主動改變畫面。
- 選擇方式：UI 狀態／生命週期使用 Hook，純資料轉換與通用邏輯使用一般函式。

