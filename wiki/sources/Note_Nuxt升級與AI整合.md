---
type: source
author: ai
tags: ["domain/nuxt", "domain/ai", "topic/vue", "topic/performance", "status/draft"]
summary: "整理 Nuxt 升級、環境變數、效能優化、CSS 遷移與 Spec-Driven AI 開發經驗。"
sources: ["raw/notes/Nuxt/關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt 升級與 AI 整合

## 核心要點

- Nuxt 2 升級到 Nuxt 3 可選擇直接重寫或透過相容層漸進遷移，需評估既有依賴與維護成本。
- 不應用 `vite.define process.env` 將所有環境變數暴露到前端；應使用受控的 runtime config。
- 效能可從 lazy JS、元件延遲載入、chunk split、preconnect、壓縮、critical CSS、inline SSR styles 與 app cloak 等面向改善。
- Nuxt 4 的動態路由 key、WindiCSS 到 UnoCSS 的遷移、404 動態路由與 server API 邊界都需在升級時驗證。
- Spec-Driven AI 以規格、實作、驗證循環協作；不要把 Nuxt 當成不分層的 REST backend。
