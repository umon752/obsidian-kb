# CSS 文字外框

最快速的方式是使用 text-shadow 或 -webkit-text-stroke 來生成外框
但各自都會有其優點和缺點

# 處理方法：

## text-shadow

使用 text-shadow: -0.5px 0px 0 #f00, 0.5px 0px 0 #f00, 0px 1px 0 #F00, 0px -1px 0 #f00, 0.5px 1px 0 #f00, 0.5px -1px 0 #f00, -0.5px 1px 0 #f00, -0.5px -1px 0 #f00 產生外框，就是利用文字陰影外推八個方向

假設外框寬度為 w px, 顏色色碼為 c
則設定為：
-w 0 0 c, w 0 0 c, 
0 2w 0 c, 0 -2w 0 c, 
-w -2w 0 c, w -2w 0 c, 
-w 2w 0 c, w 2w 0 c
推上和下陰影可能會因為字體的關係需要多推

### 優點

快速、支援度高，外框線可以有些微的調整

### 缺點

Text-shadow 在邊邊角角（尤其是銳利角）會有線條沒接上的情況，但通常字體要夠大才會變得明顯
且文字無法使用透明，背景色需要和文字顏色一樣

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=OGQ0N2RjNzNjNWFiYTU0YjU3NzgyZGQwODdjNTYyODRfcHBOS2RIVE84MWNHbFowSnNGU3pBMDBVaTE0d1JYRmtfVG9rZW46UjJBVmJDVGlDb2tDdE94Q1h0amxVRURoZzhlXzE3NjkwNDczNTQ6MTc2OTA1MDk1NF9WNA)

## webkit-text-stroke

- webkit-text-stroke: 1px #f00;

### 優點

快速、支援度高，文字顏色可以設定透明實現真正的外框

### 缺點

在某些字體的英文、數字、符號會有多餘的線條

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=MTU5NzI3YTk4ZDRiMGE5YzViMWQxMmMyZDA0ZGY5MjBfc2h1cUdaS1RjNDNvZzZjazZpNzJ5VHdpakJ3eHlrOUxfVG9rZW46R2NWeGJFQ2hEb1BtS214eFdDRGx0WTVHZ3NoXzE3NjkwNDczNTQ6MTc2OTA1MDk1NF9WNA)

## webkit-text-stroke + ::before, ::after 偽元素

- webkit-text-stroke 的情況可以利用 偽元素 before, after 去把多餘的線條蓋掉
會需要用到 attr() 設定（ content: "" attr(data-text) ""; ）並使用絕對定位把文字蓋上去

### 優點

外框非常完美

### 缺點

這種做法必須確保元素內沒有其他元素，否則文字排版（置左置中置右）可能會跑版
且文字顏色無法真正的透明

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=N2E2NzQ1YmMwZmY4MjI1MmM4YTZkYmMwM2ZiNDA3Y2ZfVFFETVhRR0pZdE1vd0VwQXUzYWNZOWtwRXR6ZDE4RE1fVG9rZW46V3hlOGJpemlZb0w3Zkh4SnBvNGxZUVMwZ3ViXzE3NjkwNDczNTQ6MTc2OTA1MDk1NF9WNA)

# 同場加映

額外的樣式也要一起做的話可能就要考慮可行性，例如：

## 首字顏色為實體色

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=MTE2ZTA5MjIyMzJiYWFiZWExMDhiZDYzNTg3ZmY2MTBfVmFXQmRYN2hRWmlpSVNvUVBxQll0UVQxYWk4TUxIUkJfVG9rZW46TEoybmIyT3Vvb0kyTDZ4c0RvQWw0R0pxZ09jXzE3NjkwNDczNTQ6MTc2OTA1MDk1NF9WNA)

如果要保證外框完整的情況下就可能要兩個以上的元素（或偽元素）去處理，把文字顏色再壓上去
但如果不需要，則可以使用 ::first-letter 去調整首字的樣式

- 注意：::first-letter 有些屬性是無效的

[](https://cj86rdivm7e.sg.larksuite.com/space/api/box/stream/download/asynccode/?code=ODkyNTg4ZGY0ODc3ZDY5YmQxYWQxNTkzMDBhOTY0ODhfcHFVVE5jT0NUNkpMZlBsaW8xWVo2RXBqVWl1WFV2cm1fVG9rZW46UERZZmJMSFNIb3VmQW14R01nUGxnSHQ3Z0tiXzE3NjkwNDczNTQ6MTc2OTA1MDk1NF9WNA)