---
type: source
author: ai
tags: ["domain/typescript", "topic/zod", "topic/runtime-validation", "status/draft"]
summary: "Zod 以單一 schema 同時執行 runtime 驗證與推導 TypeScript 型別"
sources: ["raw/TS/zod.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Zod

## 核心要點

- TypeScript 型別主要在編譯期存在，外部 API 回應仍需要 runtime validation。
- Zod 以 `z.object()` 定義資料 schema，再用 `.parse()` 驗證 API 回應。
- `z.infer<typeof schema>` 可從同一份 schema 推導 TypeScript 型別，避免驗證規則與型別定義分離。
- 素材以 Todo API 回應的 `id`、`content`、`done` 為示例。

## 參考資源

- [Zod 官方文件](https://zod.dev/)

