---
type: source
author: ai
tags: ["domain/nuxt", "topic/websocket", "topic/realtime", "topic/state-management", "status/draft"]
summary: "整理多分頁 Socket 擁有者、K 線資料一致性與 refetch storm 防護策略。"
sources: ["raw/notes/Nuxt/Socket 即時資料治理.md"]
created: "2026-08-13"
updated: "2026-08-13"
---
# Socket 即時資料治理

## 核心要點

- 多分頁可用 BroadcastChannel 選出一個 realtime owner，只有 owner 維持 socket；其他分頁接收 snapshot 或控制訊息。
- K 線歷史資料與即時資料應以同一時間戳覆寫合併，避免重複 candle 或時間序列跳動。
- refetch 應以 key 去重並加入 jitter，防止斷線重連或多個元件同時觸發請求風暴。
- 後端仍需控制帳號與裝置層級的連線、訂閱與請求配額，前端協調不能取代服務端治理。
