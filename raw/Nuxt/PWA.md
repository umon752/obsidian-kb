# PWA（Progressive Web App）重點整理

## 1. 什麼是 PWA？

PWA（Progressive Web App）是一種介於網站（Website）與原生 App（Native App）之間的技術。

使用者透過瀏覽器開啟網站，但可以獲得接近 App 的使用體驗。

### PWA 的主要能力

- 安裝到手機或電腦桌面
- 全螢幕啟動（隱藏瀏覽器網址列）
- 支援推播通知（部分平台）
- 離線快取（Offline Cache）
- 啟動速度較快
- 可設定 App Icon、名稱、啟動畫面

---

## 2. PWA 可以幫助什麼？

### 對使用者

#### 更方便再次開啟

傳統網站：

瀏覽器 → 搜尋 → 找網站

PWA：

桌面圖示 → 直接開啟

---

#### 提升體驗

使用起來更像 App：

- 全螢幕
- 較快的載入速度
- 可離線查看部分內容

---

#### 節省手機空間

不需要到 App Store 安裝完整 App。

例如：

- 電商網站
- 公司內部系統
- 活動網站
- 會員中心

通常使用 PWA 即可。

---

### 對開發者

#### 單一程式碼庫

不用維護：

- iOS App
- Android App
- Web

只維護一套 Web 專案即可。

---

#### SEO 友善

原生 App 無法被搜尋引擎索引。

PWA 本質仍是網站，因此可以：

- 被 Google 搜尋
- 做 SEO
- 分享網址

---

#### 開發成本較低

相比：

- Swift（iOS）
- Kotlin（Android）

Nuxt、Vue、React 團隊通常更容易維護。

---

## 3. site.webmanifest 是什麼？

它是 PWA 的設定檔。

當使用者將網站加入主畫面時，瀏覽器會讀取這份設定。

### 常見欄位

```json
{
  "name": "My Website",
  "short_name": "My App",
  "description": "網站描述",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": []
}
```

### 常用設定

#### name

完整 App 名稱

```json
{
  "name": "Yi Chieh Portfolio"
}
```

#### short_name

桌面圖示下顯示的名稱

```json
{
  "short_name": "Portfolio"
}
```

#### description

App 描述

```json
{
  "description": "個人作品集網站"
}
```

#### display

推薦：

```json
{
  "display": "standalone"
}
```

效果：

- 像 App 一樣開啟
- 不顯示瀏覽器網址列

---

## 4. 推薦的 site.webmanifest 線上工具

### PWA Builder

https://www.pwabuilder.com

優點：

- Microsoft 官方推動
- 可檢查 PWA 完整度
- 可產生 manifest
- 可產生 App Icons

---

### RealFaviconGenerator

https://realfavicongenerator.net

優點：

- 自動產生各平台圖示
- Apple Touch Icon
- Android Icon
- Manifest Icon

Nuxt 專案很常使用。

---

### Lighthouse

Chrome DevTools 內建

功能：

- 檢查 PWA 分數
- 檢查 Manifest
- 檢查 Service Worker
- 檢查可安裝性

開發完成後必測。

---

### Manifest Generator

https://www.simicart.com/manifest-generator/

快速產生：

- name
- short_name
- icons
- colors

適合快速測試。

---

## 5. 現在使用者真的會加到主畫面嗎？

老實說：

大部分使用者不會。

尤其是一般消費者。

常見行為仍然是：

App Store → 搜尋 → 安裝 App

因此：

「PWA 取代 App」已經不是主流思維。

---

## 6. 那 PWA 的優勢在哪？

### 情境一：先有網站，再考慮 App

例如：

- 品牌官網
- 電商網站
- SaaS
- 會員系統

先做：

Web + PWA

驗證市場後再做 App。

---

### 情境二：內部系統

例如：

- CRM
- ERP
- 報表系統
- 後台管理

員工不一定願意下載 App。

PWA：

- 開網址即可使用
- 可加入桌面

非常適合。

---

### 情境三：活動網站

例如：

- 展覽
- 演唱會
- 課程活動

活動結束就不用了。

此時開發 App 成本太高。

PWA 很適合。

---

### 情境四：降低 App 開發成本

如果功能主要是：

- 表單
- 查詢
- 會員中心
- 內容瀏覽

通常 PWA 已足夠。

---

## 7. 對 Nuxt 專案的建議

如果你的 Nuxt 網站：

- 重視 SEO
- 有會員功能
- 希望可安裝
- 不打算維護 iOS / Android App

建議：

✅ 加入 PWA

原因：

- 成本低
- SEO 不受影響
- 提升專業度
- 未來可擴充

但不要把 PWA 當成主要獲客手段。

真正的價值通常是：

- 更好的使用體驗
- 更快的載入速度
- 可安裝能力
- 離線快取

而不是期待大量使用者主動點擊「加入主畫面」。

---

## 結論

對現代網站來說：

- SEO → Nuxt SSR
- 安裝能力 → PWA
- App Store 流量 → 原生 App

三者並不衝突。

目前大多數企業的策略是：

1. 先做網站（SEO）
2. 補上 PWA 能力
3. 有足夠商業價值後再投入原生 App

因此對你的 Nuxt 專案而言：

PWA 建議做，但應把它視為「網站體驗升級」，而不是「取代 App」。
