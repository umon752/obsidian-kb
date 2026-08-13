---
type: source
author: ai
tags: ["domain/react", "topic/router", "topic/react-router", "status/draft"]
summary: "以 React Router 建立 BrowserRouter、巢狀 Route、Outlet、動態參數與 query 搜尋頁"
sources: ["raw/React/router.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# React Router

## 核心要點

- 在入口以 `BrowserRouter` 包住 App，再用 `Routes`／`Route` 宣告頁面路由。
- 巢狀路由以 `Outlet` 顯示子頁，`index` 可設定預設子路由；萬用 `*` 可導向 NotFound。
- `useNavigate()` 用於程式化跳轉，`useParams()` 取得動態路由參數，`Link`／`NavLink` 用於站內導航。
- `useSearchParams()` 可把搜尋條件同步到 query string，再以 effect 觸發 API 查詢。
- 版型可集中放 Nav、Loading、Footer，讓頁面路由只負責內容區域。

