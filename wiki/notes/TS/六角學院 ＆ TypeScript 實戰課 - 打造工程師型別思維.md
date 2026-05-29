---
type: note
author: ai
tags: ['typescript', 'typescript/generics', 'typescript/utility-types', 'typescript/vue', 'status/draft']
summary: '六角學院 TypeScript 實戰課，從基礎型別到 Utility Types、泛型非同步、Vue3 整合與 tsconfig 設定的完整工程師型別思維課程'
sources: ['raw/notes/TS/六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維.pdf']
created: '2026-05-10'
updated: '2026-05-10'
---

# 六角學院 ＆ TypeScript 實戰課 - 打造工程師型別思維

## 摘要

> 從 TypeScript 基礎型別、Utility Types、泛型非同步處理，到 Vue3 整合與 tsconfig 深度設定，建立前端工程師完整的型別思維。

> [!abstract] TL;DR
> TypeScript 的核心價值在於「在編譯階段找到問題」；學習重點不是把 type 寫好寫滿，而是知道什麼時候讓 TS 自動推論、什麼時候才需要明確標注，再搭配 Utility Types 組合出乾淨的型別體系。

## 🎯 關鍵觀念

- **型別推論優先**：「能讓 TypeScript 推論就推論，只在必要時明確標注」——避免過度工程化
- **any vs unknown**：兩者都能接受任何值，但 `unknown` 使用前需型別檢查，是 `any` 的安全替代方案；正式環境避免用 `any`
- **type vs interface**：`interface` 適合物件結構且會擴充的場景（支援宣告合併）；`type` 適合固定結構、聯合類型、交叉類型
- **泛型是型別的參數**：讓同一個函式或型別可以處理多種型別，API 封裝必備
- **Utility Types 是組合技**：`Partial`、`Required`、`Pick`、`Omit`、`Record`、`Extract`、`Exclude`、`Readonly` 組合使用，從既有型別衍生新型別，避免重複定義
- **Vue3 + TS 整合重點**：`defineProps<T>()`、`withDefaults`、`defineEmits<T>()`、`useTemplateRef`、`InstanceType<typeof Component>`

## 🛠 實作步驟

### Step 1 — 基礎型別

```ts
// 原始類型
const age: number = 25
const name: string = 'Mike'
const isActive: boolean = true

// 陣列
const nums: number[] = [1, 2, 3]
const mixed: (number | string)[] = [1, 'a']

// 物件（可選屬性 ?、可為 null）
const user: { id: number; name?: string | null } = { id: 1 }

// Tuple：固定長度與型別順序
const point: [number, string] = [1, 'a']
const readonly: readonly [number, string] = [1, 'a']
```

```ts
// Enum（推薦用字串值，避免反向映射歧義）
enum DaysWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
}

// 數字 Enum 支援反向映射
enum ErrorCode { NotFound = 404, Forbidden = 403 }
console.log(ErrorCode[403]) // -> 'Forbidden'
```

> [!warning] Vite 專案使用 Enum 需調整 tsconfig
> Vite 預設 `erasableSyntaxOnly: true`，需改為 `false` 才能使用 Enum（因 Enum 會產生 JS 輸出）

### Step 2 — any / unknown / null

```ts
// ✅ unknown：使用前必須做型別檢查
let data: unknown = 'hello'
if (typeof data === 'string') {
  console.log(data.toUpperCase())
}

// ❌ any：跳過所有型別檢查，可能造成執行時期錯誤
let count: any = 3
count = '3'
count.toFixed() // 執行時期才爆炸
```

**使用優先級：**
1. 具體型別（`string`、`number`...）
2. 表示空值 → `null`
3. 未知資料 → `unknown`
4. 最後才考慮 → `any`（只在遷移 JS 專案或極動態內容時使用）

### Step 3 — type vs interface

```ts
// interface：適合物件結構、可擴充、支援宣告合併
interface IBoxStyle extends IWidth, IHeight {
  color: string
}

// type：適合聯合類型、交叉類型、固定結構
type TResult = string | number
type TBoxStyle = TWidth & THeight & { color: string }
```

### Step 4 — 函式型別

```ts
// 回傳 void（不需要 return）
const log = (name: string): void => { console.log(name) }

// 定義 function 型別
type TMath = (a: number, b: number) => number
const add: TMath = (a, b) => a + b
```

### Step 5 — 泛型（Generics）

