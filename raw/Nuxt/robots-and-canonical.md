# Robots 與 Canonical 設定說明

## Robots Meta

### 用途

告訴搜尋引擎（Google、Bing）是否允許：

- 收錄（Index）
- 爬取頁面中的連結（Follow）

### 設定範例

```ts
useHead({
  meta: [
    {
      name: 'robots',
      content: 'index,follow',
    },
  ],
})
```

### 常見設定

#### 正式網站

```txt
index,follow
```

#### 測試網站

```txt
noindex,nofollow
```

---

## Canonical

### 用途

Canonical 用於告訴搜尋引擎：

> 哪個網址才是這個頁面的正式網址。

### 設定範例

```ts
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://example.com/news/123',
    },
  ],
})
```

### 建議

- Robots 屬於全站設定，建議放在 `nuxt.config.ts`
- Canonical 屬於頁面設定，建議放在 `usePageSeo.ts`
- Canonical 可避免 Duplicate Content 並集中 SEO 權重

## Nuxt Starter Template 建議

### nuxt.config.ts

負責：

- lang
- viewport
- robots
- favicon

### usePageSeo.ts

負責：

- title
- description
- ogTitle
- ogDescription
- ogImage
- twitterCard
- canonical
