---
type: source
author: ai
tags: ["domain/frontend", "topic/rendering", "topic/ssr", "status/draft"]
summary: "比較傳統 SSR、CSR、SPA、SSG、ISR 與現代 SSR 的 SEO、效能、路由與部署取捨"
sources: ["raw/JS/wang-ye-xuan-ran-mo-shi.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 網頁渲染模式

## 核心要點

- 傳統 SSR 由伺服器產生 HTML，SEO 與首次內容較有利，但伺服器負擔與頁面切換成本較高。
- CSR／SPA 將內容生成與路由交給瀏覽器，互動體驗與前後端分離較好，但初始載入與 SEO 需額外處理。
- SSG 預先產生靜態 HTML，適合內容穩定的網站；ISR 在此基礎上允許內容定期增量更新。
- 現代 SSR（如 Nuxt、Next.js）可混合 SSR、CSR、SSG 與 ISR，兼顧 SEO、效能與互動體驗。

