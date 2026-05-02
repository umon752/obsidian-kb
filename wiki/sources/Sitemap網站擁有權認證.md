---
type: source
author: ai
tags: ["domain/frontend", "topic/seo", "topic/sitemap", "status/draft"]
summary: "透過 FTP 部署 Sitemap 與 Google 網站擁有權認證，需修改 .htaccess 允許對應檔案存取"
sources: ["raw/文件/Sitemap、網站擁有權認證/Sitemap、網站擁有權認證.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# Sitemap、網站擁有權認證

## 核心要點
1. 將 `sitemap.xml` 及 Google 認證 HTML 上傳至 FTP 根目錄 `public_html/`
2. 下載根目錄 `.htaccess`（隱藏檔，需 `⌘` + `Shift` + `.` 顯示）
3. 在 `.htaccess` 加入對應檔名白名單（`.` 前加 `\`，多檔案用 `|` 分隔）
4. 覆蓋上傳 `.htaccess`
5. 請專案人員驗證擁有權

## 關聯頁面
- [[guides/設定_Sitemap網站擁有權認證]]
