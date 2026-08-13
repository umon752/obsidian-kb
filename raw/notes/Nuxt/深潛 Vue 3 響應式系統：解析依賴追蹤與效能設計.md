---
type: note
author: ai
tags: ['domain/前端開發', 'topic/Vue3響應式系統', 'vue/reactivity', 'vue/effect', 'data-structure/linked-list', 'status/draft']
summary: '拆解 Vue 3 如何透過 effect、依賴追蹤與雙向鏈結串列管理響應式更新'
sources: ['raw/notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計.md', 'https://rian.cc/slides/vue3-reactivity-talk']
created: '2026-06-15'
updated: '2026-06-15'
---

# 深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計

## 摘要

> Vue 3 響應式系統的核心不是「資料改變就重畫全部」，而是記錄哪些副作用讀取過資料，只通知真正依賴該資料的工作重新執行。

> [!abstract] TL;DR
> `effect` 執行時成為目前訂閱者，響應式資料在讀取時收集它、寫入時觸發它；雙向鏈結串列則讓動態依賴的新增、移除與清理維持可控成本。

## 🎯 關鍵觀念

- **`effect` 是更新單位**：template render、`computed`、`watch` 都可視為 effect 或其延伸機制。
- **讀取時收集、寫入時觸發**：getter 執行 `track`，setter 執行 `trigger`，形成自動化發布訂閱。
- **資料與副作用是多對多關係**：一個 `ref` 可被多個 effect 使用，一個 effect 也可讀取多個響應式來源。
- **依賴會動態改變**：effect 每次執行都要依實際走過的分支重新確認依賴，並移除失效關係。
- **鏈結節點表示訂閱關係**：若已持有節點，雙向鏈結串列可用 O(1) 新增或移除；觸發全部訂閱者仍需 O(n)。
- **巢狀 effect 需要還原執行上下文**：內層 effect 結束後，必須恢復外層訂閱者，否則外層後續讀取無法被追蹤。

## 🛠 實作步驟

### Step 1 — 建立 effect 執行上下文

教學模型先以全域變數記錄目前正在收集依賴的副作用。使用 `try...finally`，確保執行失敗時仍能恢復外層 effect。

```ts
type Effect = () => void

let activeEffect: Effect | undefined

function effect(fn: Effect) {
  const parent = activeEffect
  activeEffect = fn

  try {
    fn()
  } finally {
    activeEffect = parent
  }
}
```

### Step 2 — 在 getter 收集、setter 觸發

```ts
function ref<T>(initialValue: T) {
  let value = initialValue
  const subscribers = new Set<Effect>()

  return {
    get value() {
      if (activeEffect) subscribers.add(activeEffect)
      return value
    },
    set value(nextValue: T) {
      if (Object.is(value, nextValue)) return
      value = nextValue

      for (const subscriber of [...subscribers]) {
        subscriber()
      }
    },
  }
}

const count = ref(0)

effect(() => {
  console.log(count.value)
})

count.value++ // 重新執行 effect
```

> [!warning] 這不是完整 Vue 原始碼
> 範例只呈現 `track` / `trigger` 心智模型；正式系統還需處理清理、排程、去重、停止追蹤、遞迴觸發與 computed 快取。

### Step 3 — 處理動態依賴

```ts
effect(() => {
  console.log(flag.value ? name.value : age.value)
})
```

當 `flag` 改變，effect 下一次可能不再讀取原本的來源。正確流程是執行前標記或清理舊關係，執行時收集本次真正讀到的依賴，最後移除未再使用的訂閱，避免無效觸發。

### Step 4 — 用鏈結節點管理多個訂閱者

每個 link 節點代表「某個響應式來源與某個 effect 的依賴關係」，並保存前後節點參照：

```ts
interface Link {
  subscriber: Effect
  prevSub?: Link
  nextSub?: Link
}
```

陣列雖容易理解，但移除中間元素通常需要搜尋與位移。雙向鏈結串列在已知 link 的前提下，只需調整相鄰指標即可移除，適合高頻變動的依賴圖。

### Step 5 — 避免無限制建立巢狀 effect

若外層 effect 每次執行都建立新的內層 effect，舊內層訂閱沒有停止，就會持續累積訂閱者，造成重複執行與記憶體成本。應將 effect 建立移出重跑路徑，或在重建前停止舊 effect。

## 🧠 類比 / 觀念釐清

> 響應式資料像出版社，effect 像讀者。不同之處是 Vue 不要求讀者手動訂閱：effect 執行期間讀到哪份資料，那份資料就自動記住它；資料改變後只通知已登記的讀者。

## 💡 實務提醒

> [!tip] 用讀寫攔截點理解 reactivity
> 遇到 `ref`、`reactive`、`computed` 或 `watch` 行為問題時，先問三件事：何時讀取、當時誰是 active effect、何時寫入並觸發。

> [!warning] 不要把鏈結串列誤解成所有操作都是 O(1)
> 只有在已持有目標節點時，插入與移除才是 O(1)；尋找節點與通知全部訂閱者仍是 O(n)。

> [!warning] 謹慎在 effect 或 watch 內建立新監聽
> 每次重跑都建立新訂閱卻未清理，會使觸發次數逐步增加。元件卸載、條件切換與重建監聽時都要確認生命週期。

## ❓ 自我檢核

- [ ] getter 與 setter 在依賴追蹤中各負責什麼？
- [ ] 為什麼單一 `activeEffect` 無法正確處理巢狀 effect？
- [ ] 條件分支改變後，為什麼必須清理舊依賴？
- [ ] 雙向鏈結串列改善了哪些操作？哪些操作仍是 O(n)？
- [ ] 為什麼在 effect 內反覆建立另一個 effect 可能造成重複觸發？

## 🔖 重要引文 / 範例

> 響應式系統的核心心智模型：讀取時收集依賴，寫入時觸發更新。

## 🔗 延伸閱讀

- [原始講義：深潛 Vue 3 響應式系統](https://rian.cc/slides/vue3-reactivity-talk)
- [[Nuxt3 高效入門全攻略]]
- [[（待補）|Vue 3 響應式依賴追蹤]]
- [[（待補）|雙向鏈結串列]]
