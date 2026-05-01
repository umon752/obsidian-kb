# Obsidian 筆記 RAG 知識庫格式指南

> 核心原則：格式設計要對「切塊（Chunking）」友善，讓每個 chunk 切割後語意仍完整。

---

## 一、Frontmatter 結構

每篇筆記頂部使用以下 YAML frontmatter：

```yaml
---
title: 筆記標題
aliases: [別名1, 別名2]
tags: [領域/子領域, 類型]
created: 2025-01-01
updated: 2025-04-22
source: https://...           # 來源連結（若有）
status: draft | review | stable  # 穩定度，決定是否納入索引
lang: zh-TW
summary: 一句話摘要，直接當作 chunk 的 metadata description
---
```

### `summary` 欄位的重要性

`summary` 可以直接作為這份文件的代表向量，顯著提升召回率。建議每篇筆記都填寫，控制在 1～2 句話內。

---

## 二、標籤分類系統

良好的標籤結構可在查詢時限縮搜尋範圍，提升精準度。

```
tags:
  - domain/ai/rag          # 領域樹狀結構（可多層）
  - type/concept           # 筆記類型（見下方說明）
  - project/知識庫專案      # 專案維度（選填）
```

### 建議的 `type` 值

| type 值 | 說明 |
|---|---|
| `type/concept` | 概念定義、知識說明 |
| `type/how-to` | 操作步驟、實作指南 |
| `type/reference` | 速查表、對照表 |
| `type/log` | 會議記錄、學習日誌 |
| `type/fleeting` | 臨時想法、待整理草稿 |

`type` 標籤在 RAG 查詢時可用來過濾，例如只在 `how-to` 類型中搜尋操作步驟。

---

## 三、正文格式規範

### 3-1. 每個 H2 段落要能獨立成立

每個 H2 區塊是 RAG 的基本 chunk 單位，標題要有足夠的描述性，段落開頭要有簡短背景說明：

```markdown
## 什麼是向量資料庫（自包含的標題，不要只寫「介紹」）

向量資料庫是一種專門儲存高維度向量並支援語意相似度查詢的資料庫系統。
（開頭 1-2 句背景說明，讓此 chunk 脫離上下文也能被理解）

核心內容繼續展開...
```

### 3-2. 避免「懸空的指代」

```markdown
❌  如上所述，它有三個特性...
✅  XXX 有三個特性：A、B、C...

❌  這個方法比較快...
✅  向量檢索比關鍵字搜尋速度更快，因為...
```

### 3-3. 定義型筆記使用固定模板

```markdown
## 定義
XXX 是指...（一句話定義）

## 使用時機
- 當...時
- 適合...場景

## 注意事項 / 常見誤解
...

## 相關概念
- [[相關筆記A]]：與本概念的關係說明
- [[相關筆記B]]：與本概念的關係說明
```

### 3-4. Wikilink 加上說明文字

```markdown
❌  見 [[向量資料庫]]
✅  見 [[向量資料庫]]（負責儲存與檢索 embedding 向量）
```

加上說明文字後，即使 Wikilink 在 chunk 切割後失去上下文，語意仍然完整。

---

## 四、Chunking 策略對應

| 筆記格式 | 建議 Chunk 方式 |
|---|---|
| 每個 H2 一個主題 | 以 H2 為單位切塊 |
| 有 Frontmatter summary | summary 單獨建一個 chunk |
| 條列式清單 | 整個清單為一個 chunk，不要切斷 |
| 長篇流水文 | 加 H2/H3 拆解，或改寫成段落式 |
| 表格 | 整張表格為一個 chunk，並在前後加說明句 |

---

## 五、實務建議

### 5-1. 只索引穩定的筆記

在建立索引時過濾掉草稿，避免品質不穩定的內容影響檢索結果：

```
status: stable  → 納入索引
status: review  → 可選擇性納入
status: draft   → 排除
```

### 5-2. 控制單篇筆記長度

- **建議範圍：500～1500 字**
- 過長的筆記請拆成多篇，並用 `[[Wikilink]]` 串聯
- 過短（< 200 字）的筆記考慮合併到相關主題

### 5-3. Daily Notes 另外處理

Daily Notes 結構鬆散，不建議直接納入主知識庫，可以：
- 完全排除（標記 `type/log`，索引時過濾）
- 定期整理後轉成正式筆記再納入

### 5-4. 善用 `updated` 日期做增量更新

只重新 embed 近期修改的筆記，節省運算資源：

```python
# 範例：只處理近 7 天內修改的筆記
if note.updated >= today - timedelta(days=7):
    re_embed(note)
```

### 5-5. 圖片與附件

- 圖片無法直接 embed，需補充 **alt text 或圖說**
- 重要圖表建議在正文中以文字補充說明其內容

---

## 六、完整範例

```markdown
---
title: 什麼是 RAG（檢索增強生成）
aliases: [RAG, Retrieval-Augmented Generation]
tags: [domain/ai/rag, type/concept]
created: 2025-01-15
updated: 2025-04-22
status: stable
lang: zh-TW
summary: RAG 是結合向量檢索與語言模型生成的技術，讓 LLM 能參考外部知識庫回答問題。
---

## 什麼是 RAG

RAG（Retrieval-Augmented Generation，檢索增強生成）是一種 AI 架構，
透過在生成回答前先從外部知識庫檢索相關內容，讓語言模型能回答訓練資料以外的問題。

## 核心運作流程

1. 使用者輸入查詢（Query）
2. 將查詢轉成向量（Embedding）
3. 在向量資料庫中找出語意相似的文件片段（Chunk）
4. 將 chunk 與原始查詢一起送入 LLM
5. LLM 根據檢索結果生成最終回答

## 使用時機

- 需要存取即時或私有知識（不在 LLM 訓練資料中）
- 需要引用來源、可追溯性高的場景
- 知識庫頻繁更新，不適合 fine-tuning

## 相關概念

- [[向量資料庫]]（負責儲存與檢索 embedding 向量）
- [[Embedding 模型]]（將文字轉換為向量的模型）
- [[Chunking 策略]]（決定如何切割文件以利檢索）
```

---

*最後更新：2025-04-22*
