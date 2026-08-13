# 專案管理架構   
[參考文章](https://israynotarray.com/other/20240413/3177435894/)   
## Monolith Repository（單體儲存庫）   
> 專案儲存在同一個 repo   

優點：   
- 方便簡單   
- 基本常見的架構類型   
   
缺點：   
- 當專案龐大時，會變得越來越難維護   
- 一個小改動你都需要跑完一整個專案的編譯、測試、部署等等流程   
   
   
## Multi Repository（多個儲存庫）   
> 專案拆分成多個 repo   

優點：   
- 可將功能模組各自拆分成一個專案獨立開發、獨立部署   
   
缺點：   
- 當共用模組有問題時，就需要到每個專案去修改，這樣就會造成維護上的困難   
   
   
## Mono Repository（單一儲存庫）   
> 專案儲存在同一個 repo 裡面，且將專案拆分成群組   

優點：   
- 可將功能模組各自拆分成一個專案獨立開發、獨立部署   
- 專案之間可共享相同的資源   
   
缺點：   
- 專案肥大後 `git clone` 時會花費較多時間   
- 共用的東西必須要規劃好，否則容易互相影響   
- 由於 Monorepo 中的專案都是共用的，所以無法區分專案的權限   
- Git 儲存庫的大小會變得非常大   
   
   
### NX   
workspace(資料夾) 命名不可數字開頭   
建立流程：   
1. `pnpm dlx create-nx-workspace@latest 專案資料夾名稱`   
2. `cd 專案資料夾名稱`   
3. `pnpm nx g @nx/react:app apps/apps 內的資料夾名稱`   
4. 設定 pnpm-workspace.yaml：   
   
```
packages:
  - apps/*
  - libs/*

```
1. 建立 libs 共用元件：`pnpm nx g @nx/react:lib libs/libs 內的資料夾名稱`   
   
   
方法：   
不用帶上路徑   
- 運行：`pnpm nx serve apps 內的資料夾名稱`   
- 編譯：`pnpm nx build apps 內的資料夾名稱`   
- 測試：`pnpm nx test apps 內的資料夾名稱`   
- 清快取：`pnpm nx reset`   
- NX 支援增量編譯，能夠僅針對受影響的模組進行構建，顯著減少編譯時間。
使用 nx affected 指令即可執行增量編譯：`pnpm nx affected --target=build`   
   
   
參考：   
- [使用NX 體驗 Monorepo的美好](https://cyfangnotepad.blogspot.com/2024/11/nx-monorepo.html)   
- [前端MonoRepo实战：pnpm+nx搭建MonoRepo项目](https://juejin.cn/post/7215963267503161403)   
