# AccessKey、Skip Link 與鍵盤無障礙

> 目標：讓只使用鍵盤、螢幕閱讀器或其他輔具的使用者，能更快抵達頁面的主要區塊。

## AccessKey 是什麼？

`accesskey` 是 HTML 的全域屬性，可為可互動元素指定一個鍵盤快速鍵。例如 `accesskey="C"` 可讓使用者透過「瀏覽器指定的組合鍵 + C」將焦點移到該元素或啟用它。

```html
<a href="#main-content" accesskey="C">跳至主要內容</a>
```

要注意：HTML 標準只定義 `accesskey` 的語意，**沒有規定所有瀏覽器都使用相同的觸發組合鍵**。實際行為會依作業系統、瀏覽器與既有快捷鍵而不同。

## AccessKey 的使用時機

適合用在網站中反覆出現、使用者需要快速抵達的「大區塊」，例如：

- 頁首／主要導覽
- 主要內容
- 頁尾資訊
- 網站搜尋（僅在沒有衝突且有明確需求時）

不適合為每個連結、按鈕或表單欄位都設定快速鍵。快速鍵過多不容易記，也可能覆蓋瀏覽器、作業系統、輔具或使用者自訂的按鍵。

## 各瀏覽器的 AccessKey 快捷鍵

以下是常見桌面環境的組合；版本、擴充功能與系統設定都可能影響結果，正式上線前應以支援範圍內的實機測試為準。

| 瀏覽器 | Windows | macOS |
| --- | --- | --- |
| Chrome | `Alt` + AccessKey | `Control` + `Option` + AccessKey |
| Edge | `Alt` + AccessKey | `Control` + `Option` + AccessKey |
| Firefox | `Alt` + `Shift` + AccessKey | `Control` + `Option` + AccessKey |
| Safari | 不支援 Windows 版本 | `Control` + `Option` + AccessKey |

例如頁面有 `accesskey="C"` 時，Windows Chrome/Edge 常以 `Alt + C` 觸發；macOS Chrome、Edge、Firefox 與 Safari 常以 `Control + Option + C` 觸發。

> 提醒：螢幕閱讀器也常使用 `Control + Option`（例如 VoiceOver 的修飾鍵），實際操作可能需調整或由輔具接手。因此 AccessKey 不應是唯一的導覽方式。

## U / C / Z 導盲磚說明

在臺灣網站的無障礙實作中，常將 AccessKey 視為網頁的「導盲磚」：為頁面主要區域提供一致的入口。最常見的慣例如下：

| AccessKey | 對應區域 | 常見用途 |
| --- | --- | --- |
| `U` | 上方區塊（Upper） | 頁首、網站標誌、主要導覽、搜尋 |
| `C` | 中央主要內容（Content） | `main` 主要內容 |
| `Z` | 下方區塊（Bottom） | 頁尾、聯絡資訊、輔助連結 |

這是資訊架構上的慣例，不是 HTML 的強制規範。重點是：同一網站要固定對應關係，並讓 AccessKey 指向有語意的區域容器，而不是任意視覺位置。

```html
<header id="header" accesskey="U" tabindex="-1">…</header>
<main id="main-content" accesskey="C" tabindex="-1">…</main>
<footer id="footer" accesskey="Z" tabindex="-1">…</footer>
```

## Skip Link 與 AccessKey 的差異

| 項目 | Skip Link（略過連結） | AccessKey |
| --- | --- | --- |
| 操作方式 | 用 `Tab` 聚焦後按 `Enter` | 使用瀏覽器組合鍵加指定字母 |
| 可發現性 | 焦點移到連結時即可看到／聽到 | 使用者通常要先知道快捷鍵 |
| 跨瀏覽器一致性 | 高 | 較低，組合鍵依環境而異 |
| 快捷鍵衝突 | 少 | 可能與瀏覽器、系統、輔具衝突 |
| 建議定位 | 必備的主要導覽捷徑 | 可選的輔助捷徑 |

Skip Link 是符合 WCAG 2.4.1「略過重複區塊」的直接做法；它應放在文件前段，並在鍵盤聚焦時清楚顯示。AccessKey 可以保留作為熟悉慣例的補充，但不應取代 Skip Link、語意化地標或正確的標題結構。

## Nuxt Starter 建議實作方式

建議將共用結構放在預設 layout：

1. 在頁面最前方加入「跳至主要內容」Skip Link。
2. 使用 `header`、`nav`、`main`、`footer` 等語意化元素建立地標。
3. 讓 `main` 有唯一的 `id="main-content"`，並加上 `tabindex="-1"`，使錨點跳轉後可可靠地取得焦點。
4. 若專案或規範需要 U/C/Z，再對三個區塊加入 AccessKey；同時在可見的無障礙說明頁告知使用者。
5. 路由切換後，視需求把焦點移至新的 `main` 或 `h1`，避免 SPA 使用者停留在舊頁的焦點位置。

