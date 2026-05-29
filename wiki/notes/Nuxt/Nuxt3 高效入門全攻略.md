---
type: note
author: ai
tags: ['nuxt', 'nuxt/ssr', 'nuxt/routing', 'nuxt/composables', 'nuxt/server', 'pinia', 'i18n', 'status/draft']
summary: 'Nuxt3 從環境設定到完整應用的全攻略，涵蓋目錄結構、資料獲取、SEO、狀態管理、Server API 與部署'
sources: ['raw/notes/Nuxt/Nuxt3 高效入門全攻略.pdf']
created: '2026-05-10'
updated: '2026-05-10'
---

# Nuxt3 高效入門全攻略

## 摘要

> 從環境設定到完整應用實作，一次掌握 Nuxt3 目錄結構、SSR 渲染、資料獲取、SEO、Pinia、Server API、多國語系與部署。

> [!abstract] TL;DR
> Nuxt3 透過約定式目錄結構與 Auto Import 大幅降低設定成本，搭配 Nitro engine 讓前端同時具備 Server API 能力，是 Vue3 全端開發的最佳選擇。

## 🎯 關鍵觀念

- **目錄即規則**：`pages/`、`layouts/`、`components/`、`composables/`、`plugins/`、`middleware/`、`server/` 各有職責，多數自動 Import，無需手動引入
- **雙渲染模式**：Client 端負責使用者互動，Server 端負責 SEO 爬蟲；`<ClientOnly>` 可指定僅在 Client 渲染
- **資料獲取三劍客**：`$fetch`（直呼叫）、`useFetch`（簡潔 SSR 友善）、`useAsyncData + $fetch`（進階 key 控制與多 API）
- **SEO Meta 分工**：`useSeoMeta` 動態響應式更新；`useServerSeoMeta` 僅 Server 執行，靜態 SEO 效率更高
- **環境變數雙層**：`runtimeConfig` 區分 server-only（敏感 token）與 public（apiUrl），`.env` 以 `NUXT_` 前綴自動覆蓋
- **Server API = Nitro + Mongoose**：`server/api/` 下的檔名加 `.get/.post/.put/.delete` 對應 HTTP method，可直接整合 MongoDB

## 🛠 實作步驟

### Step 1 — 建立專案

```bash
npx nuxi init [專案名稱]
```

- Node.js 最低 v18，建議 v20
- 使用 NVM 管理版本：`nvm install`、`nvm use`

### Step 2 — 目錄結構快速指令

```bash
npx nuxi add page about
npx nuxi add layout default
npx nuxi add component Home
npx nuxi add composable addCount
npx nuxi add plugin hello
npx nuxi add middleware auth
```

> [!warning] `<NuxtPage />` 是進入點
> 若要使用 `pages/` 多頁面路由，`app.vue` 必須包含 `<NuxtPage />`；使用 `layouts/default.vue` 後可移除 `app.vue`

### Step 3 — 資料獲取

```ts
// 基本 GET
const { data } = await useFetch('https://api.example.com/data')

// GET 帶參數
const { data } = await useFetch('/api/list', { query: { page: 1 } })

// 多 API 並行
const [{ data: a }, { data: b }] = await Promise.all([
  useFetch('/api/a'),
  useFetch('/api/b'),
])

// 重新獲取資料
const { data, refresh } = await useFetch('/api/data')
// 或透過 key
const refresh = () => refreshNuxtData('myKey')
```

> [!warning] axios 搭配 useAsyncData 注意
> 使用 axios 時，`return` 必須是 `res.data`，不能回傳整個 axios response，否則 SSR 會直接壞掉

### Step 4 — SEO Meta 設定

```ts
// 全域（nuxt.config）
app: { head: { title: '...', meta: [...] } }

// 頁面動態（useSeoMeta 推薦）
useSeoMeta({
  title: '頁面標題',
  description: '描述',
  ogTitle: '...',
  ogImage: '...',
})

// 靜態 SEO（Server only，更高效）
useServerSeoMeta({ title: () => `${data.title}` })
```

### Step 5 — 環境變數（runtimeConfig）

```ts
// nuxt.config.ts
runtimeConfig: {
  token: '',          // server only
  public: {
    apiUrl: '',       // 前後端都能存取
  }
}
```

```env
# .env（本地）
NUXT_TOKEN=my-secret-token
NUXT_PUBLIC_API_URL=https://api.example.com
```

```ts
// 使用
const config = useRuntimeConfig()
config.public.apiUrl   // 前端可用
config.token           // 僅 server 可用
```

### Step 6 — Server API + MongoDB

```ts
// server/db/index.js
import mongoose from 'mongoose'
export default async () => {
  await mongoose.connect('mongodb+srv://...')
}

// nuxt.config.ts
nitro: { plugins: ['~/server/db/index.js'] }
```

```ts
// server/api/people/index.get.js
import peopleModel from '@/server/models/people.model'
export default defineEventHandler(async () => {
  return await peopleModel.find()
})
```

### Step 7 — Pinia 狀態管理

