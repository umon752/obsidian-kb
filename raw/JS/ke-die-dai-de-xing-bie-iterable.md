# 可迭代的型別 (iterable)   
## Iterable 物件   
- Array   
- String   
- Set   
- Map   
- arguments   
- DOM Elements   
   
   
 --- 
   
## new Set   
Set 可接受各種資料類型的值。   
1. 使用 new 關鍵字創造 Set 物件。   
2. 只能傳入可以被 **iterable** 的物件。   
3. 回傳一個 Set 物件（跟一般 Object 一樣都是用 {}，不過沒有 key 只有 value），裡面的值都是唯一的。   
   
```
const number = new Set([1, 2, 3, 1, 4, 2]);
console.log(number)

//output: Set(4) {1, 2, 3, 4}
```
方法：   
- Set.size：物件內的數量   
- Set.has(value)：回傳 boolean 是否存在 value。   
- Set.add()： 加入元素，無法加入相同值（唯一值）。   
- Set.delet(value)： 刪除指定 value。   
- Set.clear()： 刪除全部值。   
- Set.forEach((value)) => {…}   
   
   
### WeakSet   
WeakSet 內的元素值只允許是物件 (Object)。
當被存入的值，在其他地方已經沒有被引用，該值會被垃圾回收機制回收。
   
   
 --- 
   
## new Map   
1. 使用 new 關鍵字創造 Map 物件。   
2. 長的跟 Object 很像，只是從 `key: value` 變成 `key => value`。   
3. key 可以是**任意型別**（type）。   
   
```
const map = new Map([
    [1, 'a'], [2, 'b'], [3, 'c']
]);
console.log(map);

//output: Map(3) {1 => 'a', 2 => 'b', 3 => 'c'}
```
方法：   
- Map.size：回傳有幾項。   
- Map.set(key, value)： 建立 key => value，並回傳最新的Map 所以可以一直 set() 下去。   
- Map.get(key)：回傳對應的 value。   
- Map.has(key)：回傳 boolean，是否存在。   
- Map.delete(key)：刪除指定項目。   
- Map.clear()：清除全部項目。   
- Map.keys()：取得所有的 keys。   
- Map.values()：取得所有的 values。   
- Map.forEach((value, key)) => {…}   
   
   
### new WeakMap   
WeakMap 內的 Key 只允許是物件 (Object) 和 Symbol。
當被存入的值，在其他地方已經沒有被引用，該值會被垃圾回收機制回收。   
   
 --- 
   
## Symbol   
JS 的第七種數據類型，表示獨一無二的值，每個 Symbol 值都是不相等的。   
[參考](https://www.fooish.com/javascript/ES6/Symbol.html)   
可用於物件屬性 (key)，可以確保不會出現同名的屬性，這特性能防止一個物件的屬性不會在其他地方被意外的覆蓋掉。
等於現在可以使用兩種型態，String 和 Symbol。
用 Symbol 當屬性名時，不能用 `.` 點運算子，因為用點運算子，會被當作是字串，而不是 Symbol，必須使用方括號 `[]`** **訪問屬性。
Symbol 的屬性名稱不能被遍歷。
   
- Symbol.for(key)：取得名稱為 key (字串) 的 global Symbol，如果不存在則會先建立一個新的存到 global symbol registry 後再返回。   
- Symbol.keyFor(symbol)：用來取得某個 global Symbol 的 key 名稱。   
- Object.getOwnPropertySymbols：遍歷物件，只取得 Symbol 屬性，會返回一個陣列。   
   
```
var obj = {};

obj[Symbol('a')] = 'a';
obj[Symbol.for('b')] = 'b';
obj['c'] = 'c';
obj.d = 'd';

// 依序輸出 "c" -> "d"
for (var i in obj) {
    console.log(i);
}

// [Symbol(a), Symbol(b)]
Object.getOwnPropertySymbols(obj);

```
   
- Reflect.ownKeys：遍歷物件，取得所有屬性 (包含 Symbol 屬性)，會返回一個陣列。   
   
```
 // [Symbol(a), Symbol(b), "c", "d"]
Reflect.ownKeys(obj);
```
   
- Symbol.iterator：內建方法
`iterator[Symbol.iterator]().next();
`使用 `.next()` 可以逐步返回集合中的元素。   
   
Array 是 **Iterable**，原型鏈（prototype）可以找到一個 key 值是` @@iterato`r   
```
const array = [1, 2];
const iterator = array[Symbol.iterator]();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: undefined, done: true }
```
   
 --- 
   
# iterator helpers   
> 擴充方法串接，優化 array.map().filter() 效能，減少記憶體消耗，因 .map()、.filter() 皆會產生一組新陣列。   

[參考](https://medium.com/codememo/js-tc39-%E6%96%B0%E6%8F%90%E6%A1%88-iterator-helpers-6fb3ef1a9688)   
[筆記](https://hackmd.io/lsjNDTqrQ6a5Jj7szM9n4w)   
   
處理順序：   
1. 轉為 Iterator   
2. 擴充 .map() 到 Iterator 的 prototype 上   
3. 擴充 .filter() 到 Iterator 的 prototype 上   
4. 擴充 .toArray() 到 Iterator 的 prototype 上   
   
###    
### function\*   
會返回具有 Iterable 和 Iterator 特性的物件。   
