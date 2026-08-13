---
type: source
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/navigation", "topic/api", "status/draft"]
summary: "整理以後端選單驅動 Nuxt Header 的型別、轉換、遞迴與安全注意事項。"
sources: ["raw/Nuxt/template/02 Nuxt template header.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt Template Header

## 核心要點

- Header 可透過 `useMenu()` 取得後端選單，將系統選單與自訂內容轉成前端統一的 `MenuItem` 型別。
- 系統選單可依 system code 對應既知路由與 icon；自訂選單則以 slug 建立 `/content/{slug}`，並使用 `encodeURIComponent` 處理路徑。
- `enabled`、`order`、遞迴 children、loading、error 與 refresh 狀態都應在資料轉換層處理。
- 後端權限必須與前端顯示一致；隱藏選單不能被誤當成真正的授權控制。

## 維護方式

將 API endpoint 替換集中在 composable 或設定層，避免 Header 內散落請求細節；新增選單類型時同步更新型別、轉換器與測試。
