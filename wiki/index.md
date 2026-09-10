# Wiki Index

> 這是 LLM Wiki 的內容目錄，由 LLM 維護。每次 ingest 新來源後更新此檔。
> 查詢前請先讀此檔，找到相關頁面後再深入閱讀。

---

## Entities（實體頁面）
人物、組織、產品、工具等具體事物。

| 頁面 | 摘要 |
|------|------|
| [[entities/工具_ClaudeCode]] | Anthropic 的 AI Coding Agent，透過 settings.json 管理行為與安全規則 |
| [[entities/工具_Cursor]] | AI-first 程式碼編輯器，透過 .cursor/rules/ 管理安全規則 |
| [[entities/工具_VSCode]] | Microsoft 輕量程式碼編輯器，高度可擴充 |
| [[entities/工具_Git]] | 分散式版本控制工具，透過 .gitconfig 設定 |
| [[entities/工具_Homebrew]] | macOS 套件管理工具 |
| [[entities/工具_nvm]] | 跨平台 Node.js 版本管理工具 |
| [[entities/工具_Figma]] | 網頁設計協作工具，設計稿共享與 Dev Mode |
| [[entities/工具_Laravel]] | PHP MVC 框架，Blade 模板引擎 |
| [[entities/工具_Docker]] | 以容器封裝應用程式與依賴的開發與部署工具 |
| [[entities/工具_Nuxt]] | Vue 全端框架，提供 SSR、路由、SEO 與 Nitro server |

---

## Concepts（概念頁面）
想法、術語、理論、框架等抽象概念。

| 頁面 | 摘要 |
|------|------|
| [[concepts/概念_AI工具安全規範]] | AI Coding Agent 的 allow/ask/deny 三層權限模型與安全守則 |
| [[concepts/概念_TypeScript_Utility Types]] | Pick、Omit、Partial、Record 等 TS 工具型別對照表與選用決策 |
| [[concepts/概念_Nuxt_資料獲取]] | `$fetch` vs `useFetch` vs `useAsyncData` 選用決策流程與常見陷阱 |
| [[concepts/概念_Nuxt_SEO_Meta]] | `useSeoMeta` vs `useServerSeoMeta` 比較與 SEO Meta 最佳實踐 |
| [[concepts/概念_BEM命名規範]] | CSS BEM 命名法：Block、Element、Modifier 結構 |
| [[concepts/概念_弱點掃描CSP規範]] | CSP meta 設定與前端弱點掃描合規要點 |
| [[concepts/概念_無障礙設計規範]] | WCAG 無障礙設計原則與前端實作要點 |
| [[concepts/概念_網頁設計規範]] | 前端切版與設計稿執行的基本規範原則 |

---

## Sources（來源摘要）
每篇原始素材對應一份摘要頁。

| 頁面 | 來源類型 | 摘要 |
|------|----------|------|
| [[sources/AI安全設定檔]] | guide | Claude Code 與 Cursor 安全設定檔位置與規則 |
| [[sources/Chrome擴充]] | guide | 個人常用 Chrome 擴充套件清單 |
| [[sources/Git設定]] | guide | .gitconfig alias 與使用者資訊 |
| [[sources/VSCode設定]] | guide | VS Code Settings、Extensions、MCP 與 Snippets |
| [[sources/管理工具軟體]] | guide | macOS/Windows 套件管理工具對照 |
| [[sources/快捷鍵_AI工具]] | reference | AI 工具快捷鍵整理（Claude Code、Cursor） |
| [[sources/快捷鍵_Figma]] | reference | Figma 常用快捷鍵與操作技巧 |
| [[sources/快捷鍵_VSCode]] | reference | VS Code 快捷鍵整理 |
| [[sources/快捷鍵_終端機]] | reference | macOS 終端機快捷鍵與指令 |
| [[sources/快捷鍵_一般]] | reference | 跨平台通用快捷鍵整理 |
| [[sources/CSS文字外框]] | snippet | CSS 純文字外框效果技巧 |
| [[sources/CodingStyleGuide]] | standard | 前端 Coding Style 規範（HTML/CSS/JS） |
| [[sources/Git開發協作流程]] | guide | 團隊 Git 分支策略與開發協作 SOP |
| [[sources/其他雜項]] | reference | 雜項開發筆記 |
| [[sources/Sitemap網站擁有權認證]] | guide | Sitemap 部署與 Google 網站擁有權認證 |
| [[sources/各服務Guideline]] | reference | 各外部服務的開發注意事項 |
| [[sources/弱點掃描規範]] | standard | 前端弱點掃描合規清單與 CSP 設定 |
| [[sources/無障礙注意事項]] | standard | 無障礙設計實作要點（WCAG） |
| [[sources/網頁設計基本指南]] | guide | 前端切版與設計執行基本規範 |
| [[sources/自訂規範]] | standard | 專案自訂 CSS/JS 規範 |
| [[sources/CSS語法]] | reference | CSS 語法備忘錄 |
| [[sources/LaravelBlade語法]] | reference | Laravel Blade 模板語法整理 |
| [[sources/PHP語法]] | reference | PHP 語法備忘錄 |
| [[sources/字符]] | reference | 常用特殊字符對照表 |

