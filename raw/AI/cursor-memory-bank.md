# cursor memory bank   
## 官方做法   
[github](https://gist.github.com/ipenywis/1bdb541c3a612dbac4a14e1e3f4341ab)｜[youtube](https://www.youtube.com/watch?v=azXNHRtzd5s)｜[cursor 擴充套件](https://marketplace.visualstudio.com/items?itemName=CoderOne.aimemory)｜[VSCode 擴充套件](https://marketplace.visualstudio.com/items?itemName=SpecStory.specstory-vscode)   
在 Cursor Settings → Rule → User Rules 中加入[官方提供的規則](https://gist.githubusercontent.com/ipenywis/1bdb541c3a612dbac4a14e1e3f4341ab/raw/f93b8ef8c9e1f7de754b82bb0acb05672cf3f33f/cursor-memory-bank-rules.md)   
- 初始化指令：`initialization memory bank
`會在專案資料夾中新增 /memory-bank 內存放相關 memory 的 md 檔
以及 `README.md` 檔、`.cursorrules` 檔   
- 更新指令：`update memory bank`   
   
   
## 簡易做法   
### 手動建立 memory.md 檔或是元件檔   
.cursor/自定義名稱.md   
```
### 元件：DefaultButton

**描述**：
這是一個基礎按鈕元件，預設為 type="button"，內文為「按鈕」。可用於基本互動，例如送出、取消等。

**HTML 範本**：
\`\`\`html
<button type="button" class="c-btn">按鈕</button>

**JS 範本**：
\`\`\`js
const button = document.querySelector('.c-btn);
button.addEventListener('click', (e) => { console.log('123') })

```

詢問 AI：請依照 `自定義名稱.md` 插入 DefaultButton 和其 js 方法   
提到 `自定義名稱.md` 成功機率較高   
   
### 請 AI 協助建立 memory.md 檔   
```
掃描 src/components 資料夾，幫我建立一份 memory.md 記錄以下元件：
- 檔名
- 描述（用途）
- 如何使用（import 和實際使用語法）

```
