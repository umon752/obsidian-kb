---
type: source
author: ai
tags: ["domain/typescript", "topic/migration", "topic/javascript", "status/draft"]
summary: "在 TypeScript 專案以 allowJs 與 checkJs 設定逐步引用既有 JavaScript 套件或檔案"
sources: ["raw/TS/rang-ts-ke-yi-import-js.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# TypeScript import JavaScript

## 核心要點

- 當第三方套件只有 JavaScript 版本，可在 `tsconfig.json` 設定 `allowJs: true` 讓 TS 專案識別 JS。
- `checkJs: false` 可暫時不對 JS 檔案進行型別檢查，適合漸進式遷移。
- 這是相容與遷移設定，不代表 JS 已具有完整型別；長期仍應補上 declaration 或逐步轉成 TS。

