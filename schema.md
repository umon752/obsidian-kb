---
created: 2026-05-01
type: guide
tags:
  - schema
  - wiki
  - knowledge-management
---

# Schema — LLM Wiki 操作說明

> **核心目標**：維護 `wiki/` 目錄，將其打造為可複利的知識層。
>
> - **人類負責**：提供素材、提問、策展方向
> - **LLM 負責**：撰寫與維護 wiki 的一切內容

---

## 0. 邊界原則

1. `raw/` 唯讀 — 永不修改 raw/ 的任何檔案
2. 只在 `wiki/` 建立與修改 Markdown 頁面
3. **不確定時，先提議再執行** — 不做大規模自動改動，先列出「將新增/修改哪些頁面」由使用者確認

---

## 1. 目錄結構

```
obsidian-kb/
├── raw/                     # 原始素材（PDF、網頁 md、圖片），唯讀
│   └── assets/              # 文章附圖（本機存放）
├── wiki/                    # LLM 全權維護
│   ├── sources/             # 每份原始素材一頁摘要
│   ├── entities/            # 人物、書籍、工具等實體頁
│   ├── concepts/            # 方法、理論、模型等概念頁
│   ├── comparisons/         # 比較分析頁
│   ├── overview/            # 主題總覽、綜述頁
│   ├── queries/             # 值得保存的問答與分析
│   ├── index.md             # 全 Wiki 目錄（可用 Obsidian 視圖替代）
│   └── log.md               # Append-only 操作紀錄
├── schema.md                # 本說明書
├── AGENTS.md                # 指向 schema.md（Codex 入口）
└── CLAUDE.md                # 指向 schema.md（Claude 入口）
```

---

## 2. 頁面命名與 Frontmatter

### 命名規則
- 語言：中文 + 底線，穩定可讀
  - `概念_費曼學習法.md`
  - `人物_馬斯克.md`
  - `比較_方法A_vs_方法B.md`
- 路徑：依頁面類型放入對應子目錄

### Frontmatter 標準格式
```yaml
---
type: "source | entity | concept | comparison | overview | query"
author: "human | ai | collaborative"
tags: ["domain/xxx", "topic/yyy"]
summary: "一句話說明這頁的核心內容（≤ 60 字）"
sources: ["raw/xxx.pdf", "raw/yyy.md"]
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---
```

**`author` 規則**：
- `human` — 完全由使用者建立，AI 未修改過
- `ai` — 完全由 AI 建立（ingest / query 產出）
- `collaborative` — 使用者建立後經 AI 修改，或反之
- AI 編輯 `author: human` 的頁面時，**必須**將值改為 `collaborative`

**`summary` 規則**：
- 長度上限：60 字（中文）/ 100 words（英文）
- 必須獨立可讀，不依賴 wikilink，方便未來 RAG metadata filtering
- 壞範例：`"見 [[concepts/概念_xxx]]"` ✗
- 好範例：`"費曼學習法是一種透過向他人講解來深化理解的學習技巧"` ✓

### Tags 分類體系
使用 `namespace/值` 格式，確保未來 RAG 篩選時 tags 有結構：

| Namespace | 說明 | 範例 |
|-----------|------|------|
| `domain/` | 知識領域 | `domain/ai`、`domain/教育`、`domain/商業` |
| `topic/` | 具體主題 | `topic/LLM`、`topic/費曼學習法` |
| `status/` | 頁面狀態 | `status/draft`、`status/stable`、`status/outdated` |

- 每頁至少填一個 `domain/` 和一個 `topic/`
- `status/` 選填；新建頁面預設 `status/draft`，經 lint 確認後改為 `status/stable`

---

## 3. 頁面顆粒度規範

> 顆粒度直接影響未來 RAG 的召回品質，請嚴格遵守。

### 3.1 頁面大小限制
- **建議**：每頁正文 ≤ 600 字（中文）
- **上限**：正文 ≤ 1000 字；超過時**必須拆頁**
- 計算範圍：不含 frontmatter、wikilink 列表、程式碼區塊

### 3.2 何時拆頁
以下情況需拆分為多個獨立頁面：
- 單頁超過 4 個 H2 section
- 一個 H2 section 內容超過 300 字
- 一頁同時描述兩個可以獨立存在的概念 / 實體

拆頁方式：建立子頁面並在原頁加上 `[[子頁面]]` 連結，原頁保留摘要段落。

### 3.3 Section 自包含原則
每個 H2 section 必須**不依賴其他頁面即可理解**：
- ✗ `"詳見 [[concepts/概念_xxx]]"` — 只留連結沒有說明
- ✓ `"費曼學習法（[[concepts/概念_費曼學習法]]）是一種透過向他人講解來深化理解的方法"` — 先說明再附連結
- 原則：wikilink 是「延伸閱讀」，不是「必須點進去才能理解」的依賴

---

## 4. 頁面類型格式

### 4.1 Source（來源摘要）
路徑：`wiki/sources/xxx.md`

