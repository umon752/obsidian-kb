---
type: note
author: ai
tags: ["domain/ai", "topic/agent", "topic/skill", "status/draft"]
summary: "介紹如何判斷製作 skill 的時機、兩種製作方法、description 寫法、常見踩坑點，以及長期維護 skill 的策略，核心是把個人執行邏輯轉移給 agent。"
sources: ["raw/notes/AI/Skill 實戰教學，從製作到維護的完整指南.md"]
created: "2026-05-07"
updated: "2026-05-07"
---

# Skill 實戰教學，從製作到維護的完整指南

## 摘要

> Skill 的核心價值不只是自動化，而是把你腦中的執行邏輯、判斷標準與 domain knowledge 轉移給 agent，達成長期可複利的工作流。

> [!abstract] TL;DR
> 寫 skill 不難，難的是讓 agent 在對的時機自動觸發、產出穩定、且人類長期有能力維護。

## 🎯 關鍵觀念

- Skill 三層結構：SKILL.md（方法論主體）→ references（按需載入的細節與變體）→ scripts（確定性操作腳本）
- **漸進式披露（Progressive Disclosure）**：agent 啟動時只載入 name + description（~100 token），觸發後才載入完整 SKILL.md，references / scripts 按需載入
- 判斷是否值得做成 skill 的三個信號：**高重複性**、**你的 domain knowledge（AI 不知道的眉角）**、**高出錯成本**
- Description 三規則：同時包含「做什麼 + 何時用」、用第三人稱、包含使用者自然會說出的觸發詞
- SKILL.md 寫**原則**不寫死 SOP——除非對錯有客觀標準（如表單欄位驗證），否則給 why、執行心態、guiding principle
- Skill 超過 500 行要拆；維護三步驟：刪冗餘 → 重整結構 → 抽 references

## 🛠 實作步驟

### Step 1 — 判斷是否值得做成 Skill

三個信號，符合其中一個就值得做（成本極低，做完沒用再刪）：

- **高重複性**：同類任務一再出現，每次流程幾乎相同
- **Domain knowledge**：你的眉角、路徑規範、公司格式——AI 從訓練資料中無從得知
- **高出錯成本**：產出錯誤會造成麻煩，或需要對外交付、追求穩定品質

### Step 2 — 製作 Skill

**方法一：逆向工程（新手友善）**
1. 先手動與 agent 完成一次任務，過程中不斷調整
2. 任務完成且結果滿意後，**不要關掉 session**
3. 請 AI 把這段對話萃取成可重複使用的 skill（或使用 skill creator）

**方法二：主動 Brain Dump**
1. 把目標、想像中的流程、可能的難點告訴 AI
2. 請他在開始之前先釐清不清楚的地方，再製作 skill

**進階：Evaluation-Driven Development**
- 製作前先讓 AI 什麼方法論都不給地試做一次
- 觀察它卡在哪裡 → 那些卡點才是真正需要人為填補的空白

### Step 3 — 寫好 Description（解決「不觸發」問題）

```
Drafts weekly status updates for managers aggregating data from Google Drive and GitHub.
Use when user mentions weekly reports, team updates, status summaries, or weekly reviews.
```

- 前半句：做什麼（**第三人稱**）
- 後半句：`Use when user mentions ...`，列出使用者**自然會講的詞**，而非技術術語

> [!warning] 觸發詞要自然，描述不能太廣
> 觸發詞太技術導向 → agent 需要多一層推理才能觸發；描述太廣泛 → 不相關情境也會觸發。

### Step 4 — 寫好執行心法（解決「產出不穩」問題）

不要寫窄 SOP，而是給：
1. **Why**：為什麼要這樣做
2. **心態**：agent 執行時該用什麼視角
3. **核心原則**：遇到判斷時的 guiding principle

> 範例（週報 skill）：「週報是寫給主管看的，整理資訊的標準不是『我做了什麼』，而是『主管需要知道這件事嗎』。以卡點與下一步行動為首要優先。」

判斷原則：**這件事的對錯有沒有客觀標準？** 有 → 可以寫窄步驟；沒有 → 寫原則。

### Step 5 — 控制長度並拆分（解決「context rot」問題）

- 建議 **200 行以內**（官方上限 500 行）
- 細節、大量範例、corner case → 抽到 **references**，在 skill 中寫「請參考 references/xxx.md」
- 確定性操作（排序、格式驗證、API 呼叫、固定撈取邏輯）→ 抽到 **scripts**
- 善用 **sub-agent** 做最後一層品質驗收（separation of concerns，避免球員兼裁判）

### Step 6 — 維護 Skill

兩種情境觸發維護：**新模型發布**（移除為舊模型弱點加的補丁）、**每次 workflow 跑完復盤**

每次維護做三件事：
1. 刪除冗餘資訊（同樣原則只講一次）
2. 重整結構（能否快速讀懂、抓到骨架）
3. References 萃取（把塞進主文的細節抽出去）

## 🧠 類比 / 觀念釐清

> 寫 skill 就是在當 AI 的 PM——你的任務是把上下文、約束、方法和目標準備到足夠讓 AI 成功交付，而不是一直問 AI 能為你做什麼。

> Skill 不是把 AI 能力拉高到你的水準，而是把你的**判斷與思考方式**轉移給 agent。模型會越來越聰明，你真正要做的是把執行 logic 告訴它。

## 💡 實務提醒

> [!tip] 做完發現沒用？直接刪
> 現在製作 skill 的成本極低，與其花時間評估「值不值得做」，不如直接做，用不到再刪。

> [!tip] 復盤提示詞
> 每次 workflow 跑完，可請 agent 自己復盤：「請列出執行過程中的錯誤、背後原因，並判斷是否可以融入既有 skill 避免下次再犯。」

> [!warning] Agent 復盤後要人工審核
> 讓 agent 自己修改 skill 容易把結構改壞、或寫出人類難以維護的內容。每次 AI 寫入前，務必 double check 方向是否乾淨。

> [!warning] Script 的 code 不進 context
> Script 的程式碼本身不會載入 context，只有執行結果會餵給 AI，因此善用 scripts 可同時提高穩定性並節省 token。

## ❓ 自我檢核

- [ ] 我的 skill description 同時說明了「做什麼」和「何時觸發」嗎？觸發詞是我自己平常會講的話嗎？
- [ ] 我的 SKILL.md 寫的是原則與心法，還是過窄的步驟？這件事的對錯有沒有客觀標準？
- [ ] 這份 skill 超過 200 行了嗎？有哪些細節可以抽到 references 或 scripts？

## 🔖 重要引文 / 範例

> 「真正有效的 skill 迭代，補的是系統缺口，不是像抽籤式的一直重跑。很多人 skill 寫了一大堆廢話，都是 AI 有能力自己判斷的事情。」

> 「Skill 是個人知識轉移給 agent 的載體。你過去要花很長時間才能教會一個新進員工的事情，打包成 skill 之後，agent 立刻就能學會。」

## 🔗 延伸閱讀

- [[concepts/概念_漸進式披露（待補）]]
- [[concepts/概念_Evaluation-Driven Development（待補）]]
