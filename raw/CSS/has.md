# :has   
- [Can I use](https://caniuse.com/?search=%3Ahas)   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)   
- [CSS-TRICKS](https://css-tricks.com/almanac/pseudo-selectors/h/has/)   
   
   
範例：   
```
.btn:has(.icon): {
	// 針對有 icon 的按鈕設定樣式
}

```
```
.body:has(option[value="dark"]:checked): {
	// 下拉選單切換暗色模式
	--background-color: black;
	--text-color: white;
}

```
   
