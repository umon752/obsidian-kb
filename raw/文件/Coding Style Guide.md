# Coding Style Guide

## 1. Classname 命名方式

### 1.1 基本規則

- 使用小寫英文，採用 BEM 規範：`block__element--modifier`，超過三層時會讓他斷掉，並以最後一個為開頭接續
    
    ```html
    menu
    	menu__list
    		menu__list__item
    
    			item__link
    				item__link__text
    ```
    

- 依據 components（c-）、layout（l-）、utilities（u-）**、**modules（m-）類型加上對應前綴，方便識別
    - ex: `c-card`、`l-footer`、`u-link-range`、`m-editor`
- 單字較長時，會以 kebab-cas「-」連接
    - ex: `c-btn-back__text`、`c-tag-hash__symbol`
- 保持語意明確、簡潔，能從名稱推測用途。

### 1.2 變體命名（修飾）

- 採用 BEM 規範：`block__element--modifier`
    - ex: `c-btn—lg`、`block__item—full`
- sty-變體名稱：`sty-modifier`
    - ex: `sty-lg`、`sty-full`
    - 這個現在比較少用了

### 1.3 動態命名（狀態類）

- 狀態使用前綴 `is-` 或 `has-`
    - ex: `is-active`、`is-open`、`has-animate`
- 用於 JS 動態切換 class，提升可讀性與一致性。

---

## 2. js 命名

- 使用 jquery 選取的元素變數名稱前綴會加上「$」
    - ex: `const $select = $('select');`
- 一律使用單引號格式 (不會單雙引號一起使用，除了樣板字串值之外)
    - ex: `const element = document.querySelector('.js-element');`

---

## 3. 資料夾結構

```markdown
assets/front/sass/
├── main.sass
├── base/
│   └── 基本 HTML 樣式設定
├── grid/
│   └── 隔線系統
├── plugins/
│   └── 套件
├── forward/
│   └── 共用 variables、mixins、retina、field-style
├── helpers/
│   └── utilities、editor
├── components/
│   └── 元件
├── modules/
│   └── 模組
├── layout/
│   └── 版型
├── pages/
│   └── 頁面
├── lang/
│   └── 語系
└── supports/
    └── 瀏覽器 & 裝置兼容

assets/front/js/
├── main.js
├── base/
│   └── 基本全域變數設定
├── plugins/
│   └── 引入套件的核心檔 (css/js)
├── helpers/
│   └── 共用方法
├── components/
│   └── 對應 sass 拆分的元件功能
├── modules/
│   └── 對應 sass 拆分的模組功能
└── layout/
    └── 對應 sass 拆分的版型功能
```

### 資料夾說明

- **assets/**：靜態資源
- **assets/front/sass/**
    - **forward/_variables.sass**：變數設定
    - **forward/_mixins.sass**：mixins 設定
    - **forward/_field-style.sass**：欄位基本樣式設定
    - 全域：
        - **grid/_grid.sass**：隔線、容器設定。
        - **base/_base.sass**：HTML 基本設
        - **helpers/utilities/**：通用類別
        - **helpers/_editor.sass**：編輯器 HTML 設定
    - 套件：
        - **plugins/iconfont/_iconfont.sass**：iconfont 基本設定
        - **plugins/swiper/_swiper.sass**：swiper 基本設定
        - **plugins/select2/_select2.sass**：select2 基本設定
    - 元件：
        - **components/_c-breadcrumb.sass**：麵包削元件
        - **components/_c-pagination.sass**：頁碼元件
        - **components/_c-btn.sass**：按鈕元件
        - **components/_c-field.sass**：欄位元件
        - **components/_c-toast.sass**：toast 元件
        - **components/_spinner.sass**：spinner 元件（使用 bootstrap 元件，所以沒有前綴 `c-`）
        - **components/web-components/_nsdi-input.sass**：欄位元件
    - 模組：
        - **modules/_m-editor.sass**：新式編輯器
        - **modules/_m-card.sass**：卡片模組
    - layout：
        - **layout/_l-header.sass**：上方選單
        - **layout/_l-footer.sass**：footer
    - 頁面：
        - **pages/_index.sass**：首頁

---

## 4. 檔案命名方式

- 使用小寫英文，命名格式為 kebab-case，層級使用「-」往後連接
    - ex: `news.php`、`news-content.php`
- demo 範例檔案加上「—」前綴，方便識別
    - ex: `—components.php`
- 共用檔案使用和 classname 一樣的命名方式
    - ex: `_l-footer.php`*、*`_c-pagination.php`*、`_*m-editor.php`
- js 檔案以駝峰命名，直接表達一個函式或類別
    - ex: `setDefaultImg.js`

---

## 5. 程式格式（Formatting）

- tab = 2 spaces
- js 使用單引號 `'`
    - ex: `const a = '123'`
- ~~使用 Prettier 統一格式~~