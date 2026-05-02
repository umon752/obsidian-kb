---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/文字排版", "status/draft"]
summary: "CSS 文字外框三種實作方式：text-shadow 八方向陰影、webkit-text-stroke、搭配偽元素修補缺陷的比較"
sources: ["raw/文件/CSS 文字外框.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# CSS 文字外框

## 核心要點
- 三種主流做法：`text-shadow`、`-webkit-text-stroke`、`webkit-text-stroke` + `::before/::after`

| 方法 | 優點 | 缺點 |
|------|------|------|
| `text-shadow`（八方向）| 快速、支援度高 | 銳角處可能斷線；文字無法透明 |
| `-webkit-text-stroke` | 快速、文字可透明 | 某些字體英文/數字有多餘線條 |
| `webkit-text-stroke` + 偽元素 | 外框完美 | 元素內不可有子元素；文字無法真正透明 |

- `text-shadow` 公式（外框寬度 w，顏色 c）：
  `-w 0 0 c, w 0 0 c, 0 2w 0 c, 0 -2w 0 c, -w -2w 0 c, w -2w 0 c, -w 2w 0 c, w 2w 0 c`

## 關聯頁面
- [[concepts/概念_CSS技巧]]
