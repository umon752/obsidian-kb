# counter()、counter-reset、counter-increment   
- [Can I use](https://caniuse.com/?search=counter())   
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/counter)   
- [CSS-TRICKS](https://css-tricks.com/almanac/functions/c/counter/)   
   
   
針對 HTML 元素加上序號   
範例：   
```
:root {
	counter-reest: headings;
}

h2 {
	counter-increment: headings;
}

h2::before {
	content: counter(headings);
}
```
