# Ajax   
## fetch   
```
this.spinner?.show();

fetch('apiurl')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP 錯誤：${res.status}`);
      }
      return res.json();
    })
    .then(data => {
	  // 成功執行
      console.log('data', data)
    })
    .catch(error => {
	  // 錯誤執行
      console.error('資料取得錯誤:', error);
    })
    .finally(() => {
	  // 結束執行
      this.spinner?.hide();
    });
```
   
   
 --- 
   
## AJAX 資料查詢功能中的 API 傳參設計：GET Query 與 POST Body 的選擇與實作比較   
### 方法一：GET API（query string 傳參數）   
```
fetch('/api/products?page=2&perPage=10&category=3')

```
後端接收方式（Node.js Express 範例）：   
```
const { page, perPage, category } = req.query;

```
### 特點：   
|                                                     優點   <br> |                                                      缺點   <br> |
|:--------------------------------------------------------------|:---------------------------------------------------------------|
|                               ✅ 可直接複製網址分享（有助 SEO 和 UX）   <br> |                                     ❌ URL 長度有限（不適合大量資料）   <br> |
|                                     ✅ 適合「讀取資料」用途，如查詢商品   <br> |                                     ❌ 較不適合敏感資訊（資料會在網址上）   <br> |
|                                    ✅ 可以搭配瀏覽器前進/後退，記住狀態   <br> |                                                                |
|                                      ✅ 快取友善（CDN / 瀏覽器）   <br> |                                                                |

### 使用情境：   
- 商品列表頁（篩選、分頁）   
- 搜尋頁面   
- 可分享的頁面（例如：/products?page=3&category=2）   
   
   
### 流程解析：   
載入頁面流程：   
- 解析網址上的 query 參數（如 page、category…）   
- 根據參數更新 UI 狀態（如下拉選單的 `selected`、pagination 的 `active` 頁）   
- 發送 fetch (GET) 請求，帶入相同參數   
- 渲染資料（render data）   
- 綁定互動事件（如分頁點擊、分類變更   
   
   
觸發互動事件（如使用者切換分類或點擊分頁）：   
- 更新狀態（例如 currentCategory、currentPage）   
- 更新網址上的 query 參數（使用 `history.pushState` 或 `updateURLQuery()`）   
- 發送 fetch (GET) 請求   
- 渲染資料（render data）   
- 更新 UI 狀態（例如分頁 active 樣式）   
- 重新綁定互動事件（必要時）   
- （可選）捲動至目標區塊   
   
   
### ✅ 可選補強項目   
|                          類別   <br> |                                                                                              說明   <br> |
|:-----------------------------------|:-------------------------------------------------------------------------------------------------------|
|                ✅ 404 / 錯誤處理   <br> |                                                        若 `category=999` 導致無資料，可顯示「查無資料」，或導回預設分類   <br> |
|           ✅ `popstate` 事件監聽   <br> |                                                         使用者透過瀏覽器「上一頁」、「下一頁」切換，需重新解析 URL 並 fetch   <br> |
|                  ✅ URL 潔淨處理   <br> |                                                        例如：如果沒有 `category`，可以從 URL 移除它（這你已經做得很好）   <br> |
|               ✅ debounce 處理   <br> |                                                                       分類切換很頻繁時避免短時間多次發送 request   <br> |

   
 --- 
   
### 方法二：POST API（用 body 傳參數）   
```
fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    page: 2,
    perPage: 10,
    category: 3
  })
});

```
後端接收方式（Node.js Express 範例）：   
```
const { page, perPage, category } = req.body;

```
### 特點：   
|                                                      優點   <br> |                                                   缺點   <br> |
|:---------------------------------------------------------------|:------------------------------------------------------------|
|                                     ✅ 支援大量或複雜資料（適合複合篩選）   <br> |                                        ❌ 無法直接從網址辨識狀態   <br> |
|                                      ✅ 可傳送敏感資訊（不會出現在網址）   <br> |                                         ❌ 不利於快取和 SEO   <br> |
|                                      ✅ 更有彈性（可以傳陣列、巢狀物件）   <br> |                                   ❌ 不能靠網址還原狀態（刷新會消失）   <br> |

### 使用情境：   
- 複雜篩選（例如多選 checkbox、價格區間）   
- 管理系統內部查詢（不需分享連結）   
- 查詢需身份驗證（token）   
- 不需要網址同步狀態的功能   
   
   
 --- 
   
### 總結：   
|                                                   情境   <br> |                               建議用法   <br> |
|:------------------------------------------------------------|:------------------------------------------|
|                               ✅ 商品列表頁（分頁 / 分類 / 可分享）   <br> |               用 **GET**，參數放在 URL 上   <br> |
|                                        ✅ 內部資料查詢、條件複雜   <br> |               用 **POST**，參數放在 body   <br> |
|                               ✅ 想記住狀態 / 支援前進後退 / SEO   <br> |                        一律用 **GET**   <br> |

   
