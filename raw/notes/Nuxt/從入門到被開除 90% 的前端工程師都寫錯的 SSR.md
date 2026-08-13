---
type: note
author: ai
tags:
  - nuxt/ssr
  - vue/composition-api
  - vue/suspense
  - nuxt/fetch
  - status/draft
summary: 實戰踩坑分享：SSR 渲染順序、async instance 丟失、Suspense 生命週期、$fetch vs axios、記憶體洩漏與跨請求污染五大陷阱
sources:
  - raw/notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR.md
  - https://talks.mini-ghost.dev/2026/things-i-learned-from-ssr
  - https://notebooklm.google.com/notebook/2bcdd9f0-9785-400d-a73c-bfc7236a42ee
created: 2026-05-17
updated: 2026-05-19
---

# 從入門到被開除 — 90% 前端工程師都寫錯的 SSR

## 摘要

> 以五個真實踩坑故事，揭示 CSR 思維套到 SSR 後會炸掉的地方。

> [!abstract] TL;DR
> SSR 的 server 是「長駐、多人共用的 Node.js process」，不是瀏覽器；渲染是一次性由外而內，global state 與 singleton 在這裡都是地雷。

---

## 🎯 關鍵觀念

- **SSR 渲染由外而內，HTML 一旦生成不再更新**：子元件在 setup 修改父層資料，父層的 HTML 早已送出，原始碼不會反映最新值
- **async setup 後 `currentInstance` 會變 null**：Vue 用 global singleton 紀錄「正在渲染哪個元件」，await 後框架已還原到 null；`<script setup>` 幫你自動補 `withAsyncContext`，`defineComponent` 不會
- **Suspense 讓舊頁面延遲卸載**：切路由時新頁面 resolve 前，舊頁面仍 mounted，watch / lifecycle 仍在觸發
- **SSR 環境不能用相對路徑呼叫內部 API**：Node.js 沒有 base URL，`fetch('/api/posts')` 會拋出 `Invalid URL`；Nuxt 的 `$fetch` 會將 Server Route 轉為直接 function call，零網路開銷
- **SSR server 記憶體跨請求共享**：module-level 全域變數不會隨 request 結束而釋放 → memory leak
- **Singleton 快取在 SSR = 跨請求污染**：第一個 user 的資料快取進全域，後續所有 user 都拿到同一份

---

## 🛠 五大陷阱詳解

### 問題一 — SSR 渲染順序：內層改外層資料不反映在 HTML

**情境**：Layout 透過 `provide` 提供 `setTitle` 方法，Page 用 `inject` 拿到後在 setup 呼叫設定標題。CSR 正常，但 SSR 原始碼裡 `<head>` 是空的。

**原因**：SSR 渲染是**由外而內**，layout 先渲染並生成 HTML，此時 title 還是預設空值；page 內部再怎麼呼叫 `setTitle`，也無法修改已輸出的 HTML。

> [!warning] 避免在子元件修改父層已渲染的資料
> SSR 與 CSR 最大差異：HTML 生成後不再響應式更新。應直接在需要的層級使用 `useSeoMeta` / `useHead`，而非透過 provide/inject 傳遞後再設定。

**正確做法**：

```vue
<!-- ❌ 不要這樣：在 page 裡 inject 後呼叫 layout 的 setTitle -->
<!-- ✅ 直接在 page 使用 useSeoMeta -->
<script setup>
useSeoMeta({ title: '文章標題' })
</script>
```

---

### 問題二 — async Composition API 中 currentInstance 丟失

**情境**：把資料抓取邏輯抽成 Composition API（`useUserDetail`），在裡面依序 await 兩次 API，第二次 await 後出現錯誤：`Nuxt instance is unavailable`。

**原因**：Vue 用 `setCurrentInstance` 在初始化時設定全域唯一的 instance；await 後框架繼續渲染其他元件，`currentInstance` 被還原為 null。`<script setup>` 在編譯時自動注入 `withAsyncContext` 修正此問題，`defineComponent` 不會。

```
同步流程：parent → sibling-one(set) → sibling-one(restore) → sibling-two → ...
async 流程：component(set) → await → framework 繼續渲染其他 → instance = null → 你的 callback 繼續跑 → 拿不到 instance
```

> [!tip] 優先使用 `<script setup>`
> `<script setup>` 幫你處理所有 async context 問題。若必須使用 `defineComponent`，在每次 await 前後手動呼叫 `withAsyncContext`。

```ts
// 僅在 defineComponent 中需要手動處理
import { withAsyncContext } from 'vue'

const { result: user, restore } = await withAsyncContext(() => fetchUser())
restore() // 還原 currentInstance
const orders = await fetchOrders(user.id)
```

---

### 問題三 — Suspense 讓舊頁面延遲卸載，watch 多觸發

**情境**：文章頁有 `watch(route.params.id, fetchArticle)`，切到使用者頁時，因新頁面需要 2 秒初始化，文章頁仍 mounted，route.params 變更再度觸發 watch，多打了一次 API（流量計數異常上升）。

**Suspense 生命週期**：

```
一般路由切換：舊頁面 unmount → 新頁面 mount（一進一出）
有 Suspense：新頁面開始初始化（pending）→ 舊頁面仍 mounted → 新頁面 ready → 新頁面 active → 舊頁面 unmount
```

> [!warning] 有 Suspense 時舊頁面生命週期仍在運作
> watch 與 onUnmounted 的時機都會延後。建議在 watch 加防護條件，或在 onBeforeRouteLeave 清理副作用。Nuxt 已在框架層面處理大多數情況，但自訂的 watch 仍需注意。

