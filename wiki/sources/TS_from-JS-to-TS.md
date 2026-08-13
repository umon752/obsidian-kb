---
type: source
author: ai
tags: ["domain/typescript", "topic/migration", "topic/vite", "status/draft"]
summary: "以 Vite 為例整理從 JavaScript 遷移 TypeScript 的套件、tsconfig、ESLint、checker 與 build 步驟"
sources: ["raw/TS/js-sheng-ji-ts-fang-fa.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 從 JavaScript 升級 TypeScript

## 核心要點

- 安裝 TypeScript、`@typescript-eslint`、ESLint、`@types/node` 與 `vite-plugin-checker` 等工具。
- 以 `tsc --init` 建立 `tsconfig.json`，並在 build script 先執行 TypeScript 檢查再執行 Vite build。
- 設定 ESLint parser／plugin、VS Code 儲存格式化與 `vite-plugin-checker`，讓型別錯誤在開發時可見。
- `allowJs: true` 可識別既有 JS；`checkJs` 可決定是否對 JS 做型別檢查；最後再逐步把 `.js` 改成 `.ts`。
- 既有 `.tsx` 或第三方檔案若需暫時排除，可用 `@ts-nocheck` 或 checker 的 `ignoreFileRegexp`，但應視為遷移過渡方案。

