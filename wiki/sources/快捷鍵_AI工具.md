---
type: source
author: ai
tags: ["domain/devtools", "domain/ai", "topic/快捷鍵", "topic/CopilotCLI", "topic/ClaudeCode", "status/draft"]
summary: "Copilot CLI 與 Claude Code 的 slash 指令對照表，涵蓋 session、agent、權限、MCP 等常用指令"
sources: ["raw/快捷鍵集/AI.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# 快捷鍵 — AI 工具（Copilot CLI vs Claude Code）

## 來源資訊
- 類型：快捷鍵對照表
- 工具：GitHub Copilot CLI、Claude Code

## 核心要點

### 兩者共有指令
- `/help`、`/model`、`/status`、`/usage`、`/clear`、`/compact`
- `/context`、`/cwd`、`/cd`、`/exit`、`/resume`、`/rename`、`/session`
- `/plan`、`/review`、`/diff`、`/agent`、`/init`、`/permissions`、`/list-dirs`
- `/config`、`/mcp`、`/plugin`、`/skills`、`/theme`、`/terminal-setup`
- `/login`、`/logout`、`/user`、`/lsp`、`/share`、`/rewind`

### Copilot CLI 獨有
- `/models`（列出可用模型）
- `/new`（新 session 別名）
- `/fleet`（平行 sub-agent 模式）
- `/delegate`（任務委派，自動產生 PR）
- `/add-dir`、`/allow-all`、`/reset-allowed-tools`（權限管理）
- `/quit`

### Claude Code 獨有
- `/cost`（token/成本統計）
- `/memory`（CLAUDE.md 記憶管理）
- `/doctor`（環境健康檢查）
- `/debug`、`/export`、`/copy`、`/tasks`、`/todos`
- `/teleport`、`/desktop`（遠端 session 切換）
- `/agents`（sub-agent 管理）
- `/hooks`（自動化 hook）

## 關聯頁面
- [[entities/工具_ClaudeCode]]
- [[entities/工具_Cursor]]
