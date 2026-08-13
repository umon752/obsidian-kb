# TS 套件   
如果該套件官方自己沒有出 TS 版本的話，可以到 [npm TS 官方](https://www.npmjs.com/~types) 查找，如果在 npm TS 官方列表內找不到的話，盡量還是不要使用   
   
如果必須得使用沒有 TS 定義的 js 套件：   
可以爲該套件要使用的方法自定義 `my-library.d.ts` 檔
需要查看 source code 非常確定該方法的型別才可以這樣做   
```
// my-library.d.ts
declare module "my-library" {
  export function add(a: number, b: number): number;
}
```
```
// 要引用的地方
import { add } form "my-library";

const result = add(1, 2);
console.log(result);
```
   