### 2026-08-13 批次匯入

| 頁面 | 來源類型 | 摘要 |
|------|----------|------|
| [[sources/Codex常用]] | guide | Codex 常用指令與工作流程 |
| [[sources/ChromeDevToolsMCP]] | reference | Chrome DevTools MCP 與瀏覽器除錯整合 |
| [[sources/Cursor Memory Bank]] | guide | Cursor Memory Bank 的上下文記憶與專案規範 |
| [[sources/Figma MCP]] | guide | Figma MCP 的設計稿與程式碼協作方式 |
| [[sources/MCP模型上下文協定]] | reference | MCP 的工具、資源與模型上下文協定概念 |
| [[sources/CSS_attr]] | reference | CSS `attr()` 讀取 HTML 屬性值 |
| [[sources/CSS_backdrop]] | reference | CSS backdrop filter 與背景效果 |
| [[sources/CSS_border-image]] | reference | CSS border-image 邊框圖片設定 |
| [[sources/CSS_box-shadow]] | reference | CSS box-shadow 陰影語法與效果 |
| [[sources/CSS_columns]] | reference | CSS 多欄版面配置 |
| [[sources/CSS_counter]] | reference | CSS counter 自動編號 |
| [[sources/CSS_display]] | reference | CSS display 顯示模式與版面行為 |
| [[sources/CSS_grid]] | reference | CSS Grid 網格版面配置 |
| [[sources/CSS_has]] | reference | CSS `:has()` 父層條件選擇器 |
| [[sources/CSS_hyphens]] | reference | CSS hyphens 文字斷字控制 |
| [[sources/CSS_inset]] | reference | CSS inset 簡寫定位屬性 |
| [[sources/CSS_min-max-clamp]] | reference | CSS min、max、clamp 響應式尺寸 |
| [[sources/CSS_oklch]] | reference | CSS oklch 色彩函數 |
| [[sources/CSS_overflow-behavior]] | reference | CSS overflow 行為與捲動控制 |
| [[sources/CSS_overflow-wrap]] | reference | CSS overflow-wrap 長字串換行 |
| [[sources/CSS_resize]] | reference | CSS resize 可調整尺寸控制 |
| [[sources/CSS_scroll-snap]] | reference | CSS scroll snap 捲動吸附 |
| [[sources/CSS_text-wrap]] | reference | CSS text-wrap 文字換行策略 |
| [[sources/CSS_transition-behavior]] | reference | CSS transition-behavior 離散屬性轉場 |
| [[sources/CSS_white-space]] | reference | CSS white-space 空白與換行行為 |
| [[sources/CSS_word-break]] | reference | CSS word-break 斷字規則 |
| [[sources/Docker]] | guide | Docker 容器、映像與常用工作流程 |
| [[sources/GEO_Agentic Browsing與llms.txt]] | reference | Agentic browsing 與 `llms.txt` 的 GEO 應用 |
| [[sources/GEO_生成式引擎優化]] | reference | 生成式引擎優化與 AI 可引用內容 |
| [[sources/GEO_PageSpeed分數與AI引用]] | reference | PageSpeed 指標與 AI 引用的關聯 |
| [[sources/HTML_inert]] | reference | HTML `inert` 停用互動與 focus |
| [[sources/HTML_selectedcontent]] | reference | HTML selectedcontent 與原生 select 客製化 |
| [[sources/JS_ajax]] | reference | AJAX 非同步請求與資料更新 |
| [[sources/JS_variable-naming]] | standard | JavaScript 變數命名原則 |
| [[sources/JS_encapsulation]] | concept | JavaScript 封裝與模組邊界 |
| [[sources/JS_functional-programming]] | concept | JavaScript 函數式程式設計概念 |
| [[sources/JS_copy]] | reference | JavaScript 淺拷貝、深拷貝與結構化複製 |
| [[sources/JS_iterable]] | reference | JavaScript iterable 與 iterator 協定 |
| [[sources/JS_resource-priority]] | reference | JavaScript 與瀏覽器資源優先級 |
| [[sources/JS_event-loop]] | concept | JavaScript event loop 與非同步執行 |
| [[sources/JS_storage]] | reference | Web Storage 與瀏覽器資料保存 |
| [[sources/JS_design-principles]] | standard | JavaScript 設計原則與可維護性 |
| [[sources/JS_event]] | reference | DOM event 與事件處理 |
| [[sources/JS_page-lifecycle]] | reference | 網頁生命週期與頁面事件 |
| [[sources/JS_rendering-modes]] | concept | CSR、SSR、SSG 與混合渲染模式 |
| [[sources/JS_searchParams]] | reference | URLSearchParams 查詢參數操作 |
| [[sources/JS_SOLID]] | concept | JavaScript SOLID 設計原則 |
| [[sources/JS_performance]] | guide | JavaScript 效能分析與優化 |
| [[sources/JS_types-and-operators]] | reference | JavaScript 型別與運算子 |
| [[sources/JS_algorithm]] | reference | JavaScript 演算法與資料處理 |
| [[sources/JS_prototype]] | concept | JavaScript prototype 與繼承 |
| [[sources/JS_project-architecture]] | guide | JavaScript 專案架構與模組分層 |
| [[sources/Nuxt_PWA]] | guide | PWA 能力、manifest 設定與導入工具 |
| [[sources/Nuxt_debug]] | guide | Nuxt 產生型別清理與 VS Code 除錯 |
| [[sources/Nuxt_robots-and-canonical]] | guide | Nuxt robots 與 canonical 的配置分工 |
| [[sources/Nuxt_template-base]] | guide | Nuxt 模板工具鏈與目錄基礎設定 |
| [[sources/Nuxt_template-header]] | guide | 後端選單驅動 Nuxt Header 的實作模式 |
| [[sources/React_dispatch]] | reference | React dispatch 與狀態更新流程 |
| [[sources/React_hook]] | concept | React Hooks 使用規則與設計 |
| [[sources/React_JSX]] | reference | React JSX 語法與轉譯概念 |
| [[sources/React_component]] | concept | React component 拆分與組合 |
| [[sources/React_router]] | guide | React Router 路由管理 |
| [[sources/React_tanstack]] | guide | TanStack 工具在 React 專案的應用 |
| [[sources/React_useContext]] | reference | React `useContext` 共用狀態 |
| [[sources/React_useEffect]] | reference | React `useEffect` 副作用管理 |
| [[sources/React_useId]] | reference | React `useId` 唯一識別值 |
| [[sources/React_useImperativeHandle]] | reference | React `useImperativeHandle` 命令式介面 |
| [[sources/React_memo-hooks-performance]] | guide | React memo、Hooks 與效能優化 |
| [[sources/React_useReducer]] | reference | React `useReducer` 複雜狀態管理 |
| [[sources/React_useRef]] | reference | React `useRef` 保存值與 DOM 參照 |
| [[sources/React_useState]] | reference | React `useState` 基礎狀態管理 |
| [[sources/SEO_JSON-LD]] | reference | JSON-LD 與 Schema.org 結構化資料 |
| [[sources/SEO_GA]] | guide | Data Layer、GTM、GA4 與報表資料流 |
| [[sources/SEO_Schema]] | reference | Google 結構化資料與 Schema.org 參考 |
| [[sources/SEO_duplicate-urls]] | guide | 重複網址與 canonical 收錄策略 |
| [[sources/SEO_redirect]] | guide | HTTP 狀態碼與 redirect 選擇 |
| [[sources/TS_from-JS-to-TS]] | guide | JavaScript 遷移 TypeScript 的方法 |
| [[sources/TS_packages]] | reference | TypeScript 套件與型別宣告 |
| [[sources/TS_config]] | guide | `tsconfig` 專案編譯與檢查設定 |
| [[sources/TS_Zod]] | reference | Zod schema 與 TypeScript 驗證 |
| [[sources/TS_import-JS]] | guide | TypeScript 專案匯入 JavaScript |
| [[sources/TS_global-types]] | reference | TypeScript global types 宣告 |
| [[sources/TS_Node-types]] | reference | Node.js 型別與 TypeScript |
| [[sources/TS_basics]] | reference | TypeScript 基礎型別與型別系統 |
| [[sources/Note_Skill實戰教學]] | note | Skill 設計、漸進揭露與評估導向維護 |
| [[sources/Note_Nuxt3高效入門全攻略]] | note | Nuxt 3 目錄、SSR、資料獲取與部署 |
| [[sources/Note_Socket即時資料治理]] | note | 多分頁 Socket 與即時資料一致性治理 |
| [[sources/Note_Nuxt SSR五大陷阱]] | note | Nuxt SSR 五個常見陷阱與修正方向 |
| [[sources/Note_Vue3響應式系統]] | note | Vue 3 effect、依賴追蹤與效能設計 |
| [[sources/Note_Nuxt升級與AI整合]] | note | Nuxt 升級、效能優化與 Spec-Driven AI |
| [[sources/Note_TypeScript實戰課]] | note | TypeScript 型別思維與 Vue 整合 |
| [[sources/Note_AI安全設定檔]] | note | AI 工具權限、sandbox 與機密資料防護 |
| [[sources/無障礙_AccessKey與SkipLink]] | standard | AccessKey、Skip Link 與鍵盤無障礙 |
| [[sources/課程_用Figma打造絕佳UIUX]] | course | Figma、UI 與 UX 課程入口與學習素材 |

