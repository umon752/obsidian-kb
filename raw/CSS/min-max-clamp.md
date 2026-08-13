# min()、max() 、clamp()   
- [Can I use](https://caniuse.com/?search=min())   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/min)   
- [CSS-TRICKS](https://css-tricks.com/min-max-and-clamp-are-css-magic/)   
   
   
## min()   
始終返回最小數值   
範例：   
```
.box: {
	width: min(20vw, 400px);
}

```
## max()   
始終返回最大數值   
範例：   
```
.box: {
	width: max(20vw, 400px);
}

```
## clamp   
範例：   
```
.box: {
	width: clamp(min, preferred, max);
}

// 等同於
.box {
	min-width: min;
	width: preferred;
	max-width: max;
}
```
可以有 vw + rem 的功能：   
```
font-size: clamp(min, 10vw + 1rem, max)
```
   
