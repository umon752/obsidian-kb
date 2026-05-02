---
type: source
author: ai
tags: ["domain/backend", "topic/php", "topic/語法", "status/draft"]
summary: "PHP 常用語法速查：for 迴圈的替代語法、index 輸出、多行註解、時間戳輸出"
sources: ["raw/語法/PHP 語法.md"]
created: "2026-05-02"
updated: "2026-05-02"
---

# PHP 語法

## 核心要點

### For 迴圈（HTML 模板用替代語法）
```php
<?php for ($i = 0; $i < 9; $i++) : ?> ... <?php endfor; ?>
```

### 輸出 index
```php
<?= $i ?>
```

### 多行註解
```php
<?php /*
  多行 PHP 註解
*/ ?>
```

### 時間戳
```php
<?= time(); ?>
<?php echo randstring(); ?>
```

## 關聯頁面
- [[sources/LaravelBlade語法]]
