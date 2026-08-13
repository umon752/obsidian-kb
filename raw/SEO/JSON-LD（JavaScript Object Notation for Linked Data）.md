## JSON-LD 是什麼？

一句話：

> **JSON-LD 是提供給 Google、AI、搜尋引擎閱讀的 JSON 網頁描述結構化資料。**

例如一般 HTML：

```
<h1>Nuxt Starter</h1><p>網站介紹...</p>
```

Google 知道：

> 這是一個 h1。

但不知道：

- 這是公司？
- 商品？
- 文章？
- FAQ？

---

如果加上 JSON-LD：

```
{  "@context": "https://schema.org",  "@type": "Organization",  "name": "OpenAI",  "url": "https://openai.com"}
```

Google 就知道：

> 這是一間公司。

不同頁面的內容不同，就應該有不同的 Schema。

## 類型
| 頁面   | Schema              |
| ---- | ------------------- |
| 首頁   | WebPage             |
| 關於我們 | AboutPage 或 WebPage |
| 最新消息 | Article             |
| 商品   | Product             |
| FAQ  | FAQPage             |
| 活動   | Event               |
| 麵包屑  | BreadcrumbList      |

## 全站設定
```ts
useSchemaOrg([ defineOrganization({ name: t('site.name'), url: siteUrl, }), defineWebSite({ name: t('site.name'), url: siteUrl, }), ])
```
網站背後是誰？ → Organization  
這個網站本身是什麼？ → WebSite

### defineOrganization

描述的是：

> **擁有這個網站的組織／公司**

例如：

```
{  "@type": "Organization",  "name": "OpenAI",  "url": "https://openai.com",  "logo": "...",  "sameAs": [    "https://www.facebook.com/...",    "https://www.linkedin.com/..."  ]}
```

通常會放：

- 公司名稱
- Logo
- 官方網站
- 社群連結
- Email
- 電話

### defineWebSite

描述的是：

> **這個網站**

例如：

```
{  "@type": "WebSite",  "name": "OpenAI",  "url": "https://openai.com"}
```

通常會放：

- 網站名稱
- 網址
- SearchAction（站內搜尋，可選）