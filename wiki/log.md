# Log

> Append-only 操作紀錄。每次 ingest、query、lint 後由 LLM 在此新增一筆。
> 格式：`## [YYYY-MM-DD] <操作類型> | <標題>`
> 可用 `grep "^## \[" log.md` 快速列出所有紀錄。

---

_(紀錄從此開始)_

## [2026-05-01] ingest | raw/ 初次批次匯入（5 份 Notion 設定型筆記）
- 新增 sources：AI安全設定檔、Chrome擴充、Git設定、VSCode設定、管理工具軟體
- 新增 entities：工具_ClaudeCode、工具_Cursor、工具_VSCode、工具_Git、工具_Homebrew、工具_nvm
- 新增 concepts：概念_AI工具安全規範
- 新增 guides：設定_ClaudeCode安全設定、設定_Cursor安全設定、設定_Git設定檔、設定_Chrome擴充套件、設定_VSCode_基本設定、設定_VSCode_Extensions、設定_VSCode_Snippets
- 重點：5 份 Notion 匯出的開發工具設定筆記，歸類為 19 頁 wiki，author: collaborative

## [2026-05-02] ingest | raw/ 批次匯入（19 個新檔案）
- 新增 sources：快捷鍵_AI工具、快捷鍵_Figma、快捷鍵_VSCode、快捷鍵_終端機、快捷鍵_一般、CSS文字外框、CodingStyleGuide、Git開發協作流程、其他雜項、Sitemap網站擁有權認證、各服務Guideline、弱點掃描規範、無障礙注意事項、網頁設計基本指南、自訂規範、CSS語法、LaravelBlade語法、PHP語法、字符
- 新增 entities：工具_Figma、工具_Laravel
- 新增 concepts：概念_BEM命名規範、概念_弱點掃描CSP規範、概念_無障礙設計規範、概念_網頁設計規範
- 新增 guides：設定_Git開發協作流程、弱點掃描前端規範、設定_Sitemap網站擁有權認證、CSS_文字外框技巧
- 更新 sources 路徑：AI安全設定檔、Chrome擴充、Git設定、VSCode設定、管理工具軟體（hash 路徑 → raw/安裝/）
- 更新 entities：工具_VSCode（+快捷鍵來源）、工具_Git（+協作流程來源與指南）
- 重點：前端開發工具快捷鍵、CSS 技巧、Git 協作、弱點掃描、無障礙、設計規範、Laravel 語法
