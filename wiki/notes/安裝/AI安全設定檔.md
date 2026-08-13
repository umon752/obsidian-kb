---
type: note
author: ai
tags: ["ai/security", "ai/claudecode", "ai/cursor", "ai/codex", "workflow/permissions", "status/draft"]
summary: "以預設限制、機密封鎖與高風險確認管理 Claude Code、Cursor 與 Codex 的安全邊界。"
sources: ["raw/notes/安裝/AI安全設定檔.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# AI 安全設定檔

## 摘要

> AI Coding Agent 的安全設定應先限制可見資料與可執行範圍，再對必要的寫入、網路與高風險指令要求人工確認。

> [!abstract] TL;DR
> 用 ignore 降低資料暴露、用 sandbox 限制檔案與網路、用 allow/ask/deny rules 管理指令，並將 `.env`、金鑰與憑證視為不可讀取資料。

## 🎯 關鍵觀念

- Claude Code、Cursor 與 Codex 都能以全域或專案設定集中管理 agent 行為，但文字規則不等於真正隔離。
- 權限可分成 allow、ask、deny：一般唯讀可放行，高風險操作需確認，機密讀取與危險刪除應禁止。
- `.env`、API key、SSH key、雲端憑證、資料庫備份與 secrets 目錄不應被 agent 讀取、輸出或提交。
- Codex 可預設 `read-only`，需要修改時才切到 `workspace-write`；網路權限另應使用更嚴格的 profile。
- Cursor 的 `.cursorignore` 減少索引與參考範圍，Codex sandbox 與 rules 則限制工具的實際能力，三者互補。
- `git push`、`git commit`、force push、reset、clean、套件安裝與網路下載都應保留人工確認。

## 🛠 實作步驟

### Step 1 — 建立各工具的安全規則

- Claude Code：可在 `~/.claude/CLAUDE.md` 或專案 `.claude/` 放置規範。
- Cursor：使用 `.cursor/rules/security.mdc` 與 `.cursorignore`。
- Codex：使用 `config.toml` 管理 sandbox/profile，使用 rules 檔管理指令決策。

```md
## 安全規範

- 不讀取或修改 `.env`、`.env.*`、`secrets/`
- 不輸出 API key、密碼、token 或憑證
- 安裝套件前確認來源與版本
- `git push` 前等待人工確認
- 不使用外部下載執行檔的指令
```

> [!warning] 文字規則不是完全隔離
> 若只靠 prompt 或 Markdown 規則，agent 仍可能因工具權限而接觸資料；應同步設定 sandbox、ignore 與執行權限。

### Step 2 — 讓 Codex 預設唯讀

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

唯讀模式適合檢查、搜尋與分析；需要改檔時才明確切換 profile，不要把可寫入當成預設能力。

### Step 3 — 依工作建立受限 profile

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

一般本地修改使用 edit profile；安裝依賴、查遠端文件或呼叫 API 才使用另有 network access 的 profile，並在完成後切回較保守設定。

### Step 4 — 以 rules 管制高風險指令

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

除了 `rm` 與環境變數列印，也應審查 `sudo`、`env`、`curl`、`wget`、套件安裝、`git reset --hard` 與 `git clean` 等命令。

### Step 5 — 定期檢查資料與權限邊界

確認 ignore 規則涵蓋機密檔案，確認 sandbox writable roots 沒有過寬，確認 rules 的 prompt/forbidden 決策與團隊流程一致，並在實際任務中測試 agent 是否真的被攔截。

## 🧠 類比 / 觀念釐清

> 安全設定像三道門：ignore 先減少 agent 看得到的資料，sandbox 限制能碰到的範圍，rules 再決定指令是放行、詢問或禁止。

## 💡 實務提醒

> [!tip] 先保守，再逐步放寬
> 預設 read-only、需要時才開 workspace write、只有必要時才開 network，能把錯誤操作的爆炸半徑降到最低。

> [!warning] 不要繼承完整 shell 環境
> login shell、`env` 與 `printenv` 可能暴露 token 或 credential；環境繼承應採最小集合，而不是整份使用者環境。

> [!warning] `.cursorignore` 不是安全保證
> 它主要減少索引與參考，仍要以 sandbox、rules 與人工審核保護真正的機密。

## ❓ 自我檢核

- [ ] Codex 的預設 sandbox 是否為 `read-only`？
- [ ] `.env`、金鑰、SSH、雲端憑證與資料庫備份是否已被 ignore 或 deny？
- [ ] 哪些操作應該 prompt，哪些操作應該 forbidden？
- [ ] 修改檔案與使用網路是否使用不同 profile？
- [ ] 是否避免 login shell 與完整環境變數繼承？

## 🔖 重要引文 / 範例

> 預設限制、必要時開放，是比預設全開再事後補救更可靠的 agent 權限策略。

## 🔗 延伸閱讀

- [[concepts/概念_AI工具安全規範]]
- [[entities/工具_ClaudeCode]]
- [[entities/工具_Cursor]]
- [[sources/AI安全設定檔]]
