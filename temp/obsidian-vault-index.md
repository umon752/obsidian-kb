# 📚 Obsidian 知識庫目錄概覽

> 本文件作為知識庫的結構說明與導覽，記錄各資料夾的用途與索引策略。

---

## 資料夾結構

```
vault/
│
├── 00-inbox/                  # 所有新筆記的落點，待分類
│
├── 10-notes/                  # 主知識庫（RAG 主要索引來源）
│   ├── ai/
│   │   ├── rag/
│   │   └── llm/
│   ├── programming/
│   └── （你的領域）/
│
├── 20-projects/               # 專案筆記（可選擇性索引）
│   └── （專案名稱）/
│       ├── _index.md
│       ├── meeting-notes/
│       └── research/
│
├── 30-resources/              # 外部資料摘要、書摘、文章筆記
│
├── 40-archive/                # 過期或不再維護的筆記
│
├── 90-templates/              # Obsidian 模板
│
└── 99-daily/                  # Daily Notes
```

---

## 各資料夾說明

### 00-inbox／待分類

所有新筆記的第一個落點。想到什麼就先丟進來，不需要整理好才建檔。
定期（建議每週一次）檢視並分類到正確的資料夾。

- 此資料夾的筆記 **不納入 RAG 索引**
- `status` 預設為 `draft`

---

### 10-notes／主知識庫 ✅ 索引

知識庫的核心，RAG 的主要資料來源。
內容需整理完畢、語意自洽，才從 inbox 移入此處。

子資料夾依領域組織，建議最多三層深度：

```
10-notes/
├── ai/
│   ├── rag/
│   └── llm/
├── programming/
│   ├── python/
│   └── system-design/
└── （你的領域）/
```

- `status: stable` 的筆記才納入索引
- 每個子資料夾建議放一份 `_index.md` 說明該分類的範圍

---

### 20-projects／專案 ⚠️ 選擇性索引

以專案為單位組織的筆記，包含會議記錄、研究資料、決策記錄等。

```
20-projects/
└── 專案名稱/
    ├── _index.md        # 專案總覽、目標、時程
    ├── meeting-notes/
    └── research/
```

- 是否納入索引依專案性質決定
- 進行中專案建議索引；已結束專案移至 `40-archive/`

---

### 30-resources／外部資源 ✅ 索引

書摘、文章摘要、論文筆記、影片重點整理等。
原始來源經過整理後品質足夠，納入完整索引。

- Frontmatter 的 `source` 欄位務必填寫來源連結
- 摘要請用自己的話改寫，避免大量直接複製原文

---

### 40-archive／封存 ❌ 不索引

不再維護但想保留的筆記。
移入此處前將 `status` 改為 `draft`，確保不被索引到。

---

### 90-templates／模板 ❌ 不索引

Obsidian 筆記模板存放處，非知識內容，完全排除索引。

建議模板：
- `tpl-concept.md`：概念型筆記
- `tpl-how-to.md`：操作步驟筆記
- `tpl-resource.md`：外部資源摘要
- `tpl-project-index.md`：專案總覽

---

### 99-daily／每日筆記 ❌ 不索引

Daily Notes 結構鬆散，直接索引效果差。
重要想法請定期整理後，以正式筆記形式移入 `10-notes/` 或 `20-projects/`。

---

## RAG 索引策略一覽

| 資料夾 | 索引 | 條件 |
|---|---|---|
| `00-inbox/` | ❌ 排除 | 草稿未整理 |
| `10-notes/` | ✅ 完整索引 | `status: stable` |
| `20-projects/` | ⚠️ 選擇性 | 依專案決定 |
| `30-resources/` | ✅ 完整索引 | `status: stable` |
| `40-archive/` | ❌ 排除 | 過期內容 |
| `90-templates/` | ❌ 排除 | 非知識內容 |
| `99-daily/` | ❌ 排除 | 結構鬆散 |

### Pipeline 設定範例

```python
INCLUDE_DIRS = ["10-notes", "30-resources"]
EXCLUDE_DIRS = ["00-inbox", "40-archive", "90-templates", "99-daily"]
```

---

## 命名規範

| 對象 | 規則 | 範例 |
|---|---|---|
| 資料夾 | 數字前綴 + 小寫 + 連字號 | `10-notes/` |
| 筆記檔名 | 小寫 + 連字號 | `what-is-rag.md` |
| 索引檔 | 固定命名 | `_index.md` |
| 模板檔 | `tpl-` 前綴 | `tpl-concept.md` |

> 避免空格與大小寫混用，對程式處理與跨平台相容性最友善。

---

## 維護建議

- **每週**：清空 `00-inbox/`，將筆記分類到正確位置
- **每月**：檢視 `20-projects/`，將已結束的專案移入 `40-archive/`
- **每季**：重新檢視 `10-notes/` 內筆記的 `status`，將過期內容封存

---

*最後更新：2025-04-22*
