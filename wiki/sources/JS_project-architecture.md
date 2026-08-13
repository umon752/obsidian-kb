---
type: source
author: ai
tags: ["domain/architecture", "topic/monorepo", "topic/nx", "status/draft"]
summary: "比較 Monolith、Multi Repository、Monorepo，並記錄 NX workspace 建立與 affected build 指令"
sources: ["raw/JS/zhuan-an-guan-li-jia-gou.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 專案管理架構

## 核心要點

- Monolith 專案集中、簡單，但大型專案的小改動也可能觸發整體建置與部署。
- Multi Repository 讓模組獨立開發部署，但共用模組修正需要同步多個 repo。
- Monorepo 在單一 repo 中分組多個專案，可共享資源與獨立部署，但需要管理權限、依賴與 repo 體積。
- NX 可建立 `apps`／`libs` workspace，提供 serve、build、test、reset 與 `affected` 增量建置。
- workspace 資料夾命名與共用資源邊界需先規劃，避免專案彼此影響。

## 參考資源

- [使用 NX 體驗 Monorepo](https://cyfangnotepad.blogspot.com/2024/11/nx-monorepo.html)

