---
type: guide
author: collaborative
tags: ["domain/devtools", "topic/git", "status/draft"]
summary: "Git 全域設定步驟：設定 .gitconfig 的使用者資訊與常用 alias"
sources: ["raw/Git 2b4b9bff19ce80279084d6fc40ae814e.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 設定：Git 設定檔

## 前置條件
- 已安裝 Git
- 設定檔位置：`~/.gitconfig`

## 步驟

### 1. 設定使用者資訊
```bash
git config --global user.name "Yi Chieh"
git config --global user.email "umon752@gmail.com"
```

### 2. 設定 alias
```bash
git config --global alias.st status
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.co checkout
```

### 3. 或直接編輯 ~/.gitconfig
```ini
[alias]
    st = status
    ci = commit
    br = branch
    co = checkout
[user]
    email = umon752@gmail.com
    name = Yi Chieh
```

## 相關工具 / 頁面
- [[entities/工具_Git]]
