# CSS

## 羽化

```php
mask-image: linear-gradient(to top, rgba(0,0,0, 1) 90%, rgba(0,0,0, 0) 100%)
mask-image: radial-gradient(circle at center, rgba(0,0,0, 1) 40%, rgba(0,0,0, .6) 60%, rgba(0,0,0, 0) 100%);
```

## 圖片形狀遮罩

```php
mask-image: url('mask.png');
mask-size: 100% 100%;
mask-repeat: no-repeat;
```

## SVG mask + 高斯模糊（更自然羽化）

```php
<!-- 內聯 SVG mask 示範 -->
<svg width="0" height="0" style="position:absolute;">
  <defs>
    <filter id="blurFilter">
      <feGaussianBlur stdDeviation="8" />
    </filter>

    <mask id="softMask" maskContentUnits="objectBoundingBox">
      <!-- 這裡先畫一個白色矩形(顯示區域)，再用 filter 讓邊緣模糊 -->
      <rect x="0" y="0" width="1" height="1" fill="white" filter="url(#blurFilter)"/>
    </mask>
  </defs>
</svg>

<div class="svg-mask">
  <img src="https://placekitten.com/800/500" alt="kitten">
</div>

<style>
.svg-mask { width:600px; height:400px; overflow:hidden; }
.svg-mask img {
  width:100%; height:100%; object-fit:cover;

  /* 直接 reference SVG mask id */
  mask: url(#softMask);
  -webkit-mask: url(#softMask);
}
</style>
```