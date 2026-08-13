# useReducer   
**建議使用 `useReducer` 的時機：**   
- 狀態之間有邏輯或流程關聯（例如：步驟流程、表單狀態）   
- 同一個動作會同時影響多個 state (`useState` 超過 3 個以上、還經常互相影響時)   
- 你希望讓邏輯集中、好維護   
- 想為未來導入 Redux 打好基礎   
   
   
**`reducer` 本身是一個純函式（pure function），也就是：**   
- 固定的輸入（ `state` 和 `action`），它永遠會產出**相同的新狀態**   
- 不會改動原本的 `state`，而是**回傳一份新的物件**   
- 只關心輸入與輸出   
- 不能有副作用（side effects），也就是不能寫 `fetch()`、 `setTimeout()`、 `console.log()` 等副作用   
   
內部運作方式（簡化版本）：   
```
function reducer(state, action) {
  // 根據 action 內容，決定要怎麼改變 state
  return newState;
}

```
範例：   
```
const [state, dispatch] = useReducer(reducer, initialState);
```
```
<button onClick={() => dispatch({ type: 'increment' })}>
  增加
</button>

```
```
case 'increment':
  return { count: state.count + 1 };

```
|       名稱   <br> |                                                    用途   <br> |
|:----------------|:-------------------------------------------------------------|
|    state   <br> |                                 當前的狀態（由 reducer 計算而來）   <br> |
| dispatch   <br> |                         一個函式，用來送出 action 給 reducer 處理   <br> |

`dispatch` 就是 `useReducer` 的「觸發器」，只有透過它，你才能讓 reducer 執行、更新狀態。   
