---
type: source
author: ai
tags: ["domain/typescript", "topic/types", "topic/declaration", "status/draft"]
summary: "整理以 .d.ts、tsconfig include 與 declare global 建立全域 TypeScript type 的方法與維護風險"
sources: ["raw/TS/jiang-type-bian-cheng-global.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# TypeScript 全域 type

## 核心要點

- 全域 type 可省略 export／import，但會讓型別來源不明，增加搜尋與除錯成本。
- 方法一是在 `src` 放置命名為 `TXxxType.d.ts` 的 declaration file。
- 方法二以 `tsconfig.json` 的 `include` 納入宣告檔；方法三使用 `declare global` 宣告型別。
- 素材建議除非確實需要，否則不要濫用全域 type。

