---
type: source
author: ai
tags: ["domain/javascript", "topic/encapsulation", "topic/closure", "status/draft"]
summary: "以作用域、閉包與 class 封裝內部狀態，並延伸到柯里化與事件處理器引用"
sources: ["raw/JS/feng-zhuang-encapsulation.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript 封裝與閉包

## 核心要點

- 封裝限制外部直接讀寫物件內部狀態，透過定義良好的介面提高安全性與可維護性。
- 函式作用域、閉包與 class 都可實作封裝；getter 可回傳淺拷貝，避免外部直接修改內部物件。
- 建構函式搭配 `new` 會建立實體並連結 prototype；事件監聽若要移除，必須保留原始 handler reference。
- 柯里化把多參數函式轉成逐步接收單一參數的函式，利用閉包保存前面已取得的值。

