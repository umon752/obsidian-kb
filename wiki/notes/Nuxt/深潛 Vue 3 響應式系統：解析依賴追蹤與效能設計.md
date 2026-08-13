---
type: note
author: ai
tags: ["vue/reactivity", "vue/effect", "data-structure/linked-list", "performance/subscription", "status/draft"]
summary: "用 effect、track、trigger 與動態依賴清理理解 Vue 3 響應式更新及其效能成本。"
sources: ["raw/notes/Nuxt/深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 深潛 Vue 3 響應式系統：解析依賴追蹤與效能設計

## 摘要

> Vue 3 響應式系統不是資料改變就重畫全部，而是記錄哪些副作用讀取過哪些資料，只通知真正依賴該資料的工作重新執行。

> [!abstract] TL;DR
> effect 執行時成為目前訂閱者，getter 讀取時 `track`、setter 寫入時 `trigger`；動態依賴需要清理，雙向鏈結串列則協助控制訂閱關係的增刪成本。

## 🎯 關鍵觀念

- `effect` 是響應式更新的基本單位，template render、`computed` 與 `watch` 都可視為 effect 或其延伸。
- getter 負責 `track`，setter 負責 `trigger`，形成資料與副作用之間的發布／訂閱關係。
- 一個資料可以被多個 effect 使用，一個 effect 也可以讀取多個資料，依賴圖是多對多。
- effect 的依賴會隨分支改變，每次執行前要清除舊訂閱，避免失效資料仍觸發更新。
- 若已持有訂閱節點，雙向鏈結串列能讓新增與移除達到 O(1)；通知所有訂閱者仍是 O(n)。
- 巢狀 effect 結束後必須恢復外層 active effect，否則後續讀取會被記到錯誤的訂閱者。

## 🛠 實作步驟

### Step 1 — 建立 effect 執行上下文

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

`try...finally` 很重要：即使 effect 執行拋錯，也要把上下文還原，避免之後所有依賴追蹤都指向錯誤的 effect。

### Step 2 — 在 getter 收集、setter 觸發

```ts
const deps = new WeakMap<object, Map<PropertyKey, Set<Effect>>>()

function track(target: object, key: PropertyKey) {
  if (!activeEffect) return
  const byKey = deps.get(target) ?? new Map()
  const subscribers = byKey.get(key) ?? new Set<Effect>()
  subscribers.add(activeEffect)
  byKey.set(key, subscribers)
  deps.set(target, byKey)
}

function trigger(target: object, key: PropertyKey) {
  deps.get(target)?.get(key)?.forEach(run => run())
}
```

實際實作還要處理重複訂閱、停止 effect、scheduler 與觸發中的集合變更；核心流程仍是「讀取建立關係、寫入找到關係並通知」。

### Step 3 — 清理動態依賴

```ts
let showName = true

effect(() => {
  cleanup(activeEffect)
  if (showName) state.name
  else state.email
})
```

當分支從 `name` 改成 `email` 時，舊的 `name` 訂閱必須移除。否則 effect 雖然已不再使用 `name`，仍會因 `name` 變更而無效重跑。

### Step 4 — 用節點管理訂閱關係

將「某個 effect 訂閱某個 dep」表示為節點，節點保存 `prev`、`next` 與所屬 dep。已知節點位置時，從雙向鏈結串列中加入或移除不必重新掃描整條鏈；但 `trigger` 仍需走訪所有訂閱者，因此通知成本仍與訂閱數量成正比。

### Step 5 — 正確處理巢狀 effect

```ts
effect(() => {
  state.outer
  effect(() => {
    state.inner
  })
  state.afterInner
})
```

內層 effect 執行前保存外層 active effect，結束後恢復它；否則 `state.afterInner` 會錯誤地被內層 effect 訂閱。實務上也應避免在每次 render 都無限制建立新的 nested effect。

## 🧠 類比 / 觀念釐清

> effect 像訂閱電子報的工作者：讀過哪個主題就留下訂閱；資料更新像新刊發行，只通知訂閱該主題的人，而不是把所有人都叫來。

## 💡 實務提醒

> [!tip] 先釐清更新單位
> 效能優化不是讓所有資料都不更新，而是縮小每次變更真正需要重新執行的 effect 範圍。

> [!warning] 清理與觸發要分開思考
> 動態依賴清理降低無效觸發，但觸發本身仍需遍歷有效訂閱者；不要把 O(1) 的增刪誤解成整體更新 O(1)。

> [!warning] 巢狀上下文一定要可恢復
> active effect、scheduler 與 cleanup 都要在例外與巢狀情境下恢復一致狀態。

## ❓ 自我檢核

- [ ] `track` 與 `trigger` 分別在什麼時機執行？
- [ ] 為什麼依賴關係是多對多，而不是一個資料只對應一個 effect？
- [ ] 動態條件改變後，為什麼必須清理舊依賴？
- [ ] 雙向鏈結串列可以優化哪一段成本，不能優化哪一段？
- [ ] 巢狀 effect 結束後若不恢復 active effect，會造成什麼錯誤？

## 🔖 重要引文 / 範例

> 響應式的重點不是「資料變了就重畫」，而是只通知真正依賴該資料的工作。

## 🔗 延伸閱讀

- [[entities/工具_Nuxt]]
- [[sources/Note_Vue3響應式系統]]

