---
type: source
author: ai
tags: ["domain/javascript", "topic/event-loop", "topic/async", "status/draft"]
summary: "說明瀏覽器事件循環的 Call Stack、Heap、Macro Task、Micro Task 與阻塞概念"
sources: ["raw/JS/liu-lan-qi-zhong-de-shi-jian-xun-huan-event-loop.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 瀏覽器中的事件循環

## 核心要點

- Call Stack 執行同步程式，Heap 儲存物件，Event Queue 暫存等待執行的非同步工作。
- 阻塞發生在主執行緒長時間被同步工作占用，會延遲事件與畫面更新。
- Macro Task 包含 script、timer、I/O、事件與 MessageChannel；Micro Task 包含 Promise callbacks 與 MutationObserver。
- 理解任務分類有助於預測非同步程式的執行順序與避免 UI 卡頓。

