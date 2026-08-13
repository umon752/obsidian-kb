
## 安裝
* tailwind v4
	* clsx
	*  tailwind-merge
* ts

## 步驟記錄
### 初始專案
1. nuxt init：`npm create nuxt@latest <project-name>`
   [官方文件](https://nuxt.com/docs/4.x/getting-started/installation)
2. 安裝 tailwind：`npm install tailwindcss @tailwindcss/vite`
   ```ts
   // nuxt.config.ts
	import { defineConfig } from 'vite'
	import tailwindcss from '@tailwindcss/vite'

	 export default defineConfig({
		css: ['~/assets/css/main.css'],
	   vite: {
			plugins: [
				tailwindcss(),
			],
		},
	})
   ```
   [官方文件](https://tailwindcss.com/docs/installation/using-vite)
3. 安裝 clsx、tailwind-merge：`npm i clsx tailwind-merge`
   
   ![](assets/Nuxt%20template/file-20260620171852681.png)
   ![](assets/Nuxt%20template/file-20260620172057821.png)
   ![669](assets/Nuxt%20template/file-20260620172103517.png)
   ![](assets/Nuxt%20template/file-20260620172120530.png)
3. 安裝 vue ts：`npm i -D vue-tsc typescript`
   ts 設定（每次 npm run build 時會自動執行嚴格型別檢查）
   ```ts
   // nuxt.config.ts
	export default defineNuxtConfig({
		typescript: {
		    strict: true,
		    typeCheck: true,
		},
	})
   ```
   VS Code 即時檢查，安裝 Vue (Official)
   ```json
   // settins.json
	{
		"editor.codeActionsOnSave": {
			"source.fixAll.eslint": "explicit"
		},
		"editor.formatOnSave": true
	}
   ```

4. 安裝 ESLint（官方推薦 Nuxt ESLint Module）：`npx nuxi module add eslint`
   安裝後會自動在 nuxt.config.ts 加入以下片段
   ```ts
   // nuxt.config.ts
	export default defineNuxtConfig({
		modules: [
			'@nuxt/eslint'
		]
	})
   ```
   [官方文件](https://eslint.nuxt.com/packages/module)
   幫你處理：Vue、Nuxt、TypeScript、Flat Config、VS Code 整合
5. 安裝 Prettier：`npm i -D prettier`
   建立設定檔：`.prettierrc`
   ```
   {
	  "semi": false,
	  "singleQuote": true,
	  "printWidth": 100,
	  "trailingComma": "es5"
	}
   ```
   建立忽略檔：`.prettierignore`
   ```
   .nuxt
	.output
	node_modules
	dist
	coverage
   ```
   VS Code settings 加上：`"editor.defaultFormatter": "esbenp.prettier-vscode",`
   package.json 加上：
   ```json
   {
	  "scripts": {
	    "format": "prettier . --write"
	  }
	}
   ```
6. 安裝 tailwind prettier：`npm i -D prettier-plugin-tailwindcss`
   [官方文件](https://tailwindcss.com/blog/2024-05-30-prettier-plugin-collapse-whitespace)
   在 `.prettierrc` 加上 `"plugins": ["prettier-plugin-tailwindcss"]`
   ![](assets/Nuxt%20template/file-20260620173404382.png)

### 建立基礎
1. 安裝 nuxt i18n：`npx nuxi@latest module add i18n`
   [官方文件](https://nuxt.com/modules/i18n)
   建立 /constants/locales.ts：
   ```ts
   export const LOCALES = {
		'zh-TW': {
			lang: 'zh-Hant',
			ogLocale: 'zh_TW',
		},
		en: {
			lang: 'en',
			ogLocale: 'en_US',
		},
		ja: {
			lang: 'ja',
			ogLocale: 'ja_JP',
		},
	} as const
   ```
   nuxt.config.ts 設定：
   ```ts
   modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
		i18n: {
			langDir: '../app/i18n/locales',
			locales: [
				{ code: 'zh-TW', language: 'zh-Hant', file: 'zh-TW.json', },
				{ code: 'en', language: 'en-US', file: 'en-US.json', },
				{ code: 'ja', language: 'ja', file: 'ja.json', },
			],
			defaultLocale: 'zh-TW',
		},
		runtimeConfig: {
			public: {
				siteUrl: '', // 自動讀 .env 的 NUXT_PUBLIC_SITE_URL，但後面有設定共用變數的方式(因 Nuxt i18n 與 Nuxt SEO 的職責差異)
			},
		},
   ```
   讀取 siteUrl 方法：
   ```ts
	const config = useRuntimeConfig()  
	config.public.siteUrl
   ```
   建立各語系檔 `/i18n/locales/zh-TW.json`：
   ```json
   {
		"site": {
			"name": "網站名稱",
			"description": "網站描述"
		}
	}
   ```
   `app.ts` 設定 SEO：
   >透過 `useLocaleHead()` 負責 lang、ogLocale、hreflang、canonical
   
   ```ts
	const { locale } = useI18n()
	const i18nHead = useLocaleHead()
	useHead(() => ({
		htmlAttrs: {
		lang: i18nHead.value.htmlAttrs.lang,
	},
	link: [
		...(i18nHead.value.link || []),
		{
			rel: 'manifest',
			href: `/site.webmanifest?lang=${locale.value}`,
		},
	],
	meta: [...(i18nHead.value.meta || [])],
	}))
   ```
   建立 `usePageSeo.ts` 共用 seo 設定方法 (會依頁面更動的參數)：
   >負責 title、description、og...、twitter...
   
   ```ts
   interface PageSeoOptions {
		title?: string
		description?: string
		image?: string
		type?: 'website' | 'article'
	}

	export function usePageSeo(options: PageSeoOptions = {}) {
		const config = useRuntimeConfig()
		const route = useRoute()
		const { t } = useI18n()

		const siteUrl = config.public.siteUrl.replace(/\/$/, '')
		const siteName = t('site.name')

		const title = options.title
		const description = options.description ?? t('site.description')
		const image = options.image ?? `${siteUrl}/images/og-image.jpg`
		const type = options.type ?? 'website'  

		const socialTitle = title ? `${title}｜${siteName}` : siteName

		useSeoMeta({
			title,
			titleTemplate: (pageTitle) => (pageTitle ? `${pageTitle}｜${siteName}` : siteName),
			description,
			ogTitle: socialTitle,
			ogSiteName: siteName,
			ogUrl: `${siteUrl}${route.path}`,
			ogDescription: description,
			ogImage: image,
			ogType: type,
  
			twitterCard: 'summary_large_image',
			twitterTitle: socialTitle,
			twitterDescription: description,
			twitterImage: image,
		})
	}
   ```
   內頁設定 `sample.ts`：
   ```ts
   const { t } = useI18n()
	usePageSeo({
		title: t('sample.meta.title'),
		description: t('sample.meta.description'),
		image: article.cover,
	})
   ```
   如遇到 query 頁面 `/product?id=123`：
   ```ts
   // pages/product.vue
	const route = useRoute()
	useHead({
	  link: [
	    {
	      rel: 'canonical',
	      href: `${siteUrl}/product?id=${route.query.id}`,
	    },
	  ],
	})
   ```
2. meta SEO 設定
   ```
   app/
├─ app.vue
├─ nuxt.config.ts
├─ public/
│  └─images/
│     └─ og-image.jpg
│  └─favicon/
│     ├─ favicon.ico
│     ├─ apple-touch-icon.png
│     └─ site.webmanifest
   ```
   nuxt.config.ts 全站基本設定 (網站層級，不會依頁面更動的參數) ：
   ```ts
   app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
			],
			link: [
				{
					rel: 'icon',
					href: '/images/favicon/favicon.ico',
				},
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/images/favicon/favicon.svg',
				},
				{
					rel: 'manifest',
					href: '/images/favicon/site.webmanifest',
				},
				{
					rel: 'apple-touch-icon',
					href: '/images/favicon/apple-touch-icon.png',
				},
			],
		},
	},
   ```
   如果特定頁面 robots.txt 要 noindex nofollow：
   ```ts
   useSeoMeta({  
		robots: 'noindex,nofollow',  
	})
   ```
   處理 site.webmanifest 檔
   >**PWA（Progressive Web App，漸進式網頁應用）** 的核心設定檔
   >   當使用者在 Chrome 或 Safari 瀏覽器點擊「加到主畫面」或「安裝應用程式」時，瀏覽器就會去讀取這個檔案
   
   參數介紹：
	* **應用程式名稱 (`name` / `short_name`)：**顯示在手機桌面圖示下方的文字。
	- **圖示 (`icons`)：** 提供不同尺寸的 App 圖示，確保在 iPhone、Android、iPad 桌面看都很清晰。
	- **啟動畫面與主題顏色 (`start_url`, `theme_color`, `background_color`)：** 打開 App 時的點選路徑、頂部狀態列的顏色，以及 App 載入時的背景色。
	- **顯示模式 (`display`)：** 可以設定為 `standalone` 或 `fullscreen`。這樣一打開網頁，就會**隱藏瀏覽器的網址列和上下導覽列**，讓網頁看起來就像一個原生（Native）的 App。
3. 建立 error.vue
   ```
   nuxt-template/
	├─ app/
	│  ├─ app.vue
	│  └─ pages/
	├─ error.vue
	├─ nuxt.config.ts
   ```
   ```ts
   <script setup lang="ts">
	import type { NuxtError } from '#app'
	const props = defineProps<{
		error: NuxtError
	}>()

	const is404 = computed(() => props.error.statusCode === 404)

	const title = computed(() => {
		return is404.value ? t('error.404.title') : t('error.500.title')
	})

	const description = computed(() => {
		return is404.value ? t('error.404.description') : t('error.500.description')
	})

	const handleClearError = () => {
		clearError({
			redirect: '/',
		})
	}
</script>

<template>
	<main>
		<p>{{ statusCode }}</p>
		<h1>{{ title }}</h1>
		<p>{{ description }}</p>
		<button type="button" @click="handleClearError">
			{{ t('error.backToHome') }}
		</button>
	</main>
</template>
   ```
   4. 建立 sitemap、robots
    安裝 `npx nuxi@latest module add sitemap`
    安裝 `npx nuxi@latest module add robots`
    `nuxt.config.ts` 設定：
    ```ts
    const siteUrl = import.meta.env.NUXT_PUBLIC_SITE_URL ?? ''
    export default defineNuxtConfig({
	  modules: [
	    '@nuxtjs/i18n',
	    '@nuxtjs/sitemap',
	    '@nuxtjs/robots',
	  ],

	  site: {
	    url: siteUrl,
	  },

	  runtimeConfig: {
	    public: {
	      siteUrl,
	    },
	  },
	})
    ```
    透過連結看到內容：http://localhost:3000/sitemap.xml  、http://localhost:3000/robots.txt
1. 建立 llms.txt：`server/routes/llms.txt.ts`
   ```ts
   import zhTW from '../../app/i18n/locales/zh-TW.json'
	import en from '../../app/i18n/locales/en.json'
	import ja from '../../app/i18n/locales/ja.json'
	
	const messages = {
	  'zh-TW': zhTW,
	  en,
	  ja,
	} as const
	
	export default defineEventHandler((event) => {
	  const config = useRuntimeConfig()
	  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
	
	  const query = getQuery(event)
	  const cookieLang = getCookie(event, 'i18n_redirected')
	  const locale = String(query.lang || cookieLang || 'zh-TW') as keyof typeof messages
	
	  const message = messages[locale] ?? messages['zh-TW']
	
	  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
	
	  return `# ${message.site.name}

> ${message.site.description}

This website includes multilingual company pages, SEO metadata, sitemap, robots.txt, and structured content for AI assistants.

## Core Pages // 放最重要的頁面，通常 5~15 個就夠

- [Home](${siteUrl}/): Main entry point of the website.
- [About](${siteUrl}/about): Company or organization introduction.
- [Sample](${siteUrl}/sample): Example page for this Nuxt starter template.
  
## Documentation / Guides // 如果網站有教學、FAQ、文件、知識庫

- Getting Started  
- FAQ  
- Developer Guide

## SEO Resources

- [Sitemap](${siteUrl}/sitemap.xml): Full list of indexable pages.
- [Robots](${siteUrl}/robots.txt): Crawling rules for search engines and AI agents.

## Optional

- [Manifest](${siteUrl}/site.webmanifest?lang=${locale}): Web app manifest metadata.
`
	})
   ```
   `app.vue` 加上：
   ```ts
   useHead({
	  link: [
	    {
	      rel: 'alternate',
	      type: 'text/plain',
	      href: `/llms.txt?lang=${locale.value}`,
	      title: 'llms.txt',
	    },
	  ],
	})
   ```
   透過連結看到內容：http://localhost:3000/llms.txt?lang=zh-TW、http://localhost:3000/llms.txt?lang=en、http://localhost:3000/llms.txt?lang=ja
6. 拆共用方法 getLocale、getSiteUrl、getMessages，因 llms.txt.ts、site.webmanifest.ts 這兩個檔案都有用到
 ```
server/  
	├─ routes/  
	│ ├─ llms.txt.ts  
	│ ├─ site.webmanifest.ts  
	│ └─ ...  
	└─ utils/  
	├─ getLocale.ts  
	├─ getSiteUrl.ts  
	└─ getMessages.ts
 ```
  7. 建立 JSON-LD（Schema.org）
    安裝：`npx nuxi module add schema-org`
    nuxt.config.ts 設定：
   ```ts
	export default defineNuxtConfig({
		  schemaOrg: {  
			identity: {  
				type: 'Organization',   
				url: siteUrl,  
			},  
		},
	})
   ```
   
   建立 `composables/usePageSchema.ts`：
   ```ts
   type PageSchemaType = 'WebPage' | 'Article' | 'Product' | 'FAQPage'

interface BaseSchemaOptions {
  type?: PageSchemaType
  name?: string
  description?: string
  url?: string
}

interface ArticleSchemaOptions extends BaseSchemaOptions {
  type: 'Article'
  datePublished?: string
  dateModified?: string
  image?: string
}

export function usePageSchema(options: BaseSchemaOptions | ArticleSchemaOptions = {}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const { t } = useI18n()

  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
  const url = options.url ?? `${siteUrl}${route.path}`

  const name = options.name ?? t('site.name')
  const description = options.description ?? t('site.description')

  if (options.type === 'Article') {
    useSchemaOrg([
      defineArticle({
        headline: name,
        description,
        url,
        image: options.image,
        datePublished: options.datePublished,
        dateModified: options.dateModified,
      }),
    ])

    return
  }

  useSchemaOrg([
    defineWebPage({
      name,
      description,
      url,
    }),
  ])
}
   ```
   一般頁面使用：
   ```ts
   usePageSchema({
	  name: t('pages.about.meta.title'),
	  description: t('pages.about.meta.description'),
	})
   ```
   文章頁面使用：
   ```ts
   usePageSchema({
	  type: 'Article',
	  name: article.title,
	  description: article.description,
	  image: article.image,
	  datePublished: article.publishedAt,
	})
   ```
   app.vue 保留全站 Schema：
   ```ts
   useSchemaOrg([
	  defineOrganization({
	    name: t('site.name'),
	    url: siteUrl,
	  }),

	  defineWebSite({
	    name: t('site.name'),
	    url: siteUrl,
	  }),
	])
   ```
   建立 usePageMeta.ts 將 usePageSeo.ts、usePageSchema.ts 共用的地方拆出
   建立全站設定在 app.vue 的 useSiteSchem.ts：
   ```ts
   import { usePageMeta } from './usePageMeta'
	export function useSiteSchema() {
		const { siteName, siteUrl } = usePageMeta()

		useSchemaOrg([
			defineOrganization({
				name: siteName,
				url: siteUrl,
			}),

			defineWebSite({
				name: siteName,
				url: siteUrl,
			}),
		])
	}
   ```
   8. 建立 app/config/site.ts 公司資訊設定檔：
```ts
export const siteConfig = {
  logo: '/images/logo.png',

  email: 'service@example.com',

  telephone: '+886-2-1234-5678',

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  },
}
```
9. 設定 CSP
   安裝：`npx nuxi@latest module add security`
   nuxt.config.ts 設定：
   ```ts
security: {
	headers: {
		contentSecurityPolicy: {
			// 預設
			'default-src': ["'self'"],

			// HTML <base>
			'base-uri': ["'self'"],

			// object/embed
			'object-src': ["'none'"],

			// iframe
			'frame-src': [
				"'self'",
				'https://www.youtube.com',
				'https://www.youtube-nocookie.com',
				'https://www.google.com', // Google Maps Embed
			],

			// 圖片
			'img-src': [
				"'self'",
				'data:',
				'blob:',
				'https:',
				'https://www.google-analytics.com',
				'https://www.googletagmanager.com',
				'https://maps.gstatic.com',
			],

			// CSS
			'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
		
			// Font
			'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],

			// Script
			'script-src': [
				"'self'",
				"'strict-dynamic'",
				"'nonce-{{nonce}}'",
				'https://www.googletagmanager.com',
				'https://www.google-analytics.com',
				'https://maps.googleapis.com',
			],

			// XHR / fetch / websocket
			'connect-src': [
				"'self'",
				'https://www.google-analytics.com',
				'https://www.googletagmanager.com',
				'https://maps.googleapis.com',
				'https://maps.gstatic.com',
			],

			// Video / Audio
			'media-src': ["'self'", 'blob:'],

			// form submit
			'form-action': ["'self'"],
		
			// 防止 Clickjacking
			'frame-ancestors': ["'self'"],
		},
	},
},
   ```