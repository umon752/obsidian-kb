---
type: note
author: ai
tags: ['nuxt', 'nuxt/upgrade', 'nuxt/performance', 'nuxt/security', 'nuxt/ai', 'unocss', 'status/draft']
summary: '大型 Nuxt 專案從 Nuxt2 升 Nuxt3 再到 Nuxt4 的實戰紀錄，涵蓋跨站登入、效能優化、資安地雷、UnoCSS 遷移與 AI 輔助重構'
sources: ['raw/notes/Nuxt/關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！.pdf']
created: '2026-05-10'
updated: '2026-05-10'
---

# 關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！

## 摘要

> Mike 以實際運營的成人內容平台為案例，分享 Nuxt2 → Nuxt3 → Nuxt4 升級過程中的真實決策、踩坑與解法，並帶入 AI 輔助開發的落地流程。

> [!abstract] TL;DR
> 大型專案升級不只是換語法，更是一連串架構決策：不用 vue-demi、善用 runtimeConfig 避免資安漏洞、以效能優化組合技提升載入速度、再以 Spec-Driven Development 讓 AI 安全介入重構。

## 🎯 關鍵觀念

- **升級不盲從**：Nuxt2 → Nuxt3 當時 vue-demi 橋接方案相容性問題多、測試成本高，選擇直接重寫成本反而更低
- **資安地雷**：`vite.define: { 'process.env': process.env }` 會把所有環境變數打包進前端 bundle，敏感 token 直接裸奔
- **效能優化是組合技**：單一手段效果有限，需同時處理 JS 按需載入、元件延遲載入、大包拆分、preconnect、靜態壓縮
- **FOUC 問題根源**：SSR HTML 先到但 CSS chunk 還在下載，需要 critical CSS + `inlineSSRStyles` + `app-cloaked` 三管齊下
- **Nuxt4 動態路由破壞性變更**：預設 `key` 從 `undefined` 改為 `route.fullPath`，動態路由切換時元件會完整銷毀重建
- **AI 開發不能省規格**：「規格書先行 → AI 實作 → 驗證邏輯 → 更新文件」的 Spec-Driven 循環，是讓 AI 安全介入大型專案的關鍵

## 🛠 實作步驟

### Step 1 — 修補資安漏洞：停用 vite.define process.env

```ts
// ❌ 危險！所有 env 變數都會打包進前端
// nuxt.config.ts
vite: {
  define: { 'process.env': process.env }
}
```

```ts
// ✅ 正確做法：改用 runtimeConfig 區分前後端
// nuxt.config.ts
runtimeConfig: {
  payToken: '',       // server only → NUXT_PAY_TOKEN
  slackToken: '',     // server only → NUXT_SLACK_TOKEN
  public: {
    apiUrl: '',       // client + server → NUXT_PUBLIC_API_URL
    gaId: '',         // client + server → NUXT_PUBLIC_GA_ID
  }
}
```

> [!warning] 任何敏感 token 絕對不能放 public
> `runtimeConfig.public` 的值最終會出現在前端 HTML 中，金流 token、Slack webhook 等一律放外層（server-only）

### Step 2 — 防止 FOUC（無樣式閃動）

```ts
// nuxt.config.ts
vite: {
  build: { cssCodeSplit: true },
},
css: [
  '~/assets/css/critical.css',  // reset + FOUC 防護
  '~/assets/css/style.css',
],
experimental: {
  inlineSSRStyles: true,        // critical CSS 內嵌進 HTML，零延遲
}
app: {
  head: {
    htmlAttrs: { class: 'app-cloaked' },
  },
}
```

```css
/* critical.css */
html.app-cloaked #app { opacity: 0; }
```

```ts
// app.vue 或 layouts/default.vue
onMounted(async () => {
  await nextTick()
  document.documentElement.classList.remove('app-cloaked')
})
```

### Step 3 — JS 按需載入（第三方 SDK）

```ts
// ❌ 每頁都載入 jQuery（即使不需要）
head: { script: [{ src: '/js/jquery.min.js', async: true }] }

// ✅ 只在需要時動態載入
const dynamicScript = (path: string) => {
  const script = document.createElement('script')
  script.src = path
  document.head.appendChild(script)
  return new Promise(resolve => { script.onload = () => resolve(script) })
}

// 在金流元件 onMounted 時才載入
await dynamicScript('/js/jquery.min.js')
```

### Step 4 — 元件延遲載入 + 大包拆分

```ts
// 非首屏元件延遲載入
const Serial = defineAsyncComponent(() => import('@/components/Serial/index.vue'))
const GiftGive = defineAsyncComponent(() => import('@/components/Gift/index.vue'))
```

```ts
// nuxt.config.ts — 大型套件獨立成 chunk
vite: {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('video.js'))    return 'vendor-videojs'
          if (id.includes('hls.js'))      return 'vendor-hls'
          if (id.includes('swiper'))      return 'vendor-swiper'
          if (id.includes('gsap'))        return 'vendor-gsap'
          if (id.includes('lottie-web')) return 'vendor-lottie'
        },
      },
    },
  },
}

// 套件輕量替代（以 lottie 為例）
resolve: {
  alias: { 'lottie-web': 'lottie-web/build/player/lottie_light.min.js' }
}
```

