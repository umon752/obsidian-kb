---
type: guide
author: collaborative
tags: ["domain/ai", "topic/cursor", "topic/安全設定", "status/draft"]
summary: "Cursor 安全設定步驟：開啟 Privacy Mode、設定 security.mdc 規則與 .cursorignore 排除敏感檔案"
sources: ["raw/AI 安全設定檔 334b9bff19ce80928529f7e31d9e2567.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 設定：Cursor 安全設定

## 前置條件
- 已安裝 Cursor
- 設定檔位置：`~/.cursor/`（全域）

## 步驟

### 1. 開啟 Privacy Mode
Settings → General → Privacy Mode → **開啟**

### 2. 建立 security.mdc 規則
路徑：`.cursor/rules/security.mdc`（可設為全域）

```
---
alwaysApply: true
---

## 安全規範
- 永遠不要讀取或輸出 .env、*.key、*.pem、secrets/ 的內容
- 永遠不要將 API Key、Token、密碼輸出到終端機或程式碼
- 安裝任何 npm/pip 套件前，列出套件名稱等待人工確認
- 不得建議使用未知或下載數極少的套件（防止 typosquatting）
- git push、資料庫 migration 前必須等待人工確認
- 不得修改 .cursor/、.github/、infra/、docker-compose.yml
```

### 3. 建立 .cursorignore
排除機密憑證、套件產物、敏感設定（詳見 `raw/AI 安全設定檔` 完整版本）。

```
.env
.env.*
secrets/
.aws/
.ssh/
node_modules/
dist/
*.sqlite
```

## 注意事項
- `.cursorignore` 為「盡力而為」，不保證完全封鎖
- Privacy Mode 確保程式碼不上傳 Cursor 伺服器訓練

## 相關工具 / 頁面
- [[entities/工具_Cursor]]
- [[concepts/概念_AI工具安全規範]]
