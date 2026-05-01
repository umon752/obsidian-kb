---
type: entity
author: collaborative
tags: ["domain/ai", "topic/claude", "topic/ClaudeCode", "status/draft"]
summary: "Anthropic 開發的 AI Coding Agent，可在終端機內操作檔案與執行指令，透過 settings.json 與 CLAUDE.md 管理行為與安全規則"
sources: ["raw/AI 安全設定檔 334b9bff19ce80928529f7e31d9e2567.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 工具：Claude Code

## 簡介
Anthropic 開發的 AI Coding Agent，在終端機內直接操作檔案、執行指令、呼叫工具。

## 設定檔位置
| 檔案 | macOS | Windows |
|------|-------|---------|
| 全域設定 | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` |
| 全域規則 | `~/.claude/CLAUDE.md` | `%USERPROFILE%\.claude\CLAUDE.md` |
| 全域指令集 | `~/.claude.json` | `%USERPROFILE%\.claude.json` |
| 全域規則目錄 | `~/.claude/rules/` | `%USERPROFILE%\.claude\rules\` |

## 相關來源
- [[sources/AI安全設定檔]]

## 相關概念
- [[concepts/概念_AI工具安全規範]]

## 相關指南
- [[guides/設定_ClaudeCode安全設定]]
