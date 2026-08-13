---
type: note
author: ai
tags: ["typescript/core", "typescript/generics", "typescript/utility-types", "typescript/vue", "typescript/tsconfig", "status/draft"]
summary: "從型別推論、unknown、泛型與 Utility Types，建立 TypeScript 與 Vue 3 的工程師型別思維。"
sources: ["raw/notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維

## 摘要

> TypeScript 的價值在編譯階段找到問題；重點不是每個值都加標註，而是知道何時讓推論工作、何時用明確型別表達設計意圖。

> [!abstract] TL;DR
> 先用具體型別與推論建立安全基礎，再以泛型、Utility Types、映射型別與 Vue 3 型別 API 組合出可重用的型別系統。

## 🎯 關鍵觀念

- 能推論就讓 TypeScript 推論，只有沒有初始值、需要公開契約或推論不足時才明確標註。
- `unknown` 接受未知資料但使用前必須縮小型別，比跳過檢查的 `any` 安全。
- `interface` 適合可擴充的物件契約；`type` 適合 union、intersection、固定結構與型別運算。
- 泛型是型別參數，讓同一個函式、API wrapper 或資料結構安全地處理多種型別。
- `Partial`、`Required`、`Pick`、`Omit`、`Record`、`Extract`、`Exclude` 與 `Readonly` 可從既有型別組合出最小必要契約。
- Vue 3 以 `defineProps`、`defineEmits`、`useTemplateRef`、`InstanceType` 與 typed composable 把型別延伸到元件邊界。

## 🛠 實作步驟

### Step 1 — 從基本型別與推論開始

```ts
const age = 25                 // 推論為 number
let name: string               // 沒有初始值，明確宣告
const point: [number, string] = [1, 'x']
const values: (number | string)[] = [1, 'x']
```

不要為已經清楚的常數重複加型別；但對外 API、空變數、複雜回傳值與團隊契約要用型別說清楚。Enum 會產生 JavaScript 輸出，Vite 專案使用時要檢查 `erasableSyntaxOnly` 設定。

### Step 2 — 用 `unknown` 取代不必要的 `any`

```ts
let value: unknown = getExternalValue()

if (typeof value === 'string') {
  console.log(value.toUpperCase())
}
```

優先順序是具體型別、`null`、`unknown`，最後才是 `any`。外部 JSON、使用者輸入與第三方資料應先驗證或縮小，再進入業務邏輯。

### Step 3 — 選擇 `type`、`interface` 並抽象函式

```ts
interface Box extends Width, Height {
  color: string
}

type Result = string | number
type BoxStyle = Width & Height & { color: string }

type MathFn = (a: number, b: number) => number
const add: MathFn = (a, b) => a + b
```

物件結構且預期擴充時可用 interface；聯合、交叉或型別運算則用 type。選擇應服務於 API 清晰度，不必追求全專案只用其中一種。

### Step 4 — 以泛型封裝可重用 API

```ts
type ApiResponse<T> = { status: number; data: T }

async function apiRequest<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  const data = await response.json() as T
  return { status: response.status, data }
}

const result = await apiRequest<{ url: string }[]>('/api/photos')
```

泛型把「資料型別」當成參數傳入，避免每種 API 都重複寫一套 wrapper。若只是在傳遞型別而不需要執行期判斷，搭配 `import type` 與 `verbatimModuleSyntax` 保持輸出乾淨。

### Step 5 — 用 Utility Types 組合最小契約

```ts
type User = { name: string; age: number; address: string }

type UserDraft = Partial<User>
type UserSummary = Pick<User, 'name' | 'age'>
type UserWithoutAge = Omit<User, 'age'>
type UserMap = Record<string, UserSummary>
```

`Pick`/`Omit` 操作物件屬性；`Extract`/`Exclude` 操作 union 成員。用組合技表達 PATCH、公開回應、字典與權限範圍，通常比重新宣告整份型別更安全。

### Step 6 — 使用映射與 Template Literal Types

```ts
type State = 'Online' | 'Offline' | 'Leave'
type StateMap = { [K in State]: string }

type Color = 'black' | 'white'
type UtilityClass = `bg-${Color}` | `text-${Color}`
```

`keyof` 可以取得物件 key 的 union；映射型別可依 key 產生完整表格，template literal types 則能限制具規則的字串，讓 class name 或事件名稱在編譯階段被檢查。

### Step 7 — 整合 Vue 3 元件型別

```ts
const props = withDefaults(defineProps<{
  name: string
  age?: number
}>(), { age: 0 })

const emit = defineEmits<{
  updateName: [name: string]
}>()

const input = useTemplateRef<HTMLInputElement>('input')
```

`ref`、`reactive`、`computed`、props、emits 與 composable 回傳值都要形成一致契約；使用 `InstanceType<typeof Component>` 取得子元件 expose 的方法時，仍需處理 ref 可能為 `null`。

### Step 8 — 用 `tsconfig` 把規則固定下來

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "allowJs": true,
    "checkJs": false
  }
}
```

以 `npx tsc --noEmit` 做型別檢查，必要時用 `--showConfig` 確認真正生效的設定；JS/TS 混用的遷移專案可先開 `allowJs`，再逐步提高檢查範圍。

## 🧠 類比 / 觀念釐清

> `any` 像撤掉保全，任何值都能直接通過；`unknown` 像保留保全，資料可以進來，但要先出示型別證件才能使用。

## 💡 實務提醒

> [!tip] 型別集中管理
> 將共用型別放在 `types/`，使用 `import type` 引入，避免型別散落在元件內形成難以維護的隱性契約。

> [!warning] DOM API 可能回傳 null
> `querySelector` 與 template ref 使用前要做 null 檢查；只有在存在條件已被證明時才使用 assertion。

> [!warning] 不要盲目對 reactive 加泛型
> 深層 ref 解包可能讓 `reactive<T>()` 行為與期待不同，通常直接在變數上標註型別更容易閱讀與維護。

> [!tip] 第三方套件型別順序
> 先使用套件內建型別，再查 `@types`，最後才自行提供 `.d.ts`；不要直接用 `any` 掩蓋缺少型別的問題。

## ❓ 自我檢核

- [ ] `any` 與 `unknown` 的差異是什麼？外部資料應優先使用哪一個？
- [ ] `type` 與 `interface` 各適合什麼情境？
- [ ] 如何用泛型建立可處理不同回傳型別的 API wrapper？
- [ ] `Pick`/`Omit` 與 `Extract`/`Exclude` 的操作對象有何不同？
- [ ] Vue 3 中如何為 props、emits 與 template ref 加上型別？
- [ ] `strict`、`noImplicitAny` 與 `strictNullChecks` 分別防止哪類問題？

## 🔖 重要引文 / 範例

> 能讓 TypeScript 推論就推論，只在必要時明確標注；型別是用來表達意圖，不是用來堆滿程式碼。

## 🔗 延伸閱讀

- [[concepts/概念_TypeScript_Utility Types]]
- [[sources/Note_TypeScript實戰課]]
