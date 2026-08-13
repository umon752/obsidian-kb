# useState   
用 `setState` 更新資料，React 就會重新渲染畫面   
### updater function   
你不再依賴「你自己記住的 count」，而是交由 React 傳入正確的值，這樣就不會踩中閉包陷阱。   
適用於非同步更新、多次連續更新、根據目前狀態進行邏輯判斷或加減乘除。   
```
setCount((prev) => prev + 1); // ✅ React 會主動傳入「最新的 count」
```
內部運作方式（簡化版本）：   
```
function setCount(action) {
  const newValue = typeof action === 'function' ? action(currentValue) : action;
  // 接著用 newValue 來更新狀態
}
```
   
 --- 
   
### 為什麼 useState 是非同步的？   
「集中處理狀態變化，提高效能與穩定性」。   
為了性能優化與批次更新，把所有 setState() 請求收集起來，等這一輪事件處理完，再一次性更新畫面。   
   
**useState callback 更新流程圖**   
```
[事件觸發]
     ↓
[呼叫 setCount(prev => prev + 1)]
     ↓
[React 將更新函數加入狀態更新佇列]
     ↓
[React 在下一輪 render 前處理所有佇列中的更新函數]
     ↓
[每個更新函數接收最新的 state 值作為參數]
     ↓
[計算新的 state 值並更新]
     ↓
[觸發重新 render]

```
   
**React 18 後的更新機制**   
- 本身能「識別哪些是互動性優先」   
    例如：使用者點擊、輸入（onClick、onChange）   
      → React 自動將它們列為**高優先更新**   
- 開發者也可以用 API 控制優先順序   
    例如：startTransition()
[官方文件](https://react.dev/reference/react/useTransition#usetransition)   
    ```
    const [isPending, startTransition] = useTransition()
    
    startTransition(() => {
      setData(newData); // 標記這個更新是「不急的」
    });
    
    ```
    這代表：如果有點擊、輸入同時發生，React 會**優先處理互動性更新**，然後才處理這個 `startTransition` 的更新。   
   
   
**實際應用場景**   
- 使用者輸入搜尋框內容時 → `setInputValue()` 是高優先   
- 同時你要 fetch 新的結果並更新清單 → `startTransition(() => setList(newList))` 是低優先   
   
這樣就能做到：使用者輸入不會卡頓，結果慢一點出現沒關係。   
 --- 
   
### 總結對照表   
|                                      情境   <br> |                             使用方法   <br> |                                             原因說明   <br> |
|:-----------------------------------------------|:----------------------------------------|:--------------------------------------------------------|
|                               要設定成明確的數字   <br> |                      setCount(0)   <br> |                                     不依賴前一個值，直接指定   <br> |
|                            單次 +1（按鈕點一下）   <br> |              setCount(count + 1)   <br> |                                   同一 render、可讀性高   <br> |
|                           多次連續更新（加三、加十）   <br> |       setCount(prev => prev + 1)   <br> |                                 每次都從最新值運算，避免只加一次   <br> |
|                     非同步更新（如 setTimeout）   <br> |       setCount(prev => prev - 1)   <br> |                                      保證拿到最新的值做運算   <br> |
|                           需要條件判斷後決定是否更新   <br> |             setCount(...) 根據邏輯選擇   <br> |                                    依情況決定是傳值還是用函式   <br> |

