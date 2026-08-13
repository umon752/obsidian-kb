# 事件 (Event)   
## 事件傳遞 (Event Flow)   
### 事件捕獲 (Event Capturing)   
傳遞順序：1   
capture: true   
   
### 事件目標(Event Target)   
傳遞順序：2   
   
### 事件冒泡 (Event Bubbling)   
傳遞順序：3   
capture: false (事件監聽預設)   
阻止冒泡方法：   
- e.stopImmediatePropagation(); (阻止冒泡 + 阻止該元素相同事件類型的監聽)
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)   
- e.stopPropagation(); (阻止冒泡)   
   
   
 --- 
   
## 事件監聽   
```
el.addEventListener(type, listener, options);
```
###    
### option   
物件格式   
- capture：false (預設阻止冒泡)   
- once：false (預設不會只調用一次監聽)   
- passive：false (預設永遠會調用 `preventDefault()`，只有在 Safari 預設為 true 永遠不會調用 `preventDefault()`)   
    通常監聽 touch 事件的時候，頁面其實會有一個短暫的停頓（大概 200ms），瀏覽器不知道我們是否要 `preventDefault()`，所以它需要一個延遲來檢測。這會導致滑動顯得比較卡頓，因此使用 `passive: true` 可以優化效能。
目前有些 Chrome 版本的 `touch` 事件都會預設為 true。   
- signal：標記監聽，可以在某些時候一次同時刪除被標記的事件監聽。
範例：   
    ```
    const controller = new AbortController();
    
    btn.addEventListener(
      "click",
      (event) => {
        console.log("greet:", event);
      },
      { signal: controller.signal },
    ); // pass an AbortSignal to this handler
    
    controller.abort(); // removes any/all event handlers associated with this controller
    
    ```
   
   
### AbortController   
[MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/AbortController)   
[參考](https://blog.kalan.dev/abort-controller)   
[TanStack - React 文件](https://tanstack.com/query/v4/docs/framework/react/guides/query-cancellation)   
常使用在想要終止一個或多個 request 的時候。   
fetch：   
```
const abortController = new AbortController();
const signal = abortController.signal;

fetch("/path", { signal: signal });
setTimeout(() => abortController.abort(), 5000);

```
axios：   
```
const controller = new AbortController();
const signal = abortController.signal;

axios.get('/path', {
   signal: signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort();
```
   
### CustomEvent   
[MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/CustomEvent)｜[codepen](https://codepen.io/letswrite/pen/OJxZJYq?editors=1111)   
創建和觸發自定義事件的 API，讓你可以建立自己的事件系統進行組件間通訊。   
優點：   
- 解耦合：組件間不需要直接引用就能通訊   
- 靈活性：可以傳遞任意複雜的資料   
- 標準化：使用瀏覽器原生的事件機制   
- 一對多：一個事件可以被多個監聽器接收   
   
   
```
const input = document.getElementById('input');
const btn = document.getElementById('button');

btn.addEventListener('click', e => {
	let value = input.value;
	if(value === 'letswrite') {
		
		// 創建自定義事件
		let eventDemo = new CustomEvent('letswrite', {
			detail: new Date()
		})
		// 觸發事件
		document.dispatchEvent(eventDemo)
	
	}
})

// 監聽自定義事件
document.addEventListener('letswrite', e => {
	alert(e.detail)
})
```
   
在子元素觸發，`bubbles: true`：   
```
const event = new CustomEvent('myEvent', { bubbles: true });
button.dispatchEvent(event);

// 結果：button → child → parent → document
// 事件會向上冒泡到父元素
```
   
統一在 document 監聽：   
對於全域事件通訊，統一在 document 上監聽是最常見且有效的做法，因為：   
- 確保所有監聽器都能收到事件   
- 避免複雜的 DOM 層級問題   
- 程式碼更清晰易維護   
   
```
// 所有監聽器都掛在 document 上
document.addEventListener('myEvent', function(e) {
  // 根據需要處理不同組件的邏輯
  if (e.detail.target === 'modal') {
    // 處理模態框
  }
  if (e.detail.target === 'navbar') {
    // 處理導航欄
  }
});

// 觸發事件
document.dispatchEvent(new CustomEvent('myEvent', {
  detail: { target: 'modal', data: '...' }
}));
```
   
   
