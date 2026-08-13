---
type: entity
author: ai
tags: ["domain/devtools", "topic/docker", "status/draft"]
summary: "以容器封裝應用程式與依賴，提供一致的開發、測試與部署環境"
sources: ["raw/Docker.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# 工具：Docker

## 簡介

Docker 以 image 與 container 封裝應用程式及其依賴，讓本機、CI 與部署環境更容易保持一致。

## 核心概念

- image 是可重複建置的唯讀模板；container 是 image 的執行實例。
- Dockerfile 描述建置步驟，Compose 適合管理多服務本機環境。
- 實務上應控制 image 大小、避免把 secrets 打包進 image，並針對 production 使用最小必要權限。

## 相關來源

- [[sources/Docker]]
