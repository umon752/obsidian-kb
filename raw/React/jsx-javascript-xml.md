# JSX (JavaScript XML)   
它是一種「語法糖」，讓你可以在 JavaScript 中像寫 HTML 一樣寫出畫面結構。   
### JSX 的特點   
|                      特性   <br> |                                                    說明   <br> |                      範例   <br> |
|:-------------------------------|:-------------------------------------------------------------|:-------------------------------|
|               看起來像 HTML   <br> |                           但不是 HTML，而是 JavaScript 的語法糖   <br> |      `<div>Hello</div>`   <br> |
|              可以用 JS 表達式   <br> |                                          用 `{}` 包住 JS   <br> |       `<h1>{name}</h1>`   <br> |
|           要 return 才能顯示   <br> |               JSX 只能出現在 function component 的 return 中   <br> | `return <div>123</div>`   <br> |
|      class 改叫 className   <br> |                                     因為 class 是 JS 關鍵字   <br> | `<div className="box">`   <br> |

React 接收到這段 JSX 結構後：   
1. 轉換成 **Virtual DOM（虛擬 DOM），**這是一種 JavaScript 物件的樹狀結構，描述畫面要怎麼顯示   
2. 比對前一次的 Virtual DOM（diff 過程），只更新有改變的部分，提高效率   
3. 把結果套用到真實畫面（DOM）   
