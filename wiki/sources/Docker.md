---
type: source
author: ai
tags: ["domain/devops", "topic/docker", "topic/container", "status/draft"]
summary: "整理 Docker Image、Container、Dockerfile 指令、Registry、Network 與 Compose 基本觀念"
sources: ["raw/Docker/docker.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# Docker

## 核心要點

- Docker 以輕量、可移植的 Container 隔離應用程式與相依性，適合建置、測試與部署自動化。
- Image 是不可變的應用程式封裝；Container 是由 Image 建立、可啟停刪除且彼此隔離的執行個體。
- Dockerfile 常用指令包含 `FROM`、`RUN`、`CMD`、`ENTRYPOINT`、`EXPOSE`、`ENV`、`WORKDIR`、`COPY` 與 `HEALTHCHECK`。
- Registry 儲存 Repository，Repository 再保存不同版本的 Image；Docker Hub 是常見公共 Registry。
- Docker Compose 用 YAML 定義多容器服務及其關係，常用 `up`、`up -d`、`logs`、`up --build`、`ps` 與 `down`。

## 參考資源

- [Docker 官方文件](https://docs.docker.com/)
- [Docker Compose 官方文件](https://docs.docker.com/compose/)

