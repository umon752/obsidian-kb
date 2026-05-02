# AI

| 指令 | Copilot CLI | Claude Code | 功能說明 |
| --- | --- | --- | --- |
| `/help` | ✅ | ✅ | 顯示可用指令與簡要說明 |
| `/model` | ✅ | ✅ | 選擇 / 切換模型 |
| `/models` | ✅ | ❌ | 列出可用模型（Copilot 文件列出） |
| `/status` | ✅ | ✅ | 顯示狀態面板 / 狀態資訊（兩邊都有狀態面板功能） |
| `/usage` | ✅ | ✅ | 使用量 / session 統計 |
| `/cost` | ❌ | ✅ | Token / 成本統計（Claude 有） |
| `/clear` | ✅ | ✅ | 清除對話 / 開始新會話 |
| `/new` | ✅ | ❌ | 新 session（Copilot 常用別名） |
| `/compact` | ✅ | ✅ | 壓縮 / 摘要會話以節省 context |
| `/context` | ✅ | ✅ | 顯示 / 視覺化目前 context token 使用情況 |
| `/cwd` | ✅ | ✅ | 顯示目前工作目錄 |
| `/cd` | ✅ | ✅ | 變更目前工作目錄（兩者都支援 path 參數） |
| `/exit` | ✅ | ✅ | 離開互動模式 / CLI |
| `/quit` | ✅ | ❌ | Copilot 的別名（quit / exit） |
| `/resume` | ✅ | ✅ | 回復 / 切換至其他 session |
| `/rename` | ✅ | ✅ | 重新命名 session |
| `/session` | ✅ | ✅ | session 子指令（檢視 files/plan/checkpoints 等） |
| `/plan` | ✅ | ✅ | 進入或產生執行計畫（plan 模式） |
| `/review` | ✅ | ✅ | 執行 code review（Copilot 有 review agent；Claude 亦支援 review 型任務） |
| `/diff` | ✅ | ✅ | 對 repo / 變更做 diff 分析（兩邊皆支援 diff/變更檢視功能） |
| `/agent` | ✅ | ✅ | 切換 / 列出 agent（兩邊都有 agent 管理指令；語法不同） |
| `/fleet` | ✅ | ❌ | Copilot 的平行 sub-agent / fleet 模式（自動平行化） |
| `/delegate` | ✅ | ❌ | Copilot 的任務委派（自動產生 PR 等） |
| `/init` | ✅ | ✅ | 初始化專案 AI 設定（建立 template / 設定檔） |
| `/permissions` | ✅ | ✅ | 權限 / 工具 / 路徑存取管理（兩邊皆有權限管理機制） |
| `/add-dir` | ✅ | ❌ | 加入可存取的目錄（Copilot 文件列出） |
| `/allow-all` | ✅ | ❌ | 開放全部權限（Copilot 有類似快速允許權限） |
| `/list-dirs` | ✅ | ✅ | 列出允許存取的目錄 |
| `/reset-allowed-tools` | ✅ | ❌ | 重設工具 / 權限清單（Copilot 提供） |
| `/config` | ✅ | ✅ | 開啟 / 調整 CLI 設定（兩邊皆提供 config 相關功能／UI） |
| `/mcp` | ✅ | ✅ | 管理 MCP server / external prompt providers |
| `/plugin` | ✅ | ✅ | 管理 plugin / extensions（兩邊都有 plugin/hooks 擴充） |
| `/skills` | ✅ | ✅ | 管理 skills / custom commands（可建立自訂 skill/command） |
| `/memory` | ❌ | ✅ | Claude 的記憶檔 / CLAUDE.md 管理 |
| `/doctor` | ❌ | ✅ | Claude 的健康檢查工具（診斷安裝/環境） |
| `/debug` | ❌ | ✅ | 讀取 session debug log（Claude 提供） |
| `/export` | ❌ | ✅ | 匯出會話（檔案、剪貼簿等） |
| `/copy` | ❌ | ✅ | 複製最後回應 / code block |
| `/tasks` | ❌ | ✅ | 背景任務管理（Claude 提供） |
| `/todos` | ❌ | ✅ | 列出 TODO / 待辦項目（Claude 提供） |
| `/teleport` | ❌ | ✅ | 從 Web / Desktop 恢復遠端 session（Claude 提供） |
| `/desktop` | ❌ | ✅ | 交接到 Desktop app（Claude 提供） |
| `/theme` | ✅ | ✅ | UI / 主題設定 |
| `/terminal-setup` | ✅ | ✅ | 終端 / 多行輸入設定（兩邊各有 terminal UX 設定） |
| `/experimental` | ✅ | ✅ | 切換實驗性功能（有些版本/環境下可用） |
| `/feedback` | ✅ | ✅ | 提交回饋（產品回饋指令） |
| `/login` | ✅ | ✅ | 登入（兩邊皆有） |
| `/logout` | ✅ | ✅ | 登出 |
| `/user` | ✅ | ✅ | 切換 / 顯示目前使用者（GitHub 帳號 / Claude 帳號） |
| `/lsp` | ✅ | ✅ | LSP server 管理（若支援 LSP 整合） |
| `/share` | ✅ | ✅ | 分享 session（檔案、gist、連結） |
| `/rewind` | ✅ | ✅ | 回溯 / 復原會話（兩邊都有回溯/摘要功能的對應） |
| `/statusline` | ✅ | ✅ | 設定狀態列 / UI 狀態（視版本） |
| `/vim` | ✅ | ✅ | 啟用 vim 模式（若 CLI 支援） |
| `/agents` | ❌ | ✅ | Claude 的 sub-agent 管理（`/agents create/list/run/...`） |
| `/hooks` | ❌ | ✅ | Claude 的 hooks 指令（自動化 / 通知 hook） |