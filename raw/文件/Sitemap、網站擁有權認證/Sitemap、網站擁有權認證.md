# Sitemap、網站擁有權認證

1. 將 sitemap、google 認證的 html 放置於 FTP 該專案的根目錄內 `public_html` 
2. 把 FTP 該專案的根目錄內的 `.htaccess` 下載到電腦裡，並且打開
（因為他是隱藏檔案，所以抓下來時，要按下 command + shift + .）
3. 打開 `.htaccess` 檔，加入 sitemap.xml、google 認證的 html 檔名
（檔名的 `.` 之前要用 `\`，檔案跟檔案之間要用 `|` 區隔）
完成後儲存
    
    ![image.png](Sitemap%E3%80%81%E7%B6%B2%E7%AB%99%E6%93%81%E6%9C%89%E6%AC%8A%E8%AA%8D%E8%AD%89/image.png)
    
4. 將 `.htaccess` 檔覆蓋 FTP 該專案的根目錄內
5. 最後請專案驗證一下擁有權看是否有成功