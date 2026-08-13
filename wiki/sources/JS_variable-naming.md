---
type: source
author: ai
tags: ["domain/javascript", "topic/naming", "topic/coding-style", "status/draft"]
summary: "整理 JavaScript 變數合法命名規則與 camelCase、私有欄位、jQuery、Class、常數慣例"
sources: ["raw/JS/bian-shu-ming-ming.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 變數命名

## 核心要點

- 變數不可用數字開頭、空格、特殊符號、保留字或 `null`／`true`／`false` 等保留字面量。
- 一般變數採小駝峰（camelCase）。
- `_` 與 `#` 可分別作為團隊慣例的私有標記與 class 私有欄位表示法。
- `$` 可作為 jQuery 物件的辨識前綴。
- Class／元件通常使用開頭大寫；不可變常數可使用全大寫加底線。

