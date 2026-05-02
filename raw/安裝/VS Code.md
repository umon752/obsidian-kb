# VS Code

## Settings

### Sass

```json
    "liveSassCompile.settings.formats": [
        {
            "format": "compressed", // 壓縮格式
            "extensionName": ".min.css", // 編譯後的副檔名
            "savePath": "assets/**/css",
        },
    ],
    "liveSassCompile.settings.generateMap": false, // 是否編譯出 .map 檔
    "liveSassCompile.settings.includeItems": [
        "assets//**/*.sass",
        "assets//**/*.scss",
    ],
    "liveSassCompile.settings.excludeItems": [
        "assets/**/_*.sass",
        "assets/**/_*.scss"
    ],
```

### Todo Tree

```json
    "todo-tree.highlights.defaultHighlight": {
        "type": "whole-line",
    },
    "todo-tree.general.tags": [
        "BUG",
        "HACK",
        "FIX",
        "TODO",
        "XXX",
        "[ ]",
        "[x]",
        "圖片建議",
        "新式編輯器",
        "編輯器",
    ],
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "foreground": "#ffa500",
        },
        "FIX": {
            "foreground": "#ff4300",
        },
        "BUG": {
            "foreground": "#ffa500",
        },
        "[x]": {
            "foreground": "#888888",
        },
        "圖片建議": {
            "foreground": "#71cea9",
        },
        "新式編輯器": {
            "foreground": "#f15e5e",
        },
        "編輯器": {
            "foreground": "#698cee",
        },
    },
```

### Emmet

```json
    // 可在設定的語言內使用 emmet 生成 html
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "javascriptreact": "html",
        "typescriptreact": "html",
        "vue-html": "html",
        "plaintext": "jade",
        "vue": "html"
    },
    "emmet.triggerExpansionOnTab": true,
```

### Format 格式化

```json
		// 全域設定
		"editor.formatOnSave": true, // 存檔時自動 format
		"editor.defaultFormatter": "esbenp.prettier-vscode",
		
		// 針對各語言設定
    "[html]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
```

### 格式

```json
	"editor.wordWrap": "on", // 自動換行
  "editor.insertSpaces": true, // 縮排類型
  "editor.tabSize": 2, // 縮排空白數
  "prettier.singleQuote": true, // 單引號
  "prettier.useTabs": true, // {} 大括號是否空格
	"prettier.tabWidth": 2, // 每層縮排 2 個空格
	"prettier.semi": true, // 每行結尾加分號
```

### 其他

| 設定 | 功能 |  |
| --- | --- | --- |
| "editor.linkedEditing": true | 修改標籤名稱時，同步修改起始／結尾標籤 |  |
| "diffEditor.codeLens": true | 控制 **差異比較視窗（Diff Editor）** 是否顯示 **CodeLensCodeLens** 是 VS Code 上方的小提示文字或按鈕，通常出現在程式碼行上方，提供額外操作資訊 |  |

### MCP

```json
"chat.mcp.serverSampling": {
    "mcpServers": {
      "chrome-devtools": {
        "command": "npx",
        "args": ["-y", "chrome-devtools-mcp@latest"]
      }
    }
  },
```

## Extensions

