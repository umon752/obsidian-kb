# iOS safari 標籤頁為單一標籤頁時的 body lock

# 情境描述

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=NWE3MzNkMTdiOTI2ODIzYzRmZmZjMzVmYWZkOWYxY2FfTUwxck9DYTFiME9Od24wQnE4VVRid3VPOUtocm9PcTdfVG9rZW46V280WWJjdVVkb3p1NUl4cFpTYmxrdVltZ2plXzE3NjkwNDczODY6MTc2OTA1MDk4Nl9WNA)

當 safari 的設定為單一標籤頁時，當標籤頁為顯示時（未往上縮起），<body>的overscroll: hidden; 沒有作用

---

## 解法１

```
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}

```

可以試試看，但我的案例上是沒有效果

---

## 解法２

[body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)

特點：

- 鎖住 body 的 scroll （功能跟手刻按下某個 button 後把 body 加上 height: 100vh; overflow: hidden; 一樣，但可以額外解決 iOS safari 舊版本以及習慣使用手機版網址列在上方的用戶的些許問題）
- 可運作於 iOS 的手機、平板
- 可運作於 android
- 可運作於 Safari desktop
- 可運作於 Chrome / Firefox
- 可用原生 JavaScript 也可用框架（以下介紹用於JS）

已知問題：

- 不適用於 android webview
- 必須pass targetElement，即便他不是必要的

### 使用介紹

```
// 1. 取得希望在body鎖住後仍可以scroll的元素（像是彈窗、光箱...等）
const targetElement = document.querySelector("#modal");

// 2. 在事件觸發後鎖住body
bodyScrollLock.disableBodyScroll(targetElement);

// 3. 在事件觸發後解鎖body
bodyScrollLock.enableBodyScroll(targetElement);

```

### 範例

1. 使用 iPhone 至設定 > safari 更改標籤頁至單一標籤頁
2. 使用 iPhone 至此範例連結 [範例](https://demo.nsdi.com.tw/Ken/body-scroll-lock/)
3. 此頁面的 targetElement 是設定為 .c_modal-content （要可以正常滑動）
4. 按下 hambuger 按鈕即為常用的把body加上height, overflow的css屬性（此時滑動頁面可能會有出現body沒有被鎖住的狀況）
5. 按下 Lock by plugin ，則使用此套件進行鎖住 body 的動作（但還是建議事件觸發的 function 跟上一步驟一樣，只是另外再加上 bodyScrollLock.disableBodyScroll(targetElement); 的 function ）

---

# 心得小記

如果純粹是按下 hambuger 後 body 該被鎖住或是其他關於彈窗之類的情境相信解法應該會有很多。但如果碰到一些特殊設計的網站是要在 100vh 內進行一些動態操作又不太好使用其他關於 100vh 的套件（fullPage.js 之類的）的狀況，一進網頁就要先把 body 鎖住進行操作，iOS safari 在單一標籤頁的狀況下有非常大的機率會有問題，這時不妨考慮看看使用這個吧！

## 備註

如果是使用 _front-template 的話請記得加上

```
function mainContainerWidth(){
    $(".main-container").css("width", window.innerWidth);
}

mainContainerWidth();
window.addEventListener("resize", mainContainerWidth);

```