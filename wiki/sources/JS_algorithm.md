---
type: source
author: ai
tags: ["domain/javascript", "topic/algorithm", "topic/complexity", "status/draft"]
summary: "整理 Big O、空間複雜度、迴圈選擇與以 Map 快取計算結果的基本演算法觀念"
sources: ["raw/JS/yan-suan-fa-algorithm.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 演算法與複雜度

## 核心要點

- 時間複雜度描述執行成本，空間複雜度描述額外記憶體需求；常見 Big O 有 `O(1)`、`O(log n)`、`O(n)`、`O(n²)` 與 `O(2^n)`。
- `for`、`while`、`for...of`、`forEach` 與 `for...in` 的遍歷對象、可中斷性與效能特性不同。
- `for...in` 會遍歷可枚舉屬性與可能的原型鏈，處理陣列時需特別小心。
- 可用 `Map` 將函式參數序列化成 key，快取已計算結果，避免相同輸入重複運算。

