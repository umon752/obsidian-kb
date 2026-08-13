---
type: source
author: ai
tags: ["domain/seo", "topic/analytics", "topic/ga4", "topic/gtm", "status/draft"]
summary: "整理 Data Layer、GTM、GA4 與 Looker Studio 的分析資料流與環境管理。"
sources: ["raw/SEO/ga.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# GA4 與 GTM

## 核心要點

- 前端以 `dataLayer.push` 發送事件，GTM 依觸發條件將資料送至 GA4、Meta 或 Hotjar。
- GA4 負責頁面、事件與轉換追蹤，並可串接 BigQuery 與 Looker Studio。
- 同一 GTM container 可用 environments 區分 staging、development 與 production；production 應使用正確的追蹤 ID。
- 測試環境不應污染正式報表，可使用獨立 GA ID、環境條件或在正式程式中隱藏測試碼。

## 資料流

```
Data Layer → GTM → GA4／其他行銷工具 → Looker Studio／BigQuery
```
