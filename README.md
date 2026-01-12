# Reddit MCP Server 

An MCP server that allows AI agents to search Reddit or find specific leads by delegating the scraping task to Apify cloud actors.

## Features

- **`reddit_fast_search`**: Quickly search for Reddit posts, comments, or users.
- **`reddit_lead_monitor`**: Find high-intent leads or brand mentions while filtering out noise.

---

---

## ⚡️ Frictionless Installation (Recommended)

Choose your platform to install **Reddit MCP** in seconds:

### 1. Claude Desktop, Cursor, or Windsurf
Uses **Smithery** to automatically configure your apps:

- **Claude Desktop:** `npx @smithery/cli install reddit-mcp --config "{ \"APIFY_API_TOKEN\": \"YOUR_TOKEN\" }"`
- **Cursor IDE:** `npx @smithery/cli install reddit-mcp --client cursor --config "{ \"APIFY_API_TOKEN\": \"YOUR_TOKEN\" }"`
- **Windsurf:** `npx @smithery/cli install reddit-mcp --client windsurf --config "{ \"APIFY_API_TOKEN\": \"YOUR_TOKEN\" }"`

### 2. Claude Code (CLI)
Just run this one-liner in your terminal:
```bash
claude-code --mcp reddit-mcp="node /ABSOLUTE/PATH/TO/PROJECT/build/index.js" --env APIFY_API_TOKEN=YOUR_TOKEN
```

### 3. VS Code (Copilot Agent)
Copy this to your `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PROJECT/build/index.js"],
      "env": { "APIFY_API_TOKEN": "YOUR_TOKEN" }
    }
  }
}
```

---

## 🔑 Getting Your Apify API Token

To use this server, you need an Apify API token.

1.  **Sign up/Log in**: Go to [Apify Console](https://console.apify.com/).
2.  **Navigate to Settings**: Click the **Settings** icon in the bottom-left sidebar.
3.  **Integrations Tab**: Select the **Integrations** tab at the top.
4.  **Copy Token**: You will see your **API Token** at the top of the page. Copy this string.

---

## 🚀 Multi-Platform Setup

### 1. Claude Desktop (macOS/Windows)
Add the following to your `claude_desktop_config.json`:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PROJECT/build/index.js"],
      "env": {
        "APIFY_API_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

### 2. Cursor IDE
1. Open **Settings** -> **Cursor Settings**.
2. Go to **Features** -> **MCP Servers**.
3. Click **+ Add New MCP Server**.
4. Set:
   - **Name**: `Reddit Apify`
   - **Type**: `stdio`
   - **Command**: `node /ABSOLUTE/PATH/TO/PROJECT/build/index.js`
   - **Env**: Key=`APIFY_API_TOKEN`, Value=`YOUR_TOKEN`

### 3. Windsurf
1. Open **Settings** -> **MCP**.
2. Click **Add Server**.
3. Enter the configuration similar to Cursor (Stdio mode).

### 4. VS Code (GitHub Copilot Agent Mode)
1. Ensure you have the **GitHub Copilot Chat** extension installed.
2. Create a file named `.vscode/mcp.json` in your project root:
```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PROJECT/build/index.js"],
      "env": {
        "APIFY_API_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```
3. Enable "MCP Support" in VS Code settings.

### 5. Claude Code (CLI)
When running `claude-code`, you can specify the MCP server:
```bash
claude-code --mcp reddit-apify="node /ABSOLUTE/PATH/TO/PROJECT/build/index.js" --env APIFY_API_TOKEN=YOUR_TOKEN
```

### 6. ChatGPT & Lovable (via Bridge)
ChatGPT and Lovable do not natively support external MCP servers yet. To use them, you can use a bridging tool like [mcp-bridge](https://github.com/lastmile-ai/mcp-bridge) which exposes the tools as GPT Actions or a local API that Lovable can interact with.

### 7. Antigravity & Agentic Frameworks
To use this server with agentic coding assistants like Antigravity:
1. Ensure the server is built (`npm run build`).
2. Add the server information to your agent's configuration (usually a `.json` file or via a command).
3. The agent will then be able to call `reddit_fast_search` and `reddit_lead_monitor` directly.

---

## 🛠 Development

```bash
# 1. Install dependencies
npm install

# 2. Build for production (Generates build/index.js)
npm run build

# 3. Running in dev mode
npm run dev
```

## Usage Tips
- **Search Reddit**: "Search Reddit for 'Best budget keyboards' in r/MechanicalKeyboards"
- **Find Leads**: "Monitor Reddit for people looking for 'Logo Design' in the last 24 hours."
