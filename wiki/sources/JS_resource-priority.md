---
type: source
author: ai
tags: ["domain/frontend", "topic/performance", "topic/resource-loading", "status/draft"]
summary: "整理瀏覽器資源下載優先度，以及 preload、preconnect、prefetch、defer、async 的差異"
sources: ["raw/JS/liu-lan-qi-xia-zai-zi-yuan-de-you-xian-du.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 瀏覽器資源下載優先度

## 核心要點

- 素材將資源優先度概略分為 HTML／CSS／Fonts、部分 script 與 viewport 影像、一般 script、async script／圖片／媒體，以及最低優先的 prefetch 或有問題的 CSS。
- `preload` 需正確指定 `as`，必要時設定 `crossorigin`，避免資源重複下載。
- `preconnect` 提前建立連線，`dns-prefetch` 只預先解析 DNS，`prefetch` 則準備未來可能用到的資源。
- `defer` 與 `async` 都能避免同步阻塞，但執行順序與適用情境不同。

