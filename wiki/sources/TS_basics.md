---
type: source
author: ai
tags: ["domain/typescript", "topic/types", "topic/generics", "status/draft"]
summary: "整理 TypeScript 基礎型別、type/interface、unknown、泛型、型別守衛、class 與 Utility Types"
sources: ["raw/TS/ts.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# TypeScript 基礎

## 核心要點

- 基礎內容涵蓋 string、number、boolean、array、object、`void`、`any`、`unknown` 與 nullability。
- `type` 適合聯合、交叉與固定型別組合；`interface` 適合物件結構與可擴充宣告。
- 泛型讓函式與型別保留輸入型別關係；`is`、`as` 與 `satisfies` 分別處理型別守衛、斷言與符合型別檢查。
- Class 可用 `private`、`public`、`protected` 管理成員可見性；Utility Types 提供 `Pick`、`Omit`、`Required` 等型別轉換。
- 型別推論能完成時應優先交給 TypeScript，避免不必要的明確標註與 `any`。

## 關聯頁面

- [[concepts/概念_TypeScript_Utility Types]]

