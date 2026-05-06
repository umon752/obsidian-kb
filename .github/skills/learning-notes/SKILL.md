---
name: learning-notes
description: 從 raw/notes/ 的學習素材（影片逐字稿、筆記文字檔）產出結構化學習單，存放至 wiki/notes/。Use when the user runs `gn notes`, `gn notes <path>/`, `gn notes <path>/<title>.md`, or mentions「產出筆記」「建立筆記」「生筆記」「create notes」「generate notes」with a file or folder in raw/notes/.
---

# learning-notes Skill

從 `raw/notes/` 的素材，依照 template 結構提煉摘要、核心概念與實作步驟，產出學習單至 `wiki/notes/`（路徑鏡像 `raw/notes/`）。

## 何時觸發

- 使用者執行 `gn notes`、`gn notes <子路徑>/`、`gn notes <子路徑>/<標題>.md`
- 使用者說「產出筆記」、「建立筆記」、「生筆記」、「create notes」、「generate notes」，且有指定 `raw/notes/` 下的檔案或資料夾

## Workflow：單檔產出

1. **檢查路徑**：確認目標檔案在 `raw/notes/` 下，且檔名與所在資料夾名稱不以 `_` 開頭；否則停止並說明原因
2. **讀取 template**：讀取 `.github/skills/learning-notes/references/template.md` 取得結構
3. **讀取素材**：讀取指定的 raw 文字檔全文
4. **計算輸出路徑**：`raw/notes/<子路徑>/<標題>.md` → `wiki/notes/<子路徑>/<標題>.md`
5. **提煉內容**：依 template 結構填入以下各節（見下方「輸出格式」）
6. **確認後產出**：先列出摘要與核心概念讓使用者確認方向，再寫入 `wiki/notes/...`
7. **建議衍生頁面**：若內容涉及可獨立成頁的概念或工具，列出建議，**不自動建立**，等使用者確認
8. **更新 `wiki/index.md`**：在對應分類下加入新頁面條目
9. **寫入 log**：在 `wiki/log.md` 末尾追加（見下方「Log 格式」）

## Workflow：批次產出

1. 掃描目標資料夾下所有 `.md` 檔（遞迴），排除檔名或資料夾名稱以 `_` 開頭者
2. 比對 `wiki/notes/` 下已有的頁面，將檔案分為三類：
   - **新檔案**（`wiki/notes/` 無對應頁）→ 完整產出
   - **已修改**（有對應頁，且 `git status` 顯示 `raw/notes/` 有變更）→ 列入確認清單
   - **未變更**（有對應頁，git 無變更）→ 跳過
3. 列出清單請使用者確認後依序處理
4. 每批處理完成後統一寫入 `wiki/log.md`

## 輸出格式

完整模板見 `references/template.md`

## 風格守則

1. **翻譯放最後且預設折疊**（使用 `> [!note]-` 的 `-`），讓筆記聚焦在重點而非逐字稿
2. **Callout 優先**於純標題區塊，視覺更突出
3. **程式碼範例一定附語言標示**（` ```vue `、` ```ts ` 等），確保 Obsidian 高亮
4. **Mermaid 圖只在能簡化理解時才畫**，簡單步驟用條列即可
5. **Tags 用巢狀寫法**：`nuxt/routing` 而非 `nuxt-routing`，方便 Obsidian 分層篩選
6. **不要為了填欄位而編造內容**。自我檢核題、實務提醒若字幕沒提到就略過或留空
7. **勿在 Obsidian 連結中使用未確認存在的檔名**：用 `[[（待補）]]` 佔位

## Log 格式

在 `wiki/log.md` 末尾追加：

```
## [YYYY-MM-DD] gn notes | raw/notes/... → wiki/notes/...
- 新增：<頁面名稱>
- 重點：<一句話>
```
