---
type: source
author: ai
tags: ["domain/react", "topic/state-management", "topic/mediator", "status/draft"]
summary: "React dispatch 將任務送出與實際處理分離，形成較鬆耦合的中介者式流程"
sources: ["raw/React/dispatch-pai-fa.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React dispatch

## 核心要點

- `dispatch({ type: 'INCREMENT' })` 表達「送出任務」，呼叫端不直接處理狀態變更細節。
- 實際處理可由 reducer 或其他集中邏輯依 action type 決定。
- 這種做法接近中介者模式，有助於降低元件間耦合並集中維護流程。

