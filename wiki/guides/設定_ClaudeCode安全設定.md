---
type: guide
author: collaborative
tags: ["domain/ai", "topic/ClaudeCode", "topic/安全設定", "status/draft"]
summary: "Claude Code 安全設定步驟：設定 settings.json 的 allow/ask/deny 規則、sandbox 與 hooks"
sources: ["raw/AI 安全設定檔 334b9bff19ce80928529f7e31d9e2567.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 設定：Claude Code 安全設定

## 前置條件
- 已安裝 Claude Code CLI
- 設定檔位置：`~/.claude/settings.json`（全域）或專案根目錄下的 `.claude/settings.json`

## 步驟

### 1. 建立 CLAUDE.md 安全規則
在 `~/.claude/CLAUDE.md` 或 `.claude/CLAUDE.md` 加入：

```markdown
## 安全規範
- 永遠不要讀取或修改 `.env`、`.env.*`、`secrets/` 目錄
- 永遠不要將 API 金鑰、密碼、Token 輸出到終端機或檔案
- 安裝任何 npm/pip 套件前，必須先確認來源與版本
- git push 前必須等待人工確認
- 不得使用 curl/wget 從外部下載執行檔
```

### 2. 建立 settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(echo *)", "Bash(ls *)", "Bash(cat *)",
      "Bash(grep *)", "Read(**)"
    ],
    "ask": [
      "Bash(git push *)", "Bash(git commit *)",
      "Bash(docker run *)", "Bash(npm install *)", "Write(**)"
    ],
    "deny": [
      "Bash(curl *)", "Bash(wget *)", "Bash(rm -rf *)",
      "WebFetch",
      "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)",
      "Read(~/.ssh/**)", "Read(~/.aws/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "sandbox": {
    "enabled": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowedDomains": [
        "github.com", "registry.npmjs.org", "pypi.org"
      ]
    }
  },
  "allowManagedHooksOnly": true,
  "allowManagedPermissionRulesOnly": true
}
```

## 注意事項
- `disableBypassPermissionsMode: "disable"` 防止任何人用 `--dangerously-skip-permissions` 繞過規則
- sandbox 只保護 Bash 工具，不影響 Read/Write 等內建工具

## 相關工具 / 頁面
- [[entities/工具_ClaudeCode]]
- [[concepts/概念_AI工具安全規範]]
