# Laravel Blade 語法

[官方文件](https://laravel.tw/docs/5.2/blade)

<aside>
🔖

Blade 視圖會被編譯成一般的 PHP 程式碼

副檔名 `.blade.php`

資料夾通常儲存於 `resources/views` 

</aside>

## 基礎

### 範例用法

```php
<!-- 檔案儲存於 resources/views/layouts/master.blade.php -->

<html>
    <head>
        <title>應用程式名稱 - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            這是主要的側邊欄。
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

```php
<!-- 儲存於 resources/views/child.blade.php -->

@extends('layouts.master')

@section('title', '頁面標題')

@section('sidebar')
    @parent

    <p>這邊會附加在主要的側邊欄。</p>
@endsection

@section('content')
    <p>這是我的主要內容。</p>
@endsection
```

### 變數輸出（Echo）

- `{{ }}`：安全輸出（自動 escape，防 XSS）
ex：`{ $html }`
- `{!! !!}`：原始輸出（不 escape，請自行確保安全）
ex：`{!! $html !!}`
- `@{{ }}`：跳脫 Blade（跟 Blade 說：不要當指令跑，原樣輸出就好），保留給前端框架使用
ex：`@{{ html }`}
另一個方法是使用 `@verbatim` 包裹，這樣就不用在每個 `{{ 語句 }}` 前添加**`@`**符號
    
    ```php
    @verbatim
        <div class="container">
            Hello, {{ name }}.
        </div>
    @endverbatim
    ```
    

### 註解

```php
{{-- 這是 Blade 註解 --}}
<!-- 這是 HTML 註解 -->
```

### 三元運算

```php
{{ $name ?? 'Default' }}

// 等同於 js 的 
// const output = name ?? 'Default';
// 只有在 name === null 或 undefined 時才用 'Default'
```

### 條件

<aside>
💡

php falsy：`false`、`null`、`0`、`0.0`、`'0'`、`''`、`[]`

js falsy：`false`、 `null`、 `undefined`、 `0`、`-0`、 `0n`、`''`、`NaN`

</aside>

@if、@elseif、@else

```php
@if (count($records) === 1)
    我有一條記錄！
@elseif (count($records) > 1)
    我有多條記錄！
@else
    我沒有任何記錄！
@endif
```

@unless：如果條件不成立（php falsy，但不包含 `'0'`），就執行

```php
@unless (Auth::check()) 
    你尚未登入。 
@endunless

// 等同於
@if (!Auth::check())
    你尚未登入。
@endif

// 等同於 js 的 
// if (!isLoggedIn) {
//  console.log('你尚未登入。');
// }
```

@empty：變數是空值（php falsy）時，就執行

```php
@empty($records)
    // $records 是「空的」
@endempty
```

@isset：變數只要不是 null 時，就執行

```php
@isset($records)
    // $records 有定義，而且不是 null
@endisset
```

### 迴圈

```php
@for ($i = 0; $i < 10; $i++)
		// Laravel 8+ 適用
    <li @class(['is-init' => $i === 0])>
        目前的值為 {{ $i }}
    </li>
    
    <li class="{{ $i === 0 ? 'is-init' : null }}">
        目前的值為 {{ $i }}
    </li>
@endfor
```

```php
@foreach ($users as $user)
    <p>此使用者為 {{ $user->id }}</p>
    @if ($loop->first)
        第一個
    @endif
    
    @if ($loop->last)
        最後一個
    @endif
    
    @if ($loop->odd)
        奇數
    @endif
    
    @if ($loop->even)
        偶數
    @endif
@endforeach
```

@forelse：有資料就跑迴圈，沒資料就顯示替代內容

```php
@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>沒有使用者</p>
@endforelse

// 等同於 js 的
// if (users.length > 0) {
//   users.forEach(user => {
//     html += `<li>${user.name}</li>`;
//   });
// } else {
//   html += `<li>目前沒有使用者</li>`;
// }
```

```php
@while (true)
    <p>我永遠都在跑迴圈。</p>
@endwhile
```

```php
@switch($i)
    @case(1)
        First case...
        @break

    @case(2)
        Second case...
        @break

    @default
        Default case...
@endswitch
```

### 區塊

**@section**

> 頁面自訂內容、覆蓋 layout 的預設區塊
（子頁面告訴 layout：這個位置我要放什麼內容）
> 

**@hasSection / @sectionMissing**

> 檢查頁面某個 section 是否有被定義
> 
- `@hasSection('名稱')`：如果子元件有設定對應名稱
- `@sectionMissing('名稱')`：如果子元沒有有設定對應名稱

```php
<!-- layouts/app.blade.php -->
<header>
  // 如果子元件有設定 @section('navigation')，就顯示
  @hasSection('navigation')
    @yield('navigation')
  
  // 如果子元件沒有設定 @section('navigation')，就顯示
  @else
    @include('default-navigation')
  @endif
</header>
```

### 元件

**@include 引入檔案**

- 可以用父層的所有變數
- 也可以額外傳資料進去

`@include('檔案位置名稱', ['變數1' => '值1', '變數2' => '值2'])`

```php
<div>
    <!-- 引入檔案：resources/views/shared/errors.blade.php -->
    @include('shared.errors')

    <form>
        <!-- 表單內容 -->
    </form>
</div>

```

透過 controller 傳資料到 include 子檔案：

```php
<!-- controller -->
return view('page', [
  'errors' => $errors,
]);

<!-- page.blade.php -->
@include('shared.errors')

<!-- errors.blade.php -->
@if ($errors->any())
  <ul>
    @foreach ($errors->all() as $error)
      <li>{{ $error }}</li>
    @endforeach
  </ul>
@endif
```

透過資料迴圈渲染 include 子檔案：

`@each('有資料時要顯示的檔案', '陣列資料名稱', '迴圈內的資料名稱', 沒有資料時要顯示的檔案)`

```php
@each('view.name', $jobs, 'job', 'view.empty')
// 如果 $jobs 裡面有東西 → 就用 'view.name' 渲染每個 job
// 如果 $jobs 是空的 → 就渲染 'view.empty' 的內容
// 避免空畫面或要顯示「目前沒有資料」的訊息
```

**component**

- 封裝成 `<x-元件名稱>`
- 可以帶屬性
- 也可自帶 slot
- 可帶 class / 邏輯

步驟一

```bash
php artisan make:component Alert
```

Laravel 會生成兩個檔案：

1. **PHP class**：`app/View/Components/Alert.php`
2. **Blade template**：`resources/views/components/alert.blade.php`

步驟二

Blade template 內容

- `$type` → 從外部傳入的屬性
- `$slot` → 匿名插槽
- `$title` → 定義的具名插槽

```php
<!-- resources/views/components/alert.blade.php -->
<div class="alert alert-{{ $type }}">
		<h1>{{ $title }}</h1>
    <div>{{ $slot }}</div>
</div>
```

步驟三

在 Blade 使用 Component

- type 傳值
    - 傳字串：`type="字串"`
    - 傳變數：`:type="$var"`
    `:` → 告訴 Blade 這是 PHP 變數，不是字串
- slot 插槽
    - 匿名插槽：不用設定 `x-slot`、`name`
    - 具名插槽：設定 `name="變數名稱"`

```php
<x-alert type="error">
	  <x-slot name="title">標題</x-slot>
    發生錯誤，請重新操作。
</x-alert>
```

渲染結果

```html
<div class="alert alert-error">
    發生錯誤，請重新操作。
</div>
```

**定義 Class Component**

```php
<!-- resources/views/components/Alert.php -->
namespace App\View\Components;

use Illuminate\View\Component;

class Alert extends Component
{
    public $type;

    public function __construct($type = 'info')
    {
        $this->type = $type;
    }

    public function render()
    {
        return view('components.alert');
    }
}

```

### JSON

> 將資料轉成 JSON，提供給 JS 變數儲存
> 
1. 原生 PHP 寫法：
    - 沒有防 XSS
    
    ```php
    <script>
        var app = <?php echo json_encode($array); ?>;
    </script>
    ```
    
2. Laravel 官方安全寫法：
    - `json_encode`
    - 自動防 XSS
    - 確保 JS 型別正確（array / object / boolean）
    
    ```php
    <script>
        var app = {{ Illuminate\Support\Js::from($array) }};
    </script>
    ```
    
3. 2 的簡寫版本（推薦）：
    - 嘗試將複雜表達式傳遞給指令可能會導致意外錯誤
    
    ```php
    <script>
        var app = {{ Js::from($array) }};
    </script>
    ```
    

---

## 進階

### 自定義指令 directive

下方自定義用法：`@datetime($var)` 

```php
// 自定義 directive
<?php

namespace App\Providers;

use Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * 執行服務註冊後的啟動程序。
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('datetime', function($expression) {
            return "<?php echo ($expression)->format('m/d/Y H:i'); ?>";
        });
    }

    /**
     * 在容器註冊綁定。
     *
     * @return void
     */
    public function register()
    {
        // 自定義方法
    }
}
```

```php
@datetime($post->created_at)
```

### 判斷登入身份

```php
@auth('admin')
    // 已用「管理員身分」登入
