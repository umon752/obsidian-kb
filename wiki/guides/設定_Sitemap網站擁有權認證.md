---
type: guide
author: ai
tags: ["domain/frontend", "topic/seo", "topic/sitemap", "status/draft"]
summary: "透過 FTP 部署 Sitemap 與 Google 網站擁有權認證的操作步驟"
sources: ["raw/文件/Sitemap、網站擁有權認證/Sitemap、網站擁有權認證.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# 設定 — Sitemap 與網站擁有權認證

## 前置條件
- FTP 工具（FileZilla 等）
- sitemap.xml 與 Google 認證 HTML 檔案

## 步驟

1. 將 `sitemap.xml` 及 Google 認證 HTML 上傳到 FTP 根目錄 `public_html/`
2. 從 FTP 下載根目錄的 `.htaccess`
   > 隱藏檔案顯示：`⌘` + `Shift` + `.`
3. 開啟 `.htaccess`，新增允許存取的檔名
   - 格式：`.` 前加 `\`，多檔以 `|` 分隔
   - 範例：`sitemap\.xml|google12345678\.html`
4. 儲存後覆蓋上傳 `.htaccess` 到 FTP
5. 請專案人員驗證 Google 擁有權

## 相關來源
- [[sources/Sitemap網站擁有權認證]]
