---
type: source
author: ai
tags: ["domain/ai", "topic/mcp", "topic/llm", "status/draft"]
summary: "說明 MCP 的 Host、Client 與市場角色，以及以不同執行環境設定 MCP Server 的方式"
sources: ["raw/AI/mcp-model-context-protocol.md"]
created: "2026-08-13"
updated: "2026-08-13"
---

# MCP（Model Context Protocol）

## 核心要點

- MCP 是 AI 與應用程式之間交換上下文與工具能力的通用溝通標準。
- MCP Market 集中 MCP Server 資源，例如官方 servers、Smithery 與 mcp.so。
- MCP Host 是實際執行 Server command 的環境，可使用 `uvx`、`python`、`docker`、`node`、`npx` 或 Shell。
- MCP Client 是觸發與整合入口，例如 Cline、Cursor、VS Code 與 Claude Desktop。
- 設定檔以 `command`、`args` 與 `env` 描述 Server 的啟動方式。

## 參考資源

- [Model Context Protocol servers](https://github.com/modelcontextprotocol/servers)
- [Smithery](https://smithery.ai/)
- [mcp.so](https://mcp.so/)

