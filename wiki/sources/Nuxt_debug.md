---
type: source
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/debug", "status/draft"]
summary: "整理 Nuxt 型別檔過期時的清理、重新產生與編輯器排除方法。"
sources: ["raw/Nuxt/debug.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt Debug

## 核心要點

- `.nuxt/types` 可能因路由或型別變更而過期，造成 VS Code 顯示錯誤或型別不一致。
- 可移除 `.nuxt` 後執行 `npx nuxt prepare`，再重新啟動 VS Code 讓型別重新載入。
- 不應把暫存備份檔（例如 `xxx.vue.bak`）當成 Nuxt 頁面或元件處理，應在編輯器或工具設定中排除。

## 診斷流程

先確認錯誤是否來自產生的 `.nuxt` 型別，再清理並重新產生；若只有編輯器索引異常，最後重啟 VS Code。
