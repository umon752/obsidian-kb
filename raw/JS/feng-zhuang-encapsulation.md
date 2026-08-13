# 封裝（Encapsulation）   
## 封裝（Encapsulation）   
限制對物件內部狀態的讀、寫，提高安全性，防止外部代碼直接更改物件的內部狀態。   
通過定義良好的接口與外界進行交互。封裝的主要目的是提高程式碼的模組化、可讀性、可維護性和安全性。   
透過函式作用域、閉包 (Closure)、class 可以實現封裝封裝。   
   
 --- 
##    
## 閉包 (Closure)   
透過函式的作用域讓函式可以記住內部的變數，提供外部創建並執行函式來改變函式內部的變數狀態。
通常是函式裡面會 return 函式，也可以在函式內部定義不同方法來模擬私有變數。   
基本閉包範例：   
```
function createCounter() {
    let count = 0; // `count` 是封閉在 `createCounter` 函式作用域內的變數

    return function() {  // 這個匿名函式是閉包
        count++;  // 它能訪問外部函式的變數 `count`
        return count;
    };
}

const counter = createCounter();  // 呼叫 createCounter() 返回一個閉包
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

```
引用的是變數是物件或陣列，返回經過**淺拷貝或深拷貝**封裝的值，防止外部修改內部狀態：   
```
function createPerson(name, age) {
    let _info = { name: name, age: age }; // 私有物件

    return {
        getInfo: function() {
            return { ..._info }; // 返回淺拷貝，防止外部修改原始物件
        },
        setInfo: function(newName, newAge) {
            _info.name = newName;
            _info.age = newAge;
        }
    };
}

const person = createPerson('Alice', 30);
const info = person.getInfo();
info.name = 'Bob'; // 嘗試修改外部取得的物件
console.log(person.getInfo().name); // 'Alice'，原始物件未被修改

```
模擬私有變數和方法：   
```
function Person(name) {
    let _name = name; // `_name` 是私有變數

    this.getName = function() { // `getName` 是公開方法，能訪問 `_name`
        return _name;
    };

    this.setName = function(newName) { // `setName` 是公開方法，能修改 `_name`
        _name = newName;
    };
}

const person = new Person("Alice");
console.log(person.getName()); // "Alice"
person.setName("Bob");
console.log(person.getName()); // "Bob"
console.log(person._name); // undefined，外部無法直接訪問 `_name`

```
`new` 會創建一個新的空對象，新對象的 `\_\_proto\_\_` 指向構造函式的 `**prototype，**`這會讓這個對象可以訪問從構造函數的 `prototype` 繼承的屬性和方法。
構造函式內的 `this` 會綁定到的新對象，新對象就可以使用構造函式內的方法。
除非構造函式明確返回另一個對象，否則 `new` 操作符會自動返回這個新創建的對象。
   
el.addEventListener('click', (e) => { this.handleClick(e) }) `
`在建構函式或 class 裡面 `addEventListener` 綁定事件時，因為這個事件是基於函數的引用來進行綁定的。
所以需要保留原始的函數引用，當移除事件監聽時才可以正確被移除才可以正確被移除。   
```
// 用變數存起來
const handleClickWrapper = (e) => { this.handleClick(e) };
el.addEventListener('click', handleClickWrapper);

// 之後當你需要移除事件監聽時
el.removeEventListener('click', handleClickWrapper);
```
   
 --- 
##    
## 柯里化 (Currying)   
將多參數函式轉換為一系列單參數函式的方法。
利用閉包特性將一個接受多個參數的函式轉換為一個接受單一參數的函式，並返回一個新的函式來接受剩餘的參數，直到所有的參數都被提供為止。   
一次處理一個參數，提高程式的彈性和可讀性。   
```
function curryAdd(x) {
    return function(y) {
        return x + y;
    };
}

const addTwo = curryAdd(2);  // 返回一個新函式，這個新函式期待第二個參數
console.log(addTwo(3));  // 輸出 5

// 或者
console.log(curryAdd(2)(3));  // 輸出 5

```
```
// FP
const _curry = f => a => b => f(a, b) 
const _split = _curry((delimiter, string) => string.split(delimiter))

const words = _split(' ')

words('Jingle bells Batman'); 
// => ['Jingle', 'bells', 'Batman']
```
   
