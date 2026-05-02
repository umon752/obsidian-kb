# obsidian-kb 專案說明

## 這個專案是什麼？

這是一個以 **Obsidian + AI Agent** 驅動的個人知識庫。

概念很簡單：
- 你把原始筆記、文件、設定放進 `raw/`
- 請 AI Agent 執行 `ingest`，它會自動整理成結構化的 wiki 頁面
- wiki 的內容由 AI 全權維護，你只負責提供素材與方向

```
raw/        ← 你放素材的地方（唯讀，AI 不會修改這裡）
wiki/       ← AI 整理好的知識頁面（由 AI 維護）
schema.md   ← AI 的操作說明書
```

---

## Obsidian 插件

| 插件 | 用途 |
|------|------|
| **Git** (`obsidian-git`) | 自動備份、版本控制 |
| **Custom Attachment Location** (`obsidian-custom-attachment-location`) | 附件自動存到 `raw/assets/`，保持資料夾整潔 |
| **Terminal** (`terminal`) | 在 Obsidian 內開終端機，方便直接操作 |

**Chrome 擴充**
- [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf) — 從網頁直接剪藏到 `raw/`

---

## 如何維護這個專案

### 加入新素材
1. 把新的筆記或文件放進 `raw/` 對應的資料夾
2. 開啟 AI Agent（GitHub Copilot CLI 或 Claude Code 或  Codex）
3. 輸入：
   ```
   ingest /raw
   ```
4. Agent 會列出哪些檔案是新的、哪些有修改，確認後自動整理到 `wiki/`

### Agent 怎麼決定處理哪些檔案？

| 狀態 | 行為 |
|------|------|
| 新檔案（`wiki/sources/` 無對應頁） | 完整 ingest |
| 已修改（有 source 頁 + git 顯示有變更） | 列出來，等你確認是否重新 ingest |
| 未變更（有 source 頁 + git 無變更） | 直接略過，節省 token |

> 如果你修改了 `raw/` 的內容，記得先 `git add raw/` 讓 Agent 能偵測到變更。

### 查詢知識庫
直接問 Agent 問題，它會從 `wiki/` 找答案並附上來源連結。

### 健康檢查
```
lint wiki
```
Agent 會掃描 wiki 頁面，找出矛盾、孤立頁面、缺少關聯的地方，並提出修復建議。

---

## 命名規則

- `raw/` 內**檔名或資料夾名稱以 `_` 開頭**的（如本檔案 `_README.md`）會被 Agent 自動略過，不會被 ingest 成 wiki 頁面
- 這類檔案適合放說明、草稿、暫存等不需要進入知識庫的內容
