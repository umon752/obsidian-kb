---
type: source
author: ai
tags: ["domain/javascript", "topic/functional-programming", "topic/immutable", "status/draft"]
summary: "整理函數式程式設計的純函數、不可變性、組合、函子、Monad 與 Ramda 概念"
sources: ["raw/JS/han-shu-shi-cheng-shi-she-ji-functional-progra.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 函數式程式設計

## 核心要點

- 函數式程式設計以縮小函式責任、純函數、不可變資料與可預測輸出降低狀態複雜度。
- 宣告式程式碼描述「要做什麼」，命令式程式碼描述「如何完成」。
- `compose` 由右至左組合，`pipe` 由左至右組合；兩者都能把小函式串成較大的流程。
- 相關概念包含無狀態、高階函式、柯里化、Pointfree、Functor、Applicative 與 Monad。
- Ramda 提供自動 curry 與 `map`、`filter`、`compose`、`pipe` 等函數式工具。

