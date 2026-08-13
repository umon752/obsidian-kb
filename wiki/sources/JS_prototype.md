---
type: source
author: ai
tags: ["domain/javascript", "topic/prototype", "topic/object", "status/draft"]
summary: "整理 JavaScript prototype chain、Object 方法、建構子、class 與 Proxy 的物件模型"
sources: ["raw/JS/yuan-xing-prototype.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JavaScript Prototype

## 核心要點

- 原型鏈讓實體共享方法並形成類似繼承的效果；最上層通常是 `Object`。
- `Object.getPrototypeOf`、`Object.setPrototypeOf` 與 `Object.create` 可查詢、設定或依原型建立物件；`__proto__` 不建議使用。
- `Object.defineProperty` 與 property descriptor 控制 `enumerable`、`configurable`、`writable` 與 `value`。
- `new` 會建立物件、連結 constructor prototype、綁定 `this` 並回傳實體；ES6 class 是較易讀的語法糖。
- `Proxy` 可攔截 `get`、`set`、`deleteProperty`、`has` 與 `apply` 等操作，範圍比單一 getter／setter 更廣。

