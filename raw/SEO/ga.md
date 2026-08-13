# GA   
## 整體關係圖   
```

使用者行為（點擊、瀏覽、表單送出…）
        ↓
【Data Layer】
  儲存這些行為資料
        ↓
【GTM（Google Tag Manager）】
  負責接收、判斷、觸發對應的追蹤程式
        ↓
【GA4（Google Analytics 4）】
  收集並分析這些資料

```
   
 --- 
   
## Data Layer（資料層）   
📖 是**什麼：   
一個在網站中暫存資料的「JavaScript 物件」，   
用來統一整理「要追蹤的資料」。   
📦 功**能：   
- 把使用者行為或頁面資料放進一個結構化的物件中。   
- 提供給 GTM 或其他追蹤工具使用。   
   
🧠 例**子：   
```

window.dataLayer = window.dataLayer || [];
dataLayer.push({
  event: 'purchase',
  transaction_id: 'T12345',
  value: 1990,
  items: [
    { id: 'A01', name: 'T-Shirt', price: 990 },
    { id: 'B02', name: 'Shoes', price: 1000 }
  ]
});

```
這段就是告訴 GTM：「有一個購買事件，總金額 1990 元。」   
   
 --- 
   
## Google Tag Manager（GTM）   
📖 是**什麼：   
一個「**標籤管理工具**」，   
讓你不用改動網站程式碼，就能控制網站上跑哪些追蹤代碼。   
📦 功**能：   
- 接收 Data Layer 資料。   
- 根據條件觸發對應「Tag」（例如送出 GA4 事件、Meta Pixel、Hotjar 等）。   
- 可視化管理各種追蹤程式。   
   
🧠 例**子：   
> 當 dataLayer 裡出現 event: 'purchase' 時，   

GTM 會觸發一個 GA4 的「購買事件」tag。   
   
如果是 app，會透過連動 firebase 來追蹤數據   
   
**環境拆分：**   
使用 GTM 內建的「環境（Environments）」功能   
GTM 有正式、測試、開發三種環境，可以各自有不同 snippet。   
🪄 設定步驟：   
1. 在 GTM 介面左側選單 → **Admin（管理） → Environments（環境）**   
2. 建立一個「Staging」或「Dev」環境。   
3. 取得專屬的測試環境 snippet（看起來會多一串 query，例如 `?gtm\_auth=xxx>m\_preview=xxx>m\_cookies\_win=x）。`   
4. 把這段放在測試站，而正式站仍用正式版 snippet。   
   
✨ 好處：   
- 仍使用同一個 GTM 容器（方便共用設定）。   
- 但不同環境的資料可獨立測試。   
- 可在 GTM 的「預覽模式」中測試特定版本。   
   
   
 --- 
   
## Google Analytics 4（GA4）   
📖 是**什麼：   
Google 的新版網站／App 數據分析工具。   
📦 功**能：   
- 收集使用者行為數據（頁面、事件、轉換等）。   
- 提供報表分析（流量來源、使用者路徑、留存率、轉換率等）。   
- 可整合到 BigQuery、Looker Studio 等進階分析工具。   
   
🧠 例**子：   
> 當 GTM 送出購買事件，GA4 就會記錄：   

「使用者在 2025/10/07 購買了商品 A01，金額 990。」   
   
**環境拆分：**   
可以分別建立測試、正式環境用的 GA ID
如果想同步測試、正式站程式碼，為了方便好維護，不特別區分 GA ID 時，記得用環境判斷將 ga code 只在正式站中顯示。   
   
 --- 
   
## 簡化比喻   
|             角色   <br> |        比喻   <br> |                                                  功能   <br> |
|:----------------------|:-----------------|:-----------------------------------------------------------|
| **Data Layer**   <br> |       記錄本   <br> |                                           寫下使用者做了什麼   <br> |
|        **GTM**   <br> |       傳話人   <br> |                                   看記錄本，決定要把哪些資料送去哪裡   <br> |
|        **GA4**   <br> |       分析師   <br> |                                      收到資料後，整理成圖表與報表   <br> |

 --- 
   
## 常見的開發結構   
在前端會看到這樣的流程：   
```

// 使用者完成購買
dataLayer.push({
  event: 'purchase',
  value: 1990,
});

// GTM 偵測到 event 'purchase' → 觸發 GA4 Tag
// GTM 將事件送到 GA4 → GA4 收集資料並顯示於報表

```
   
 --- 
   
### 資料視覺化與報表工具   
- **Looker Studio**（原名 **Google Data Studio**）
Google 推出，把各種資料來源（Google Analytics、BigQuery、Excel、API…）整合成可互動的圖表與報表。   
