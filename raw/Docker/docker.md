# docker   
Docker 容器是一個方便、輕量級且可移植的運行環境，能夠有效地隔離和管理應用程式及其相依性。   
  可自動化建置、測試和部署流程，讓部屬變得簡單且自動化。   
   
## 參考文章   
- [官方文件](https://docs.docker.com/)   
- [什麼是 Docker？](https://aws.amazon.com/tw/docker/)   
- [20 分鐘入門 Docker，建立屬於你自己的 Docker Image｜六角學院｜2023 鐵人賽 #23](https://www.youtube.com/watch?v=RsY5cCc9RGM)   
- [Docker 是什麼？Docker 基本觀念介紹與容器和虛擬機的比較](https://www.omniwaresoft.com.tw/product-news/docker-news/docker-introduction/#page)   
- [DAY 1 一起認識 Docker](https://ithelp.ithome.com.tw/articles/10319089)   
- [在 Ubuntu 上加入 Docker 環境並部署 Node.js 專案](https://www.casper.tw/development/2023/10/07/docker-container/)   
   
   
## Image (映像檔)   
建立實體的媒介。
輕量且獨立，包含了運行應用程式所需的代碼、工具、資料庫和設置等等。方便移植且封裝應用程式。
一旦構建完成，就不能更改，若想要更改就需要建一個新的 Image，保證了 Image 在不同環境中的一致性，因為每次都是建立新的 Image 所以方便版本控制。   
   
### Dockerfile   
定義如何建立一個 Image (包括選擇基礎鏡像、安裝相依軟件、設置環境變量等)。   
**Dockerfile 裡面的關鍵字**   
- FROM：在 Docker Hub 上可以看到的基礎 Image 版本
通常會放在 Dockerfile 的第一行
   
    ```
    FROM ruby:3.2.2
    ```
- AS：通常與 FROM 一起在多階段建立，別稱的意思   
    ```
    FROM ruby:3.2.2 AS app
    ```
- LABEL：Dockerfile 的作者/維護者 (非必填)
以 key value 的形式，來描述鏡像的屬性 (作者、版本、描述等)   
    ```
    LABEL maintainer="Krystal <krystal@example.com>"
    LABEL version="1.0"
    LABEL description="My rails project"
    LABEL website="https://www.example.com"
    ```
- RUN：建立 image 時，安裝軟體套件、下載依賴項、設定環境
`\` 其實是為了排版美觀的一個符號，代表換行但實際是同一行
`&&` 是如果前一個命令執行成功，才會執行下一個命令，如果前一個命令執行失敗，那後面的命令就不會執行
   
    ```
    RUN apk add --update --no-cache \
        postgresql-dev
    
    RUN gem install bundler:2.3.19 && \
        bundle install -j4 --retry 3 && \
        bundle clean --force
    ```
- CMD：Container 啟動時要執行的預設命令，每個 Dockerfile 只能有一個 CMD 指令，如果有多個 CMD 指令，前面會被覆蓋，只有最後一個會執行
常把他放在 **Dockerfile 的最後一行
**CMD 是可被覆蓋也可能被修改的
   
    ```
    CMD ["npm", "start"]
    ```
- ENTRYPOINT：定義容器的主要執行命令，且會在容器啟動時執行
ENTRYPOINT 是不可變且一定會執行的
ex: 容器啟動後便會輸出 "Hello, Docker!"
   
    ```
    ENTRYPOINT ["echo", "Hello, Docker!"]
    ```
- EXPOSE：指出容器內應用程式，應該使用哪些 port 進行監聽   
    ```
    EXPOSE 3000
    ```
- ENV：在容器內部設定的環境變數
ex: 設定一個環境變數叫做 `DB\_HOST` ， value 是 `postgresql`
   
    ```
    ENV DB_HOST=postgresql
    ```
- ARG：在 Dockerfile 中使用的參數，與 ENV 作用很類似，但是作用域不一樣
ARG 設定的環境變數只有在 Dockerfile 內，及 docker build 的過程中有效   
    ```
    ARG <参数名>[=<默认值>]
    ARG DB_HOST=postgresql
    
    ```
- WORKDIR：設定這個容器內部現在的資料夾
會隨容器的生命週期結束而消失
ex: 在容器裡面建立一個名為 /app 的資料夾 (這個容器的根目錄)
   
    ```
    WORKDIR /app
    ```
- COPY：複製
ex: 將 app.rb 檔案複製到 app 資料夾裡   
    ```
    COPY app.rb /app
    ```
- ADD：複製，還支援自動解壓縮檔案、URL 下載和複製上下文的檔案
ex: 自動解壓縮 `https://example.com/file.gz` 這個檔案，並下載下來到 app 目錄內   
    ```
    ADD https://example.com/file.gz /app/
    ```
- VOLUME：建立永久性存儲區
內容不會隨容器的生命週期結束而消失，可以在容器與容器間共享
VOLUME 裡面的資料並不是存在容器裡，是存在主機的文件裡
ex: 建立一個 `mydata` 資料夾，可以把需要一直存在的資料放進來   
    ```
    VOLUME /mydata
    ```
- USER：指定用哪個使用者身分來執行容器中的命令
可以限制容器內部使用者，根據身分來有不同權限執行，可以增加容器的安全性
   
    ```
    USER <用户名稱或用户 ID>:<群組名稱或群组 ID>
    USER krystal:baby_team
    USER krystal
    
    ```
- ONBUILD：在基礎映像建置時要執行的操作，讓您在建置基礎映像時當時定義了一些操作，然後在後續的鏡像建置中自動執行這些操作
ex: 生成的映像取名為 `my-base-image`   
    ```
    FROM ubuntu:latest
    
    // 將原本映像的 install_app 複製到新映像的 /app/ 目錄中
    ONBUILD ADD install_app /app/
    // 執行新映像中的 /app/install_app
    ONBUILD RUN /app/install_app
    ```
    當我要建立另一個新的映像，而這個映像是取自上一個建立的 `my-base-image` 映像時，新映像便會直接執行前面 ONBUILD 的那兩句指令   
    ```
    FROM my-base-image
    ```
- STOPSIGNAL：容器在接收到停止時，需要做的動作
預設是 SIGTERM ：是單純的停止
9：是立即強制停止
   
    ```
    STOPSIGNAL SIGTERM
    STOPSIGNAL 9
    
    ```
- HEALTHCHECK：容器內部執行一些自訂的指令或檢查，來檢查容器的健康狀態   
    ```
    HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=5 CMD [ "ruby", "health_check.rb" ]
    ```
- SHELL：行命令時使用的預設 shell
ex: 將預設 shell 變為 Bash   
    ```
    SHELL ["/bin/bash", "-c"]
    ```
   
   
## Container (容器)   
透過 Image 建立出來的實體，實體可以被**啟動**、**開始**、**停止**、**刪除** ，且每個容器之間都相互隔離，不會互相污染。   
每個 Container (容器) 都會分配一个獨立、不重複的 IP 地址。   
   
## Docker Registry (註冊表)   
一個 Docker Registry 可以包含多個 Docker Repository，每個 Docker Repository 可以包含多個不同版本的 Docker Image。
常見的遠端倉庫 [Docker Hub](https://hub.docker.com/) 和 [AWS](https://aws.amazon.com/tw/?nc2=h_lg) 是公共的 Docker Registry。
   
   
## Repository (儲存庫)   
存放 Image 的倉庫。   
   
## Docker Network (網路)   
容器與容器或是容器與外部容器、網路或服務之間連接通訊的橋樑。   
   
## .dockerignore   
設定忽略項目   
   
## Docker Compose   
[官方文件](https://docs.docker.com/compose/)   
於定義和運行多容器應用程式的工具。
特別適用於開發、測試和部署多容器 Docker 應用程式，並有助於簡化容器化應用程式的管理和配置。
在一個 YAML 檔案中定義這些服務以及它們之間的關係。
YAML 檔副檔名 `.yml` 或是 `.yaml` 都可以。
   
   
### 指令   
- 啟動容器：啟動應用程式的所有容器。如果沒有這個容器 Compose 會先建立容器，再啟動它。   
    ```
    docker-compose up
    
    ```
- 在背景中啟動容器：在背景中啟動容器，並持續運行。   
    ```
    docker-compose up -d
    
    ```
- 查看容器日誌：查看應用程式的 logs。   
    ```
    docker-compose logs
    
    ```
- 重新建立容器：重新建立(build)應用程式的容器。如果 Dockerfile 或 Compose 檔案有更改，就會用到這個指令。   
    ```
    docker-compose up --build
    
    ```
- 查看容器狀態：查看正在運行的容器的狀態，其實跟 docker ps 很類似，只是這是 compose 版本的。   
    ```
    docker-compose ps
    
    ```
- 停止容器：停止應用程式的所有容器，並刪除它們的容器、網路等。   
    ```
    docker-compose down
    
    ```
- 關閉容器並刪除：`-v` 是 `--volumes` 的縮寫，通常在需要完全重建和清理應用程式環境時很有用。一般的 `docker-compose down` 只會停止和刪除容器、網路等，而不刪除 volumes ，所以若需要刪除 volumes 就可以加上 `-v`。   
    ```
    docker-compose down -v
    
    ```
- 重新啟動容器   
    ```
    docker-compose restart
    
    ```
   
   
### docker-compose.yml   
用來定義不同容器的 services (服務)   
範例：   
```
version: "3.9"
services:
  app:
    build:
      context: .
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_HOST: db
      POSTGRES_PORT: 5432
    restart: on-failure
    ports:
      - 3000:3000
  db:
    image: postgres:14-alpine
    restart: on-failure
    environment:
      POSTGRES_PASSWORD: password
```
 --- 
   
## 指令   
- 建立 Dockerfile：`docker build -f <dockerfilename> .
或 docker build -f <path/dockerfilename> .
`
   
- 建立 Image：`docker build .
`在當前的目錄中尋找名為 Dockerfile 的檔案，然後使用這個 Dockerfile 建立一個 Docker 映像 (Image)。但因為抹沒有特別指定名稱和標籤，所以這個 image 會使用一個隨機生成的 ID 作為名稱。
建立一個自訂義名稱 的 Image ，可以使用：`docker build —t <imagename:version> .
`—push：推送到 Docker Registry
`docker build —t <imagename:version> . —push`
—load：本地 Docker 環境中
`docker build —t <imagename:version> . —load`
`
`   
- 列出所有 Image：`docker images

`   
- 從 repo 拉下來：`docker pull <imagename:version>
`
   
- push 到 repo：`docker push <imagename:version>
`預設推到 Docker Hub 註冊表，如果有其他註冊表如： Google Container Registry（GCR）或 Amazon Elastic Container Registry（ECR）那就可以寫成：`docker push <目標註冊表URL>/<imagename:version>

`   
- 登入 docker hub：`docker login
`輸入 `Username` 跟 `Password`

   
- 刪除 Image：`docker rmi <image\_id\_or\_name>
`需要停止運行才可刪除`

`   
- 查看 Image 的詳細資料：`docker inspect <image\_id\_or\_name>`

   
- 啟動 Container：`docker run <imagename>`、`docker run -p 3005:3000 <imagename>`、`docker run -p 3005:3000 -d <imagename>
`-p 是 port 號 : 前方是瀏覽器要運行的 port、後方是 dockerfile 設定的 port
會先看我本地是否有名為` <imagename`> 的 Image ，若有就根據這個 Image 生成 Container 並執行它 ; 若無，就去 Docker Hub 儲存庫中下載名為` <imagename`> 的 Image ，然後建立新的 Container 並執行它。
預設會是以` :lates`t 查找版本。
執行後就會自動退出，因此使用` docker p`s 查看會找不到過剛剛 run 的 Image
指定 Image tag (Image 的版本號)，可以使用`：docker run <imagename>:3.2.2`

   
- 停止 Container (當在不同的終端機的時候)：`docker stop <container\_id\_or\_name>
`
   
- 停止 Container (當在同一個執行的終端機的時候)：打上 `exit 再按 enter 鍵` ; 或是 `按 control 鍵 + d` 可退出容器

   
- 想要將停止的 Container 再度啟動時：`docker start <container\_id\_or\_name>

`   
- 刪除 Container：`docker rm <container\_id\_or\_name>

`   
- 列出正在進行的 Container：`docker ps`、`docker ps —a` (-a 是 all 全部)

   
- 交互模式 (可以進到容器內部互動) 執行：`docker run -it <imagename> /bin/bash
`   
    - -i：代表交互式 (Interactive)。
這個指令可以讓你輸入指令。如果沒有使用 -i ，則容器不會接受輸入的指令（就是你怎麼輸入他都不理你）。   
    - -t：代表終端 (Terminal)。
這個指令是讓 Docker 為容器分配一個虛擬終端幾，讓我們可以在容器內部進行命令操作。如果沒有使用 -t ，你就想像成沒有一個可以打指令的地方（沒有終端機）。   
    - /bin/bash：代表命令解析器 (Shell)。
用於解釋和執行命令、腳本以及與系統交互的操作。

   
- 重新命名 Container：`docker run —name <new imagename> <imagename>

`   
- 背景 (持久) 模式執行：`docker run -d <imagename>
`在背景執行，不跑出執行中的 log (終端機不會被卡住停在 log 畫面)，且不會多佔一個終端機的概念。

   
- 查看本機 Docker Network 列表：`docker network ls

`   
- 查看 Container 的詳細資料：`docker inspect <container\_id\_or\_name>

`   
- 不想使用預設的 Bridge Network (橋接網絡)，想要有自己的網路：`docker network create <network\_name>

`   
- 連接 Network 與 Container：`docker network connect <network\_name> <container\_id\_or\_name>

`   
- 斷開 Network 與 Container的連接：`docker network disconnect <network\_name> <container\_id\_or\_name>

`   
- 移除 Network：`docker network rm <network\_name>

`   
- 建立 tags：`docker tag <本機現有映像 id\_or\_repository>:<本機現有標籤> <新映像 repository>:<新標籤>
`ex: docker tag ruby:latest myapp:v1  (為本機原本的 ruby Image，建立一個新的 Image)

   
- 將 Image 建立出一個新的 Image：`docker tag <本機現有映像id\_or\_repository> <新映像 repository>
`tag 會是依照原始的 Image

   
- 建立＋push 自己的 tags：`docker tag <本機現有映像id\_or\_repository> <Docker 儲存庫的主機名或 IP 地址>:<端口>/<新映像 repository>:<新標籤>`
   
   
   
