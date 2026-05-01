---
type: entity
author: collaborative
tags: ["domain/ai", "topic/cursor", "status/draft"]
summary: "AI-first 程式碼編輯器，內建 AI 補全與對話，透過 .cursor/rules/ 與 .cursorignore 管理安全規則"
sources: ["raw/AI 安全設定檔 334b9bff19ce80928529f7e31d9e2567.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 工具：Cursor

## 簡介
AI-first 程式碼編輯器，支援 AI 補全、對話與程式碼生成。

## 設定檔位置
| 類型 | macOS | Windows |
|------|-------|---------|
| 主要設定目錄 | `~/Library/Application Support/Cursor` | `%APPDATA%\Cursor` |
| 規則與 CLI | `~/.cursor/` | `%USERPROFILE%\.cursor\` |

## 安全設定
- Privacy Mode 建議開啟（Settings → General）
- 安全規則放於 `.cursor/rules/security.mdc`（可設為全域）
- `.cursorignore` 排除敏感檔案

## 相關來源
- [[sources/AI安全設定檔]]

## 相關概念
- [[concepts/概念_AI工具安全規範]]

## 相關指南
- [[guides/設定_Cursor安全設定]]
