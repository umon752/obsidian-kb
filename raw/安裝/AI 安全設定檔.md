# AI 安全設定檔

## Claude Code

| **檔案名稱** | **macOS 路徑** | **Windows 路徑** |
| --- | --- | --- |
| **全域設定** | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` |
| **全域規則** | `~/.claude/CLAUDE.md` | `%USERPROFILE%\.claude\CLAUDE.md` |
| **全域指令集** | `~/.claude.json` | `%USERPROFILE%\.claude.json` |
| **全域規則目錄** | `~/.claude/rules/` | `%USERPROFILE%\.claude\rules\` |

`.claude/CLAUDE.md`   `~/.claude/CLAUDE.md` 可以設定到 全域

```json
 ## 安全規範

- 永遠不要讀取或修改 `.env`、`.env.*`、`secrets/` 目錄
- 永遠不要將 API 金鑰、密碼、Token 輸出到終端機或檔案
- 安裝任何 npm/pip 套件前，必須先確認來源與版本
- git push 前必須等待人工確認
- 不得使用 curl/wget 從外部下載執行檔
```

`.claude/settings.json`  **`~/.claude.json`** 可以設定到 全域

```json
// Claude Code 安全設定檔
// 說明：這份設定採用「受管理模式」，所有規則由管理員統一控制，
// 使用者無法自行修改或繞過。
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    // ──────────────────────────────────────────────
    // 【允許清單】不需詢問、直接執行的指令
    // ──────────────────────────────────────────────
    "allow": [
      "Bash(echo *)",   // 印出文字（常用於除錯）
      "Bash(ls *)",     // 列出目錄內容
      "Bash(cat *)",    // 顯示檔案內容
      "Bash(grep *)",   // 在檔案中搜尋文字
      "Read(**)"        // 讀取任意檔案（敏感路徑已在 deny 封鎖）
    ],

    // ──────────────────────────────────────────────
    // 【詢問清單】執行前必須取得使用者確認
    // ──────────────────────────────────────────────
    "ask": [
      "Bash(git push *)",      // 推送到遠端，避免誤推錯誤程式碼
      "Bash(git commit *)",    // 建立 commit，讓人確認變更內容
      "Bash(docker run *)",    // 啟動容器，可能消耗大量資源
      "Bash(npm install *)",   // 安裝套件，會修改 node_modules
      "Write(**)"              // 寫入任意檔案（避免意外覆寫）
    ],
    // ──────────────────────────────────────────────
    // 【封鎖清單】無論如何都不允許執行
    // ──────────────────────────────────────────────
    "deny": [
      // --- 網路下載：防止偷偷從外部抓資料或執行腳本 ---
      "Bash(curl *)",
      "Bash(wget *)",

      // --- 危險刪除指令：防止誤刪整個目錄 ---
      "Bash(rm -rf *)",

      // --- 封鎖 Claude 內建的網頁瀏覽工具 ---
      "WebFetch",

      // --- 敏感設定檔：環境變數、金鑰、憑證 ---
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.*)",

      // --- 本機 SSH 與 AWS 憑證，絕對不能洩漏 ---
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      
      "Read(**/docker-compose*.yml)",
      "Read(**/config/database.yml)"
    ],

    // 禁止使用「略過所有權限」的模式（即 --dangerously-skip-permissions 旗標）
    // 設為 "disable" 代表連管理員都無法開啟這個逃生門
    "disableBypassPermissionsMode": "disable"
  },

  // ──────────────────────────────────────────────
  // 【沙盒設定】OS 層級隔離，為 Bash 指令提供額外保護
  //  說明：macOS 使用 Seatbelt、Linux 使用 bubblewrap
  //  沙盒只保護 Bash 工具，不影響 Read/Write 等內建工具
  // ──────────────────────────────────────────────
  "sandbox": {
    "enabled": true,
    "allowUnsandboxedCommands": false,  // 不允許任何指令跳出沙盒執行

    // 沙盒內可以連線的外部網域白名單（僅限套件下載）
    "network": {
      "allowedDomains": [
        "github.com",
        "registry.npmjs.org",
        "registry.yarnpkg.com",
        "pypi.org"
      ]
    }
  },

  // 只允許由管理員集中管理的 hooks（防止使用者塞入惡意 hook）
  "allowManagedHooksOnly": true,

  // 只允許由管理員集中管理的權限規則（防止使用者自行新增 allow 規則）
  "allowManagedPermissionRulesOnly": true,
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/check-dangerous-commands.sh"
          }
        ]
      }
    ]
  }
}
```

## Cursor 設定

| **作業系統** | **主要設定檔目錄 (Settings & Profiles)** | **核心配置與 CLI 配置** |
| --- | --- | --- |
| **macOS** | `~/Library/Application Support/Cursor` | `~/.cursor/` |
| **Windows** | `%APPDATA%\Cursor` | `%USERPROFILE%\.cursor\` |

| 設定 | 建議值 | 路徑 |
| --- | --- | --- |
| Privacy Mode | **開啟** | Settings → General |

`.cursor/rules/security.mdc` 可以設定到全域

```json
---
alwaysApply: true
---

