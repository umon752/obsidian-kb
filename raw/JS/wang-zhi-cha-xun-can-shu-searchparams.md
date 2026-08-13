# 網址查詢參數 (searchParams)   
### popstate   
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)   
使用者觸發瀏覽器前進 / 後退時觸發   
使用 `history.replaceState` 或 `URLSearchParams` 改變 URL，不會觸發 `popstate`。   
```
window.addEventListener('popstate', (event) => {
  console.log('使用者按下了瀏覽器返回或前進');
});

```
   
## searchParams   
透過網址狀態去變更資料   
```
const params = new URLSearchParams(location.search);
// 會得到一個 URLSearchParams 實體，提供一組操作查詢參數的方法。
```
   
### URLSearchParams 實體方法   
- .get('key')：取得參數值   
- .set('key', value)：變更參數值   
- .delete('key')：刪除參數   
- .has('key')：是否有此參數 (回傳 true/false)   
- .toString()：取得網址 query string (ex: `'foo=999&bar=test'`)   
   
   
URLSearchParams 實體轉成物件：   
```
Object.fromEntries(params.entries());
// => { foo: '123', bar: 'test' }

```
物件轉 URLSearchParams 實體字串：   
```
const obj = { foo: '123', bar: 'test', tags: ['a', 'b'] };
const queryString = new URLSearchParams(obj).toString();

console.log(queryString); // foo=123&bar=test&tags=a&tags=b

```
   
### 變更網址 query string   
方法一：   
```
const params = new URLSearchParams(location.search);
history.replaceState(null, '', '?' + params.toString());
```
方法二：   
```
const url = new URL(window.location);
url.searchParams.set('page', 1);
history.pushState({}, '', url);
```
   
