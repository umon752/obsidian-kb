# useRef   
可以存資料又不會觸發重新渲染   
  可以存取 DOM 元素   
  用來建立一個「可持久存在的參考物件」（reference object）   
  這個物件只有一個屬性： `.current`   
   
### 非同步時改變狀態方法   
範例一：useState 使用 callback function 更新狀態   
```
import React, { useState } from 'react';
 
export const MyComponent: React.FC<{}> = () => {
    const [flag, setFlag] = useState(false);
 
    function dealClick() {
        setFlag(!flag);
 
        setTimeout(() => {
            setFlag(flag => !flag);
        }, 2000);
    }
 
    return (
        <button onClick={dealClick}>{flag ? "true" : "false"}</button>
    );
}
```
範例二：使用 useRef 儲存狀態來更新狀態：   
```
import React, { useState, useRef } from 'react';
 
export const MyComponent: React.FC<{}> = () => {
    const [flag, setFlag] = useState(false);
    const flagRef = useRef(flag);
    flagRef.current = flag;
 
    function dealClick() {
        setFlag(!flagRef.current);
 
        setTimeout(() => {
            setFlag(!flagRef.current);
        }, 2000);
    }
 
    return (
        <button onClick={dealClick}>{flag ? "true" : "false"}</button>
    );
}
```
   
