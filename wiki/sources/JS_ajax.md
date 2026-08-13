---
type: source
author: ai
tags: ["domain/javascript", "topic/ajax", "topic/api", "status/draft"]
summary: "比較 AJAX 查詢使用 GET query 與 POST body 的情境、URL 狀態同步與錯誤處理"
sources: ["raw/JS/ajax.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# AJAX：GET 與 POST 傳參

## 核心要點

- `fetch()` 範例包含 spinner、`res.ok` 錯誤檢查、JSON 解析、成功／失敗處理與 `finally` 收尾。
- GET 將查詢參數放在 URL，適合商品列表、搜尋、分頁與可分享狀態，也利於瀏覽器／CDN 快取。
- POST 將複雜或敏感資料放在 body，適合多條件篩選、內部管理查詢與需要驗證的資料。
- GET 互動可搭配 `history.pushState`、`popstate`、debounce 與 UI 狀態同步。
- 選擇原則：可分享、需前進後退或 SEO 的查詢用 GET；複雜且不需暴露狀態的查詢用 POST。

