---
type: concept
author: ai
tags: ["domain/ai", "topic/a2a", "status/draft"]
summary: "A2A 描述 AI 代理之間的通訊與任務協作；具體發現、授權與觀測方式依實作而定"
sources: ["raw/AI SEO/a2ui_a2a.md"]
created: "2026-09-28"
updated: "2026-09-28"
---

# 概念：A2A 代理互通

## 定義與角色
A2A（Agent-to-Agent）在本素材中指代理彼此或代理與企業平台交換任務資訊的通訊方式。常見構想包括總代理委派工作給航空、訂位或企業流程代理，再把結果交回使用者。

## 發現與授權
素材提到以 Agent Card 宣告代理能力，以及在敏感操作時透過 OAuth 授權使用者身分。Agent Card 的位置、權杖範圍與授權流程須依採用的協定版本及服務文件確認。

## 部署界線
素材也提及 gateway、Model Armor、計費與 OpenTelemetry。這些可能來自特定平台服務或部署選擇，並非單靠 A2A 名稱即可推定具備的功能。設計時應分開驗證協定互通、身分授權與營運監測需求。

## 關聯內容
- 代理輸出互動介面的概念：[[concepts/概念_A2UI宣告式介面]]
- MCP 來源摘要：[[sources/MCP模型上下文協定]]
- [[sources/A2UI_A2A技術指南]]
