## Header 選單開發與使用說明

本文件說明目前 Header 選單的架構、資料格式、Mock API、前端轉換流程，以及新增或調整選單時的操作方式。
### 架構概覽

目前選單採用「後端提供資料，前端控制功能對照與呈現」的方式：
1. `server/api/menu.get.ts` 模擬後端回傳選單資料。
2. `app/types/menu.ts` 定義前後端共同使用的資料格式。
3. `app/config/menu.ts` 保存固定系統功能與前端 route、icon 的對照。
4. `app/composables/useMenu.ts` 呼叫 API，並將 API 資料轉換成 Header 可使用的格式。
5. `app/components/header/Header.vue` 顯示桌面版與手機版選單。

資料流程如下：
```text

GET /api/menu

↓

TMenuApiItem[]

↓

useMenu()

↓

排序、過濾停用項目、解析 route 與 icon

↓

TMenuItem[]

↓

Header.vue

```

### 相關檔案
| 檔案 | 用途 |

| ---------------------------------- | --------------------------------------- |

| `app/config/menu.ts` | 固定系統功能的 code、route 與 icon 對照 |

| `app/types/menu.ts` | API 選單與子選單的 TypeScript 型別 |

| `app/composables/useMenu.ts` | 呼叫 API 並轉換選單資料 |

| `server/api/menu.get.ts` | 開發期間使用的 Mock Menu API |

| `app/components/header/Header.vue` | Header 與選單畫面 |

### 選單類型
目前選單分成 `system` 與 `custom` 兩種類型。
#### System 選單
`system` 代表前端已經存在的固定系統功能，例如首頁、會員管理或內容管理。
```ts

{

id: 'members',

type: 'system',

code: 'members',

title: '會員管理',

enabled: true,

order: 3,

}

```

欄位說明：
| 欄位 | 說明 |

| ---------- | ---------------------------------- |

| `id` | 選單唯一識別值 |

| `type` | 固定為 `system` |

| `code` | 對應 `systemMenuConfig` 的功能代碼 |

| `title` | 畫面顯示名稱 |

| `enabled` | 是否顯示 |

| `order` | 同一層選單的排序值，數字越小越前面 |

| `children` | 可選的子選單陣列 |

System 選單不直接信任 API 提供的 route，而是透過 `app/config/menu.ts` 取得前端已知的路由：
```ts

export const systemMenuConfig = {

members: {

route: '/members',

icon: 'users',

},

} as const

```
這樣可以避免後端任意指定前端頁面或外部網址。
#### Custom 選單
`custom` 代表由後台使用者新增的內容型子選單。
```ts

{

id: 'news',

type: 'custom',

slug: 'news',

title: '最新消息',

enabled: true,

order: 1,

}

```

Custom 選單不需要加入 `systemMenuConfig`。目前 `useMenu()` 會依照 `slug` 產生內容頁路徑：
```text
/content/{slug}
```

例如 `slug: 'news'` 會轉換成：
```text
/content/news
```

`slug` 會經過 `encodeURIComponent()` 處理，但正式後端仍應限制 slug 的格式與長度。

### API 型別
型別定義位於 `app/types/menu.ts`。
```ts
type TMenuApiItemBase = {
id: string
title: string
enabled: boolean
order: number
children?: TMenuApiItem[]
}

type TSystemMenuApiItem = TMenuApiItemBase & {
type: 'system'
code: SystemMenuCode
}

type TCustomMenuApiItem = TMenuApiItemBase & {
type: 'custom'
slug: string
}

type TMenuApiItem = TSystemMenuApiItem | TCustomMenuApiItem
```

`type` 是辨識欄位。當 `type` 是 `system` 時必須提供 `code`；當 `type` 是 `custom` 時必須提供 `slug`。

### Mock API
開發期間由 `server/api/menu.get.ts` 提供資料：
```text
GET /api/menu
```

Nuxt 開發伺服器啟動後，可直接在瀏覽器開啟：
```text
http://localhost:3000/api/menu
```

目前「內容管理」包含兩個 Custom 子選單：
```ts
{
id: 'content',
type: 'system',
code: 'content',
title: '內容管理',
enabled: true,
order: 4,
children: [
{
id: 'news',
type: 'custom',
slug: 'news',
title: '最新消息',
enabled: true,
order: 1,
},
],
}
```

正式 API 完成後，可以將 `useMenu.ts` 的 endpoint 換成正式網址；只要回傳格式符合 `TMenuApiItem[]`，Header 不需要重新實作。

### useMenu 資料轉換
`useMenu()` 負責：
- 呼叫 `/api/menu`。
- 將未啟用的項目排除。
- 依照 `order` 進行各層排序。
- 將 System code 轉換成固定 route 與 icon。
- 將 Custom slug 轉換成 `/content/{slug}`。
- 提供載入狀態、錯誤與重新取得資料的方法。

使用方式：
```ts
const { menuItems, status: menuStatus, error: menuError, refresh } = useMenu()
```

回傳值：
| 回傳值 | 說明 |
| ------------ | ---------------------------- |
| `menuItems` | 已轉換完成、可直接顯示的選單 |
| `menuStatus` | Nuxt `useFetch` 的請求狀態 |
| `menuError` | API 請求錯誤 |
| `refresh()` | 重新取得選單資料 |