```ts
// stores/Home.js（Composition API 風格，官方推薦）
export const useHomeStore = defineStore('home', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const add = () => count.value++
  return { count, double, add }
})
```

```ts
// 組件中使用
const store = useHomeStore()
const { count } = storeToRefs(store)  // ref/computed 需要 storeToRefs 保持響應式
```

> [!warning] storeToRefs 只用於 state/getter
> `function`（action）直接解構即可，只有 `ref`、`computed` 需要 `storeToRefs`

### Step 8 — Middleware

```ts
// 匿名（直接在頁面）
definePageMeta({
  middleware: (to, from) => { /* ... */ }
})

// 具名（middleware/auth.js → 頁面 definePageMeta({ middleware: ['auth'] })）
export default defineNuxtRouteMiddleware((to, from) => { /* ... */ })

// 全域（middleware/check.global.js）← 檔名加 .global 自動全域
```

> [!tip] middleware vs server/middleware
> `middleware/` 攔截 **Router 切換**；`server/middleware/` 攔截 **HTTP Request**，只能攔截站內請求

### Step 9 — 跨域 Proxy（開發環境）

```ts
// nuxt.config.ts
vite: {
  server: {
    proxy: {
      '/VsWeb/api': {
        target: 'https://www.vscinemas.com.tw/',
        changeOrigin: true,
      }
    }
  }
}
```

### Step 10 — 多國語系（i18n）

```bash
npm install @nuxtjs/i18n@next --save-dev
```

```ts
// nuxt.config.ts
i18n: {
  strategy: 'no_prefix',
  locales: [{ code: 'zh-TW', file: 'zh-TW.json' }],
  langDir: 'language',
  defaultLocale: 'zh-TW',
  detectBrowserLanguage: { useCookie: true },
}
```

## 🧠 類比 / 觀念釐清

> `useFetch` = `useAsyncData + $fetch` 的語法糖。前者適合簡單情境，後者適合需要共用 key、搭配 axios 或多 API 組合的進階情境。

> `useSeoMeta` vs `useServerSeoMeta`：前者像 `ref`（動態響應），後者像 `const`（只跑一次在 Server），靜態 SEO 頁面用後者效能更好。

## 💡 實務提醒

> [!tip] Composables 只能在 setup 頂層呼叫
> `useFetch`、`useI18n` 等 Composables 不能放在 function 內部、`onMounted` 或 `watch` callback 中呼叫，否則會失效或報錯

> [!tip] Plugin 的 server/client 分離
> 在 plugins 檔名加 `.server.js` 或 `.client.js` 可控制只在特定端載入，避免 SSR 與 CSR 不一致

> [!warning] axios 回傳陷阱
> `useAsyncData` 搭配 axios 時，必須 `return res.data`，不能 return 整個 axios response object，否則 SSR 序列化會壞掉

> [!warning] public/ vs assets/ 的差異
> `public/`：靜態資源，不經編譯（如 favicon、PDF）；`assets/`：需經 Vite 編譯（如 CSS、圖片、SVG）

## ❓ 自我檢核

- [ ] `useFetch` 與 `useAsyncData` 各在什麼情況下選用？
- [ ] `runtimeConfig` 的 `public` 與外層 key 有什麼存取差異？
- [ ] 為什麼 `storeToRefs` 只需要用在 `ref` 和 `computed`，不需要用在 function？
- [ ] `middleware/` 與 `server/middleware/` 各攔截什麼？
- [ ] `useSeoMeta` 與 `useServerSeoMeta` 應如何選擇？

## 🔖 重要引文 / 範例

> `useFetch` 一樣也會回傳 data、pending、error、refresh 讓你使用：data 回傳的資料、pending 一個 Boolean 跟你說非同步是否完成了、refresh 可用於刷新函數返回的資料的 function、error 如果非同步失敗回傳錯誤相關的資料。

```ts
// 完整 useFetch 攔截器範例
const { data } = await useFetch('/api/auth/user_info', {
  onRequest({ options }) {
    options.headers = { Authorization: `Bearer ${token}` }
  },
  onResponse({ response }) {
    return response._data
  },
  onResponseError({ response }) {
    // 處理錯誤
  },
})
```

## 🔗 延伸閱讀

- [[（待補）]] Pinia 深入指南
- [[（待補）]] Nuxt3 i18n 多國語系完整設定
- [[（待補）]] Nitro Server Engine
- [Nuxt3 官方文件](https://nuxt.com/docs)
- [nuxt/i18n 文件](https://v8.i18n.nuxtjs.org/)
- [Mongoose 文件](https://mongoosejs.com/)

> [!note]- 原始課程內容摘錄
> 課程講師：Mike 成智遠（雷麒科技 Senior Frontend Engineer）
> 範例程式碼：https://github.com/MikeOnlineCourse/Nuxt_Course_Example
> 涵蓋章節：VSCode 環境 → 專案建立 → 目錄結構 → Pinia → SEO → 資料獲取 → Server API → MongoDB → i18n → XSS → 登入機制 → Vercel 部署
