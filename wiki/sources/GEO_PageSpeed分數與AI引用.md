---
type: source
author: ai
tags: ["domain/seo", "domain/frontend", "topic/geo", "topic/performance", "status/draft"]
summary: "說明 AI 代理瀏覽的 WebMCP、INP、DOM、Long Task、語意化 HTML 與 CLS 效能要求"
sources: ["raw/GEO/PageSpeed 分數與 AI 引用.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# PageSpeed 分數與 AI 引用

## 核心要點

- AI 代理瀏覽需要能解析 DOM、執行互動並取得穩定快照；WebMCP 可用結構化工具降低誤操作。
- INP 目標低於 200ms；長任務應拆分、移至 Web Worker，或以 debounce／throttle 降低主執行緒阻塞。
- DOM 節點建議控制在約 1400 個以內，複雜列表可使用 virtual scrolling 與 lazy loading。
- 以語意化 HTML、`label`、ARIA 與鍵盤導覽提高 AI 與輔助技術的理解能力。
- 透過預留圖片尺寸、Skeleton 與穩定版面降低 CLS，避免代理點擊時因畫面位移誤觸。

## 關聯頁面

- [[concepts/概念_無障礙設計規範]]