### 輔助

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| Live Server | 啟動本機開發伺服器 | [https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) |
| Path Intellisense | 在 `@import` 或 `url()` 時自動補全檔案路徑 | [https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) |
| Copy filename | 複製檔名 | [https://marketplace.visualstudio.com/items?itemName=bradzacher.vscode-copy-filename](https://marketplace.visualstudio.com/items?itemName=bradzacher.vscode-copy-filename) |
| Todo Tree |  | [https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) |
| SVG Viewer | 預覽 SVG 圖 |  |
| Code Spell Checker | 程式碼內拼字檢查 | [https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) |
| Auto Rename Tag | 修改標籤名稱時，同步修改起始／結尾標籤 | [https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) |
| Error Lens | 強化 VS Code 本身對 **錯誤 /警告 (diagnostics)** 的顯示效果 | [https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) |
| Gremlins tracker for Visual Studio Code | 這款 Visual Studio Code 擴充功能可以顯示一些可能有害的字符 | [https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins) |
| Prettier - Code formatter | 程式碼格式化工具 | [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| ESLint | 此擴充功能使用已安裝在目前工作區資料夾中的 ESLint 庫。如果該資料夾中沒有 ESLint 庫，擴充功能會尋找全域安裝的版本。 | [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| i18n Ally | 輔助在程式碼直接查看該變數的語系文字 | [https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) |

---

### Sass

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| Sass (.sass only) | 支援 Sass / SCSS 語法高亮，補充 VS Code 原生高亮不足的部分 | [https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) |
| SCSS IntelliSense | 自動完成專案內的變數、Mixin、function，提供跳轉到定義和參數提示，開大型專案必裝 | [https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss) |
| Live Sass Compiler | 直接在 VS Code 編譯 SCSS → CSS，支援即時刷新 / watch，適合純前端靜態專案 | [https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) |

---

### 外觀

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| Prettier - Code formatter | 自動格式化 SCSS / CSS / JS / HTML，保持程式碼整齊 | [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| Material Icon Theme | icon 圖示 | [https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) |
| indent-rainbow | 隔線顏色區別 | [https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) |
| Rainbow Tags | 對所有成對標籤 (tag pairs) 上顏色，不只是高亮目前匹配，而是把整個嵌套結構標籤上不同層級的顏色。 | [https://marketplace.visualstudio.com/items?itemName=voldemortensen.rainbow-tags](https://marketplace.visualstudio.com/items?itemName=voldemortensen.rainbow-tags) |
| Color Highlight | 顯示色碼顏色 | [https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) |

---

### Git

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| Git Graph | git 樹狀圖查看 | [https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) |
| gitignore | 將檔案或資料夾新增至 .gitignore | [https://marketplace.visualstudio.com/items?itemName=michelemelluso.gitignore](https://marketplace.visualstudio.com/items?itemName=michelemelluso.gitignore) |

---

### AI

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| GitHub Copilot |  | [https://marketplace.visualstudio.com/items?itemName=GitHub.copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) |
| GitHub Copilot Chat |  | [https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) |

---

### 語言

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| ~~jQuery Code Snippets~~ | 提供 jQuery code 片段（輸入 jq 就會有提示） | [https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets) |
| Vue (Official) | 提供 Vue 自動完成、語法高亮和程式碼檢查等進階功能 | [https://marketplace.visualstudio.com/items?itemName=Vue.volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) |
| Tailwind CSS IntelliSense | 提供 Tailwind 自動完成、語法高亮和程式碼檢查等進階功能 | [https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) |
| UnoCSS | 提供 UnoCSS 自動完成、語法高亮和程式碼檢查等進階功能 | [https://marketplace.visualstudio.com/items?itemName=antfu.unocss](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) |
| ~~JSON to TS Type~~ | 針對資料結構自動產生 TS 型別 | [https://marketplace.visualstudio.com/items?itemName=AbdulOwhab.json-to-ts-type](https://marketplace.visualstudio.com/items?itemName=AbdulOwhab.json-to-ts-type) |

---

## MCP

| 名稱 | 功能 | 連結 |
| --- | --- | --- |
| MCP Figma Extension |  | [https://marketplace.visualstudio.com/items?itemName=SethFord.mcp-figma-extension](https://marketplace.visualstudio.com/items?itemName=SethFord.mcp-figma-extension) |
| Chrome DevTools |  |  |
| GitHub |  |  |

---

## Snippets

### JS

```json
{
  "Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
	"IIFE": {
		"prefix": "iife",
		"body": [
			";(function ($2) {",
			"$3",
			"})($1);"
		],
		"description": "Create js iife function"
	},
	"$IIFE": {
		"prefix": "$iife",
		"body": [
			"$(function ($2) {",
			"$3",
			"})($1);"
		],
		"description": "Create jQ iife function"
	},
	"qs": {
		"prefix": "qs",
		"body": [
			"const $2 = document.querySelector('$1');"
		],
		"description": "Create js variable"
	},
	"qsa": {
		"prefix": "qsa",
		"body": [
			"const $2 = document.querySelectorAll('$1');"
		],
		"description": "Create js variables"
	},
	"gi": {
		"prefix": "gi",
		"body": [
			"const $2 = document.getElementById('$1');"
		],
		"description": "Create js variable"
	},
	"gt": {
		"prefix": "gi",
		"body": [
			"const $2 = document.getElementsByTagName('$1');"
		],
		"description": "Create js variable"
	},
	"adde": {
		"prefix": "adde",
		"body": [
			"$1.addEventListener('$2', $3);"
		],
		"description": "event"
	},
	"obja": {
		"prefix": "obja",
		"body": [
			"Object.assign($1, {",
				"value: '$2',",
			"});"
		],
		"description": "Get dom attributes"
	},
	"swiper": {
		"prefix": "swiper",
		"body": [
			"const $2 = new Swiper('$1', {",
				"slidesPerView: 1,",
				"spaceBetween: 15,",
				"speed: 800,",
				"loop: true,",
				"freeMode: true,",
				"lazy: true,",
				"updateOnWindowResize: true,",
				"autoplay: {",
					"delay: 0,",
					"stopOnLastSlide: false,",
					"disableOnInteraction: true,",
				"},",
				"autoplayDisableOnInteraction: false,",
				"breakpoints: { ",
					"768: { ",
						"slidesPerView: 3,",
						"spaceBetween: 30",
					"},",
				"},",
				"on: {",
				"init(e) {},",
				"realIndexChange(e) {",
				"let activeIndex = e.activeIndex;",
				"e.slideTo(activeIndex, 500, true);",
				"},",
				"click(e) {},",
				"},",
			"});"
		],
		"description": "new swiper"
	},
	"load": {
		"prefix": "load",
		"body": [
			"window.addEventListener('load', () => {",
				"$1",
			"});"
		],
		"description": "Create load event"
	},
	"resize": {
		"prefix": "resize",
		"body": [
			"window.addEventListener('resize', () => {",
				"$1",
			"});"
		],
		"description": "Create resize event"
	},
	"resizeo": {
		"prefix": "resizeo",
		"body": [
			"new ResizeObserver((entries) => {",
        		"$2",
      		"}).observe('$1');"
		],
		"description": "Create resizeObserver"
	},
	"intero": {
		"prefix": "intero",
		"body": [
			"const $2 = document.querySelector('$1');",

      		"function handleIntersection(entries, observer) {",
				"entries.forEach((entry) => {",
					"if (entry.isIntersecting) {",
					"// 進入目標元素可視範圍",
					"$4",
					"} else {",
					"// 離開目標元素可視範圍",
					"}",
				"})",
			"}",

			"new IntersectionObserver(handleIntersection).observe($3);",
		],
		"description": "Create intersectionObserver"
	},
	"sto": {
		"prefix": "sto",
		"body": [
			"setTimeout(() => {",
			  	"$2",
			"}, $1);",
		],
		"description": "Create setTimeout"
	},
	"sti": {
		"prefix": "sti",
		"body": [
			"setInterval(() => {",
			  	"$2",
			"}, $1);",
		],
		"description": "Create setInterval"
	},
}
```

### Sass

```json
{
  "Print to @use template": {
		"prefix": "fd@use",
		"body": [
			"@use '../forward/_variables' as _var",
			"@use '../forward/_mixins' as _mix",
			"@use '../forward/_retina'",
		],
		"description": "Solve the problem that there is no prompt when using forward"
	},
	"Print to @use sass math": {
		"prefix": "@math",
		"body": [
			"@use 'sass:math'",
		],
		"description": "@use sass math"
	},
	"Print to @use sass map": {
		"prefix": "@map",
		"body": [
			"@use 'sass:map'",
		],
		"description": "@use sass map"
	}
}
```

### Vue

```json
{
  "vue": {
		"prefix": "vue",
		"body": [
			"<script setup>\n</script>",
			"<template>\n <div></div>\n</template>",
			"<style></style>"
		],
		"description": "Create a Vue component structure"
	}
}
```