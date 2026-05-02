---
type: source
author: ai
tags: ["domain/frontend", "topic/css", "topic/mask", "status/draft"]
summary: "CSS mask-image 語法：線性/放射狀羽化效果、圖片形狀遮罩、SVG mask 搭配高斯模糊實現自然羽化"
sources: ["raw/語法/CSS.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# CSS 語法 — mask 效果

## 核心要點

### 羽化（線性/放射狀）
```css
/* 線性羽化（從下到上消失）*/
mask-image: linear-gradient(to top, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);

/* 放射狀羽化（中心清晰、邊緣消失）*/
mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,.6) 60%, rgba(0,0,0,0) 100%);
```

### 圖片形狀遮罩
```css
mask-image: url('mask.png');
mask-size: 100% 100%;
mask-repeat: no-repeat;
```

### SVG mask + 高斯模糊（更自然羽化邊緣）
使用內聯 SVG 定義 `<mask>` 搭配 `<feGaussianBlur>`，再以 `mask: url(#softMask)` 套用到元素。

## 關聯頁面
- [[sources/CSS文字外框]]
