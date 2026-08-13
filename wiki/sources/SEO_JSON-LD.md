---
type: source
author: ai
tags: ["domain/seo", "topic/json-ld", "topic/schema", "status/draft"]
summary: "整理 JSON-LD 與 Schema.org 類型，說明 Nuxt SEO 結構化資料的使用方式。"
sources: ["raw/SEO/JSON-LD（JavaScript Object Notation for Linked Data）.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# JSON-LD

## 核心要點

- JSON-LD 以結構化資料描述頁面，協助 Google 與 AI 理解內容、組織、網站與頁面關係。
- 常見 Schema.org 類型包含 `WebPage`、`AboutPage`、`Article`、`Product`、`FAQPage`、`Event` 與 `BreadcrumbList`。
- Nuxt 可使用 `useSchemaOrg` 搭配 `defineOrganization`、`defineWebSite` 等 helper 建立結構化資料。
- Organization 描述公司或組織；WebSite 描述網站本身，必要時可補充站內搜尋的 SearchAction。

## 實務提醒

結構化資料必須反映頁面上真實可見且正確的內容，並在部署後使用搜尋引擎工具驗證格式與語意。