## 安全規範

- 永遠不要讀取或輸出 .env、*.key、*.pem、secrets/ 的內容
- 永遠不要將 API Key、Token、密碼輸出到終端機或程式碼
- 安裝任何 npm/pip 套件前，列出套件名稱等待人工確認
- 不得建議使用未知或下載數極少的套件（防止 typosquatting）
- git push、資料庫 migration 前必須等待人工確認
- 不得修改 .cursor/、.github/、infra/、docker-compose.yml
```

`.cursorignore` （盡力而為）可以設定到全域

```json
# ==============================
# 機密與憑證
# ==============================
.env
.env.*
.env.local
.env.*.local
*.pem
*.key
*.p12
*.pfx
*.cer
*.crt
secrets/
credentials/
**/secrets/**
**/credentials/**

# 雲端服務憑證
.aws/
.gcp/
.azure/
**/serviceAccountKey.json
*credentials*.json
*service-account*.json

# SSH / GPG
.ssh/
*.id_rsa
*.id_ed25519
*_rsa
*_ed25519

# ==============================
# 套件與建構產物（避免索引膨脹）
# ==============================
node_modules/
**/node_modules/
dist/
build/
out/
.next/
.nuxt/
.output/
coverage/
*.min.js
*.min.css

# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
env/
*.egg-info/

# ==============================
# 日誌與暫存
# ==============================
*.log
logs/
*.tmp
*.cache
.DS_Store
Thumbs.db

# ==============================
# 資料庫與備份
# ==============================
*.sqlite
*.sqlite3
*.db
*.sql
*.dump
*.bak
backups/

# ==============================
# IDE / 工具設定（個人偏好，不給 AI 參考）
# ==============================
.vscode/
.idea/
*.swp
*.swo
```

## Codex 設定

| **檔案名稱** | **macOS 路徑** | **Windows 路徑** |
| --- | --- | --- |
| **全域設定** | `~/.codex/config.toml` | `%USERPROFILE%\.codex\config.toml` |
| **權限規則** | `~/.codex/rules/default.rules` | `%USERPROFILE%\.codex\rules\default.rules` |

`~/.codex/config.toml` 可以設定 Codex 的預設模型、沙盒權限、網路權限、檔案開啟工具與環境變數繼承策略。

```toml
# ===========================
# Codex global config
# ===========================

# 預設使用的模型
model = "gpt-5.5"

# 當 Codex 需要超出 sandbox 權限時才詢問
# 例如：寫入受限位置、需要網路、執行需要額外權限的指令
approval_policy = "on-request"

# 預設只讀模式
# 可以讀檔、分析、執行不寫檔的指令，但不能直接改檔
sandbox_mode = "read-only"

# 開啟檔案時使用 Cursor
file_opener = "cursor"

# 隱藏 agent reasoning
hide_agent_reasoning = true

# 不載入 login shell
# 避免自動讀取 .zshrc / .zprofile / direnv 等環境設定
allow_login_shell = false

# 關閉 Codex 內建 web search
# 注意：這不一定會停用已啟用 plugin/connector 的受控讀取能力
web_search = "disabled"


# ===========================
# Privacy / telemetry
# ===========================

[analytics]
enabled = false

[feedback]
enabled = false


# ===========================
# Shell environment
# ===========================

[shell_environment_policy]

# 繼承核心環境變數
# 比 inherit = "all" 安全，避免把太多 token/API key 帶進 Codex
# 但也不硬寫 PATH 白名單，讓常見 CLI 比較容易被找到
inherit = "core"

# 保留 Codex 預設排除規則
# 通常會避免繼承一些敏感或不建議暴露的環境變數
ignore_default_excludes = false


# ===========================
# Default workspace-write sandbox settings
# ===========================
# 這段是 workspace-write 模式的預設細節
# 預設不會用到，除非某個 profile 切到 workspace-write

[sandbox_workspace_write]

# 不額外開放其他可寫目錄
# workspace-write 本身會允許目前 workspace/project 的可寫範圍
writable_roots = []

# 預設不允許網路
network_access = false

# 不開放 /tmp
# 避免工具把資料寫到 sandbox 外的暫存區
exclude_slash_tmp = true

