# Git 開發協作流程

<aside>
📌 [GitLab Repo Demo](https://sweb.div.tw:30000/nsdi/repo-demo)

</aside>

## ⚈ 規範

### 人員權限

除開發人員之外，設計、專案皆設定為 Reporter

### Git flow

[Git Flow 是什麼？為什麼需要這種東西？](https://gitbook.tw/chapters/gitflow/why-need-git-flow)

![git-flow.png](Git%20%E9%96%8B%E7%99%BC%E5%8D%94%E4%BD%9C%E6%B5%81%E7%A8%8B/git-flow.png)

> 遠端和本地固定會有三個對應分支
目前先以不 code review (不 PR) 進行，皆本地 merge 完後再 push
> 
- master：在上線後，每次更新正式站時從本地 release merge master 再 push origin master
- release：在上測試站後，每次更新測試站時從本地 dev merge release 再 push origin release
- dev：前後端都在這個分支上開發，一律在本地 merge dev 後再 push origin dev

### 分支合併

統一使用 merge 合併

### commit 訊息格式

[Git Commit Message 這樣寫會更好，替專案引入規範與範例](https://ithelp.ithome.com.tw/articles/10228738)

<aside>
📎 格式：
[類型] + 簡易描述 (須以動詞開頭，不超過 50 個字) (必填)
+ 詳細描述 (選填)
+ 提供参考信息 (issue 號) (選填)

範例：
[fix] 修改商品列表頁卡片間距
問題: 客戶切版回饋要將商品列表卡片間距調為 20px
調整項目: _m-card.sass
issue #1335

</aside>

**類型：**

- feature：新增/修改頁面/元件/功能、開發到一半的內容接著開發
- fix：修改 bug
- refactor：重構、刪除整理檔案、修改文案 (既不是新增功能，也不是修補 bug 的程式碼變動)
- style：格式 (不影響程式碼運行的變動 format、空格、逗號、分號等等)
- update：因為需求變更而產生的修改 (沒有 bug，僅是需求變更)
- perf：改善效能
- docs：文件、註解撰寫
- build：打包
- chore：其它工具的變動 (例如：webpack)
- revert：撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)
- test：測試

### issue

<aside>
💡 進後端前的切版修改統一只建立一個 issue (不細項建立)，修改的逐項內容使用回覆的方式列出，被指派者已修正和指派者確認使用 Emoji 回覆表示。

範例：
設計 & 專案切版檢查 → 會建立一個 [內部] 切版確認 issue
客戶切版檢查 → 建立一個 [客戶] 切版確認 issue

</aside>

**建立範例：**

範例：[**[前台/後台]最新消息後台已隱藏，前台仍顯示**](https://sweb.div.tw:30000/nsdi/repo-demo/issues/3)

問題網址：https://
問題說明：最新消息後台已隱藏，前台仍顯示
附上截圖

**訊息回覆說明：**

- 修正完成：✅
- 設計/專案確認無誤：👍
- 設計/專案確認有誤：❌

> 留言回覆需 @ 要詢問的人員，該人員才會接收到通知
處理好的 issue，被指派者需轉回該負責的專案人員，在 Assign to 編輯切換
> 

**標籤狀態說明：**

- Bug：網站問題，需協助修復
- Discussion：需要額外再討論&定義
- High：issue 緊急程度**高，需協助當天處理**
- Medium：issue 緊急程度**中，需於 2 天內處理**
- Low：issue 緊急程度**低，需於當週內處理**
- Wontfix：評估後，決定不進行
- SIT：開發站(內網)
- UAT：測試站
- PRO：正式站
- 更新 PRO：確認功能可以上到**正式站**
- 更新 UAT：確認功能可以上到**測試站**
- 評估：需要評估時間，請製作人員回覆製作工時
- 需求：已確認要執行的需求，請依照安排時間製作

## ⚈ 流程

### 前端

1. 在自己本地開發 (使用 XAMPP / MAMP 運行環境)
2. 新案建立該專案的 GitLab 數據庫 (建立 master、dev 分支)
設定：
    
    ```
    Project name：設定專案名稱
    Project URL：選擇專案屬於 NSDI 團隊
    Visibility Level：選擇 Internal (內部使用者都可以存取該項目)
    ```
    
    ![截圖 2024-05-27 上午11.21.56.png](Git%20%E9%96%8B%E7%99%BC%E5%8D%94%E4%BD%9C%E6%B5%81%E7%A8%8B/%25E6%2588%25AA%25E5%259C%2596_2024-05-27_%25E4%25B8%258A%25E5%258D%258811.21.56.png)
    
3. 建立本地專案 (把樣板拉下來)
`git clone https://sweb.div.tw:30000/nsdi/front-template.git`
將資料夾名稱改為該專案名稱
將裡面原本的 .git 刪除
將 .vscode 加入 .gitignore (.gitignore 如有額外設定再自行加入)
.gitignore 檔為後端使用的公版 /Volumes/web/7/000-core-system/white-rabbit-dev
4. 避免前後端的檔案資料結構重疊覆蓋到對方，建立一個 cut 資料夾，把樣板的東西都放進 cut 資料夾裡面進行開發
5. 開始建立 git、將 .gitignore 加入追蹤、first commit
    
    ```
    git init
    git remote add origin https://sweb.div.tw:30000/nsdi/你的專案數據庫名稱.git
    git add .
    git add -f .gitignore
    git commit -m "Initial commit"
    git push -u origin master
    ```
    
6. 在本地和遠新增 release、dev 分支
    
    ```
    git branch release
    git checkout release
    git push origin release
    git branch dev
    git checkout dev
    git push origin dev
    ```
    
7. 設定分支保護
    
    ![截圖 2024-05-29 上午9.29.31.png](Git%20%E9%96%8B%E7%99%BC%E5%8D%94%E4%BD%9C%E6%B5%81%E7%A8%8B/%25E6%2588%25AA%25E5%259C%2596_2024-05-29_%25E4%25B8%258A%25E5%258D%25889.29.31.png)
    
8. 接下來就是在本地自行建立分支開發，最後合回 dev 再 push origin dev
9. **進後端之前**將專案放到 web/_cut 裡面 (保留未套版前乾淨切版檔備份) (含 cut 資料夾放入，可以辨別此案有使用 git)
10. **進後端之後**將 .env 檔拉進來
位置：/Volumes/web/7/000-core-system/white-rabbit-dev
修改設定 (詳見 PPT32)：
    
    ```
    site_base_url = "http://localhost/你的專案資料夾名稱/"
    site_basedir = "/你的專案資料夾名稱/"
    db_username = "root"
    db_password = ""
    db_database = "輸入剛剛在本地端建的資料庫名稱"
    ```
    
11. 確認 .htaccess 檔根目錄設定是否和你的專案資料夾名稱一樣
    
    ```
    ## 根目錄 ##
    # RewriteBase /你的專案資料夾名稱
    ```
    
12. 如果出現了某些錯誤：
- 如果是掉圖可能是少了 /datas/logs，從 7 將對應的資料夾拉回本地
- 如果是 cache 相關錯誤，在 /datas 裡面建立一個 cache 資料夾，再將資料夾權限設定為可讀取和寫入

## 後端

還是會佈署一份到 7 上 (方便專案或是案子其他人瀏覽跟測試)