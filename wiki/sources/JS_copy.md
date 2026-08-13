---
type: source
author: ai
tags: ["domain/javascript", "topic/object", "topic/copy", "status/draft"]
summary: "比較 JavaScript 淺拷貝與深拷貝，並整理 JSON、structuredClone 與 WeakMap 實作差異"
sources: ["raw/JS/kao-bei.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 拷貝

## 核心要點

- Object、Array 與 function 屬於參考型別，直接賦值會共用同一份參考。
- 展開運算子 `{ ...obj }` 只複製第一層；巢狀物件仍指向原始資料。
- `JSON.parse(JSON.stringify(obj))` 可處理簡單資料，但無法保留 function、`undefined`、`Symbol`、`Date` 等特殊值。
- `structuredClone()` 或 `lodash.cloneDeep()` 適合更完整的深拷貝需求。
- 自製深拷貝可用 `WeakMap` 處理循環參考，並針對 Date、RegExp、Map、Set 與 Array 分別複製。

