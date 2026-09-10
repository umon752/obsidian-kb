# Linux 指令整理

來源：雲端架構部署直播班｜2026「預習任務：熟悉 Linux 環境」

## Ubuntu 容器內的 Linux 指令

以下指令是在執行 `npm run linux` 後、進入 Ubuntu 容器時使用。

| 指令 | 用途 | 備註 |
|---|---|---|
| `whoami` | 查看目前登入的使用者 | 例如確認目前是否為 `root` |
| `hostname` | 查看目前環境的主機名稱 | 例如容器的名稱 |
| `pwd` | 查看目前所在的目錄路徑 | 顯示目前工作目錄 |
| `uname` | 查看系統資訊 | 可用來確認目前的作業系統環境 |
| `ls` | 列出目前目錄中的檔案與資料夾 | 查看目前位置有哪些檔案 |
| `date` | 查看目前時間 | 顯示系統日期與時間 |
| `history` | 查看先前執行過的指令 | 顯示目前 Shell 的指令歷史 |
| `echo 你好` | 將文字印在終端機上 | 範例輸出：`你好` |
| `echo hello world > /postbox/hello.txt` | 將 `hello world` 寫入檔案 | `>` 會建立檔案；若檔案已存在則覆寫內容 |
| `ls -l /postbox` | 以詳細格式列出 `/postbox` 的內容 | 用來確認簽到檔是否存在 |
| `cat /postbox/hello.txt` | 顯示簽到檔的內容 | 應印出 `hello world` |
| `exit` | 離開 Ubuntu 容器 | 回到本機終端機 |

### `/postbox` 路徑說明

`/postbox` 不是指令，而是從 Linux 根目錄 `/` 出發的資料夾路徑。寫入其中的 `hello.txt` 會保留，供本機後續驗收使用。

## 本機終端機的環境與驗收指令

以下指令是在本機的 W0 專案資料夾中執行，而不是在 Ubuntu 容器內執行。

| 指令 | 用途 | 預期結果或備註 |
|---|---|---|
| `node -v` | 查看 Node.js 版本 | 應為 v22 或 v24 |
| `npm run linux` | 啟動並進入 Ubuntu 24.04 容器 | 第一次執行可能會自動下載 image |
| `npm run check:docker` | 驗收 Docker 與 Ubuntu 容器環境 | 通過時顯示 `W0 DOCKER ENV READY` |
| `npm run status` | 查看 W0 任務的最終狀態 | 通過時顯示 `Docker environment PASS` 與 `W0 STATUS READY` |

Windows PowerShell 若遇到 `npm.ps1` 無法載入，將指令開頭的 `npm` 改為 `npm.cmd`，例如：

```powershell
npm.cmd run check:docker
npm.cmd run status
```

## 建議操作順序

| 步驟 | 執行位置 | 指令 |
|---:|---|---|
| 1 | 本機 W0 專案資料夾 | `node -v` |
| 2 | 本機 W0 專案資料夾 | `npm run linux` |
| 3 | Ubuntu 容器 | 執行上方的 Linux 練習指令 |
| 4 | Ubuntu 容器 | `echo hello world > /postbox/hello.txt` |
| 5 | Ubuntu 容器 | `ls -l /postbox`、`cat /postbox/hello.txt` |
| 6 | Ubuntu 容器 | `exit` |
| 7 | 本機 W0 專案資料夾 | `npm run check:docker` |
| 8 | 本機 W0 專案資料夾 | `npm run status` |

## 頁面提到的驗收狀態（非指令）

| 狀態 | 意義或處理方式 |
|---|---|
| `W0 DOCKER ENV READY` | Docker 可以正常啟動 Ubuntu 容器，且已找到簽到檔 |
| `Docker environment PASS` | Docker 環境驗收通過 |
| `W0 STATUS READY` | W0 與 Linux 環境已準備完成 |
| `DOCKER_IMAGE_MISSING` | 找不到 Ubuntu 24.04 image；先執行 `npm run linux` |
| `DOCKER_POSTBOX_EMPTY` | `/postbox/hello.txt` 不存在或內容為空；重新建立簽到檔 |
| `DOCKER_NOT_FOUND` | 找不到 Docker 指令；確認已安裝 Docker Desktop |
| `DOCKER_DAEMON_UNREACHABLE` | Docker Desktop 尚未啟動 |
| `DOCKER_CONTAINER_RUN_FAILED` | Ubuntu 容器啟動測試失敗；保留完整錯誤訊息並回報 |
| `MISSING` | 尚未取得 Docker 驗收結果；執行 `npm run check:docker` |
| `INVALID / RETRY` | 驗收結果未通過或格式不符；重新執行驗收 |
| `W0 STATUS NOT READY` | Docker 環境尚未通過驗收 |
| `NODE_VERSION_UNSUPPORTED` | Node.js 版本不支援；改用 v22 或 v24 |
