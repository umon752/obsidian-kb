---
type: note
author: ai
tags: ["nuxt/upgrade", "nuxt/performance", "nuxt/security", "nuxt/ai", "css/unocss", "status/draft"]
summary: "整理 Nuxt2 至 Nuxt4 的升級決策、資安、效能、CSS 遷移與 Spec-Driven AI 實戰。"
sources: ["raw/notes/Nuxt/關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！

## 摘要

> 大型 Nuxt 專案的升級不是單純換語法，而是同時處理相容性、環境變數、載入效能、路由生命週期、CSS 工具與 AI 協作邊界。

> [!abstract] TL;DR
> 先做架構決策與資安隔離，再用 FOUC 防護、lazy loading、chunk split、preconnect 與壓縮改善效能，最後用規格驅動 AI 介入重構。

## 🎯 關鍵觀念

- Nuxt2 → Nuxt3 不必盲目採用相容橋接；當 vue-demi 相容性與測試成本過高時，直接重寫可能更省。
- `vite.define: { 'process.env': process.env }` 會把所有環境變數打包進前端，敏感 token 會直接暴露。
- FOUC 與效能問題通常需要組合技：critical CSS、`inlineSSRStyles`、app cloak、lazy JS、元件延遲載入、chunk split、preconnect 與壓縮。
- Nuxt4 的動態 route key 預設從 `undefined` 改為 `route.fullPath`，可能讓動態路由切換時完整銷毀與重建元件。
- WindiCSS 遷移 UnoCSS 需要檢查 breakpoint、任意值與 pseudo-element 語法，不是單純替換套件名稱。
- AI 能快速執行重構，但必須先有規格、邊界條件與驗證方式；文件是 AI 修改的約束。

## 🛠 實作步驟

### Step 1 — 將機密移到 runtimeConfig

```ts
// ❌ 不可將完整 process.env 注入前端 bundle
vite: {
  define: { 'process.env': process.env },
}

// ✅ 只公開必要設定
runtimeConfig: {
  paymentToken: '',
  public: {
    apiUrl: '',
    gaId: '',
  },
}
```

`runtimeConfig.public` 會出現在 client 可取得的內容中，金流 token、Slack webhook 與其他秘密只能放 server-only 外層 key。

### Step 2 — 建立 FOUC 防護

```ts
export default defineNuxtConfig({
  experimental: { inlineSSRStyles: true },
  app: {
    head: { htmlAttrs: { class: 'app-cloaked' } },
  },
})
```

```css
html.app-cloaked #app { opacity: 0; }
```

將 critical CSS 先載入或內嵌，等 client `onMounted` 與 `nextTick` 完成後移除 `app-cloaked`，避免 SSR HTML 已出現但 CSS chunk 尚未到達時的閃動。

### Step 3 — 讓第三方 JavaScript 按需載入

```ts
async function loadScript(src: string) {
  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)
  await new Promise<void>(resolve => { script.onload = () => resolve() })
}
```

只在支付、影音或特定互動元件 mounted 時載入第三方 SDK，不要讓每一頁都下載不需要的 jQuery 或大型套件。

### Step 4 — 延遲元件並拆分大型套件

```ts
const Serial = defineAsyncComponent(() =>
  import('@/components/Serial/index.vue')
)
```

再用 Vite `manualChunks` 將 `video.js`、`hls.js`、`swiper`、`gsap` 等大型套件獨立成 chunk；必要時改用輕量 build，降低首屏 bundle。

### Step 5 — 預連線與壓縮靜態資源

```ts
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://cdn.example.com' },
    ],
  },
},
nitro: { compressPublicAssets: true }
```

`preconnect` 不宜無限制增加，通常只保留真正影響首屏的來源；壓縮則讓 server 依 `Accept-Encoding` 回傳 gzip 或 Brotli。

### Step 6 — 處理 Nuxt4 route key 變更

```ts
definePageMeta({
  key: route => `${route.name}`,
})
```

若升級後仍需要 Nuxt3 動態路由切換時重用同一實例，可明確設定 route key；同時測試資料更新、lifecycle、快取與表單狀態是否符合預期。

### Step 7 — 盤點 WindiCSS 到 UnoCSS 語法

```ts
import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
})
```

遷移時檢查 `<sm:`/`lt-sm:`、`@lg:`/`at-lg:`、任意值中的逗號與 pseudo-element content；逐頁視覺回歸比全域取代更安全。

### Step 8 — 以 Spec-Driven Development 協作

```text
掃描舊元件 → 產出架構與邊界文件 → 閱讀新套件文件
→ 形成實作計畫 → AI 實作 → 驗證與測試
→ Code Review → 上版後更新文件
```

先讓 AI 理解現有業務邏輯、狀態、邊界條件與不可改變的原則，再要求實作；不要只給一句「幫我重構」就放任修改。

## 🧠 類比 / 觀念釐清

> `vite.define: process.env` 像把保險箱密碼印在名片上；`runtimeConfig` 則像把只有後台人員能看的密碼放在內側抽屜，只把必要的服務地址放到前台。

## 💡 實務提醒

> [!warning] 不要把 Nuxt 當高流量 REST backend
> Nuxt server 本質是 Node.js 應用；高流量、複雜交易或長時間工作應評估獨立後端服務與佇列。

> [!tip] 動態資料不存在要回 404
> 不要只在前端隱藏空內容；server 端應用 `setResponseStatus(event, 404)` 回傳正確狀態，避免 SEO 誤判頁面存在。

> [!warning] cookie 跨站共享要有監控
> 跨系統登入需處理 cookie 被刪除或竄改的情況，可從輪詢逐步改用支援度足夠的 `cookieStore` change event。

> [!tip] 文件是 AI 的邊界
> 每次新功能前先讀取現有文件，完成後同步更新使用文件、架構與重構原則，讓下一次 AI 協作有可靠上下文。

## ❓ 自我檢核

- [ ] 為什麼不能用 `vite.define` 將完整 `process.env` 注入 bundle？
- [ ] FOUC 的成因是什麼？`inlineSSRStyles` 與 app cloak 各解決哪一段？
- [ ] Nuxt4 的 route key 變更如何影響動態頁面 lifecycle？
- [ ] 哪些套件適合用 `manualChunks` 拆分？
- [ ] Spec-Driven Development 的輸入、驗證與文件更新循環是什麼？

## 🔖 重要引文 / 範例

> AI 是很強的執行者，但需要架構師提供清楚規格；沒有規格時，AI 只是在猜測需求。

## 🔗 延伸閱讀

- [[entities/工具_Nuxt]]
- [[concepts/概念_AI工具安全規範]]
- [[sources/Note_Nuxt升級與AI整合]]
