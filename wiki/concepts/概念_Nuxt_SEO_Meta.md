---
type: concept
author: collaborative
tags: ["domain/nuxt", "topic/seo", "topic/meta", "status/draft"]
summary: "Nuxt3 的 useSeoMeta 與 useServerSeoMeta 比較，以及 SEO Meta 設定的最佳實踐"
sources: ["raw/notes/Nuxt/Nuxt3 高效入門全攻略.pdf"]
created: "2026-05-10"
updated: "2026-05-10"
---

# 概念：Nuxt3 SEO Meta 設定

## 定義
Nuxt3 提供 `useSeoMeta` 與 `useServerSeoMeta` 兩個 composable 來設定 SEO 相關的 `<meta>` 標籤，取代手動操作 `<head>`。

## 兩者比較

| | `useSeoMeta` | `useServerSeoMeta` |
|---|---|---|
| 執行時機 | 雙端（SSR + CSR） | 僅 SSR（server-only） |
| 支援響應式 | ✅（computed、ref） | ❌ |
| 適用場景 | 動態 meta（依資料變化） | 靜態 meta（不需更新） |
| 效能 | 略低（client 也執行） | 較優（client 不執行） |

## 使用範例

```ts
// 動態（資料驅動）→ useSeoMeta
const { data: post } = await useFetch(`/api/posts/${id}`)
useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogImage: () => post.value?.coverImage,
})

// 靜態（不需響應式）→ useServerSeoMeta
useServerSeoMeta({
  title: '網站首頁',
  description: '這是一個 Nuxt3 示範網站',
  ogType: 'website',
})
```

## 常用屬性對照

| 屬性 | 對應 meta 標籤 |
|---|---|
| `title` | `<title>` |
| `description` | `<meta name="description">` |
| `ogTitle` | `<meta property="og:title">` |
| `ogDescription` | `<meta property="og:description">` |
| `ogImage` | `<meta property="og:image">` |
| `twitterCard` | `<meta name="twitter:card">` |
| `robots` | `<meta name="robots">` |

## 最佳實踐
1. **靜態頁面優先用 `useServerSeoMeta`**，減少 client-side 執行
2. **動態資料頁面用 `useSeoMeta` + getter 函式** `() => data.value?.title`，確保響應式更新
3. 在 `app.vue` 或 layout 設定全域預設值，在各頁面覆寫
4. `title` 建議格式：`頁面標題 | 網站名稱`

## 與其他概念的關係
- 相關筆記：[[notes/Nuxt/Nuxt3 高效入門全攻略]]
