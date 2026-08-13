# 瀏覽器下載資源的優先度   
## 瀏覽器資源下載順序優先度   
- Highest: HTML, CSS, Fonts   
- High: script (預載影像之前，指放在 <head> 裡面的 <script>), 在 viewport 內的影像   
- Medium: script   
- Low: script (async), image, media   
- Lowest: mismatched CSS (有問題 css), `prefetch` resources   
   
   
 --- 
# Link   
## Preload   
用最快的速度優先下載此資源。   
- as：是用來指定資源的類別的。這個屬性需要指定，不然可能會重複下載同一份資源。   
- [crossorigin]()：這個 attribute，表示 anonymous mode CORS，否則 [字型會被重複下載兩次](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)。   
- 也可以搭配 media query 一起使用   
   
```
<link rel="preload" as="style" href="critical.css">
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="font" crossorigin="anonymous" type="font/woff2" href="myfont.woff2">
<link rel="preload" href="./assets/front/images/layout/loading/mascot-6.svg" as="image">
<link rel="preload" href="./assets/front/videos/loading/intro.mp4" as="video" type="video/mp4">

```
```
<link rel=preload as=image href="someimage.jpg" media="(max-width: 600px)">
```
   
## Preconnect   
這個網頁將會在不久的將來下載某個 domain 的資源，請先幫我建立好連線。   
引用 CDN 可使用此方法預先建立連線，減少載入時間。   
```
<link rel="preconnect" href="https://example.com">
```
   
## dns-prefetch   
跟 `preconnect` 類似，節省 DNS 查找解析網址轉為 IP 的時間。   
   
## Prefetch   
等等會用到，有空的話幫我先下載。資源將會等頁面完全下載完以後，以 Lowest 優先度下載。   
   
 --- 
   
# script   
## defer   
會等到 HTML 都完全解析後，才會執行，不會擋住畫面的渲染。如果腳本在 HTML 解析完成前就下載好，會等到 HTML 都完全解析後，才會執行。   
   
## async   
非同步，在解析 HTML 時不用等 `<script>` 腳本的下載與執行。`async` 的腳本載入與 HTML 解析是彼此獨立的，因此只要下載完就會馬上執行。   
