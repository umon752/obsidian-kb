# 拷貝   
### 傳參考類型   
{}, [], function(){}   
 --- 
   
   
### 淺拷貝 (Shallow Copy)   
使用 `{ ...物件 }` 語法，可以**複製第一層屬性**的資料，但**無法複製巢狀屬性資料**。   
```
const original = { name: "David" };
const copy = { ...original };

copy.name = "Ethan";

console.log(original.name); // "David"

```
 --- 
   
   
### 深層拷貝 (Deep Copy)   
將物件轉成字串再重建，達到**深層複製**效果。   
  適用於資料結構中沒有函式、 `undefined`、 `Symbol`、 `Date` 等特殊值時。   
```
const obj = { info: { score: 100 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.info.score = 50;

console.log(obj.info.score); // 100 ✅ 不受影響

```
需要更彈性、保留特殊資料型別（例如 `Date`、 `Map`、 `Set`）的深層複製，推薦使用：   
- `lodash.cloneDeep()`   
- `structuredClone()`（現代瀏覽器內建   
   
   
AI 提供範例：   
```
function cloneDeep(obj, seen = new WeakMap()) {
  // 處理原始型別或 null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 處理循環參考
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // 處理 Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // 處理 RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 處理 Map
  if (obj instanceof Map) {
    const result = new Map();
    seen.set(obj, result);
    for (const [key, value] of obj.entries()) {
      result.set(cloneDeep(key, seen), cloneDeep(value, seen));
    }
    return result;
  }

  // 處理 Set
  if (obj instanceof Set) {
    const result = new Set();
    seen.set(obj, result);
    for (const value of obj.values()) {
      result.add(cloneDeep(value, seen));
    }
    return result;
  }

  // 處理 Array
  if (Array.isArray(obj)) {
    const result = [];
    seen.set(obj, result);
    for (const item of obj) {
      result.push(cloneDeep(item, seen));
    }
    return result;
  }

  // 處理一般物件
  const result = {};
  seen.set(obj, result);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneDeep(obj[key], seen);
    }
  }

  return result;
}

```
### ✅ 功能支援   
|                類型   <br> |               支援情況   <br> |                                               備註   <br> |
|:-------------------------|:--------------------------|:--------------------------------------------------------|
|              原始型別   <br> |                  ✅   <br> | number, string, boolean, null, undefined, symbol   <br> |
|            Object   <br> |                  ✅   <br> |                                        深拷貝，含巢狀結構   <br> |
|             Array   <br> |                  ✅   <br> |                                              深拷貝   <br> |
|              Date   <br> |                  ✅   <br> |                                  使用 `new Date()`   <br> |
|            RegExp   <br> |                  ✅   <br> |                                使用 `new RegExp()`   <br> |
|               Map   <br> |                  ✅   <br> |                                   遞迴拷貝 key/value   <br> |
|               Set   <br> |                  ✅   <br> |                                       遞迴拷貝 value   <br> |
|              循環參考   <br> |                  ✅   <br> |                                  使用 `WeakMap` 處理   <br> |
| Function / Symbol   <br> |             ❌（可擴充）   <br> |                                             預設跳過   <br> |

   
