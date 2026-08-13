---
type: source
author: ai
tags: ["domain/typescript", "topic/tsconfig", "topic/dom", "status/draft"]
summary: "在 tsconfig 的 lib 加入 DOM 與 DOM.Iterable，讓瀏覽器 API 取得正確型別"
sources: ["raw/TS/ts-she-ding.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# TypeScript 設定

## 核心要點

- `compilerOptions.lib` 加入 `DOM` 與 `DOM.Iterable`，可讓 `window`、`document` 等瀏覽器 API 通過型別檢查。
- 素材範例同時使用 `ES2020`、`DOM` 與 `DOM.Iterable`。
- 其他設定應依執行環境與 bundler 需求一併檢查，不能只靠 `lib` 解決所有型別問題。

