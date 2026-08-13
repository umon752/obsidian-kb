# TS 設定   
設定 `"lib": ["DOM"]`  可讓 TS 輸入瀏覽器相關 API 內容時 (ex: window、document) 不會出現型別檢查的錯誤   
```
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
  }
}
```
   
