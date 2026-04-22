---
title: 什麼是 RAG（檢索增強生成）
aliases: [RAG, Retrieval-Augmented Generation]
tags:
  - domain/ai/rag
  - type/concept
created: 2025-01-15
updated: 2025-04-22
status: stable
lang: zh-TW
summary: RAG 是結合向量檢索與語言模型生成的技術，讓 LLM 能參考外部知識庫回答問題。
---

## 什麼是 RAG

RAG（Retrieval-Augmented Generation，檢索增強生成）是一種 AI 架構，透過在生成回答前先從外部知識庫檢索相關內容，讓語言模型能回答訓練資料以外的問題。

## 核心運作流程

1. 使用者輸入查詢（Query）
2. 將查詢轉成向量（Embedding）
3. 在向量資料庫中找出語意相似的文件片段（Chunk）
4. 將 chunk 與原始查詢一起送入 LLM
5. LLM 根據檢索結果生成最終回答

## 使用時機

- 需要存取即時或私有知識（不在 LLM 訓練資料中）
- 需要引用來源、可追溯性高的場景
- 知識庫頻繁更新，不適合 fine-tuning

## 相關概念

- [[向量資料庫]]（負責儲存與檢索 embedding 向量）
- [[Embedding 模型]]（將文字轉換為向量的模型）
- [[Chunking 策略]]（決定如何切割文件以利檢索）