---

### 問題四 — axios 在 SSR 無法使用相對路徑，改用 `$fetch`

**情境**：把 CSR 慣用的 `axios.get('/api/posts')` 搬進 Nuxt，在 SSR 階段報錯 `Invalid URL: Failed to parse URL from /api/posts`。

**原因**：相對路徑在瀏覽器可自動補上 origin，但在 Node.js 環境沒有 base URL，`/api/posts` 是無效的 URL。`axios` 不知道 base URL 是什麼，所以報錯。

**Nuxt `$fetch` 的優勢**：

基於 `ofetch`（`createFetch`）並整合 Nitro。在 SSR 階段呼叫 `$fetch('/api/posts')` 時：

```
axios（SSR）：DNS resolve → TCP → TLS → HTTP → handler fn  ❌（甚至連第一步都過不了）
$fetch（SSR）：直接 function call → handler fn              ✅（跳過所有網路層）
```

> [!tip] Nuxt 的 `$fetch` 對內部 Server Route 零網路開銷
> 當 SSR 偵測到目標是自己的 Nitro server（相對路徑的 `/api/...`），會直接轉換為 function call，不發出實際 HTTP 請求。速度比任何 HTTP client 都快，也不需要設定 baseURL。

```ts
// ❌ 在 Nuxt SSR 中使用 axios（需要自行處理 baseURL）
const { data } = await axios.get('http://localhost:3000/api/posts') // 醜且脆弱

// ✅ 直接使用 $fetch，SSR/CSR 通用
const posts = await $fetch('/api/posts')

// ✅ 搭配 useAsyncData 做 SSR 資料預取
const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))
```

### 問題五 — Memory Leak 與跨請求污染

#### Memory Leak

**情境**：使用第三方 library，在 plugin 初始化時將 model instance 推進 module-level 全域陣列。每個 request 進來都推一個，3 天後 server 記憶體耗盡崩潰。

**原因**：瀏覽器是「一個 tab = 一個 JS context」，關掉就清空。SSR server 是「一個 process 服務所有 user」，module-level 變數永遠不被 GC。

```ts
// ❌ module-level 全域，永遠累積
const models: Model[] = []

export default defineNuxtPlugin((nuxtApp) => {
  models.push(new Model()) // 每個 request 都加一個
})

// ✅ 放在 nuxtApp 中，request 結束自動釋放
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.model = new Model()
})
```

#### 跨請求污染（Cross-Request Contamination）

**情境**：AI 生成的程式碼用 module-level 變數快取第一個 request 的 user 資料，後續所有 user 拿到的都是同一份資料（電商系統所有人看到同一個電商的資訊）。

> [!warning] SSR 中禁止使用 module-level singleton 快取用戶資料
> CSR 的 singleton 很好用，SSR 裡卻是史詩級災難——它會讓所有 user 看到同一份資料，直接影響營業與資安。

**根本差異**：

| | CSR（瀏覽器） | SSR（Node.js Server） |
|---|---|---|
| JS context | 一個 tab = 一個 user | 一個 process = 所有 user |
| 全域變數生命週期 | 關閉 tab 即清空 | 長駐，所有 request 共享 |
| singleton 是否安全 | ✅ 安全 | ❌ 危險 |

---

## 💡 實務提醒

> [!tip] useFetch 對 Nuxt Server API 不走網路
> 在 SSR 階段呼叫 `useFetch('/api/...')` 時，Nuxt 會直接呼叫對應的 handler function，不發出實際的 HTTP 請求，速度比 `$fetch` 快一個數量級。內部 API 優先使用 `useFetch`。

> [!tip] `$fetch` 完整取代 axios 的理由
> `$fetch`（基於 ofetch）在 SSR/CSR 兩端通用，自動處理 base URL，且對 Nitro Server Route 做 function call 優化。在 Nuxt 專案中沒有使用 axios 的理由。

> [!tip] `<script setup>` 幫你擋掉大量 SSR 坑
> 編譯器自動處理 async context、自動 withAsyncContext，讓你少踩問題二與類似的 instance 問題。

> [!warning] AI 生成的 SSR 相關程式碼要仔細審查
> AI 訓練資料多為 CSR 範例，對 SSR 的 global state 危險性感知不足。有了本頁的背景知識，才能快速定位問題，而不是只能怪 AI。

---

## ❓ 自我檢核

- [ ] 為什麼在 SSR 的 page 裡透過 inject 呼叫 setTitle，原始碼的 `<head>` 還是空的？
- [ ] `<script setup>` 如何幫你解決 async Composition API 的 currentInstance 問題？
- [ ] 使用 Suspense 時，切換路由後舊頁面的 watch 還會觸發嗎？為什麼？
- [ ] 為什麼 axios 在 Nuxt SSR 無法使用相對路徑？`$fetch` 如何解決這個問題？
- [ ] SSR memory leak 與跨請求污染各自的根本原因是什麼？如何防範？

---

## 🔗 延伸閱讀

- [[../../../wiki/concepts/概念_Nuxt_資料獲取]]
- [[../../../wiki/concepts/概念_Nuxt_SEO_Meta]]
- [[（待補）concepts/概念_Vue_currentInstance]]
- [[（待補）concepts/概念_Vue_Suspense]]
- [[（待補）concepts/概念_ofetch]]

---

> [!note]- 原始逐字稿（折疊）
> 來源：`raw/notes/Nuxt/20260517_從入門到被開除 90% 的前端工程師都寫錯的 SSR.md`
> 為演講現場逐字稿，含大量口語與雜訊，建議直接閱讀本筆記摘要。