### Header 顯示行為

`Header.vue` 目前提供：
- 桌面版水平主選單。
- 桌面版第一層下拉子選單。
- 手機版展開／收合按鈕。
- 手機版主選單與第一層子選單。
- 選單載入中與載入失敗狀態。
- 使用 `NuxtLink` 進行站內導航。
- 路由變更後自動關閉手機選單。

目前畫面只呈現「主選單＋第一層子選單」。API 型別雖然允許遞迴的 `children`，若未來需要顯示第三層以上選單，應建立遞迴選單元件處理，不建議繼續在 `Header.vue` 手動增加巢狀 Template。

### 新增固定系統選單

假設要新增「訂單管理」：
#### 1. 建立頁面
```text
app/pages/orders.vue
```
#### 2. 加入系統功能對照
在 `app/config/menu.ts` 加入：
```ts
orders: {
route: '/orders',
icon: 'orders',
},
```

加入後，`SystemMenuCode` 會自動包含 `orders`。
#### 3. 讓 API 回傳選單
```ts
{
id: 'orders',
type: 'system',
code: 'orders',
title: '訂單管理',
enabled: true,
order: 5,
}
```

不需要修改 `Header.vue`。

### 新增後台自訂子選單
如果要在「內容管理」下新增「活動資訊」，只需要讓 API 在 `children` 加入：
```ts
{
id: 'events',
type: 'custom',
slug: 'events',
title: '活動資訊',
enabled: true,
order: 3,
}
```

前端會自動產生：
```text
/content/events
```

仍需確保前端存在能處理此路徑的動態頁面，例如：
```text
app/pages/content/[slug].vue
```

目前專案尚未建立這個動態內容頁。

#### 停用與排序

停用選單：

```ts
enabled: false
```

`useMenu()` 會將該項目排除。

調整排序：

```ts
order: 1
```

排序在每一層分別執行。若多個項目使用相同的 `order`，建議後端提供穩定的次要排序規則，避免順序不明確。

### 權限注意事項

選單是否顯示不等於功能是否有權限。

正式系統仍應在後端驗證：

- 使用者是否能取得該選單。
- 使用者是否能存取對應 API。
- 使用者是否能讀取或修改指定內容。

前端隱藏選單只能改善使用體驗，不能作為安全機制。

如果正式 API 需要回傳權限代碼，可以在 API 型別加入：

```ts
permission?: string
```

但最終權限驗證仍必須由後端執行。

### 正式 API 串接建議

正式上線前建議補上以下項目：

1. 使用 runtime schema 驗證 API 回傳內容，避免 TypeScript 泛型被誤認為執行階段驗證。
2. 限制 Custom slug 可接受的字元與長度。
3. 確保每個 `id` 在整棵選單中唯一。
4. 定義相同 `order` 的次要排序方式。
5. 根據登入者權限由後端過濾選單。
6. 規劃 API 失敗時的 fallback 或重試行為。
7. 建立 `/members`、`/content` 與 `/content/[slug]` 等實際頁面。

### 備份元件與編譯問題

目前以下備份檔仍使用 `.vue` 副檔名：

```text
app/components/header/Header_bak.vue
app/components/header/HeaderMenu_bak.vue
```

檔名包含 `_bak` 不代表 Nuxt 或 `vue-tsc` 會忽略它們。`Header_bak.vue` 目前引用不存在的 `HeaderMenu.vue`，因此可能導致 typecheck 或開發畫面錯誤。

若要保留備份，建議改成非 Vue 副檔名：

```text
Header_bak.vue → Header.vue.bak
HeaderMenu_bak.vue → HeaderMenu.vue.bak
```

更建議使用 Git 保存歷史版本，避免在元件目錄內保留可被編譯工具掃描的備份元件。

### 常見問題

#### 選單有顯示，但點擊後出現 404

確認 `systemMenuConfig` 的 route 或 Custom slug 對應的 Nuxt 頁面是否存在。目前專案只有 `/` 與 `/sample` 頁面；其他 Mock route 尚未建立。

#### API 已增加 System code，但 TypeScript 報錯

先在 `app/config/menu.ts` 加入對應項目。`SystemMenuCode` 由該物件的 key 自動產生。

#### Custom 選單需要加入 systemMenuConfig 嗎

不需要。Custom 選單使用 `slug`，由 `useMenu()` 組成內容頁路徑。

#### 修改 Mock API 後選單沒有更新

重新整理頁面，或呼叫 `useMenu()` 回傳的 `refresh()`。如果仍未更新，可重新啟動 Nuxt 開發伺服器。

#### 為什麼不能直接讓 API 回傳任意 component

Vue component 屬於前端可執行程式碼。後端應控制資料與權限，不應任意指定前端執行內容。固定功能應透過受控的 system code 對照。

### 提交前檢查

選單相關修改完成後，建議執行：

```bash
npx prettier --check \
app/config/menu.ts \
app/types/menu.ts \
app/composables/useMenu.ts \
app/components/header/Header.vue \
server/api/menu.get.ts

npx eslint \
app/config/menu.ts \
app/types/menu.ts \
app/composables/useMenu.ts \
app/components/header/Header.vue \
server/api/menu.get.ts

npx nuxt typecheck
```
