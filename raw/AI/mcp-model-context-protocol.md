# MCP (Model Context Protocol)   
模型上下文協定   
  白話文：統一 AI 跟應用程式之間的溝通語言標準   
   
## MCP Market (套件集結平台)   
- [servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file)   
- [smithery](https://smithery.ai/)   
- [mcp.so](https://mcp.so/)   
- [mcpmarket](https://mcpmarket.com/zh)   
- [mcp-marketplace](https://github.com/cline/mcp-marketplace)   
   
   
## MCP Host (執行引擎)   
MCP server 的執行容器/載體   
  用來執行 MCP server 的程式，執行 MCP command   
- `uvx`：Python 包執行器   
- `python`：Python 直譯器   
- `docker`：容器執行環境   
- `node`：Node.js 執行環境   
- `npx`：Node.js 包執行器   
- `sh/bash`：Shell 執行環境   
   
   
## MCP Client (觸發者/介面/整合入口)   
呼叫 MCP Host 來執行 MCP 的平台工具   
> 需要切換到 Agent 模式才能使用 MCP server   

- Cline [文件](https://github.com/cline/cline)   
- Cursor [文件
](https://docs.cursor.com/context/model-context-protocol#one-click-installation)如果想要針對在 workspace 下安裝，只需要在資料夾根目錄下建立 `.cursor/mcp.json` 檔，將 mcp 設定放入此 `mcp.json` 檔即可   
- VS Code   
- Claude Desktop   
   
   
### OpenRouter (AI 模型路由平台)   
聚合多種 AI 模型 API，提供統一調用接口   
   
## MCP 設定   
```
"mcp": {
    "inputs": [],
    "servers": {
      "mcp-server-time": { // MCP 名稱
        "command": "python", // 執行方式 (MCP Host)
        "args": [ // MCP Host 執行時所帶的參數
          "-m",
          "mcp_server_time",
          "--local-timezone=America/Los_Angeles"
        ],
        "env": {}
      }
    }
  }
```
