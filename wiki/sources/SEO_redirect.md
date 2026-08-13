---
type: source
author: ai
tags: ["domain/seo", "topic/http", "topic/redirect", "status/draft"]
summary: "整理常見 HTTP 狀態碼與 301、302、307、308 redirect 的選擇情境。"
sources: ["raw/SEO/zhuan-zhi.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Redirect 與 HTTP 狀態碼

## 核心要點

- `200` 表示正常回應；`404` 表示資源不存在；`503` 表示服務暫時無法處理請求。
- `301` 是永久轉址，`302` 是暫時轉址；選擇時應反映網址搬遷是否永久。
- `307` 與 `308` 會嚴格保留原本的 HTTP method，分別對應暫時與永久轉址。
- SEO 搬站或網址永久變更通常使用 301；短期活動或暫時流量導向才使用 302。

## 實務提醒

轉址鏈應保持短且可追蹤，並確認目的頁回應正常、避免把所有舊網址無差別導向首頁。
