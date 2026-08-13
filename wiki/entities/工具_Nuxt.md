---
type: entity
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/vue", "status/draft"]
summary: "建立在 Vue 之上的全端框架，提供 SSR、路由、資料獲取與 Nitro server 能力"
sources: ["raw/Nuxt/PWA.md", "raw/Nuxt/debug.md", "raw/Nuxt/robots-and-canonical.md", "raw/Nuxt/template/01 Nuxt template base.md", "raw/Nuxt/template/02 Nuxt template header.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 工具：Nuxt

## 簡介

Nuxt 是建立在 Vue 之上的全端框架，整合檔案路由、SSR、資料獲取、SEO 與 Nitro server，適合建立網站與全端應用。

## 核心能力

- pages、layouts、components、composables 與 server 目錄形成清楚的應用分層。
- SSR、`useFetch`、`useAsyncData` 與 runtime config 支援效能、資料與環境設定管理。
- SEO 可集中處理 meta、robots、canonical、JSON-LD 與 manifest；部署前需驗證產生的 HTML 與環境變數。

## 相關來源

- [[sources/Nuxt_PWA]]
- [[sources/Nuxt_debug]]
- [[sources/Nuxt_robots-and-canonical]]
- [[sources/Nuxt_template-base]]
- [[sources/Nuxt_template-header]]
- [[sources/Note_Nuxt3高效入門全攻略]]
- [[sources/Note_Nuxt升級與AI整合]]
