---
type: source
author: ai
tags: ["domain/react", "topic/jsx", "topic/virtual-dom", "status/draft"]
summary: "說明 JSX 是 JavaScript 語法糖，以及 React 透過 Virtual DOM diff 更新實際畫面"
sources: ["raw/React/jsx-javascript-xml.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# JSX（JavaScript XML）

## 核心要點

- JSX 讓 JavaScript 可以用接近 HTML 的語法描述 UI，但本身不是 HTML。
- JavaScript 表達式放在 `{}` 中，JSX 通常要從 function component 的 `return` 回傳。
- 因為 `class` 是 JavaScript 關鍵字，JSX 使用 `className`。
- React 會把 JSX 轉成 Virtual DOM，和前一次結果 diff 後只更新實際 DOM 的變動部分。

