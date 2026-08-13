---
type: source
author: ai
tags: ["domain/typescript", "domain/vue", "topic/generics", "topic/utility-types", "status/draft"]
summary: "整理 TypeScript 實戰課的型別推論、unknown、generics、Utility Types 與 Vue 整合。"
sources: ["raw/notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# TypeScript 實戰課

## 核心要點

- 先理解型別推論，再在必要處補充明確型別，避免所有資料都退化成 `any`。
- `unknown` 比 `any` 安全，使用前必須先完成型別縮小；`interface`、type alias、generics 各有適用邊界。
- Utility Types 與泛型可重用既有型別，降低重複宣告；Vue 3 整合時需讓 props、emits、ref 與 composable 保持型別資訊。
- `tsconfig` 是專案型別檢查與編譯行為的核心，應依執行環境與建置工具明確設定。
