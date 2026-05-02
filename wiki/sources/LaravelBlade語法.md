---
type: source
author: ai
tags: ["domain/backend", "topic/laravel", "topic/blade", "topic/php", "status/draft"]
summary: "Laravel Blade 模板引擎語法全覽：輸出、條件、迴圈、區塊、include、component、JSON 輸出、語系、自訂 directive"
sources: ["raw/語法/Laravel Blade 語法/Laravel Blade 語法.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# Laravel Blade 語法

## 核心要點

### 輸出
- `{{ }}` — 安全輸出（auto escape，防 XSS）
- `{!! !!}` — 原始輸出（不 escape）
- `@{{ }}` — 跳脫 Blade，原樣輸出（給前端框架用）
- `{{ $name ?? 'Default' }}` — null 合併

### 條件
- `@if / @elseif / @else / @endif`
- `@unless`（條件不成立時執行）
- `@empty`（空值時執行）、`@isset`（非 null 時執行）

### 迴圈
- `@for`、`@foreach`、`@forelse`（空值顯示替代內容）、`@while`、`@switch`
- `$loop->first`、`$loop->last`、`$loop->odd`、`$loop->even`

### 區塊與引入
- `@section / @yield` — layout 區塊定義
- `@include('路徑', ['變數' => '值'])` — 引入子檔案
- `@each('template', $array, 'item')` — 迴圈渲染
- `<x-元件名稱 :prop="$var">` — component 使用

### JSON 輸出（推薦）
```php
var app = {{ Js::from($array) }};
```

### 語系
```php
{{ __('messages.welcome') }}
{{ __('messages.welcome_user', ['name' => 'Tom']) }}
```

## 關聯頁面
- [[entities/工具_Laravel]]
- [[sources/PHP語法]]
