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

## [2026-05-07] gn notes | raw/notes/AI/Skill 實戰教學，從製作到維護的完整指南.md → wiki/notes/AI/Skill 實戰教學，從製作到維護的完整指南.md
- 新增：Skill 實戰教學，從製作到維護的完整指南
- 重點：skill 製作時機、description 三規則、執行心法優於死板 SOP、references/scripts 結構、維護策略

## [2026-05-10] gn notes | raw/notes/Nuxt/*.pdf, raw/notes/TS/*.pdf → wiki/notes/
- 新增：Nuxt3 高效入門全攻略
- 重點：Nuxt3 目錄結構、Auto Import、資料獲取三劍客、SEO Meta、runtimeConfig、MongoDB 整合
- 新增：關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！
- 重點：Nuxt2→4 升級實戰、vite.define 資安地雷、FOUC 防護、效能優化組合技、Spec-Driven AI 開發
- 新增：六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維
- 重點：型別推論優先、any vs unknown、Utility Types 組合技、泛型 API 封裝、Vue3 + TS 整合

## [2026-05-17] gn notes | raw/notes/Nuxt/20260517_從入門到被開除 90% 的前端工程師都寫錯的 SSR.md → wiki/notes/Nuxt/20260517_從入門到被開除 90% 的前端工程師都寫錯的 SSR.md
- 新增：從入門到被開除 — 90% 前端工程師都寫錯的 SSR
- 重點：SSR 渲染由外而內不可逆、async currentInstance 丟失、Suspense 延遲卸載、memory leak 與跨請求污染四大陷阱

## [2026-05-28] gn notes | raw/notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR.md → wiki/notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR.md
- 更新：從入門到被開除 — 90% 前端工程師都寫錯的 SSR（補充雲端簡報內容）
- 重點：補上問題四（axios vs $fetch：SSR 相對路徑 Invalid URL、ofetch function call 優化），修正問題計數四→五，來源路徑修正

## [2026-05-29] gn notes | raw/安裝/AI 安全設定檔.md → wiki/notes/安裝/AI安全設定檔.md
- 新增：AI安全設定檔
- 重點：整理 Claude Code、Cursor 與 Codex 的全域安全設定、sandbox、ignore 檔與權限規則

## [2026-06-14] gn notes | raw/notes/Nuxt/Socket 即時資料治理.md + .pdf → wiki/notes/Nuxt/Socket 即時資料治理.md
- 新增：Socket 即時資料治理
- 重點：realtime owner 選舉、BroadcastChannel 跨分頁協調、K 線無縫銜接、CRUD refetch storm 與後端連線政策

## [2026-06-15] gn notes | raw/notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計.md → wiki/notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計.md
- 新增：深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計
- 重點：effect 執行上下文、track/trigger、動態依賴清理、雙向鏈結串列與巢狀 effect

## [2026-08-13] ingest | raw/ → wiki/sources/（94 個新素材）
- 新增：94 個 source 頁面，涵蓋 AI、CSS、Docker、GEO、HTML、JavaScript、Nuxt、React、SEO、TypeScript、notes、無障礙與課程
- 新增關聯頁面：[[entities/工具_Docker]]、[[entities/工具_Nuxt]]
- 更新：[[wiki/index]]、Figma、AI 工具安全、Nuxt、TypeScript 與無障礙相關頁面的來源連結
- 略過：24 個已存在且未修改的 source 對應；檔名或資料夾以 `_` 開頭的 raw 素材未納入
- 重點：完成本次確認清單的批次匯入，並以 source 頁保留每個原始素材的精簡摘要與精確來源路徑

## [2026-08-13] gn notes | raw/notes/ → wiki/notes/（8 個學習單）
- 新增：8 份學習單，鏡像至 `wiki/notes/` 的 AI、Nuxt、TS 與安裝子路徑
- 更新：[[wiki/index]] 的 Notes 索引
- 保留：`wiki/notes 1/` 未納入處理，避免將錯誤命名資料夾當成正式輸出來源
- 重點：整理 Skill、Nuxt、Socket、SSR、Vue 3 響應式、TypeScript 與 AI 安全設定的摘要、實作步驟與自我檢核

## [2026-09-10] ingest | raw/ → wiki/sources/
- 新增：[[sources/Linux指令整理]]
- 更新：[[sources/Git設定]]（`raw/安裝/Git.md` 已修改）
- 更新：[[wiki/index]]
- 略過：113 個未變更素材，以及 4 個檔名或資料夾以 `_` 開頭的素材
- 重點：補充 Linux 指令、Ubuntu container 與 Docker 環境驗收流程，並同步 Git source 的更新日期
