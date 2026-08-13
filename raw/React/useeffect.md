# useEffect   
function component（函式元件）沒有這些生命周期   
`useEffect` 內的函式就很像是組件渲染完後要執行的 callback function   
```
useEffect(() => {
  // 執行副作用
  return () => {
    // 清除副作用
  };
}, []);

```
   
 --- 
   
### **useEffect 的執行時機**   
|                     寫法   <br> |                                 執行時機   <br> |                                     對應 class 寫法   <br> |
|:------------------------------|:--------------------------------------------|:-------------------------------------------------------|
|          useEffect(fn)   <br> |                      每次 render 後都會執行   <br> |      componentDidMount() + componentDidUpdate()   <br> |
|      useEffect(fn, [])   <br> |                         只在第一次掛載後執行一次   <br> |                             componentDidMount()   <br> |
| useEffect(fn, [count])   <br> |                       當 count 改變時才執行   <br> |                   componentDidUpdate()（需手動比對變化）   <br> |

   
 --- 
   
### 閉包陷阱   
閉包就是一個「**函式記住了當下作用域裡的變數**」，即使外部的作用域已經不存在，它也能繼續使用那些值   
