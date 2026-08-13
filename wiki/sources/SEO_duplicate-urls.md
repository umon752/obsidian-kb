---
type: source
author: ai
tags: ["domain/seo", "topic/url", "topic/canonical", "status/draft"]
summary: "整理片段、hashbang 與 query parameter 造成重複網址時的收錄與 canonical 策略。"
sources: ["raw/SEO/zhong-fu-wang-zhi-duplicate-urls.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Duplicate URLs

## 核心要點

- `#` 後的 fragment 通常不會被搜尋引擎當成獨立頁面收錄，內容一般仍視為同一網址。
- 舊式 hashbang `#!` 已不建議使用，可能造成爬蟲與使用者看到的網址結構混亂。
- 不同 query parameter 可能產生內容近似的多個網址，應透過 canonical、內部連結與必要的參數策略集中訊號。
- canonical 應指向內容的主要網址，且必須與頁面實際內容和可存取狀態一致。
