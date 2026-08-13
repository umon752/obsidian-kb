# border-image   
- [Can I use](https://caniuse.com/?search=border-image)   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image)   
- [CSS-TRICKS](https://css-tricks.com/almanac/properties/b/border-image/)   
- [Youtube](https://www.youtube.com/watch?v=44FTAS-qT8Q)   
   
   
   
漸層線條範例：   
```
.card: {
	border-bottom: 1px solid transparent;
	border-image: linear-gradient(90deg, rgba(white, 0) 0%, rgba(white, .3) 50%, rgba(white, 0) 100%);
	border-image-slice: 1;
}
```
圓角漸層邊匡範例：   
```
.card: {
	position: relative;
	border-radius: 20px;
	overflow: hidden;
}

.card::before {
	content: '';
  	position: absolute;
  	inset: 0;
  	border-width: 1px;
  	border-style: solid;
  	border-color: transparent;
  	border-radius: 20px;
  	background-image: linear-gradient(90deg, rgba(white, 0) 0%, rgba(white, .3) 50%, rgba(white, 0) 100%);
  	background-origin: border-box;
  	mask-image: linear-gradient(white, white), linear-gradient(white, white);
  	mask-clip: padding-box, border-box;
  	mask-composite: exclude, add;
}
```
