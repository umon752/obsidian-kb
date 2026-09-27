---
type: guide
author: ai
tags: ["domain/design", "domain/devtools", "topic/impeccable", "status/draft"]
summary: "依序建立產品與設計脈絡，再選用 Impeccable 指令調整、檢討及驗收 UI"
sources: ["raw/AI/impeccable-quick-guide.md"]
created: "2026-09-28"
updated: "2026-09-28"
---

# Impeccable 快速使用流程

## 建議流程
1. 執行 `/impeccable init`，建立 `PRODUCT.md`，記錄產品目標、對象與限制。
2. 執行 `/impeccable document`，建立 `DESIGN.md`，整理色彩、字體、版面、間距與元件規則。
3. 依需求使用 `shape` 規劃方向，再選擇版面或視覺調整指令。
4. 使用 `critique` 找出問題，以 `polish` 精修，最後用 `audit` 檢查 accessibility、responsive 與 performance。

## 指令選擇
| 目標 | 指令 |
|------|------|
| 規劃資訊架構與方向 | `/impeccable shape` |
| 調整版面、群組、間距與密度 | `/impeccable layout` |
| 調整字體與文字層級 | `/impeccable typeset` |
| 加強或收斂視覺表現 | `/impeccable bolder`、`/impeccable quieter` |
| 調整色彩、動畫或簡化介面 | `/impeccable colorize`、`/impeccable animate`、`/impeccable distill` |
| 檢討、精修與驗收 | `/impeccable critique`、`/impeccable polish`、`/impeccable audit` |

## 控制修改範圍
- 若只調整間距，明確限定 section spacing、container padding、element gap 或 card padding，並列出需要維持的版面、字體、顏色與元素數量。
- 局部微調可使用 `/impeccable live` 選取畫面元素，再描述要調整的間距或對齊。
- 素材建議在會直接修改專案的指令前建立 Git 檢查點，並在執行後查看 diff；上線前以 `audit` 檢查無障礙、響應式與效能。

## 相關頁面
- [[entities/工具_Impeccable]]
- [[sources/Impeccable快速使用指南]]
