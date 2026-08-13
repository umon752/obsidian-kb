# 網頁生命週期   
參考：   
- [網頁生命週期 API](https://developer.chrome.com/docs/web-platform/page-lifecycle-api?hl=zh-tw)   
- [load、unload和pagehide、pageshow](https://blog.csdn.net/muzidigbig/article/details/132097456)   
   
   
## pageshow / pagehide   
當從瀏覽器快取載入頁面時會被觸發   
persisted：判斷是否為瀏覽器快取載入頁面   
```
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // 是瀏覽器快取載入頁面
    }
});
```
   
遇過需使用 pageshow event 的記錄：   
當此頁面 checkbox 被勾選時，到下一頁，再點擊瀏覽器返回按鈕，這時頁面中 checkbox 畫面渲染還是被勾選的狀態 (但實際 checked 為 false)   
   
 --- 
   
## load / unload   
當從瀏覽器快取載入頁面時不會被觸發   
