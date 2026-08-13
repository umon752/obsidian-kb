---
type: source
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/typescript", "topic/tailwindcss", "status/draft"]
summary: "整理 Nuxt 專案模板的工具鏈、目錄分工、SEO 與 runtimeConfig 基礎設定。"
sources: ["raw/Nuxt/template/01 Nuxt template base.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt Template Base

## 核心要點

- 模板以 Nuxt、TypeScript、Tailwind CSS v4、`clsx`/`tailwind-merge`、Nuxt ESLint、Prettier 與 Tailwind Prettier plugin 組成一致的開發基礎。
- 以 pages、components、composables、layouts、server 與 middleware 分離路由、視圖、共用邏輯、後端 API 與請求前置處理。
- i18n、runtimeConfig、SEO 預設值、`site.webmanifest` 與錯誤頁應在基礎模板先建立清楚邊界。
- 機密或環境差異設定放在 runtime config，不應硬編碼在前端程式或提交至 repository。

## 建置重點

先安裝並固定格式化、lint 與 CSS 工具鏈，再建立頁面與 SEO 基礎；部署前需確認環境變數、manifest、favicon、路由與 server API 的設定一致。
