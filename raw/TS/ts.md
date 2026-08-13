# TS   
## 定義型別   
> 當宣告變數且有賦值時可以省略定義型別，因 ts 會自動偵測，可精簡寫法。   

```
let a: string = 'abc';
```
   
- 字串：`: string`、`<string>`   
- 數字：`: number`、`<number>`   
- 布林：: `boolean`、`<boolean>`   
- 函式：`: Function`、`<Function>`   
- null：`: null`、`<null>`   
- undefined：`: undefined`、`<undefined>`   
- 任何：`: any`、`<any>
`意思是「這個東西同時為任何的東西」。
   
- 沒有回傳值：`: void`、`<void>`   
- 陣列   
    - 字串：`: string[]`、`Array<string>`   
    - 巢狀：`: string[][]`、`[string, string][]`   
    - Tuple 元組 (固定長度和型別)： `: [string, number, boolean]`   
    - 數字：`: number[]`、`Array<number>`   
    - 布林：`: boolean[]`、`Array<boolean>`   
    - 函式：`: Function[]`、`Array<Function>`   
    - 任何：`: any[]`、`Array<any>`
盡量避免使用，使用了 `any` 型別的物件應該要充分的被封裝起來，物件傳回的值要馬上用型別斷言或型別檢查來確定其型別。   
- 物件   
    - 具名 (Interface)：`interface Obj { key1: number, key2: string`   
        - **可擴充**，如果重複名稱定義的話會合併繼承在一起。   
        - 可被 Class 繼承。   
    - 匿名：`{ key1: number, key2: string }`   
   
   
### 物件修飾字 (Modifier)   
更詳細定義物件型別   
- 可選 (Opitonal Member)：`{ key?: number}
`定義此屬性可有可無。   
- 唯讀 (Readonly Member)：`{ readonly key: number}
`定義此屬性只能讀取不可寫入。   
   
   
### 枚舉 (Enum)   
管理多個**同系列**的常數（不可修改的變數），做為狀態的判斷所使用。   
  Enum 被編譯過後，就是 Object。   
```
enum RequestStatusCodes {
  ERROR = 400,
  SUCCESS = 200,
}

```
   
### 聯合型別 (Union Type)   
可以是多種型別的其中一種。   
```
let a: string | number;
```
   
**type**   
適合定義 Union Type，可供變數共用。
**不可擴充**，如果重複名稱定義的話會報錯。
可被 Class 繼承。
   
```
type A = string | number;
let a: A;
```
```
type Obj { 
  key1: number, 
  key2: string 
}

let obj: Obj = {
  key1: 123,
  key2: '123'
}
```
   
### function   
如果要定義回傳值的型別，寫法在參數後加上。
也可不加上回傳值的型別定義，因 ts 會自動偵測判斷 return 可能的型別。   
```
function hello (a: string, b: number): string {
  return a + b
}
// ---------------
type THello = (a: string, b: number) => string;
const hello: THello = (a, b) => {
  return a + b
}

```
可選參數需放在最後面。   
```
function hello (a: string, b?: string) {
  return a + b
}
```
   
### 未知型別 (Unknow Type)   
意思是「我們不知道這個東西是什麼東西」。   
  類似於 `any` 但又比他還要更安全，不可執行讀寫和比較以外的操作。   
  常用於規範變數的值不會被操作、把關動態接收的資料型別定義。   
**as** 是型別斷言。   
```
type Data = {
  id: number
}

async function getData() {
  const res = await fetch('https://');
  const data = await res.json() as Data;
}

const data: Data = {
  "id": 1
}

type Beta = {
  name: string
}

const beta = data as unknown as Beta

```
   
### 泛型 (Generics)   
在同樣的 function、class 去定義不同的型別，在使用它時 (callback、new) 決定型別。   
```
function print<T> (data: T) {
  console.log('data', data);
}

print<number>(999);
print<string>('999');
print<boolean>(true);

```
   
### is (Type Guards)   
用於自定義類型守衛，檢查某個值是否屬於特定類型。   
```
function isString(value: any): value is string {
  return typeof value === 'string';
}

let someValue: any = "Hello, TypeScript";

if (isString(someValue)) {
  // 在這個區塊內，TypeScript 知道 someValue 是 string 類型
  console.log(someValue.toUpperCase());  // 正確推斷為 string 類型
} else {
  console.log("Not a string");
}

```
   
### satisfies (type assertion)   
檢查對象或變量是否符合指定的類型，並保留對象的具體類型。   
```
interface Person {
  name: string;
  age: number;
}

const john = {
  name: "John",
  age: 30,
  address: "123 Main St", // 保留了額外屬性
} satisfies Person;

```
   
 --- 
## Class   
- 私有變數 (private)：外部不可讀取、不可寫入，繼承的 class 內部不可讀取、不可寫入。   
- 公開變數 (public)   
- 受保護變數 (protected)：外部不可讀取、不可寫入，繼承的 class 內部可以讀取、可以寫入。   
   
