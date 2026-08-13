---
type: source
author: ai
tags: ["domain/ai", "domain/security", "topic/claudecode", "topic/cursor", "topic/codex", "status/draft"]
summary: "整理 Claude Code、Cursor 與 Codex 的安全規則、權限層級與機密資料防護。"
sources: ["raw/notes/安裝/AI安全設定檔.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# AI 安全設定檔

## 核心要點

- 工具權限可分為允許、詢問與拒絕；刪除、部署、外部傳輸與機密存取應提高防護等級。
- secrets 不應被 agent 讀取或寫入輸出；使用 `.cursorignore` 等忽略規則降低不必要的暴露面。
- Codex 可用 read-only sandbox、編輯權限 profile 與 rules 控制檔案操作範圍。
- 安全設定應保留人工確認的高風險操作，並定期檢查規則是否符合實際工作流程。
