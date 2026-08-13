---
type: source
author: ai
tags: ["domain/nuxt", "topic/vue", "topic/ssr", "topic/typescript", "status/draft"]
summary: "整理 Nuxt 3 的目錄、SSR、資料獲取、SEO、runtimeConfig、API 與部署要點。"
sources: ["raw/notes/Nuxt/Nuxt3 高效入門全攻略.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt 3 高效入門全攻略

## 核心要點

- Nuxt 3 以 pages、components、composables、server、middleware 與 layouts 等目錄組織全端 Vue 應用。
- SSR 與資料獲取可搭配 `$fetch`、`useFetch`、`useAsyncData`；SEO 可使用 `useSeoMeta` 或 `useServerSeoMeta`。
- `runtimeConfig` 管理環境設定，Nitro server API 可搭配 Mongoose；Pinia、middleware、proxy 與 i18n 負責狀態、請求、轉發與多語系。
- 部署前需確認 server API、環境變數、SSR hydration、SEO meta 與 production runtime 行為。