```ts
// 基本泛型函式
function getFirst<T>(arr: T[]): T { return arr[0] }
getFirst<number>([1, 2, 3])  // -> 1

// 非同步 API 封裝（重要！）
type ApiResponse<T> = { status: number; data: T }
type TPhoto = { url: string }

async function apiRequest<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url)
  const data = await res.json() as T
  return { status: res.status, data }
}

const { data } = await apiRequest<TPhoto[]>('https://api.example.com/photos')
```

> [!tip] import type 強制區分
> TypeScript 4.5+ 開啟 `verbatimModuleSyntax` 後，所有型別 import 必須加 `type`：
> ```ts
> import type { AxiosResponse } from 'axios'
> import axios from 'axios'
> ```

### Step 6 — Utility Types

```ts
type TUser = { name: string; age: number; address: string }

// Partial：全部變可選
const draft: Partial<TUser> = { name: 'Mike' }

// Required：全部變必填
const full: Required<TUser> = { name: 'Mike', age: 20, address: 'TW' }

// Pick：挑選需要的屬性
type TBasic = Pick<TUser, 'name' | 'age'>

// Omit：排除不需要的屬性
type TNoAge = Omit<TUser, 'age'>

// Readonly：屬性只能讀取
const locked: Readonly<TUser> = { name: 'Mike', age: 20, address: 'TW' }
locked.name = 'X'  // ❌ 編譯錯誤
```

```ts
// Record：鎖定 key 與 value 的型別
type TBtnKey = 'create' | 'edit' | 'success'
const BtnMap: Record<TBtnKey, string> = { create: '新增', edit: '修改', success: '完成' }

// Extract / Exclude：操作聯合類型
type TKeys = 'a' | 'b' | 'c'
type TAB = Extract<TKeys, 'a' | 'b'>   // 'a' | 'b'
type TC  = Exclude<TKeys, 'a' | 'b'>   // 'c'
```

**Pick vs Omit vs Extract vs Exclude：**

| | 操作對象 | 用途 |
|---|---|---|
| `Pick` | 物件型別 | 挑選屬性組成新型別 |
| `Omit` | 物件型別 | 排除屬性組成新型別 |
| `Extract` | 聯合型別 | 保留指定成員 |
| `Exclude` | 聯合型別 | 移除指定成員 |

### Step 7 — 映射類型與 keyof

```ts
type TStateKeys = 'Online' | 'Offline' | 'Leave'
type TStateMap = { [K in TStateKeys]: string }

// keyof：取得所有屬性 key 的聯合類型
type TUserKeys = keyof TUser  // 'name' | 'age' | 'address'

// 將所有屬性的 value 型別改為 string
type TUserStr = { [K in keyof TUser]: string }
```

### Step 8 — Template Literal Types

```ts
type TColor = 'black' | 'white' | 'pink'
type TAtomicColor = `bg-${TColor}` | `text-${TColor}` | `border-${TColor}`

const cls: TAtomicColor = 'bg-black'  // ✅
const bad: TAtomicColor = 'bg-red'    // ❌ 編譯錯誤
```

### Step 9 — 全域 type 與 declare

```ts
// types/TGlobal.ts（全域型別，不需 import）
declare global {
  type TUserLogin = { email: string; password: string }
}

// declare module：為 JS 函式庫補型別
declare module 'mike-lib' {
  export function add(a: number, b: number): number
}

// declare module：讓 TS 識別靜態資源 import
declare module '*.css'
declare module 'swiper/css'
```

### Step 10 — Vue3 + TypeScript

```ts
// ref / reactive / computed
const count = ref<number>(0)
const user: TUser = reactive({ name: 'Mike', age: 27, email: '' })
const title = computed<string>(() => `Hello, ${name.value}`)

// Event：e.target 需斷言
const onChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
}

// DOM Ref（Vue 3.5+）
const elRef = useTemplateRef<HTMLInputElement>('inputRef')
onMounted(() => elRef.value?.focus())

// Props（泛型寫法）
const props = defineProps<{ name: string; age?: number }>()

// withDefaults（補充預設值）
const props = withDefaults(defineProps<TUser>(), {
  name: 'Mike',
  info: () => ({ email: '', phone: '' }),
})

// Emit（Vue 3.3+ 簡潔寫法）
const emit = defineEmits<{
  activeIdx: [id: number]
  updateName: [name: string]
}>()

// Composable 的回傳型別
import type { Ref, ComputedRef } from 'vue'
type TCounterReturn = { count: Ref<number>; add: () => void }

// InstanceType：存取子元件 expose 的方法
import ModalComp from '@/components/Modal.vue'
const modalRef = useTemplateRef<InstanceType<typeof ModalComp>>('modalRef')
modalRef.value?.open()
```