## 完整 Nuxt 範例程式碼

### `layouts/default.vue`

```vue
<template>
  <a class="skip-link" href="#main-content">
    跳至主要內容
  </a>

  <header id="site-header" accesskey="U" tabindex="-1">
    <NuxtLink to="/" aria-label="首頁">網站名稱</NuxtLink>
    <nav aria-label="主要導覽">
      <ul>
        <li><NuxtLink to="/about">關於我們</NuxtLink></li>
        <li><NuxtLink to="/contact">聯絡我們</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <main id="main-content" accesskey="C" tabindex="-1">
    <slot />
  </main>

  <footer id="site-footer" accesskey="Z" tabindex="-1">
    <nav aria-label="頁尾導覽">
      <NuxtLink to="/accessibility">無障礙宣告</NuxtLink>
    </nav>
    <small>© 2026 Example</small>
  </footer>
</template>

<style scoped>
.skip-link {
  position: fixed;
  z-index: 1000;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.75rem 1rem;
  color: #fff;
  background: #005a9c;
  border-radius: 0.25rem;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: translateY(0);
  outline: 3px solid #ffbf47;
  outline-offset: 2px;
}

:focus-visible {
  outline: 3px solid #005a9c;
  outline-offset: 3px;
}
</style>
```

### `pages/index.vue`

```vue
<template>
  <section aria-labelledby="page-title">
    <h1 id="page-title">首頁</h1>
    <p>這是主要內容。按 Tab 時可先聚焦「跳至主要內容」。</p>
  </section>
</template>
```

### 路由切換時管理焦點（可選）

若是內容導向的 Nuxt 網站，可在 `app.vue` 監看路由，讓切換頁面後的鍵盤焦點回到主要內容：

```vue
<script setup lang="ts">
const route = useRoute()

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    document.querySelector<HTMLElement>('#main-content')?.focus()
  },
)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

> 是否自動移動焦點取決於互動情境；例如局部更新、對話框或表單驗證，不應一律把焦點拉回 `main`。

## `aria-label`、`title`、`name` 的建議

| 屬性 | 建議用途 | 注意事項 |
| --- | --- | --- |
| `aria-label` | 元素沒有可辨識文字時，提供可存取名稱；常用於純圖示按鈕、`nav` 地標 | 有可見且正確的文字時通常不必加；不要用它覆蓋更清楚的可見標籤 |
| `title` | 補充性提示，例如縮寫的完整名稱 | 不要把重要資訊只放在 `title`；觸控與鍵盤使用者未必會取得提示 |
| `name` | 表單欄位提交時的資料鍵名，或特定 HTML 元素的名稱 | 它不是一般介面的替代標籤；表單控制項仍應有 `<label>` 或適當的可存取名稱 |

範例：

```html
<!-- 純圖示按鈕：需要 aria-label -->
<button type="button" aria-label="關閉搜尋視窗">
  <svg aria-hidden="true"><!-- close icon --></svg>
</button>

<!-- 可見文字已明確：不需要重複 aria-label -->
<button type="submit">送出搜尋</button>

<!-- 表單：label 給使用者，name 給送出的資料 -->
<label for="site-search">站內搜尋</label>
<input id="site-search" name="q" type="search">
```

## 最佳實務（Best Practices）

- 先提供 Skip Link、語意化地標與正確的標題階層；AccessKey 是補充，不是唯一方案。
- 將 U／C／Z 僅用於穩定的大區塊，並在整個網站維持相同意義。
- 每個 `accesskey` 在單一頁面中必須唯一，避免使用常見瀏覽器快捷鍵的字母組合。
- Skip Link 必須「平時可隱藏、取得鍵盤焦點時可見」，不可使用 `display: none` 或 `visibility: hidden` 讓它無法聚焦。
- 不要只靠顏色、滑鼠 hover 或 `title` 傳達重要操作資訊。
- 對純圖示控制項提供明確的 `aria-label`；對一般表單控制項優先使用可見的 `<label>`。
- 使用鍵盤實測：重新載入後按 `Tab`、啟用 Skip Link、檢查焦點是否可見且確實到達主要內容；也要測試目標瀏覽器與輔具組合。
- 如有無障礙宣告或說明頁，列出網站使用的 AccessKey 與對應區塊，並說明各瀏覽器組合鍵可能不同。

## 參考資料

- [WHATWG HTML Standard：The accesskey attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute)
- [W3C WAI：Understanding SC 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
