---
type: source
author: ai
tags: ["domain/frontend", "topic/performance", "topic/animation", "status/draft"]
summary: "整理瀏覽器 Render pipeline、Reflow、Repaint、FLIP、Web Animation API 與 60 FPS 更新"
sources: ["raw/JS/xiao-neng-performance.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 與瀏覽器效能

## 核心要點

- 瀏覽器繪製流程可拆為 JavaScript、Style calculations、Layout、Paint 與 Compositing。
- `transform`、`opacity` 與適當的 layer promotion 可避開部分 Layout／Paint，但過多 layer 會增加記憶體成本。
- FLIP 以 First、Last、Invert、Play 計算動畫前後狀態，將中間過渡集中到 `transform` 與 `opacity`。
- Web Animation API 提供比純 CSS 更細的播放、暫停與進度控制；可搭配 `requestAnimationFrame`。
- 60 FPS 約等於每幀 16.67ms，`performance.now()` 適合量測不受系統時鐘調整影響的高精度時間。

## 參考資源

- [CSS Triggers](https://csstriggers.com/)
- [FLIP animation](https://aerotwist.com/blog/flip-your-animations/)

