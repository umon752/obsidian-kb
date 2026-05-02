# PHP 語法

迴圈：

```php
<?php for ($i = 0; $i < 9; $i++) : ?><?php endfor ; ?>
```

```php
<?php for ($i = 0; $i < 10; $i++) : ?>
  <?php if ($i % 2 === 0) : ?>
    <!-- 雙數顯示內容 -->
  <?php else : ?>
    <!-- 單數顯示內容 -->
  <?php endif; ?>
<?php endfor ; ?>
```

index：

```php
<?= $i ?>
```

註解：

```php
<?php /*
...這裡是多行 PHP 註解
...這裡是多行 PHP 註解
...這裡是多行 PHP 註解
*/?>
```

時間戳：

```php
<?=time();?>
<?php echo randstring();?>
```