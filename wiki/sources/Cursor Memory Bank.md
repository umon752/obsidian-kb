---
type: source
author: ai
tags: ["domain/ai", "topic/cursor", "topic/memory-bank", "status/draft"]
summary: "整理 Cursor Memory Bank 的官方規則、初始化更新指令與手動建立元件記憶的方法"
sources: ["raw/AI/cursor-memory-bank.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Cursor Memory Bank

## 核心要點

- 官方做法是在 Cursor User Rules 加入 Memory Bank 規則。
- `initialization memory bank` 會在專案建立 `memory-bank/`、`README.md` 與 `.cursorrules`。
- `update memory bank` 用於更新專案記憶。
- 簡易做法是手動建立元件說明檔，記錄用途、HTML 範本、JS 方法與使用方式。
- 也可請 AI 掃描元件目錄，產生檔名、用途、import 與使用語法的 `memory.md`。

## 參考資源

- [Cursor Memory Bank rules](https://gist.github.com/ipenywis/1bdb541c3a612dbac4a14e1e3f4341ab)
- [AI Memory VS Code extension](https://marketplace.visualstudio.com/items?itemName=CoderOne.aimemory)
- [SpecStory VS Code extension](https://marketplace.visualstudio.com/items?itemName=SpecStory.specstory-vscode)

