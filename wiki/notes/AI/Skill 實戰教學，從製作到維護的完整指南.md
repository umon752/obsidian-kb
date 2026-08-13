---
type: note
author: ai
tags: ["ai/agent", "ai/skill", "workflow/automation", "status/draft"]
summary: "把個人執行邏輯與領域判斷轉移給 agent，建立可觸發、穩定且可維護的 skill。"
sources: ["raw/notes/AI/Skill 實戰教學，從製作到維護的完整指南.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Skill 實戰教學，從製作到維護的完整指南

## 摘要

> Skill 的核心不是把工作自動化而已，而是把人類的執行邏輯、判斷標準與領域知識轉移給 agent，形成可重複且能長期複利的工作流。

> [!abstract] TL;DR
> 好的 skill 會在正確時機被觸發，使用足夠清楚的原則穩定產出，並讓人類可以持續理解與維護。

## 🎯 關鍵觀念

- Skill 通常由 `SKILL.md`、`references/` 與 `scripts/` 組成，分別承載方法論、按需細節與確定性操作。
- 漸進式揭露讓 agent 先只看 name 與 description，觸發後才載入主文件，必要時才讀 references 或執行 scripts。
- 高重複性、需要專屬 domain knowledge、錯誤代價高，是判斷工作是否值得封裝成 skill 的三個訊號。
- Description 必須同時說明「做什麼」與「何時使用」，並使用使用者自然會說的觸發詞。
- 主文件應描述 why、執行心態與判斷原則；只有具客觀標準的內容才適合寫成窄步驟。
- 建議主文件控制在約 200 行內，過長的細節與範例應拆到 references，固定邏輯則交給 scripts。

## 🛠 實作步驟

### Step 1 — 判斷是否值得封裝

觀察工作流是否反覆出現、步驟是否大致固定，以及是否包含 AI 不知道的專案規則或高風險判斷。符合任一訊號就可以先做一個小 skill，實際沒用再刪除。

### Step 2 — 選擇製作方法

- **逆向工程**：先和 agent 完成一次任務，保留 session，再請 agent 從成功流程萃取可重複的 skill。
- **Brain Dump**：先提供目標、背景、難點與期望結果，請 agent 先找出不清楚之處，再形成 skill。
- **Evaluation-Driven Development**：先讓 agent 在沒有方法論的情況下試做，從卡點找出真正需要補上的 domain knowledge。

### Step 3 — 撰寫能被觸發的 Description

```text
Drafts weekly status updates for managers from project data.
Use when the user mentions weekly reports, team updates, or status summaries.
```

前半句用第三人稱說明功能，後半句列出使用者平常會說的詞；避免只放技術術語，也避免描述得過度寬泛。

> [!warning] 觸發詞不是關鍵字堆疊
> 觸發詞太技術化會增加 agent 的推理成本，描述太寬則會在不相關情境誤觸發。

### Step 4 — 寫原則，不把流程鎖死

先回答三件事：為什麼要這樣做、agent 應採取什麼視角、遇到取捨時遵循什麼原則。例如週報不是羅列「我做了什麼」，而是整理「主管需要知道什麼」。

若內容有客觀對錯（例如欄位驗證），可以寫明確步驟；若需要依情境判斷，應提供 guiding principle，而非過窄的 SOP。

### Step 5 — 用漸進式揭露控制上下文

```text
SKILL.md       → 觸發後必讀的方法論
references/    → 需要時才載入的細節、變體與案例
scripts/       → 需要時執行的固定邏輯
```

大型範例、corner case、格式規範放到 references；排序、驗證、固定 API 呼叫等確定性工作放到 scripts，讓 context 保留給真正需要判斷的內容。

### Step 6 — 以使用結果維護

每次 workflow 完成後，檢查 agent 的錯誤與卡點，再依序刪除冗餘、重整結構、抽出 references。新模型或工作流程改變時，也要重新檢查原本為舊問題加上的補丁是否仍然必要。

## 🧠 類比 / 觀念釐清

> 寫 skill 就像替 AI 擔任 PM：不是把所有操作逐字遙控，而是準備好足夠的上下文、限制、方法與成功標準，讓執行者能自主完成工作。

## 💡 實務提醒

> [!tip] 先做再評估
> Skill 的製作成本低，若實際使用沒有價值就刪除；不要在沒有案例前花太多時間設計完美架構。

> [!tip] 每次完成後復盤
> 可請 agent 列出執行錯誤、背後原因，以及哪些修正能融入既有 skill，避免下次重犯。

> [!warning] AI 修改 skill 仍要人工審核
> 自動復盤可能把結構改壞或加入人類難以維護的規則；寫入前應確認方向、範圍與原則是否乾淨。

> [!warning] 不要把 script 原始碼全部塞進主文件
> script 的程式碼可在需要時執行，通常只把結果提供給 agent；善用 scripts 能提高穩定性並節省 token。

## ❓ 自我檢核

- [ ] Description 是否同時說明功能與觸發時機，且使用自然語言？
- [ ] 主文件寫的是判斷原則，還是過度僵化的操作清單？
- [ ] 哪些細節可以移到 `references/`，哪些固定邏輯適合放到 `scripts/`？
- [ ] 最近一次 workflow 的錯誤是否已轉成可驗證的改善？

## 🔖 重要引文 / 範例

> 真正有效的 skill 迭代，補的是系統缺口，不是像抽籤一樣一直重跑；Skill 是把個人知識轉移給 agent 的載體。

## 🔗 延伸閱讀

- [[entities/工具_ClaudeCode]]
- [[entities/工具_Cursor]]
