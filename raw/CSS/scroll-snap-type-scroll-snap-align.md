# scroll-snap-type、scroll-snap-align   
- [Can I use](https://caniuse.com/?search=scroll-snap-type)   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)   
- [CSS-TRICKS](https://css-tricks.com/almanac/properties/s/scroll-snap-type/)   
- [codepen 應用範例](https://codepen.io/giana/pen/BabdgjB)   
   
   
捲軸滑動會捕捉內部子元素的位置，對齊停留在子元素的位置   
  不會是 free mode 模式   
範例：   
```
<div class="wrapper">
	<div class="card"></div>
	<div class="card"></div>
	<div class="card"></div>
</div>
```
```
 .wrapper { 
	width: 300px
	display: flex;
	overflow-x: scroll 
	scroll-snap-type: x mandatory;
}

.card {
	scroll-snap-align: center;
}
```
