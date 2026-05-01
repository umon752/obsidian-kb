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
