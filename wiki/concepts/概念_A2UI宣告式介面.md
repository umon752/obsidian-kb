---
type: concept
author: ai
tags: ["domain/ai", "topic/a2ui", "status/draft"]
summary: "A2UI 以宣告式資料描述代理生成的介面，由客戶端 renderer 決定實際元件呈現與樣式"
sources: ["raw/AI SEO/a2ui_a2a.md"]
created: "2026-09-28"
updated: "2026-09-28"
---

# 概念：A2UI 宣告式介面

## 定義與資料流
A2UI（Agent-to-User/UI Interface）在本素材中指代理以宣告式 JSON 描述互動介面。素材將資料流分為 `surfaceUpdate`（元件結構）與 `dataModelUpdate`（業務資料），並以資料綁定把值呈現在元件中。

## 元件與視覺控制
代理可描述 `Row`、`Column` 等佈局與語意樣式；前端 renderer 保有字體、色彩、間距與元件實作的控制權。素材也提出由前端註冊自訂元件，讓代理引用既有 UI 元件。

## 安全與採用界線
素材將不執行任意 JavaScript 視為降低前端腳本風險的設計特性，但未附協定規格或威脅模型。實際採用時仍須查核 renderer 的元件白名單、資料驗證與平台支援範圍。

## 關聯內容
- 代理之間的通訊概念：[[concepts/概念_A2A代理互通]]
- [[sources/A2UI_A2A技術指南]]