```
class Live {
  roomName: string
  private id: string
  protected name: string

  constructor(roomName1: string, id1: string, name1: string) {
    this.roomName = roomName1;
    this.id = id1;
    this.name = name1;
  }
}

const live = new Live('1號', '01', 'name');

console.log(live); // 可查看到 private 的變數內容
console.log(live.roomName); // 可讀取、可寫入
console.log(live.id); // 不可讀取、不可寫入
console.log(live.name); // 不可讀取、不可寫入

```
   
如果是使用 js 原生 # 私有變數定義，查看整個 class 內容時，會看不到私有變數內容。   
  使用 ts private 定義的變數，查看整個 class 內容時，看得到 private、protected 的變數內容。   
### interface / type   
使用 interface 定義的變數，一定要是 public。
所以在 class 裡面和 interface 定義相同的變數，不可設置為 private。   
interface 可以使用 `extends` 來組合多個介面。   
```
interface CarProps {
  name: string,
  age: number,
  start: () => void
}

class Car implements CarProps {
  name: string,
  age: number,

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  start() {...}
}
```
```
interface Vehicle {
  speed: number;
  drive(): void;
}

interface Car extends Vehicle {
  fuel: string;
}

class SportsCar implements Car {
  speed: number;
  fuel: string;

  constructor(speed: number, fuel: string) {
    this.speed = speed;
    this.fuel = fuel;
  }

  drive() {
    console.log(`Driving at ${this.speed} km/h using ${this.fuel}`);
  }
}

```
   
 --- 
   
## 內建 Utilities   
[官方文件](https://www.typescriptlang.org/docs/handbook/utility-types.html)   
### 物件   
```
type User = {
  id: string;
  name: string;
  age: number;
}
```
- Pick：挑出特定屬性 (interface/type 物件內容)。
`Pick<User, "id" \| "name">`   
- Omit：排除特定屬性 (interface/type 物件內容)。
`Pick<User, "age">
`   
- Required：將所有內容變成必填。
`Required<User>`   
- Partial：將所有內容變成可選。
`Partial<User>`   
- Readonly：將所有內容變成只可讀取。
`Readonly<User>
透過迴圈將` readonly 移除方法：   
    ```
    type User = {
      readonly id: string;
      readonly name: string;
      readonly age: number;
    }
    
    type Mutable<T> = {
      -readonly [K in keyof T]: T[K];
    }
    
    type MutableUser = Mutable<User>;
    ```
   
###    
### **Union Type**   
```
type Role = "admin" | "user" | "anonymous";
```
- Extract：挑出特定成員。
`Extract<Role, "admin" \| "user">`
   
- Exclude：排除特定成員。
`Exclude<Role, "anonymous">`   
   
```
type MaybeString = string | null | undefined;
```
- NonNullable：排除 null 和 undefined 型別。
`NonNullable<MaybeString>`
   
   
###    
### Function   
```
type Func = (a: number, b: string) => string;

```
   
- ReturnType：取得函式定義的返回型別。
如果是直接引用 function 的話需要加上 `typeof`。
`ReturnType<Func> // string`
   
- Parameters：取得函式定義的參數型別元組。`Parameters<Func> // [a: number, b: string]`   
   
   
**Promise**   
```
const func = async () => {
  return {
    id: '123'
  }
}

type Result = ReturnType<typeof func>
type Result = Awaited<ReturnType<typeof func>>

```
- Promise：定義 Promise 函式。
`type PromiseString = Promise<string>`   
- Awaited：取得 Promise 返回值的型別。
`type Result = Awaited<PromiseString>`   
   
###    
### Object   
**Record**   
構建一個物件類型，其鍵與值的類型可以靈活地指定。   
```
type Role = 'admin' | 'user' | 'guest';

const userPermissions: Record<Role, string[]> = {
  admin: ['create', 'read', 'update', 'delete'],
  user: ['read'],
  guest: ['read'],
};

```
   
 --- 
   
## 實作   
- 建立 tsconfig.json 檔：`tsc --init
`編譯哪個 js 版本、是否啟用 .map 等配置設定。
"rootDir"：設定 input 路徑。
"outDir"：設定 output 編譯路徑。   
- 監聽 .ts 檔內容變更即自動編譯：`tsc --watch`   
- 執行編譯 .ts 檔：`tsc xxx.ts`   
   
   
 --- 
   
## 練習資源   
[type-challenges](https://github.com/type-challenges/type-challenges)   
[TypeHero](https://typehero.dev/)   
   
 --- 
## 工具   
[TS Playground](https://www.typescriptlang.org/play/?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA)   
   
 --- 
   
## React   
定義函數型元件的型別：`React.FC
`確保這個元件的 `props` 符合指定的型別，必須回傳一個 `JSX.Element`，防止元件不小心回傳 `null` 或其他無效的值。
自動包含 `children` 屬性，等於是 `React.ReactNode` 接受各種型別。
   
```
const App: React.FC = () => {
  return (
    <></>
  )
}


interface TitleProps {
  name: string
}
const Title: React.FC<TitleProps> = ({ name }) => {
  cosnt [title, setTitle] = useState<number | string>(1000);
  return (
    <p>{name}</p>
  )
}

```
   
