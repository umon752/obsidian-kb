---
type: concept
author: collaborative
tags: ["domain/ai", "domain/security", "topic/AI工具安全", "status/draft"]
summary: "AI Coding Agent 的通用安全規範，涵蓋 allow/ask/deny 三層權限模型、敏感檔案封鎖與網路存取限制"
sources: ["raw/AI 安全設定檔 334b9bff19ce80928529f7e31d9e2567.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 概念：AI 工具安全規範

## 定義
在使用 AI Coding Agent（如 Claude Code、Cursor）時，防止 AI 意外洩漏機密、誤操作檔案或從外部下載惡意內容的一套規範原則。

## 三層權限模型
| 層級 | 說明 | 範例 |
|------|------|------|
| `allow` | 直接執行，不需確認 | `ls`、`cat`、`grep` |
| `ask` | 執行前需人工確認 | `git push`、`npm install`、寫入檔案 |
| `deny` | 永遠封鎖，無論任何情況 | `curl`、`rm -rf`、讀取 `.env` |

## 核心守則
- 永遠不讀取或輸出 `.env`、`*.key`、`secrets/` 內容
- 安裝套件前需列出名稱等待確認（防止 typosquatting）
- `git push` 前必須人工確認
- 不得修改 `.github/`、`infra/`、`docker-compose.yml`

## 與其他概念的關係
- 應用工具：[[entities/工具_ClaudeCode]]、[[entities/工具_Cursor]]

## 相關來源
- [[sources/AI安全設定檔]]
