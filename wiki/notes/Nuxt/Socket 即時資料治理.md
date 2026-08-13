---
type: note
author: ai
tags: ["nuxt/realtime", "websocket/connection-governance", "browser/broadcast-channel", "data/consistency", "status/draft"]
summary: "以連線所有權、跨分頁協調與錯峰更新降低即時系統的 Socket、API 與渲染成本。"
sources: ["raw/notes/Nuxt/Socket 即時資料治理.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Socket 即時資料治理

## 摘要

> 即時系統的前端不只是顯示資料，也要治理多分頁造成的 Socket、API、資料解析與畫面渲染成本。

> [!abstract] TL;DR
> 透過 `BroadcastChannel` 選出少數 realtime owner，只有 owner 維持即時連線；其他分頁保留自己的狀態，靠控制訊息、權威快照與錯峰刷新維持一致性。

## 🎯 關鍵觀念

- 每個分頁都是獨立 runtime，各自擁有 app、store、query cache 與渲染工作；所有分頁直連會讓成本線性放大。
- Realtime owner 透過 leader election 限制同一瀏覽器的即時連線數，follower 不直接消費行情 socket。
- `BroadcastChannel` 應傳遞 owner、失效、控制與快照訊息；第一手交易 tick 不應被轉成多份二手 tick 廣播。
- K 線要先載入 history，再用相同 timestamp 覆寫尚未收線的 candle，才能在 owner 交接時無縫銜接。
- CRUD 更新後應以 keyed dedupe、jitter 與分頁錯峰避免 refetch storm。
- 連線額度、裝置限制與產品方案必須由後端決定，前端只負責執行與協調。

## 🛠 實作步驟

### Step 1 — 先估算多分頁成本

不要只看「平均一個使用者開幾頁」，要把頁數、每頁 socket、訂閱種類、tick 頻率與 API refresh 都算進容量模型。投影片的示例以 70% 開一頁、25% 開兩頁、5% 開五頁估算平均 1.45 pages/user，說明 owner 策略能減少重複連線。

> [!warning] 容量估算不是壓測結果
> 估算只能用來比較策略，仍需以真實連線數、訊息頻率、CPU、記憶體與後端 QPS 做壓測驗證。

### Step 2 — 選出 realtime owner

```ts
const channel = new BroadcastChannel('realtime-coordination')

// 實際專案需補上唯一分頁 id、heartbeat、逾時與重新選舉
channel.postMessage({ type: 'candidate', tabId })
channel.onmessage = ({ data }) => {
  if (data.type === 'owner') isOwner.value = data.tabId === tabId
}
```

Owner 建立 socket，follower 只接收必要的控制訊息；owner 關閉、心跳逾時或頁面失效時，其他分頁再重新選舉。

### Step 3 — 處理 owner 交接與 K 線

1. 新 owner 先取得指定商品與時間範圍的 history。
2. 將 history 建立成目前狀態，再連接即時資料流。
3. 對相同 timestamp 的未收線 candle 做覆寫，而不是無條件 append。
4. 交接完成後才讓圖表或 follower 使用新快照，避免短暫顯示舊行情。

### Step 4 — 治理 CRUD 與 refetch

資料異動後由 owner 取得權威 snapshot，再透過 key 對應的 query 更新狀態；相同 key 的請求只保留一份，其他分頁以隨機延遲錯峰刷新，避免所有視窗同時打 API。

## 🧠 類比 / 觀念釐清

> 把每個分頁想成同一間公司的分店：只需要一個代表對外接收即時電報，其他分店透過內部通知與定期快照更新；但每間分店仍要保留自己的畫面狀態與業務判斷。

## 💡 實務提醒

> [!warning] 不要廣播二手 tick
> 行情資料若經 owner 再轉播，可能增加延遲與資料失真；`BroadcastChannel` 優先傳遞控制訊息與快照同步。

> [!tip] 失效處理要可重入
> owner crash、瀏覽器休眠、網路斷線與分頁關閉都可能觸發重新選舉；heartbeat、timeout 與 reconnect 不應產生多個同時 owner。

> [!warning] 前端限制不是安全邊界
> 使用者可開多個瀏覽器或繞過前端程式，後端仍需按 account、device 與方案執行連線及請求配額。

## ❓ 自我檢核

- [ ] 為什麼多分頁直連 Socket 會同時放大連線、API、解析與渲染成本？
- [ ] owner 失效時，如何避免兩個分頁同時認為自己是 owner？
- [ ] K 線 history 與即時 candle 為什麼要用 timestamp 覆寫？
- [ ] keyed dedupe 與 jitter 分別解決哪一類 refetch storm？
- [ ] 哪些治理責任必須保留在後端？

## 🔖 重要引文 / 範例

> 前端也是系統設計的一個節點；降低不必要的連線與請求，不只是畫面優化，而是整體服務容量治理。

## 🔗 延伸閱讀

- [[entities/工具_Nuxt]]
- [[sources/Note_Socket即時資料治理]]

