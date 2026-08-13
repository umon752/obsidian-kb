# Agentic Browsing（代理瀏覽）與 llms.txt 重點整理

## 什麼是 Agentic Browsing？

**Agentic Browsing（代理瀏覽）** 指的是 AI Agent（如
ChatGPT、Gemini、Claude
等）不只是閱讀網站內容，而是能夠**理解網站、操作網站，甚至代替使用者完成任務**。

例如：

-   搜尋商品
-   訂購飯店
-   填寫表單
-   加入購物車
-   查詢資訊

因此，網站未來不只要對「人」友善，也要對「AI Agent」友善（Agent
Ready）。

------------------------------------------------------------------------

# 為什麼重要？

過去網站主要面對：

``` text
人類
    ↓
搜尋引擎（Google）
```

未來則多了一層：

``` text
人類
    ↓
AI（ChatGPT、Gemini、Claude）
    ↓
AI Agent
    ↓
網站
```

AI Agent 將直接瀏覽、理解並操作網站，因此網站需要提供更容易被 AI
理解的結構。

------------------------------------------------------------------------

# Lighthouse 新增 Agentic Browsing

2026 年 5 月，Lighthouse 新增 **Agentic Browsing**
稽核分類，用來檢查網站是否已具備 **Agent Ready** 能力。

主要檢查四個方向：

## 1. llms.txt

提供 AI 專用的網站導覽與摘要。

用途：

-   快速理解網站內容
-   提供重要頁面入口
-   減少 AI 爬完整站所需成本

可理解為：

``` text
robots.txt
        +
README
        +
網站導覽
```

------------------------------------------------------------------------

## 2. WebMCP

提供 AI 可直接操作網站的標準介面。

例如：

-   搜尋商品
-   新增購物車
-   送出表單
-   訂房
-   查詢資料

目的：

讓 AI 不必依靠畫面辨識，而能直接與網站互動。

> 目前仍屬於新興技術，尚未普及。

------------------------------------------------------------------------

## 3. Accessibility Tree

AI Agent 不一定依賴畫面，而是大量透過 **Accessibility Tree** 理解網站。

因此良好的：

-   Semantic HTML
-   Heading
-   Button
-   Form
-   ARIA

不只幫助無障礙，也能提升 AI 對網站的理解能力。

------------------------------------------------------------------------

## 4. CLS（Cumulative Layout Shift）

如果頁面載入時版面跳動：

``` text
AI 準備點擊
↓

按鈕位置改變
↓

點錯按鈕
```

因此 CLS 不再只是 UX 指標，也影響 AI Agent 操作網站的可靠性。

------------------------------------------------------------------------

# llms.txt 是什麼？

`llms.txt` 是提供給大型語言模型（LLM）閱讀的網站摘要文件。

內容通常包含：

-   網站介紹
-   主要功能
-   重要頁面
-   API 或文件入口
-   FAQ

目的是讓 AI 在數毫秒內了解網站，而不是重新爬完整個網站。

檢查內容：
- Markdown 格式
- H1
- 是否有摘要
- 是否有重要連結
- 是否符合 llms.txt 規範

如果網站沒有提供 `llms.txt`，目前 Lighthouse 會標示為 **Not Applicable (N/A)**，因為它仍屬於可選項；若伺服器存取 `llms.txt` 發生錯誤，則會被視為稽核問題。

------------------------------------------------------------------------

# Google Search 與 Lighthouse 的不同立場

### Google Search 團隊

表示：

> **llms.txt 目前不影響 Google Search 排名。**

也就是：

-   不會加分
-   不會扣分
-   Google 搜尋目前可忽略它

### Lighthouse 團隊

則積極推動：

-   llms.txt
-   Agent Ready
-   AI Browser

原因是：

AI Agent 比搜尋引擎更需要快速理解網站。

------------------------------------------------------------------------

# SEO 與 GEO 的差異

  SEO                   GEO
  --------------------- ---------------------------------
  對象：搜尋引擎        對象：AI、LLM、Agent
  目的：搜尋排名        目的：理解、引用、操作網站
  重視：關鍵字、索引    重視：網站結構、AI 可讀性
  robots.txt、Sitemap   llms.txt、Accessibility、WebMCP

> GEO（Generative Engine Optimization）可視為 AI
> 時代的新方向，重點在於提升網站對生成式 AI 的理解與互動能力。

------------------------------------------------------------------------

# 現階段建議優先順序

⭐⭐⭐⭐⭐ **Accessibility（語意化 HTML、ARIA）**

⭐⭐⭐⭐⭐ **CLS（避免版面跳動）**

⭐⭐⭐⭐⭐ **Semantic HTML（清楚的網站結構）**

⭐⭐⭐⭐ **llms.txt（成本低，可提前布局）**

⭐⭐⭐ **WebMCP（持續關注發展）**

------------------------------------------------------------------------

# 重點總結

-   **Agentic Browsing** 是 AI Agent
    操作網站的新能力，不只是閱讀內容，而是能直接完成任務。
-   **Lighthouse** 已新增 Agentic Browsing 稽核，開始檢查網站是否具備
    **Agent Ready** 能力。
-   **llms.txt** 是提供 AI 快速理解網站的摘要文件，目前不影響 Google
    搜尋排名，但有助於 AI Agent 理解網站。
-   **Accessibility Tree**、**Semantic HTML** 與 **CLS**
    不僅改善使用者體驗，也提升 AI 對網站的理解與操作能力。
-   **GEO（Generative Engine Optimization）** 正逐漸成為 SEO
    之外的新方向，目標是讓網站更容易被 AI 理解、引用與使用。
