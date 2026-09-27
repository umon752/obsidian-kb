# GEO（Generative Engine Optimization）

## GEO 內容優化

- 內頁文章下方放 FAQ，增加 AI 引用機會
  > 參考 Google「其他人也問了」，挑 3-5 題寫進文章末尾
  > 每題答案 2-3 句，語意完整、有主詞、結論清楚
- 建立或優化 Google 我的商家，提升品牌可信度與 AI 可見度
  > 「填寫所有欄位、上傳至少 5 張照片」在簡介帶入核心服務關鍵字

![截圖 2026-06-17 上午9.47.49.png](GEO%EF%BC%88Generative%20Engine%20Optimization%EF%BC%89/%E6%88%AA%E5%9C%96_2026-06-17_%E4%B8%8A%E5%8D%889.47.49.png)

![截圖 2026-06-17 上午9.47.56.png](GEO%EF%BC%88Generative%20Engine%20Optimization%EF%BC%89/%E6%88%AA%E5%9C%96_2026-06-17_%E4%B8%8A%E5%8D%889.47.56.png)

![截圖 2026-06-17 上午9.48.02.png](GEO%EF%BC%88Generative%20Engine%20Optimization%EF%BC%89/%E6%88%AA%E5%9C%96_2026-06-17_%E4%B8%8A%E5%8D%889.48.02.png)

- [Welly SEO](https://welly.tw/)
- ~~搜尋引擎：[https://share.google/aimode/Lhwh0AE6HW5WMFo5U](https://share.google/aimode/Lhwh0AE6HW5WMFo5U)~~
- [raccoonai 服務](https://www.raccoonai.co/zh)
  > 從顧客對話中分析真實語言與需求，再自動產製 GEO 文章，將第一手用戶語料轉化為內容策略。

---

## Lighthouse 13.3 更新

「代理瀏覽（Agentic Browsing）」與 llms.txt 的稽核項目是在 2026 年 5 月上旬（具體為 2026 年 5 月 7 日）隨著 Lighthouse 13.3 的版本更新正式推出的。

這是 Lighthouse 歷史上非常重要的一次升級，因為它直接在原本的四大指標（效能、無障礙、最佳作法、SEO）之外，新增了第五大全新分類：代理瀏覽（Agentic Browsing）。

這項更新的關鍵時間點與背景
2026 年 5 月 7 日：Lighthouse 13.3 正式釋出，將「代理瀏覽」列為預設檢測項目（免翻牆、免開 Experimental Flag），PageSpeed Insights 隨後也陸續同步更新。

檢測的四大核心：這個新分類主要測試網站對 AI Agent 的友善度，包含：

- llms.txt 規範（是否提供、伺服器抓取是否正常）
- WebMCP 整合驗證（微軟推動的 Web 機器控制協定）
- 無障礙樹（Accessibility Tree）結構（AI 代理人看不懂網頁時，會依賴這個樹狀結構來理解元件）
- 累計版面配置位移（CLS）（防止網頁在渲染時跳動，導致 AI Agent 點錯按鈕）

值得留意的最新市場動態（2026 年 5～6 月）
隨著這個功能在 5 月推出，市場上出現了一個非常有趣的技術觀點分歧，這在規劃 GEO 方案時非常適合拿來當作論點：

⚠️ Google 內部團隊的「微妙分歧」：

Google Search 團隊（搜尋核心）：在 2026 年 5、6 月更新的官方指南中指出：「llms.txt 目前不會幫助或傷害網頁在 Google Search 的排名，搜尋引擎目前會忽略它。」

Lighthouse 團隊（開發者工具）：卻大力推動並將其納入「代理瀏覽」檢測，強調這能協助 AI 代理程式在幾毫秒內看懂網站結構，避免耗費算力。

這代表了什麼？ 這恰好證明了 GEO（生成式引擎優化）已經開始與傳統 SEO 脫鉤。傳統 SEO 關注的是「常規搜尋排名」；而 Lighthouse 的這項更新，瞄準的是「當未來 AI 代理人（如 Gemini Agent、Claude Agent）直接替人類到你的網站進行瀏覽、訂票、填表單或抓取資料時，你的網站是否已經準備就緒（Agent-Ready）」。

因此，您建議將 llms.txt 的順序往前移完全抓到了這個技術斷代期的痛點，這絕對是 2026 年目前最前瞻的 GEO 策略！

---

## 相關規範、文章

- [https://developer.chrome.com/blog/agent-ready-toolkit?hl=zh-tw](https://developer.chrome.com/blog/agent-ready-toolkit?hl=zh-tw)
- [https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring?hl=zh-tw](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring?hl=zh-tw)
- [https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt?hl=zh-tw](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt?hl=zh-tw)
- [https://www.debugbear.com/docs/agentic-browsing/llms-txt-does-not-follow-recommendations](https://www.debugbear.com/docs/agentic-browsing/llms-txt-does-not-follow-recommendations)
- [https://savvy.co.il/en/blog/wordpress-seo/lighthouse-agentic-browsing-guide/](https://savvy.co.il/en/blog/wordpress-seo/lighthouse-agentic-browsing-guide/)
- [https://www.odyssiant.ai/ai-visibility-signals/lighthouse-llms-txt-agentic-browsing](https://www.odyssiant.ai/ai-visibility-signals/lighthouse-llms-txt-agentic-browsing)
- [https://github.com/googlechrome/lighthouse/issues/17082](https://github.com/googlechrome/lighthouse/issues/17082)
