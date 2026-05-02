---
type: source
author: ai
tags: ["domain/devtools", "topic/git", "topic/協作流程", "status/draft"]
summary: "團隊 Git 開發協作流程：三分支規範（master/release/dev）、commit 格式、GitLab issue 管理與標籤說明"
sources: ["raw/文件/Git 開發協作流程/Git 開發協作流程.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# Git 開發協作流程

## 核心要點

### 分支規範
- `master`：正式站，從 release merge 後 push
- `release`：測試站，從 dev merge 後 push
- `dev`：主開發分支，所有人在此分支開發後 merge push
- 統一使用 `merge` 合併（不 rebase）

### Commit 格式
`[類型] 動詞開頭的簡易描述（≤50字）`

| 類型 | 說明 |
|------|------|
| feature | 新增/修改功能或頁面 |
| fix | 修 bug |
| refactor | 重構、整理、修文案 |
| style | 格式調整（不影響執行） |
| update | 需求變更修改 |
| perf | 效能改善 |
| docs | 文件、註解 |

### Issue 管理
- 切版修改統一建立一個 issue，內容用回覆方式列出
- 已修正：✅ / 確認無誤：👍 / 確認有誤：❌
- 標籤：Bug、High/Medium/Low（緊急程度）、SIT/UAT/PRO（環境）

## 關聯頁面
- [[entities/工具_Git]]
- [[guides/設定_Git開發協作流程]]
