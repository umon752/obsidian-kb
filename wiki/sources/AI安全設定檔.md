---
type: source
author: collaborative
tags: ["domain/devtools", "domain/ai", "topic/安全設定", "status/draft"]
summary: "記錄 Claude Code 與 Cursor 的安全設定檔位置、permissions 規則、sandbox 設定與安全規範守則"
sources: ["raw/安裝/AI 安全設定檔.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# AI 安全設定檔

## 核心要點
- Claude Code 與 Cursor 皆有全域設定檔，可統一管理安全規範
- 安全規則分三層：allow（直接執行）、ask（需確認）、deny（永遠封鎖）
- sandbox 提供 OS 層隔離，網路連線僅允許白名單網域
- cursorignore 可排除敏感檔案，防止 AI 讀取憑證與機密

## 關聯頁面
- [[entities/工具_ClaudeCode]]
- [[entities/工具_Cursor]]
- [[guides/設定_ClaudeCode安全設定]]
- [[guides/設定_Cursor安全設定]]
- [[concepts/概念_AI工具安全規範]]
