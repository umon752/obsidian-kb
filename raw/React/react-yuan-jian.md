# React 元件   
[https://realnewbie.com/coding/javascript/react-component-lifecycle-explained-from-birth-to-unmount/](https://realnewbie.com/coding/javascript/react-component-lifecycle-explained-from-birth-to-unmount/)    
   
### 特點   
- 本質上就是函式   
- 每當 props 或 state 改變，React 會重新呼叫這個函式，得到最新的畫面結構（Virtual DOM），然後再去比對、更新實際 DOM   
- 只要有任何觸發重新渲染的原因，整個元件的函式內容就會**全部再跑一遍**   
- React 是用 **shallow comparison（淺層比較）** 來判斷 props 有沒有改變的，因此巢狀元件，當父層狀態變更時， React 無法比為子層有沒有狀態變更，統一都會因為父層狀態變更了，所以連帶子層也跟著更新，影響到不相關聯的子元件或函式而造成效能負擔   
- Hook 只能在元件中使用，Hook 其實是建立在一整套「狀態追蹤系統」之上的，而這個系統只在**元件渲染階段**被啟動   
   
   
 --- 
   
### React 如何判斷「這是元件」   
- 在 JSX 中，只要**函式名稱是大寫開頭**，React 就會把它當成元件使用   
- **在 render 過程中有沒有用 JSX 把它呼叫成一個元件**   
    ```
    <MyComponent /> // JSX 呼叫，React 才會進一步處理並執行這個函式
    
    ```
   
   
### 生命週期渲染機制   
React 設計上就是「**每一種狀態都會被渲染出對應的畫面**」，即使現在狀態是「還沒資料」，也能對應一個適當的畫面（例如：顯示 loading 中）。   
   
React 的渲染過程：   
- 它會試著**批次處理更新**   
- 它有時會**預先算好畫面再決定要不要更新（如 Concurrent Mode）**   
- 它甚至可能在中途**中斷、取消、再重新 render**   
|                <br>步驟   <br> |                                            發生的事   <br> |                     狀態值   <br> |
|:-----------------------------|:-------------------------------------------------------|:-------------------------------|
|         1️⃣ 初次 render   <br> |                     members 是空陣列 → React 渲染出空的    <br> |                      []   <br> |
|              2️⃣ 掛載完成   <br> |                        useEffect 執行，開始發送 API 請求   <br> |                      []   <br> |
|              3️⃣ 資料回來   <br> |                        呼叫 setMembers(data)，更新狀態   <br> |   [member1, member2, …]   <br> |
|         4️⃣ 更新 render   <br> |                             React 再次渲染畫面，顯示資料列表   <br> |   [member1, member2, …]   <br> |

**1️⃣  初次 render**   
React 根據當前的 state（例如空陣列、null）去建立 Virtual DOM → 計算出一個對應的 UI。   
此時 useEffect 還沒執行，畫面已經先出現在瀏覽器上。   
   
**2️⃣ 完成掛載（commit phase）**   
當畫面真正顯示出來、DOM 結構已經渲染完畢，React 才會去觸發 `useEffect(() => {...}, [])` 中的副作用。   
   
**3️⃣ 更新階段（Updating Phase）**   
當你呼叫 `setState()` 或 `setMembers(data)` 改變狀態時，會進入 **更新階段**：   
1. React 偵測到 state 或 props 改變   
2. 執行新的 render → 建立新的 Virtual DOM   
3. 對比新舊 DOM（diffing）   
4. 更新畫面中真正變動的部分（高效！）   
   
React 使用 Virtual DOM 做差異比對（diffing），只會更新有變化的部分，效能處理得非常好   
