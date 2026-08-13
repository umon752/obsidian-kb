---
type: note
author: ai
tags: ["nuxt/ssr", "vue/composition-api", "vue/suspense", "nuxt/fetch", "nodejs/memory", "status/draft"]
summary: "用五個案例理解 SSR 的一次性輸出、async context、Suspense、URL 與跨請求記憶體陷阱。"
sources: ["raw/notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 從入門到被開除 — 90% 前端工程師都寫錯的 SSR

## 摘要

> SSR 不是把瀏覽器搬到 server 上執行；它是在長駐、多人共用的 Node.js process 中，由外而內完成一次 HTML 輸出，再交給 client 接手。

> [!abstract] TL;DR
> 把 CSR 的直覺套到 SSR，最容易踩中五個坑：輸出不可回溯、async 後失去 Vue instance、Suspense 延遲卸載、相對 URL 無法解析，以及 singleton 跨 request 污染資料。

## 🎯 關鍵觀念

- SSR 的 HTML 由外層到內層產生，父元件送出的 HTML 不會因子元件後續修改資料而回溯更新。
- Vue 的 `currentInstance` 是暫時的全域上下文；一般 `await` 後可能變成 `null`，`<script setup>` 會透過編譯器協助保存 async context。
- Suspense 在新頁面 resolve 前可能保留舊頁面，watcher 與 lifecycle 仍可能執行。
- Node.js 沒有瀏覽器的 base URL，SSR 直接使用相對 `fetch` 或 axios URL 會得到 `Invalid URL`。
- Nuxt `$fetch` 呼叫內部 server route 時能直接執行 server function，避免多一次網路請求。
- module-level singleton 會被多個 request 共用，可能造成 memory leak、使用者資料交叉污染與權限問題。

## 🛠 實作步驟

### Step 1 — 把 SSR 視為單次輸出管線

```text
父元件 setup → 父層 HTML 產生 → 子元件 setup → 子層 HTML 產生 → 回傳整份 HTML
```

需要在初始 HTML 顯示的資料，應在正確的父層或資料獲取階段準備；不要期待子元件在 server 後段修改已送出的父層 markup。

### Step 2 — 管理 async Composition API context

`await` 前後的 Vue composable 呼叫不一定處在同一個 `currentInstance`。把需要元件上下文的註冊放在同步區段，或使用 Nuxt/Vue 已支援 async context 的寫法，不要任意在 await 後呼叫依賴 instance 的 API。

> [!warning] `defineComponent` 不會自動等同 `<script setup>`
> `<script setup>` 的編譯器會補上 async context 處理；手寫 `defineComponent` 時仍要自行確認 composable、lifecycle 與 watcher 的註冊時機。

### Step 3 — 以 Suspense 生命週期測試路由切換

在新頁面有非同步 setup 時，先記錄舊頁面的 `onMounted`、`onUnmounted` 與 watcher，再測試快速切換路由、重複切換與請求失敗。若把清理工作只放在「以為已卸載」的時間點，可能留下 socket、timer 或訂閱。

### Step 4 — 使用 SSR 可解析的 URL

```ts
// ❌ Node.js 沒有瀏覽器 base URL
await fetch('/api/posts')

// ✅ Nuxt 內部 API 優先用 $fetch
const posts = await $fetch('/api/posts')
```

若使用外部 axios，SSR 時應提供完整絕對 URL 或注入 server-side base URL；若是 Nuxt 自己的 server route，`$fetch` 通常能直接呼叫 route handler。

### Step 5 — 避免 module-level singleton

```ts
// ❌ 多個 request 共用同一份使用者狀態
const currentUser = reactive({ id: '', role: '' })

// ✅ 將狀態放在 request / app context 內，由每次請求建立
export function createRequestState() {
  return reactive({ id: '', role: '' })
}
```

Cache、store、client 與 mutable object 都要檢查生命週期；可共享的通常是不可變設定或明確隔離的快取，不是 request-specific 使用者資料。

## 🧠 類比 / 觀念釐清

> SSR server 比較像同時接待很多客人的櫃台，不是每位客人各自擁有的瀏覽器。櫃台寫出的收據不能回頭改印，客人的資料也不能放在所有人共用的抽屜。

## 💡 實務提醒

> [!warning] SSR 除錯要看 server 與 client 兩條時間線
> 同一段程式可能在 server 先跑一次、hydration 再跑一次；記錄 request id、路由、render phase 與 cleanup，才能判斷問題是在輸出、接管還是互動階段。

> [!tip] 內部 API 先確認呼叫邊界
> server route、外部 API 與 client event 的 URL 與執行環境不同；先判斷呼叫端再選 `$fetch`、完整 URL 或 client-only 操作。

> [!warning] 任何 global mutable state 都值得審查
> 即使功能測試單一使用者正常，長駐 Node process 在併發 request 下仍可能暴露跨使用者污染。

## ❓ 自我檢核

- [ ] 為什麼子元件在 SSR 後段修改父層資料，不能更新已送出的父層 HTML？
- [ ] `await` 後 `currentInstance` 可能發生什麼事？`<script setup>` 有何不同？
- [ ] Suspense 為什麼可能讓舊頁面的 watcher 仍然執行？
- [ ] SSR 使用相對 axios/fetch URL 時，為什麼會出現 `Invalid URL`？
- [ ] 哪些 singleton 狀態可能造成跨 request 污染？

## 🔖 重要引文 / 範例

> SSR 的 server 是長駐、多人共用的 Node.js process，不是瀏覽器；global state 與 singleton 在這裡都是地雷。

## 🔗 延伸閱讀

- [[entities/工具_Nuxt]]
- [[concepts/概念_Nuxt_資料獲取]]
- [[sources/Note_Nuxt SSR五大陷阱]]
