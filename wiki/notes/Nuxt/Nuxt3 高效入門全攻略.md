---
type: note
author: ai
tags: ["nuxt/core", "nuxt/ssr", "nuxt/routing", "nuxt/composables", "nuxt/server", "nuxt/pinia", "nuxt/i18n", "status/draft"]
summary: "從 Nuxt 3 目錄與 SSR 出發，掌握資料獲取、SEO、狀態管理、Server API 與部署基礎。"
sources: ["raw/notes/Nuxt/Nuxt3 高效入門全攻略.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Nuxt3 高效入門全攻略

## 摘要

> Nuxt 3 透過約定式目錄、Auto Import 與 Nitro，把 Vue 3 的前端開發延伸成同時具備 SSR、SEO 與 Server API 的全端應用。

> [!abstract] TL;DR
> 先建立清楚的目錄與渲染邊界，再選擇正確的資料獲取方式，最後補上 runtimeConfig、SEO、狀態管理與部署設定。

## 🎯 關鍵觀念

- `pages/`、`layouts/`、`components/`、`composables/`、`plugins/`、`middleware/` 與 `server/` 各有責任，多數檔案會自動載入。
- SSR 讓 server 先產生可被搜尋引擎讀取的 HTML，client 再接手互動；需要瀏覽器 API 的元件可用 `<ClientOnly>` 隔離。
- `$fetch` 適合事件或直接呼叫，`useFetch` 適合簡單的頁面初始資料，`useAsyncData` 適合自訂 key、組合多請求與複雜非 fetch 邏輯。
- `useSeoMeta` 支援動態響應式 meta；`useServerSeoMeta` 只在 server 執行，適合不需 client 更新的靜態 SEO。
- `runtimeConfig` 將 server-only 機密與 `public` 前後端共用設定分開，`.env` 以 `NUXT_` 前綴覆蓋。
- Nitro 的 `server/api/` 可依檔名副檔名對應 HTTP method，搭配資料庫建立應用程式後端。

## 🛠 實作步驟

### Step 1 — 建立專案與路由

```bash
npx nuxi init my-nuxt-app
npx nuxi add page about
npx nuxi add layout default
npx nuxi add component Home
npx nuxi add composable useCount
npx nuxi add middleware auth
```

使用 `pages/` 時，`app.vue` 必須包含 `<NuxtPage />`；採用 layout 後，將共同頁面框架放到 `layouts/default.vue`。

### Step 2 — 選擇資料獲取方式

```ts
// 頁面初始資料：SSR 友善、會去重與 hydration
const { data, refresh } = await useFetch('/api/posts')

// 需要自訂 key 或組合多個請求
const { data: result } = await useAsyncData('dashboard', () =>
  Promise.all([$fetch('/api/user'), $fetch('/api/stats')])
)

// 按鈕送出等事件觸發
await $fetch('/api/posts', { method: 'POST', body: payload })
```

> [!warning] axios 回傳值要保持可序列化
> 在 `useAsyncData` 中使用 axios 時，回傳 `res.data`，不要直接回傳整個 response object，避免 SSR 序列化與 hydration 問題。

### Step 3 — 設定 SEO Meta

```ts
useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogImage: () => post.value?.coverImage,
})

useServerSeoMeta({
  title: '網站首頁',
  description: '網站首頁描述',
})
```

動態資料使用 getter 讓 meta 保持響應式；靜態頁面則優先使用 server-only composable，降低 client 執行成本。

### Step 4 — 管理 runtimeConfig

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    },
  },
})
```

```env
NUXT_API_SECRET=server-only-value
NUXT_PUBLIC_API_BASE=https://api.example.com
```

外層 key 只在 server 使用；`config.public` 會暴露到 client，不得放 token、密碼或其他機密。

### Step 5 — 建立 Nitro Server API

```ts
// server/api/people.get.ts
export default defineEventHandler(async () => {
  return await peopleModel.find()
})
```

可將資料庫連線放在 `server/` 的初始化或 Nitro plugin，再以 `server/api/*.get.ts`、`*.post.ts` 等檔名表達 method；production 仍需處理連線、錯誤與授權。

### Step 6 — 加入 Pinia 與 middleware

```ts
export const useHomeStore = defineStore('home', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const add = () => count.value++
  return { count, double, add }
})
```

`storeToRefs` 只用於 state 與 getter；action 可直接解構。`middleware/` 攔截 router 切換，`server/middleware/` 則攔截站內 HTTP request，兩者責任不同。

### Step 7 — 補上 proxy、i18n 與部署檢查

開發環境可在 Vite server proxy 將 `/api` 導向後端；i18n 設定 locale、語系檔與 cookie 偵測；部署前確認環境變數、SSR HTML、hydration、Server API 與 SEO meta 都在 production 行為正常。

## 🧠 類比 / 觀念釐清

> `$fetch` 像直接打電話，`useFetch` 像有快取與 SSR 協調的櫃台，`useAsyncData` 則像可以自訂編號、合併多個部門回覆的案件管理器。

## 💡 實務提醒

> [!tip] Composable 放在 setup 頂層
> `useFetch`、`useI18n` 等 composable 不要任意放進 `onMounted`、watch callback 或一般 function 內，否則可能失去 Nuxt/Vue 的上下文。

> [!tip] 分開 public 與 assets
> `public/` 的檔案不經 Vite 編譯，適合 favicon、PDF 等固定資源；`assets/` 會由 Vite 處理，適合 CSS、圖片與 SVG。

> [!warning] middleware 不等於後端授權
> 前端 middleware 只能改善導覽體驗，真正的權限檢查仍必須在 server API 或後端服務完成。

## ❓ 自我檢核

- [ ] `$fetch`、`useFetch` 與 `useAsyncData` 各自適合什麼情境？
- [ ] `runtimeConfig.public` 與外層 key 的暴露範圍有何不同？
- [ ] 為什麼 axios 在 `useAsyncData` 中應回傳 `res.data`？
- [ ] `middleware/` 與 `server/middleware/` 分別攔截什麼？
- [ ] 什麼情況要使用 `<ClientOnly>`？

## 🔖 重要引文 / 範例

> Nuxt 的效率不只來自少寫設定，而是來自約定式結構讓路由、資料、SEO 與 server 邊界能被一致地理解。

## 🔗 延伸閱讀

- [[entities/工具_Nuxt]]
- [[concepts/概念_Nuxt_資料獲取]]
- [[concepts/概念_Nuxt_SEO_Meta]]
