---
type: source
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/seo", "topic/canonical", "status/draft"]
summary: "說明 Nuxt 中 robots 與 canonical 的全域、頁面層級配置分工。"
sources: ["raw/Nuxt/robots-and-canonical.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt Robots 與 Canonical

## 核心要點

- 一般可索引頁面使用 `index,follow`；測試或不應收錄的頁面可使用 `noindex,nofollow`。
- canonical 應指向同一內容的主要網址，避免查詢參數或多個網址造成搜尋引擎判斷分散。
- robots 可在 `nuxt.config.ts` 做全域設定；canonical 通常由頁面層級的 `usePageSeo.ts` 依路由產生。
- `nuxt.config.ts` 適合放語系、viewport、robots 與 favicon；頁面 composable 則集中 title、description、Open Graph、Twitter 與 canonical。

## 實作方式

可用 `useHead` 設定 `link[rel="canonical"]`，並將網站共同 SEO 預設值與每頁差異分開管理，降低遺漏或互相覆寫的風險。
