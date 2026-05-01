# CLAUDE.md — LLM Wiki Schema

> 這是給 LLM Agent 看的操作說明書。每次開啟新對話時請先讀此檔。
> 人類負責：提供素材、提問、策展方向。
> LLM 負責：撰寫與維護 wiki 的一切內容。

---

## 目錄結構

```
obsidian-kb/
├── raw/                  # 原始素材（唯讀，LLM 只讀不改）
│   └── assets/           # 文章附圖（本機存放）
├── wiki/                 # LLM 維護的 Wiki（LLM 全權負責寫作）
│   ├── entities/         # 實體頁：人物、組織、產品、工具
│   ├── concepts/         # 概念頁：想法、術語、理論、框架
│   ├── sources/          # 來源摘要頁：每份原始素材一頁
│   ├── queries/          # 查詢結果頁：值得保存的問答與分析
│   ├── index.md          # 全 Wiki 目錄（每次 ingest 後更新）
│   ├── overview.md       # 高層次綜述（隨知識累積持續更新）
│   └── log.md            # Append-only 操作紀錄
├── temp/                 # 暫存區（勿動）
└── CLAUDE.md             # 本說明書
```

---

## 核心原則

1. **raw/ 唯讀** — 永不修改 raw/ 內的任何檔案。
2. **wiki/ 由 LLM 全權維護** — 人類只讀，不手動編輯（除非明確說明）。
3. **知識要累積** — 每次 ingest 不只寫摘要，還要更新相關的 entity / concept 頁面，讓知識相互連結。
4. **交叉引用** — 使用 Obsidian wikilink 格式 `[[頁面名稱]]` 建立連結。
5. **log.md 只增不改** — 永遠在 log.md 末尾新增，不修改既有紀錄。

---

## 操作流程

### Ingest（新增素材）

當使用者說「ingest 這份文件」或「處理這個來源」：

1. 讀取 raw/ 中的來源文件
2. 與使用者討論重點（可選）
3. 在 `wiki/sources/` 建立摘要頁（見下方格式）
4. 更新 `wiki/entities/` — 新增或更新相關實體頁
5. 更新 `wiki/concepts/` — 新增或更新相關概念頁
6. 更新 `wiki/overview.md` — 反映最新綜述
7. 更新 `wiki/index.md` — 加入新頁面的目錄條目
8. 在 `wiki/log.md` 末尾新增一筆紀錄：
   ```
   ## [YYYY-MM-DD] ingest | <來源標題>
   - 新增頁面：sources/xxx.md
   - 更新頁面：entities/yyy.md, concepts/zzz.md
   - 重點：<一句話摘要>
   ```

### Query（查詢）

當使用者提問：

1. 讀取 `wiki/index.md` 找出相關頁面
2. 讀取相關頁面後綜合作答，附上 `[[wikilink]]` 引用
3. 若答案有保存價值，在 `wiki/queries/` 建立頁面並更新 index
4. 在 log.md 新增紀錄：
   ```
   ## [YYYY-MM-DD] query | <問題摘要>
   - 參考頁面：...
   - 是否歸檔：是 / 否
   ```

### Lint（健康檢查）

當使用者說「lint wiki」或「健康檢查」：

1. 掃描所有 wiki 頁面，找出：
   - 相互矛盾的說法
   - 被新素材推翻的舊主張
   - 孤立頁面（無 inbound link）
   - 重要概念缺少獨立頁面
   - 缺失的交叉引用
2. 列出問題清單讓使用者決定如何處理
3. 在 log.md 新增紀錄：
   ```
   ## [YYYY-MM-DD] lint
   - 發現問題：N 項
   - 已修復：N 項
   ```

---

## 頁面格式

### sources/ 摘要頁
```markdown
---
type: source
title: <標題>
source_type: article | paper | book | video | podcast | other
date_ingested: YYYY-MM-DD
url: <原始連結（如有）>
---

# <標題>

## 摘要
<3-5 句的核心摘要>

## 重點
- ...
- ...

## 相關頁面
- [[entity或concept頁面]]

## 原始檔案
`raw/<檔名>`
```

### entities/ 實體頁
```markdown
---
type: entity
entity_type: person | org | product | tool | other
---

# <實體名稱>

## 簡介
<一段話描述>

## 重要性
<在本知識庫中的意義>

## 相關來源
- [[sources/xxx]]

## 相關概念
- [[concepts/yyy]]
```

### concepts/ 概念頁
```markdown
---
type: concept
---

# <概念名稱>

## 定義
<清晰的定義>

## 重要性
<為什麼重要>

## 與其他概念的關係
- 相似：[[xxx]]
- 對比：[[yyy]]

## 相關來源
- [[sources/zzz]]
```

### queries/ 查詢結果頁
```markdown
---
type: query
date: YYYY-MM-DD
---

# <問題>

## 答案
<詳細回答>

## 參考來源
- [[sources/xxx]]
- [[concepts/yyy]]
```

---

## 注意事項

- **圖片**：raw/ 中的 markdown 若有圖片，先讀文字，再依需要個別查看圖片。
- **規模**：wiki 在數百頁以內時，用 index.md 導航即可，不需要搜尋引擎。
- **語言**：跟隨使用者的語言習慣（繁體中文 / 英文混用均可）。
- **此說明書可更新**：若流程需要調整，由使用者與 LLM 共同修訂 CLAUDE.md。
