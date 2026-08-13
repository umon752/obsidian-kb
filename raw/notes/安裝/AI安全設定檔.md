---
type: note
author: ai
tags: ['domain/ai', 'domain/devtools', 'topic/安全設定', 'status/draft']
summary: '整理 Claude Code、Cursor 與 Codex 的安全設定檔位置、權限規則與敏感資料保護方式'
sources: ['raw/安裝/AI 安全設定檔.md']
created: '2026-05-29'
updated: '2026-05-29'
---

# AI 安全設定檔

## 摘要

> 這份筆記整理 Claude Code、Cursor 與 Codex 的全域安全設定，重點是限制敏感檔案讀取、危險指令執行、網路下載與環境變數外洩。

> [!abstract] TL;DR
> AI Coding Agent 的安全設定應以「預設限制、敏感資料封鎖、危險操作需確認、必要時才開放寫入或網路」為核心。

## 🎯 關鍵觀念

- Claude Code、Cursor、Codex 都可以透過全域設定檔集中管理 AI 工具行為。
- 安全規則可拆成允許、詢問、禁止三層：一般讀取可放行，高風險操作需確認，敏感資料與危險刪除應封鎖。
- `.env`、金鑰、憑證、SSH、雲端服務憑證與資料庫備份都不應被 AI 讀取或輸出。
- Codex 預設可用 `read-only` sandbox，只在需要編輯時切到 `workspace-write` profile。
- 安裝套件、網路請求、git push、commit、force push、reset、clean 等操作都應要求人工確認。
- Cursor 的 `.cursorignore` 與 Codex 的 sandbox / rules 是互補機制：前者減少索引與讀取範圍，後者限制工具執行權限。

## 🛠 實作步驟

### Step 1 — 建立工具的全域安全規則

- Claude Code 可把安全規範放在 `~/.claude/CLAUDE.md` 或 `.claude/CLAUDE.md`。
- Cursor 可把全域規則放在 `.cursor/rules/security.mdc`。
- Codex 可把全域設定放在 `~/.codex/config.toml`，權限規則放在 `~/.codex/rules/default.rules`。

```md
## 安全規範

- 永遠不要讀取或修改 `.env`、`.env.*`、`secrets/` 目錄
- 永遠不要將 API 金鑰、密碼、Token 輸出到終端機或檔案
- 安裝任何 npm/pip 套件前，必須先確認來源與版本
- git push 前必須等待人工確認
- 不得使用 curl/wget 從外部下載執行檔
```

> [!warning] 全域規則不等於完全隔離
> 文字規則主要約束 AI 行為；仍應搭配 sandbox、ignore 檔與工具層 permission rules，避免只靠提示詞防護。

### Step 2 — 設定 Codex 預設為只讀

- `approval_policy = "on-request"`：只有超出權限時才詢問。
- `sandbox_mode = "read-only"`：預設只能讀檔與分析，不能直接改檔。
- `allow_login_shell = false`：避免自動載入 shell 設定與額外環境。
- `web_search = "disabled"`：關閉 Codex 內建 web search。
- `[analytics]`、`[feedback]` 設為 `false`：降低 telemetry 與回饋資料外流。

```toml
approval_policy = "on-request"
sandbox_mode = "read-only"
allow_login_shell = false
web_search = "disabled"

[analytics]
enabled = false

[feedback]
enabled = false
```

### Step 3 — 需要編輯時才切換 Codex profile

- `edit` profile 允許在 workspace 內寫檔，但不開網路。
- `edit-with-network` profile 允許 workspace 寫檔與網路，適合安裝套件、查遠端文件或抓依賴。
- `exclude_slash_tmp = true` 與 `exclude_tmpdir_env_var = true` 可避免資料寫到 sandbox 外的暫存區。

```toml
[profiles.edit]
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[profiles.edit.sandbox_workspace_write]
writable_roots = []
network_access = false
exclude_slash_tmp = true
exclude_tmpdir_env_var = true
```

> [!tip] 預設不要開網路
> 一般本地修改、重構與測試不需要網路；只有安裝依賴、讀遠端文件或呼叫 API 時，才切到可連網 profile。

### Step 4 — 用 Codex rules 管制危險指令

- `rm`、`sudo`、`printenv`、`env` 應禁止，避免刪檔、改系統或洩漏環境變數。
- `git push`、`git commit`、`git reset --hard`、`git clean -f`、`git push --force` 應要求確認。
- `npm install`、`npm uninstall`、`curl`、`wget` 應要求確認，避免未審查的套件或網路下載。

```toml
prefix_rule(
    pattern = ["rm"],
    decision = "forbidden",
    justification = "禁止直接刪除檔案，請手動執行",
)

prefix_rule(
    pattern = ["git", "push"],
    decision = "prompt",
    justification = "push 前需要確認",
)

prefix_rule(
    pattern = ["printenv"],
    decision = "forbidden",
    justification = "禁止讀取環境變數",
)
```

## 🧠 類比 / 觀念釐清

> 可以把 AI 工具安全設定想成三道門：ignore 檔先降低可見資料，sandbox 限制工具能碰到的範圍，rules 決定哪些指令能直接執行、需要確認或完全禁止。

## 💡 實務提醒

> [!tip] 先建立保守預設，再用 profile 放寬
> Codex 預設用 `read-only`，需要改檔才切 `edit`，需要網路才切 `edit-with-network`，能降低誤操作範圍。

> [!warning] 不要讓 AI 讀取完整環境變數
> `inherit = "core"` 比繼承全部環境變數安全，並且應禁止 `env`、`printenv` 這類會列出敏感資訊的指令。

> [!warning] `.cursorignore` 是盡力而為
> 它能減少 Cursor 參考或索引敏感檔案，但仍應搭配規則明確要求 AI 不讀取、不輸出金鑰與憑證。

## ❓ 自我檢核

- [ ] Codex 的預設 `sandbox_mode` 是否維持 `read-only`？
- [ ] 是否把 `~/.codex/rules/default.rules` 放在 `rules/` 目錄下？
- [ ] `.env`、金鑰、憑證、SSH 與雲端服務憑證是否已被 ignore 或 deny？
- [ ] `git push`、`git commit`、套件安裝與網路下載是否都需要人工確認？
- [ ] 是否避免繼承完整 shell 環境與 login shell？

## 🔖 重要引文 / 範例

> `~/.codex/config.toml` 可以設定 Codex 的預設模型、沙盒權限、網路權限、檔案開啟工具與環境變數繼承策略。

> `~/.codex/rules/default.rules` 可以設定 Codex 執行指令時的允許、詢問與禁止規則。

## 🔗 延伸閱讀

- [[../../../wiki/sources/AI安全設定檔]]
- [[../../../wiki/concepts/概念_AI工具安全規範]]
- [[../../../wiki/guides/設定_ClaudeCode安全設定]]
- [[../../../wiki/guides/設定_Cursor安全設定]]
