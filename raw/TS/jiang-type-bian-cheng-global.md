# 將 type 變成 global   
就可以不用用 export、import 的方式引入   
  盡量不要做這個事情，查找問題會較困難   
```
輸入就會有全域設定 type 的提示 
const user: T
```
   
方法一：   
將要全域使用的 TS 檔名改成  `TXxxType.d.ts
`建議放在 `/src`   
   
方法二：   
在 `tsconfig.json` 設定 `"include": ["src/\*\*/\*"]`   
   
方法三：   
declare global 聲明    
```
declare global {
	type TUser = {
		...
	}
}
```