@endauth

@guest('admin')
    // 尚未用「管理員身分」登入
@endguest
```

```php
// config/auth.php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'admin' => [
        'driver' => 'session',
        'provider' => 'admins',
    ],
],
```

@context

```php
@context('canonical')
    <link href="{{ $value }}" rel="canonical">
@endcontext
```

```html
<link rel="canonical" href="https://example.com/post/123">
```

---

## 語系

```php
// 資料夾結構
resources/lang/zh-TW/
resources/lang/en/
```

```php
// resources/lang/zh-TW/messages.php
return [
    'welcome' => '歡迎來到我們的網站',
    'welcome_user' => '歡迎你，:name！',
];
```

```php
// resources/lang/en/messages.php
return [
	'apples' => '{0} No apples|{1} One apple|[2,*] :count apples',
];
```

```php
// 新語法
// 會去找對應語系的 resources/lang/xx/messages.php 裡 welcome 的翻譯字串
{{ __('messages.welcome') }}

// 插入動態變數
{{ __('messages.welcome_user', ['name' => 'Tom']) }}
{{ __('messages.apples', ['count' => $count]) }}
```

```php
// 舊語法
trans('messages.welcome')

// 插入動態變數
{{ trans('messages.welcome_user', ['name' => 'Tom']) }}
{{ trans_choice('messages.apples', $count, ['count' => $count]) }}
```

![截圖 2026-01-19 下午5.15.30.png](Laravel%20Blade%20%E8%AA%9E%E6%B3%95/%E6%88%AA%E5%9C%96_2026-01-19_%E4%B8%8B%E5%8D%885.15.30.png)

### 備用語系

```php
// config/app.php
'fallback_locale' => 'en', // 設定備用語系
```