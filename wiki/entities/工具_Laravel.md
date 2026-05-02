---
type: entity
author: ai
tags: ["domain/backend", "topic/laravel", "topic/php", "status/draft"]
summary: "Laravel 是 PHP 的後端框架，Blade 為其模板引擎，用於伺服器端 HTML 渲染"
sources: []
created: "2026-05-02"
updated: "2026-05-02"
---

# Laravel

## 簡介
Laravel 是 PHP 的主流 MVC 後端框架，本專案前端切版後進行後端套版時使用。Blade 為其內建模板引擎，副檔名 `.blade.php`，存放於 `resources/views/`。

## 特徵
- Blade 視圖被編譯成原生 PHP
- 支援 component、layout、語系、自訂 directive
- `Js::from()` 安全將 PHP 資料傳給 JS

## 使用場景
- 前端切版完成後進行後端套版
- 使用 `@include`、`<x-component>` 複用模板
- 透過 `{{ __('messages.key') }}` 實作多語系

## 相關來源
- [[sources/LaravelBlade語法]]
- [[sources/PHP語法]]
