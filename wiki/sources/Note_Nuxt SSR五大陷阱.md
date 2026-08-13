---
type: source
author: ai
tags: ["domain/nuxt", "topic/ssr", "topic/vue", "topic/axios", "status/draft"]
summary: "整理 Nuxt SSR 中 HTML 輸出、async setup、Suspense、URL 與 singleton 的五個陷阱。"
sources: ["raw/notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Nuxt SSR 五大陷阱

## 核心要點

1. SSR 由外而內輸出，父層 HTML 送出後，子元件修改父層資料不會回溯更新已送出的 HTML。
2. `await` 後可能失去 Vue 的 `currentInstance`；`<script setup>` 有編譯器協助，但一般 `defineComponent` 不會自動保留所有上下文。
3. Suspense 可能延後舊頁面卸載，導致 watcher 與 lifecycle 在過渡期間仍然觸發。
4. SSR 使用相對 axios/fetch URL 可能得到 `Invalid URL`；Nuxt `$fetch` 呼叫內部 server route 時可直接處理，避免不必要的網路往返。
5. module-level singleton 會跨 request 共用記憶體，可能造成使用者資料污染與 memory leak。
