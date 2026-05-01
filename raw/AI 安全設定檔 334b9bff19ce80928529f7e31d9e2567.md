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