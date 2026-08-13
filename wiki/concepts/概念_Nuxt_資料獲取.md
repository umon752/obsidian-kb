---
type: concept
author: collaborative
tags: ["domain/nuxt", "topic/資料獲取", "topic/ssr", "status/draft"]
summary: "$fetch、useFetch、useAsyncData 三種 Nuxt3 資料獲取方式的比較與選用決策表"
sources: ["raw/notes/Nuxt/Nuxt3 高效入門全攻略.pdf"]
created: "2026-05-10"
updated: "2026-05-10"
---

# 概念：Nuxt3 資料獲取三劍客

## 定義
Nuxt3 提供三種資料獲取方式，各有適用場景，混用容易造成 SSR hydration 問題或重複請求。

## 三種方式比較

| 方式 | 執行環境 | 自動 SSR | 去重複 | 適用場景 |
|------|----------|----------|--------|----------|
| `$fetch` | 雙端（呼叫端決定） | ❌ | ❌ | 事件觸發（按鈕送出）、server route 內部呼叫 |
| `useFetch` | 雙端自動 | ✅ | ✅ | 頁面初始資料，URL 簡單 |
| `useAsyncData` | 雙端自動 | ✅ | ✅ | 需要自訂 key、組合多個請求、包裝非 fetch 邏輯 |

## 選用決策流程

```
是否在 setup / 頁面初始化時請求？
├── 否 → 用 $fetch（事件觸發、middleware、server route）
└── 是 → URL 是否固定且單一來源？
    ├── 是 → 用 useFetch（最簡潔）
    └── 否 → 用 useAsyncData（自訂 key 或包裝複雜邏輯）
```

## 常見陷阱
- 在 `setup()` 中直接用 `$fetch` → SSR 與 client 各請求一次，造成重複
- `useFetch` 的 URL 含響應式變數時，需用 computed 或 getter `() => url.value`
- `useAsyncData` 的 key 若重複，Nuxt 會複用快取，導致不同元件拿到同一份資料

## 與其他概念的關係
- 相關筆記：[[notes/Nuxt/Nuxt3 高效入門全攻略]]

## 相關來源
- [[sources/Note_Nuxt3高效入門全攻略]]
- [[sources/Note_Nuxt SSR五大陷阱]]
- [[sources/Note_Socket即時資料治理]]