---

### 2026-09-10 本次匯入

| 頁面 | 來源類型 | 摘要 |
|------|----------|------|
| [[sources/Linux指令整理]] | reference | Linux 指令、Ubuntu 容器與 Docker 環境驗收流程 |

---

## Guides（設定 / 操作指南）

| 頁面 | 摘要 |
|------|------|
| [[guides/設定_ClaudeCode安全設定]] | Claude Code settings.json 安全規則設定步驟 |
| [[guides/設定_Cursor安全設定]] | Cursor Privacy Mode、security.mdc 與 .cursorignore 設定 |
| [[guides/設定_Git設定檔]] | .gitconfig 使用者資訊與 alias 設定 |
| [[guides/設定_Chrome擴充套件]] | 個人 Chrome 擴充套件清單與分類 |
| [[guides/設定_VSCode_基本設定]] | VS Code settings.json 核心設定（Sass、Emmet、Prettier 等） |
| [[guides/設定_VSCode_Extensions]] | VS Code Extensions 完整清單 |
| [[guides/設定_VSCode_Snippets]] | VS Code 自訂 Snippets 索引（JS / Sass / Vue） |
| [[guides/設定_Git開發協作流程]] | 團隊 Git 分支策略與協作 SOP（GitLab、dev/release/master） |
| [[guides/弱點掃描前端規範]] | 前端弱點掃描合規 SOP：CSP 設定、nonce 加入、禁用項目清單 |
| [[guides/設定_Sitemap網站擁有權認證]] | Sitemap 部署與 Google 網站擁有權認證（FTP 操作） |
| [[guides/CSS_文字外框技巧]] | CSS 純文字外框效果的幾種實作方式比較 |

