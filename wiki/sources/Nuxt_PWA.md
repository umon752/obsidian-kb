---
type: source
author: ai
tags: ["domain/frontend", "topic/nuxt", "topic/pwa", "status/draft"]
summary: "整理 PWA 的能力、manifest 設定與導入工具，說明其適用情境。"
sources: ["raw/Nuxt/PWA.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# PWA

## 核心要點

- PWA 位於網站與原生 App 之間，可支援安裝、全螢幕、部分推播與離線快取。
- `site.webmanifest` 透過 `name`、`short_name`、`theme_color`、`background_color`、`display` 與 `icons` 描述安裝體驗。
- PWA 可改善啟動速度與回訪體驗，但不能完全取代需要深度系統整合的原生 App。
- 可用 PWA Builder、RealFaviconGenerator、Lighthouse 與 Manifest Generator 輔助製作和檢查。

## 實務建議

內部系統、活動網站與以網站為主的產品通常適合導入 PWA；應先以使用者體驗收益評估，而不是把 PWA 當成原生 App 的全面替代品。
