---
type: guide
author: ai
tags: ["domain/frontend", "topic/css", "topic/text-effects", "status/draft"]
summary: "CSS 純文字外框效果的幾種實作技巧比較"
sources: ["raw/文件/CSS 文字外框.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# CSS 文字外框技巧

## 方法比較

| 方法 | 語法 | 特點 |
|------|------|------|
| `-webkit-text-stroke` | `-webkit-text-stroke: 2px #000;` | 最常用；外框向內縮 |
| `text-shadow` | `text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, ...` | 多方向 shadow 模擬；較複雜 |
| `paint-order` (SVG) | `paint-order: stroke fill;` + SVG 屬性 | 外框向外；需搭配 SVG |

## 使用 `-webkit-text-stroke`（推薦）
```css
.outlined-text {
  color: transparent;           /* 文字填色透明 = 空心字 */
  -webkit-text-stroke: 2px #333;
  font-size: 3rem;
  font-weight: bold;
}
```

## 使用 `text-shadow`（廣泛支援）
```css
.outlined-text {
  color: #fff;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
}
```

## 注意事項
- `-webkit-text-stroke` 僅 WebKit 核心；現代瀏覽器支援良好
- 外框越寬，與文字填色的重疊越明顯，建議 `color: transparent` 搭配空心效果

## 相關來源
- [[sources/CSS文字外框]]
