---
type: source
author: ai
tags: ["domain/typescript", "topic/packages", "topic/declaration", "status/draft"]
summary: "沒有官方 TypeScript 型別的 JavaScript 套件，應優先尋找社群型別或自行建立 .d.ts 宣告"
sources: ["raw/TS/ts-tao-jian.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# TypeScript 套件型別

## 核心要點

- 套件官方沒有 TypeScript 版本時，可先到 npm TypeScript 官方 scope 尋找型別套件。
- 若找不到且必須使用，才建立 `my-library.d.ts`，以 `declare module` 為實際使用方法補上型別。
- 自行宣告前必須閱讀套件 source，確定函式參數與回傳型別，避免把錯誤型別擴散到專案。

