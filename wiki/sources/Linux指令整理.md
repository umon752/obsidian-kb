---
type: source
author: ai
tags: ["domain/devops", "topic/linux", "topic/docker", "status/draft"]
summary: "整理 Linux 指令、Ubuntu 容器操作與 Docker 環境驗收流程"
sources: ["raw/AWS/linux-commands.md"]
created: "2026-09-10"
updated: "2026-09-10"
---

# Linux 指令整理

## 核心要點

- Ubuntu 容器內可用 `whoami`、`hostname`、`pwd`、`uname`、`ls`、`date`、`history`、`echo` 與 `cat` 確認環境及檔案內容；以 `exit` 離開容器。
- `npm run linux` 會從本機進入 Ubuntu 24.04 container；`/postbox/hello.txt` 是容器與本機之間的驗收檔案。
- 本機使用 `node -v` 確認 Node.js 版本，再以 `npm run check:docker` 與 `npm run status` 驗收 Docker/W0 環境。
- Windows PowerShell 若無法載入 `npm.ps1`，可改用 `npm.cmd` 執行相同的 npm scripts。

## 建議驗收流程

1. 在本機執行 `node -v`，確認版本為 v22 或 v24。
2. 執行 `npm run linux` 並進入 Ubuntu container。
3. 建立 `/postbox/hello.txt`，用 `ls -l` 與 `cat` 確認檔案存在且內容正確。
4. 執行 `exit` 回到本機，再執行 `npm run check:docker` 與 `npm run status`。

## 常見驗收狀態

- `W0 DOCKER ENV READY`、`Docker environment PASS`、`W0 STATUS READY`：環境已通過對應階段驗收。
- `DOCKER_IMAGE_MISSING`：先執行 `npm run linux` 取得 Ubuntu 24.04 image。
- `DOCKER_POSTBOX_EMPTY`：重新建立 `/postbox/hello.txt` 並確認內容不為空。
- `DOCKER_NOT_FOUND` 或 `DOCKER_DAEMON_UNREACHABLE`：確認已安裝並啟動 Docker Desktop。

## 關聯頁面

- [[sources/Docker]]
- [[entities/工具_Docker]]
