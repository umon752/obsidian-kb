---
type: guide
author: ai
tags: ["domain/devtools", "topic/git", "topic/協作流程", "status/draft"]
summary: "團隊 Git 開發協作流程 SOP：新案建立、分支管理、進後端前後作業步驟"
sources: ["raw/文件/Git 開發協作流程/Git 開發協作流程.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# 設定 — Git 開發協作流程

## 前置條件
- GitLab 帳號與專案存取權限
- 本機安裝 XAMPP / MAMP 開發環境

## 分支規範
- `master`：正式站（從 release merge）
- `release`：測試站（從 dev merge）
- `dev`：主開發分支（所有人 push 到此）
- 統一使用 **merge** 合併

## 新案建立步驟

### 1. GitLab 建立數據庫
```
Project name：專案名稱
Project URL：選擇 NSDI 團隊
Visibility Level：Internal
```

### 2. 建立本地專案
```bash
git clone https://sweb.div.tw:30000/nsdi/front-template.git
# 將資料夾改為專案名稱，刪除 .git，將 .vscode 加入 .gitignore
```

### 3. First Commit
```bash
git init
git remote add origin https://sweb.div.tw:30000/nsdi/你的專案.git
git add .
git add -f .gitignore
git commit -m "Initial commit"
git push -u origin master
```

### 4. 建立分支
```bash
git branch release && git checkout release && git push origin release
git branch dev && git checkout dev && git push origin dev
```

### 5. 設定分支保護（GitLab UI 操作）

### 6. 日常開發
本地建立 feature 分支 → 開發完成 → merge 回 dev → `git push origin dev`

## 進後端之前
- 將專案放到 `web/_cut/`（保留乾淨切版備份）

## 進後端之後
- 引入 `.env` 檔，設定 `site_base_url`、資料庫連線
- 確認 `.htaccess` 根目錄設定正確

## 注意事項
- 避免前後端資料結構重疊：切版檔放在 `cut/` 資料夾內開發
- 掉圖：從 `7` 拉 `/datas/logs` 回本地
- cache 錯誤：在 `/datas/` 建立 `cache` 資料夾並設定可讀寫權限

## 相關工具
- [[entities/工具_Git]]
- [[sources/Git開發協作流程]]