```markdown
---
type: source
author: ai
tags: ["domain/xxx", "topic/yyy", "status/draft"]
summary: ""
sources: ["raw/xxx"]
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

# 標題

## 來源資訊
- 作者、時間、連結

## 核心要點
- （3–7 條 bullet）

## 關鍵引文（可選）

## 關聯頁面
- [[entities/人物_xxx]]
- [[concepts/概念_yyy]]
```

### 4.2 Entity（實體頁）
路徑：`wiki/entities/人物_xxx.md`

```markdown
---
type: entity
author: ai
tags: ["domain/xxx", "topic/yyy", "status/draft"]
summary: ""
sources: []
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

# 實體名稱

## 簡介

## 行為 / 特徵 / 狀態

## 相關事件 / 計劃

## 相關來源
- [[sources/xxx]]

## 相關概念
- [[concepts/概念_yyy]]
```

### 4.3 Concept（概念頁）
路徑：`wiki/concepts/概念_xxx.md`

```markdown
---
type: concept
author: ai
tags: ["domain/xxx", "topic/yyy", "status/draft"]
summary: ""
sources: []
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

# 概念名稱

## 定義

## 使用場景 / 步驟

## 在本知識庫中的應用範例

## 關聯概念
- 相似：[[concepts/概念_yyy]]
- 對比：[[concepts/概念_zzz]]

## 相關來源
- [[sources/xxx]]
```

### 4.4 Comparison（比較頁）
路徑：`wiki/comparisons/比較_xxx_vs_yyy.md`

```markdown
---
type: comparison
author: ai
tags: ["domain/xxx", "topic/yyy", "status/draft"]
summary: ""
sources: []
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

# A vs B

## 比較對象簡介

## 相同點

## 不同點
| 維度 | A | B |
|------|---|---|
| 目標 | | |
| 成本 | | |
| 適用場景 | | |

## 結論 / 選擇建議
```

### 4.5 Overview（總覽 / 綜述）
路徑：`wiki/overview/主題_xxx_綜述.md`

```markdown
---
type: overview
author: ai
tags: ["domain/xxx", "topic/yyy", "status/draft"]
summary: ""
sources: []
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

# 主題名稱 — 綜述

## 一句話結論

## 當前理解 / 總體框架

## 支撐來源與頁面
- [[sources/xxx]]
- [[concepts/概念_yyy]]

## 未決問題 / 待驗證假設
```

---

## 5. 操作流程

### 5.1 Ingest（匯入新素材）

當使用者說「ingest raw/xxx」：

1. 讀取 `raw/xxx`，提煉要點，與使用者簡短確認重點
2. 在 `wiki/sources/` 新建或更新摘要頁
3. 更新或建立相關 entity / concept 頁
4. 如有需要新建 comparison 或 overview 頁，**先提議再執行**
5. 更新 `wiki/index.md`（加入新頁面條目）
6. 在 `wiki/log.md` 末尾追加：
   ```
   ## [YYYY-MM-DD] ingest | raw/xxx → wiki/sources/xxx.md (+ 受影響頁面)
   - 新增：...
   - 更新：...
   - 重點：<一句話>
   ```

### 5.2 Query（查詢）

當使用者提問：

1. 讀取 `wiki/index.md`（或用 frontmatter `summary` 欄位）找候選頁面
2. 讀取相關頁面，綜合回答，附上 `[[wikilink]]` 引用
3. 若回答有保存價值（比較 / 分析 / 計劃），建議歸檔為新 wiki 頁面
4. 在 `wiki/log.md` 追加：
   ```
   ## [YYYY-MM-DD] query | <問題摘要>
   - 參考頁面：...
   - 是否歸檔：是（wiki/xxx.md）/ 否
   ```

### 5.3 Lint（健康檢查）

當使用者說「lint wiki」：

1. 掃描所有 wiki 頁面，找出：
   - 頁面間互相矛盾的說法
   - 被新素材推翻的舊主張
   - 孤立頁面（無 inbound link）
   - 被多次提及但沒有獨立頁面的概念
   - 嚴重缺失 cross-ref 的地方
2. **生成建議清單，不直接大改**，列出：
   - 哪幾頁建議合併 / 拆分
   - 哪些觀點需要確認更新
   - 哪些概念值得單獨開頁
3. 使用者確認後再動手，並記錄到 `wiki/log.md`：
   ```
   ## [YYYY-MM-DD] lint
   - 發現問題：N 項
   - 已修復：N 項（明細）
   ```

---

## 6. 工具使用建議

- **查找筆記間關係**（wikilink、tags、frontmatter、雙向連結）：優先使用 obsidian-cli（若可用），比通用文字搜尋更精確
- **搜尋頁面內容**：`grep` 搭配 `wiki/` 路徑
- **圖片處理**：`raw/` 中的 md 若有圖片，先讀文字，再依需要個別查看圖片
- **規模**：wiki 在數百頁以內，用 `index.md` + frontmatter `summary` 導航即可，不需要向量搜尋

---

## 7. log.md 格式規範

- **只增不改** — 永遠在末尾新增，不修改既有紀錄
- 標題格式：`## [YYYY-MM-DD] <操作類型> | <標題>`
- 快速列出紀錄：`grep "^## \[" wiki/log.md`