---

## Notes（學習單）

| 頁面 | 摘要 |
|------|------|
| [[notes/AI/Skill 實戰教學，從製作到維護的完整指南]] | 把個人執行邏輯與領域判斷轉移給 agent，建立可觸發、穩定且可維護的 skill |
| [[notes/安裝/AI安全設定檔]] | 以預設限制、機密封鎖與高風險確認管理 AI coding agent 安全邊界 |
| [[notes/Nuxt/Nuxt3 高效入門全攻略]] | 從 Nuxt 3 目錄與 SSR 出發，掌握資料獲取、SEO、狀態管理、Server API 與部署基礎 |
| [[notes/Nuxt/關於我開發大人網站的那些大小事！從 Nuxt 的升級到 Ai 整合全記錄！]] | 整理 Nuxt2 至 Nuxt4 的升級決策、資安、效能、CSS 遷移與 Spec-Driven AI 實戰 |
| [[notes/Nuxt/Socket 即時資料治理]] | 以連線所有權、跨分頁協調與錯峰更新降低即時系統成本 |
| [[notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計]] | 用 effect、track、trigger 與動態依賴清理理解 Vue 3 響應式更新 |
| [[notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維]] | 從型別推論、unknown、泛型與 Utility Types 建立 TypeScript 與 Vue 3 型別思維 |
| [[notes/Nuxt/從入門到被開除 90% 的前端工程師都寫錯的 SSR]] | 用五個案例理解 SSR 的一次性輸出、async context、Suspense、URL 與跨請求記憶體陷阱 |

---

## Queries（查詢結果）
值得保存的問答、分析、比較表等。

| 頁面 | 摘要 |
|------|------|
| _(尚無頁面)_ | |

---

## Special
| 頁面 | 說明 |
|------|------|
| [[overview]] | 整體知識庫的高層次綜述 |
| [[log]] | 操作紀錄（ingest / query / lint） |
