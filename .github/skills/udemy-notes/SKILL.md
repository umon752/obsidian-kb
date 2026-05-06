---
name: udemy-notes
description: Convert Udemy course subtitle files (.srt/.vtt/plain text transcripts) into Obsidian-style study notes in Traditional Chinese, with YAML frontmatter, TL;DR callout, key concepts, practical tips, self-check questions, wiki links between lessons, and a folded original translation at the bottom. Use when the user has a subtitle or transcript file in an Udemy course directory and asks to translate, summarize, make notes from it, or "幫我把字幕變成筆記".
---

# Udemy 字幕 → Obsidian 筆記

## 用途

把 Udemy 課程字幕檔轉成一份結構化、可複習的 Obsidian 筆記（繁體中文）。

## 何時觸發

- 使用者有 `.srt`、`.vtt` 或純文字的字幕/逐字稿，位於類似 `.../Udemy/<課程>/` 的目錄
- 使用者說「翻譯 + 總結」、「做成筆記」、「變成 .md」、「整理字幕」等
- 使用者提到「Udemy」「字幕」「逐字稿」「課程筆記」

## 工作流程

### Step 1 — 定位字幕檔

- 預設在當前工作目錄（cwd）搜尋 `.srt` / `.vtt` / 無副檔名的 SRT 格式文字檔
- 若使用者指定檔案則以指定的為準

### Step 2 — 推斷 lesson 編號與標題

依序嘗試：

1. 使用者已明說編號 → 直接用
2. 掃描同目錄的 `N. Xxx.md` 檔案，取最大值 +1 作為候選
3. 從字幕內容/檔名推斷標題
4. 無法判斷就問使用者

### Step 3 — 讀字幕、翻譯、整理

- **翻譯成繁體中文（zh-TW）**，技術詞彙保留英文並加中文括號註解，例如 `hydration（水合）`、`template（模板）`
- **移除 SRT 的時間戳記與行號**，整理為通順段落
- 按 Template 結構產出（見下一節）

### Step 4 — 命名與輸出

- 檔名：`{N}. {Title}.md`
- 位置：與字幕檔同目錄
- 若檔案已存在先詢問是否覆蓋

### Step 5 — 串接上下課

- Frontmatter 的 `prev` 填前一課的 wiki link（若存在）
- 若能推斷下一課主題，在「延伸閱讀」段落先預留佔位
- 課程資訊從目錄推斷：`.../Udemy/<course>/` → `course: <course>`

## 筆記格式（必填結構）

完整模板見 `template.md`，要點：

```markdown
---
course: <從路徑推斷>
section: <若已知>
lesson: <N>
title: <英文原標題>
tags: [<technology>/<subtopic>, ...]
status: 已完成
date: <YYYY-MM-DD>
source: Udemy
prev: '[[前一課]]' # 若存在
next: '[[下一課]]' # 若已知
---

> [!abstract] TL;DR
> 一句話總結這堂課到底在教什麼。

## 🎯 關鍵觀念

- 條列 3–6 個核心重點

## 🛠 / 📂 / 🧠 （依內容調整）

- 步驟、對應表、類比、程式碼範例

## 💡 實務提醒

> [!tip] ...
> [!warning] ...

## ❓ 自我檢核

- [ ] 3 題左右，幫助日後複習

## 🔗 延伸閱讀

- 上一課 → [[N-1. ...]]
- 下一課 → [[N+1. ...]]
- 官方文件連結（若能確認 URL）

---

> [!note]- 📎 原文字幕翻譯（參考用，點擊展開）
>
> <整段翻譯，每行前面加 `>` 讓 callout 能正確折疊>
```

## 風格守則

1. **翻譯放最後且預設折疊**（使用 `> [!note]-` 的 `-`），讓筆記聚焦在重點而非逐字稿
2. **Callout 優先**於純標題區塊，視覺更突出
3. **程式碼範例一定附語言標示**（` ```vue `、` ```ts ` 等），確保 Obsidian 高亮
4. **Mermaid 圖只在能簡化理解時才畫**，簡單步驟用條列即可
5. **Tags 用巢狀寫法**：`nuxt/routing` 而非 `nuxt-routing`，方便 Obsidian 分層篩選
6. **不要為了填欄位而編造內容**。自我檢核題、實務提醒若字幕沒提到就略過或留空
7. **勿在 Obsidian 連結中使用未確認存在的檔名**：若下一課標題未知，用 `[[下一課（待補）]]` 佔位

## 需要與使用者確認的時機

- 無法判斷 lesson 編號
- 目錄下已有同名檔案（詢問是否覆蓋）
- 字幕內容太短或不完整（詢問是否仍要生成）
- 課程 section/章節名稱從路徑推不出來

## 執行前的檢查清單

- [ ] 字幕檔實際存在並可讀
- [ ] 確認了 lesson 編號與標題
- [ ] 輸出檔名遵循 `N. Title.md` 格式
- [ ] 翻譯段落已折疊到最底
- [ ] Frontmatter 所有欄位都有值或刻意留空

## 相關資源

- template 檔：本 skill 目錄下的 `template.md`