### Step 5 — Preconnect + 靜態資源壓縮

```ts
// nuxt.config.ts
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://your-cdn.example.com' },
      // 建議不超過 3~5 個，過多反而拖慢其他資源
    ],
  },
},
nitro: {
  compressPublicAssets: true,  // 自動產出 .gz 和 .br，server 依 Accept-Encoding 回傳
}
```

### Step 6 — Nuxt4 動態路由 key 問題修補

```ts
// Nuxt4 預設 key = route.fullPath，動態路由切換會銷毀重建
// 從 Nuxt3 升上來如果不想改行為，可在頁面加：
definePageMeta({
  key: route => `${route.name}`,  // 用 route.name 當 key，切換參數時重用同一實例
})
```

| | Nuxt 3 | Nuxt 4 |
|---|---|---|
| 預設 key | `undefined` | `route.fullPath` |
| 動態路由換參數 | 重用同一實例 | 銷毀 + 重建 |
| 生命週期 | 不觸發 mount/unmount | 完整 unmount → mount |

### Step 7 — WindiCSS → UnoCSS 遷移重點

```ts
// uno.config.ts
import { defineConfig, presetWind3 } from 'unocss'
export default defineConfig({
  presets: [presetWind3()],  // WindiCSS 相容預設
})
```

**語法差異注意：**

| WindiCSS | UnoCSS |
|---|---|
| `<sm:p-1` | `lt-sm:p-1` |
| `@lg:p-1` | `at-lg:p-1` |
| `grid-cols-[1fr,10px]` | `grid-cols-[1fr_10px]`（逗號改底線）|
| `before:content-['']` | ❌ 不支援引號，需自訂 rule |

### Step 8 — AI 輔助開發流程（Spec-Driven Development）

```
1. 掃描解析舊元件（讓 AI 理解現有業務邏輯）
2. 產出架構文件（所有狀態、業務邏輯、邊界條件）
3. 讀取新套件文件 → 透過規格書產出實作計畫
4. AI 實作
5. 驗證邏輯 + 反覆提問
6. 測試 & Code Review & 修正
7. 上版 → 更新文件（使用文件 + 重構架構 + 修改原則）
```

> [!tip] 文件是 AI 的邊界
> 每次新功能開發前，先讓 AI 讀取現有文件再動手。文件同時也是「修改絕對原則」，防止 AI 亂改核心邏輯

## 🧠 類比 / 觀念釐清

> `vite.define: process.env` 就像把辦公室保險箱密碼印在名片上發給所有人——你以為只有公司內部知道，其實任何拿到名片的人都看得到。

> Spec-Driven Development 的精髓：AI 是很強的「執行者」，但需要你當「架構師」提供清晰規格，否則 AI 只是在猜你要什麼。

## 💡 實務提醒

> [!warning] Cookie 跨站共享登入的監控機制
> 使用 `setInterval(checkCookie, 1000)` 輪詢偵測 Cookie 是否被竄改或刪除；2025 年後可改用 `window.cookieStore.addEventListener('change', ...)` 原生事件，支援度已提升

> [!warning] 不要讓 Nuxt 當後端 RESTful API
> Nuxt 的 server 本質是 Node.js，大流量下會直接出事；高流量 API 應另起專用後端服務

> [!tip] 動態路由找不到資料要回 404
> 不要只在前端隱藏內容，應在 server 端用 `setResponseStatus(event, 404)` 設定正確 HTTP status code，否則 SEO 會誤判頁面存在

> [!tip] nuxt-skill-hub
> 安裝後執行 `nuxi prepare`，自動為 Claude Code、Cursor 等 AI coding agent 生成 Nuxt 最佳實踐的 SKILL.md，幫助 AI 正確區分 Vue 與 Nuxt 的 API 差異

## ❓ 自我檢核

- [ ] `vite.define: process.env` 為什麼會造成資安問題？如何正確處理？
- [ ] FOUC 的發生原因是什麼？`inlineSSRStyles` 如何解決？
- [ ] Nuxt4 升級後動態路由的 `key` 行為改變了什麼？如何維持 Nuxt3 的行為？
- [ ] `manualChunks` 的作用是什麼？什麼樣的套件適合獨立拆分？
- [ ] Spec-Driven Development 的核心循環是什麼？

## 🔗 延伸閱讀

- [[Nuxt3 高效入門全攻略]]
- [[（待補）]] UnoCSS 完整設定指南
- [Nuxt Hydration 文件](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering)
- [setResponseStatus API](https://nuxt.com/docs/api/utils/set-response-status)
- [nuxt-skill-hub](https://nuxt-skill.onmax.me/)
- [media-chrome](https://www.media-chrome.org/)

> [!note]- 原始課程內容摘錄
> 講師：Mike 成智遠（雷麒科技 Senior Frontend Engineer）
> 場合：技術分享演講（含 Vue.js Taiwan v-conf 2026 社群公告段落）
> 技術棧演進：Nuxt2 + Vuex + WindiCSS → Nuxt3 + Pinia + UnoCSS → Nuxt4 + AI
> 平台規模：Studio（創作者）/ Admin（後台）/ Event（活動）三套系統共享登入與金流
