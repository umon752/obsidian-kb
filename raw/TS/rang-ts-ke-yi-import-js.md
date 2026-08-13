# 讓 TS 可以 import JS   
當要使用的套件只有 js 版本時   
在 `tsconfig.json` 設定   
```
{
  "compilerOptions": {
    // 識別 js 檔案
    "allowJs": true,
    // 不進行 js 檔案的型別檢查
    "checkJs": false
  }
}
```
   