# 不使用 TMPDIR 指向的外部暫存目錄
exclude_tmpdir_env_var = true


# ===========================
# Profile: edit
# 允許改專案，但不開網路
#
# 使用方式：
# codex --profile edit
# ===========================

[profiles.edit]

# 需要超出權限時才詢問
approval_policy = "on-request"

# 允許在 workspace/project 範圍內寫檔
sandbox_mode = "workspace-write"

[profiles.edit.sandbox_workspace_write]

# 不額外開放其他可寫目錄
writable_roots = []

# 不允許網路
# 適合一般本地修改、重構、跑不需要下載依賴的測試
network_access = false

# 不開放 /tmp
exclude_slash_tmp = true

# 不使用 TMPDIR 指向的外部暫存目錄
exclude_tmpdir_env_var = true


# ===========================
# Profile: edit-with-network
# 允許改專案，並允許網路
#
# 使用方式：
# codex --profile edit-with-network
# ===========================

[profiles.edit-with-network]

# 需要超出權限時才詢問
approval_policy = "on-request"

# 允許在 workspace/project 範圍內寫檔
sandbox_mode = "workspace-write"

[profiles.edit-with-network.sandbox_workspace_write]

# 不額外開放其他可寫目錄
writable_roots = []

# 允許網路
# 適合安裝套件、讀取遠端文件、呼叫 API、抓取依賴等任務
network_access = true

# 不開放 /tmp
exclude_slash_tmp = true

# 不使用 TMPDIR 指向的外部暫存目錄
exclude_tmpdir_env_var = true
```

`~/.codex/rules/default.rules` 可以設定 Codex 執行指令時的允許、詢問與禁止規則。

```toml
# ===========================
# 檔案刪除保護
# ===========================

prefix_rule(
    pattern = ["rm"],
    decision = "forbidden",
    justification = "禁止直接刪除檔案，請手動執行",
)

# ===========================
# Git 危險操作
# ===========================

prefix_rule(
    pattern = ["git", "reset", "--hard"],
    decision = "prompt",
    justification = "hard reset 會丟失變更，需要確認",
)

prefix_rule(
    pattern = ["git", "clean", "-f"],
    decision = "prompt",
    justification = "會刪除未追蹤的檔案，需要確認",
)

prefix_rule(
    pattern = ["git", "push", "--force"],
    decision = "prompt",
    justification = "force push 有風險，需要確認",
)

prefix_rule(
    pattern = ["git", "push"],
    decision = "prompt",
    justification = "push 前需要確認",
)

prefix_rule(
    pattern = ["git", "commit"],
    decision = "prompt",
    justification = "commit 前需要你確認內容",
)

# ===========================
# 套件管理
# ===========================

# 安裝套件前問你，避免裝到不必要或有風險的東西
prefix_rule(
    pattern = ["npm", "install"],
    decision = "prompt",
    justification = "安裝套件前需要確認",
)

prefix_rule(
    pattern = ["npm", "uninstall"],
    decision = "prompt",
    justification = "移除套件前需要確認",
)

# ===========================
# 伺服器 / 系統層級操作
# ===========================

# 禁止動到系統設定
prefix_rule(
    pattern = ["sudo"],
    decision = "forbidden",
    justification = "禁止使用 sudo，避免影響系統",
)

# 禁止用 curl / wget 下載執行未知腳本
prefix_rule(
    pattern = ["curl"],
    decision = "prompt",
    justification = "發出網路請求前需要確認",
)

prefix_rule(
    pattern = ["wget"],
    decision = "prompt",
    justification = "下載檔案前需要確認",
)

# ===========================
# 環境變數相關
# ===========================

# 禁止印出環境變數
prefix_rule(
    pattern = ["printenv"],
    decision = "forbidden",
    justification = "禁止讀取環境變數",
)

prefix_rule(
    pattern = ["env"],
    decision = "forbidden",
    justification = "禁止列出環境變數",
)

# ===========================
# GitHub CLI
# ===========================

# pr / issue 操作需要確認
prefix_rule(
    pattern = ["gh", "pr", "merge"],
    decision = "prompt",
    justification = "merge PR 前需要確認",
)

prefix_rule(
    pattern = ["gh", "pr", "close"],
    decision = "prompt",
    justification = "關閉 PR 前需要確認",
)

prefix_rule(
    pattern = ["gh", "issue", "close"],
    decision = "prompt",
    justification = "關閉 issue 前需要確認",
)

prefix_rule(
    pattern = ["gh", "release", "create"],
    decision = "prompt",
    justification = "建立 release 前需要確認",
)

# 讀取操作（view、list）讓 Codex 自由查，不需要限制
```
