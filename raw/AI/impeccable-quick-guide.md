# Impeccable 快速使用指南

## 建議使用流程

```text
1. /impeccable init
   ↓
建立 PRODUCT.md
＝ 定義產品是什麼、給誰用、有哪些限制

2. /impeccable document
   ↓
建立 DESIGN.md
＝ 整理目前網站的視覺規則、色彩、字體、元件、版面

3. 開始設計 / 調整
   ↓
依需求選指令

4. /impeccable critique
   ↓
檢查設計問題

5. /impeccable polish
   ↓
做最後細節精修

6. /impeccable audit
   ↓
上線前檢查 accessibility / responsive / performance 等
```

---

## 常用指令怎麼選

| 需求        | 建議指令                        | 用途                                    |
| --------- | --------------------------- | ------------------------------------- |
| 第一次使用專案   | `/impeccable init`          | 建立產品背景                                |
| 整理現有設計規則  | `/impeccable document`      | 建立 `DESIGN.md`                        |
| 還不知道版面怎麼做 | `/impeccable shape`         | 先規劃資訊架構、方向，不直接實作                      |
| 重新調整版面    | `/impeccable layout`        | layout、grouping、spacing、density       |
| 調整整頁間距    | `/impeccable layout`        | section spacing、container padding、gap |
| 小範圍間距微調   | `/impeccable polish` 或 Live | padding、gap、alignment                 |
| 字體與文字間距   | `/impeccable typeset`       | typography、line-height、文字 hierarchy   |
| 想讓設計更有存在感 | `/impeccable bolder`        | 放大視覺重點、增加張力                           |
| 想降低視覺噪音   | `/impeccable quieter`       | 收斂、減弱元素                               |
| 增加色彩表現    | `/impeccable colorize`      | 改善色彩運用                                |
| 加動畫       | `/impeccable animate`       | transition、motion                     |
| 簡化畫面      | `/impeccable distill`       | 移除多餘資訊                                |
| 檢討目前設計    | `/impeccable critique`      | 找 UI / UX / hierarchy 問題              |
| 最後精修      | `/impeccable polish`        | spacing、alignment、細節一致性               |
| 上線前檢查     | `/impeccable audit`         | accessibility、responsive、performance  |

---

## 如果只是要調整間距

### 整頁或 Section

```text
/impeccable layout homepage

只調整 spacing：
- section vertical spacing
- container padding
- element gap
- card internal padding

不要改變：
- 版面結構
- 內容順序
- 字體
- 顏色
- 元素數量
```

### 局部微調

```text
/impeccable polish this section

Only refine spacing and alignment.
Keep layout, colors and typography unchanged.
```

也可以使用：

```text
/impeccable live
```

在畫面上點選元素後直接輸入：

```text
Increase the top spacing.

Reduce the gap between these elements.

Remove this element completely and collapse the empty space.
```

---

## `document` 建立後看哪裡？

主要查看：

```text
DESIGN.md
```

通常會包含：

```text
Colors
Typography
Layout
Spacing
Components
Elevation
Shapes
Do / Don't
```

簡單理解：

```text
PRODUCT.md
＝「這是什麼產品」

DESIGN.md
＝「這個產品應該長什麼樣」
```

---

## 修改前要不要 Commit？

像以下這類會直接修改專案的指令：

```text
/impeccable bolder
/impeccable layout
/impeccable polish
/impeccable colorize
```

建議先 Git commit：

```bash
git add .
git commit -m "chore: backup before impeccable changes"
```

不要假設一般 Impeccable 指令會自動替你保存修改前版本。

建議習慣：

```text
目前版本 OK
↓
git commit
↓
Impeccable 修改
↓
git diff
↓
滿意 → commit
不滿意 → restore
```

`/impeccable live` 比較適合探索，因為可以先查看修改結果，再決定是否接受。

---

## 網站首頁提案推薦流程

```text
/impeccable init
        ↓
/impeccable document
        ↓
git commit
        ↓
/impeccable shape homepage
        ↓
做第一版
        ↓
/impeccable critique homepage
        ↓
/impeccable layout
或
/impeccable bolder
        ↓
/impeccable polish
        ↓
/impeccable audit
```

---

## 最簡單記法

```text
init
↓
定義產品

document
↓
定義風格

shape
↓
想方向

layout / bolder
↓
改設計

critique
↓
檢查

polish
↓
精修

audit
↓
驗收
```
