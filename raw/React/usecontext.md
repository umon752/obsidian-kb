# useContext   
**1️⃣  建立 Context**   
全域共享資料的「倉庫」   
```
// ThemeContext.js
import { createContext } from 'react';

// 建立 ThemeContext，預設值為 'light'
export const ThemeContext = createContext('light');

```
   
**2️⃣ 用 Provider 提供資料**   
把資料「廣播」出去   
```
// App.js
import { ThemeContext } from './ThemeContext';
import Page from './Page';

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

```
   
**3️⃣ 在子元件中使用 useContext() 拿資料 **   
不再需要 props   
```
// Button.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button() {
  const theme = useContext(ThemeContext); // ← 取得 Provider 提供的資料

  return <button className={theme}>我是 {theme} 主題按鈕</button>;
}

```
   
