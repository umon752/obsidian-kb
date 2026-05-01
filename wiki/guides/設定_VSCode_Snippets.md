---
type: guide
author: collaborative
tags: ["domain/devtools", "topic/vscode", "status/draft"]
summary: "VS Code 個人自訂 Snippets，涵蓋 JS（log/qs/swiper 等）、Sass（@use）、Vue（SFC 結構）"
sources: ["raw/VS Code 2b3b9bff19ce80ccbc63de9ad1532196.md"]
created: "2026-05-01"
updated: "2026-05-01"
---

# 設定：VS Code Snippets

> 程式碼片段較長，完整內容請參考 `raw/VS Code...md`。以下列出 prefix 與用途快速索引。

## JS Snippets

| prefix | 說明 |
|--------|------|
| `log` | `console.log('$1')` |
| `iife` | 建立 IIFE function |
| `$iife` | 建立 jQuery IIFE function |
| `qs` | `document.querySelector` |
| `qsa` | `document.querySelectorAll` |
| `gi` | `document.getElementById` |
| `adde` | `addEventListener` |
| `obja` | `Object.assign` |
| `swiper` | 建立 Swiper 實例（含完整設定） |
| `load` | `window.addEventListener('load', ...)` |
| `resize` | `window.addEventListener('resize', ...)` |
| `resizeo` | `new ResizeObserver(...)` |
| `intero` | `new IntersectionObserver(...)` |
| `sto` | `setTimeout` |
| `sti` | `setInterval` |

## Sass Snippets

| prefix | 說明 |
|--------|------|
| `fd@use` | 插入 `@use` 引用 variables / mixins / retina |
| `@math` | `@use 'sass:math'` |
| `@map` | `@use 'sass:map'` |

## Vue Snippets

| prefix | 說明 |
|--------|------|
| `vue` | 建立 `<script setup>` + `<template>` + `<style>` SFC 結構 |

## 相關工具 / 頁面
- [[entities/工具_VSCode]]
- [[guides/設定_VSCode_基本設定]]