### Step 11 — tsconfig.json 重點設定

```json
{
  "compilerOptions": {
    "strict": true,              // 推薦開啟，啟用所有嚴格檢查
    "noImplicitAny": true,       // 禁止隱含 any
    "strictNullChecks": true,    // 嚴格 null 檢查
    "lib": ["ES2022", "DOM"],    // 指定可用的內建型別
    "target": "ES2020",          // 編譯輸出的 JS 版本
    "moduleResolution": "node",
    "paths": { "@/*": ["src/*"] },
    "resolveJsonModule": true,
    "skipLibCheck": true,        // 跳過套件型別檢查，提升速度
    "noUnusedLocals": true,      // 未使用的變數報錯
    "declaration": true,         // 產出 .d.ts 宣告檔案
    "allowJs": true,             // 允許 .js 與 .ts 共存
    "checkJs": false             // 但不對 .js 做型別檢查
  }
}
```

```bash
npx tsc --noEmit      # 只做型別檢查，不輸出
npx tsc --listFiles   # 查看哪些檔案會被編譯
npx tsc --showConfig  # 顯示最終生效的 config
```

## 🧠 類比 / 觀念釐清

> `any` 就像把保全撤掉——什麼人都能進來，快是快，但毫無安全感。`unknown` 則是讓保全站著，進來可以，但要先出示證件（型別檢查）。

> `Partial<T>` 就像把表單所有欄位變成「非必填」；`Required<T>` 就像把所有欄位加上星號「*」。

> `typeof User` 是「這個類別的藍圖（constructor）」；`InstanceType<typeof User>` 是「用這個藍圖蓋出來的房子（instance）」。

## 💡 實務提醒

> [!tip] 型別模組化
> 將 type 集中放在 `types/` 或 `type/` 資料夾，搭配 `import type` 引入，避免 type 散落各處難以維護

> [!tip] 第三方套件的型別處理順序
> 1. 套件本身有型別 → 直接用
> 2. 去 `@types/xxx` 找 → `npm i -D @types/lodash`
> 3. 都沒有 → 自己寫 `.d.ts` 宣告

> [!warning] DOM 操作必須處理 null
> `document.querySelector` 回傳 `Element | null`，使用前需 if 判斷或 as 斷言（只在確定存在時）

> [!warning] reactive 不建議用泛型
> `reactive<T>()` 的泛型在處理深層 ref 解包時行為與預期不符，建議直接在變數上標型別：`const user: TUser = reactive({...})`

## ❓ 自我檢核

- [ ] `any` 與 `unknown` 的差異是什麼？各自在什麼情況下合理使用？
- [ ] `type` 與 `interface` 各自的優勢場景是？
- [ ] 如何用泛型封裝一個可接受不同型別回傳的 API 函式？
- [ ] `Pick` / `Omit` 與 `Extract` / `Exclude` 的操作對象有何不同？
- [ ] 在 Vue3 中如何從父元件呼叫子元件 `defineExpose` 的方法？

## 🔖 重要引文 / 範例

> 「能讓 TypeScript 推論就推論，只在你覺得必要時明確標注」

```ts
// ✅ 讓 TS 推論（不需要多寫 : number）
const speed = 10

// ✅ 有需要才標注（沒有初始值，需先給型別）
let age: number
age = 12
```

## 🔗 延伸閱讀

- [TypeScript 官方文件](https://www.typescriptlang.org/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [tsconfig 所有選項說明](https://www.typescriptlang.org/tsconfig)
- [DefinitelyTyped（@types）](https://www.npmjs.com/~types)
- [TS Helper Chrome 擴充套件](https://chromewebstore.google.com/detail/ts-helper/hpmhflhgjoldggdbpifnacemkankmche)
- [JSON to TS Type（VSCode 套件）](https://marketplace.visualstudio.com/items?itemName=AbdulOwhab.json-to-ts-type)
- [[（待補）]] TypeScript 泛型進階

> [!note]- 原始課程內容摘錄
> 講師：Mike 成智遠（雷麒科技 Senior Frontend Engineer）
> 課程範例：https://github.com/MikeOnlineCourse/TypeScript-Live
> 課程共四週：Week1 基礎型別 → Week2 泛型與 Utility Types → Week3 tsconfig 與第三方套件 → Week4 Vue3 整合與 AI Prompt Engineering
