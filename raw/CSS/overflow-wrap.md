# overflow-wrap   
舊名 `word-wrap`   
  是否允許長單字強制換行   
  只有當內容溢出時生效   
- [Can I use](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wraphttps://caniuse.com/?search=overflow-wrap)   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)   
- [CSS-TRICKS](https://css-tricks.com/almanac/properties/o/overflow-wrap/)   
   
   
範例：   
```
body {
	overflow-wrap: break-word; // 解決長單字、長網址不換行的問題
	hyphens: auto; // 單字換行時更自然、有語意地切斷
}

```
