---
type: source
author: ai
tags: ["domain/javascript", "topic/iterable", "topic/collection", "status/draft"]
summary: "整理 Iterable、Set、Map、WeakMap、Symbol.iterator 與 iterator helpers 的使用方式"
sources: ["raw/JS/ke-die-dai-de-xing-bie-iterable.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript Iterable

## 核心要點

- Array、String、Set、Map、`arguments` 與部分 DOM 集合都可作為 Iterable。
- Set 儲存唯一值，提供 `size`、`has`、`add`、`delete`、`clear` 與 `forEach`。
- Map 以任意型別作為 key，提供 `set`、`get`、`has`、`delete`、`keys`、`values` 與 `forEach`。
- WeakSet／WeakMap 只保留可被物件引用的值，當外部不再引用時可交由垃圾回收。
- `Symbol.iterator` 與 iterator 的 `next()` 讓集合逐步產出 `{ value, done }`；iterator helpers 可串接 map/filter/toArray，減少中間陣列。

