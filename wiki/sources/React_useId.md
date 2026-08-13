---
type: source
author: ai
tags: ["domain/react", "topic/hooks", "topic/accessibility", "status/draft"]
summary: "useId 產生可用於 aria-describedby 等無障礙屬性的穩定唯一 ID"
sources: ["raw/React/useid.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React useId

## 核心要點

- `useId()` 產生可傳給無障礙屬性的唯一 ID。
- 常見用法是將密碼輸入框的 `aria-describedby` 指向說明文字的 `id`。
- 當同一元件在頁面重複使用時，Hook 能避免手動建立重複 DOM id。

## 參考資源

- [React useId 官方文件](https://react.dev/reference/react/useId)

