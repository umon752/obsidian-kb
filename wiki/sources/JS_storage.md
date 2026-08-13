---
type: source
author: ai
tags: ["domain/frontend", "topic/storage", "topic/indexeddb", "status/draft"]
summary: "比較 localStorage、sessionStorage 與 IndexedDB 的容量、資料型別、索引與離線應用"
sources: ["raw/JS/localstorage-and-sessionstorage-and-indexeddb-.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# localStorage、sessionStorage 與 IndexedDB

## 核心要點

- `localStorage` 與 `sessionStorage` 容量較小、只支援字串，適合簡單設定與短期狀態。
- IndexedDB 可儲存物件、JSON、Blob 等大量結構化資料，並支援索引與查詢。
- IndexedDB 適合離線 Web App、API 快取、複雜資料、背景同步、PWA 與本地搜尋。
- 素材以「簡單易用的 Storage」對比「容量與查詢能力較高但較複雜的 IndexedDB」作為選擇依據。

