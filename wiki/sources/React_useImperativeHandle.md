---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/ref", "status/draft"]
summary: "以 useImperativeHandle 讓子元件對父層暴露受限的 ref API，而非直接暴露整個 DOM"
sources: ["raw/React/useimperativehandle.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useImperativeHandle

## 核心要點

- 父元件以 `useRef` 建立 ref，傳給子元件；子元件再用 `useImperativeHandle` 定義可被呼叫的方法。
- 素材範例只暴露 `focus()` 與 `scrollIntoView()`，父層無法直接任意修改 input DOM style。
- 這種做法可把命令式操作封裝在子元件內，縮小父子元件之間的公開介面。

## 參考資源

- [React useImperativeHandle 官方文件](https://react.dev/reference/react/useImperativeHandle)

