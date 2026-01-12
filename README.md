# Reddit MCP Server 

An MCP server that allows AI agents to search Reddit or find specific leads by delegating the scraping task to Apify cloud actors.

## Features

- **`reddit_fast_search`**: Quickly search for Reddit posts, comments, or users.
- **`reddit_lead_monitor`**: Find high-intent leads or brand mentions while filtering out noise.

### 🚀 Quick Links
[Claude Desktop](#1-claude-desktop-macoswindows) | [Cursor IDE](#2-cursor-ide) | [Windsurf](#3-windsurf) | [VS Code](#4-vs-code-github-copilot-agent-mode) | [Claude Code](#5-claude-code-cli)

---

## ⚡️ Frictionless Installation (Recommended)

Since the package is published on NPM, you can install and run it without cloning the repository!

### 1. Claude Desktop (macOS/Windows)
Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "npx",
      "args": ["-y", "@practicaltools/reddit-mcp-server"],
      "env": {
        "APIFY_API_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

### 2. Cursor IDE & Windsurf
1. Open **Settings** -> **MCP Servers**.
2. Add a new server:
   - **Name**: `Reddit MCP`
   - **Type**: `stdio`
   - **Command**: `npx -y @practicaltools/reddit-mcp-server`
   - **Env**: `APIFY_API_TOKEN=YOUR_TOKEN`

### 3. Claude Code (CLI)
```bash
claude-code --mcp @practicaltools/reddit-mcp-server="npx -y @practicaltools/reddit-mcp-server" --env APIFY_API_TOKEN=YOUR_TOKEN
```

### 4. VS Code (Copilot Agent)
Add to `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "npx",
      "args": ["-y", "@practicaltools/reddit-mcp-server"],
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
Add this to your `claude_desktop_config.json`:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "npx",
      "args": ["-y", "@practicaltools/reddit-mcp-server"],
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
   - **Name**: `Reddit MCP`
   - **Type**: `stdio`
   - **Command**: `npx -y @practicaltools/reddit-mcp-server`
   - **Env**: Key=`APIFY_API_TOKEN`, Value=`YOUR_TOKEN`

### 3. Windsurf
1. Open **Settings** -> **MCP**.
2. Click **Add Server**.
3. Set **Command**: `npx -y @practicaltools/reddit-mcp-server`
4. Add Environment Variable: `APIFY_API_TOKEN=YOUR_TOKEN`

### 4. VS Code (GitHub Copilot Agent Mode)
1. Ensure you have the **GitHub Copilot Chat** extension installed.
2. Create/Update `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "reddit-mcp": {
      "command": "npx",
      "args": ["-y", "@practicaltools/reddit-mcp-server"],
      "env": { "APIFY_API_TOKEN": "YOUR_TOKEN" }
    }
  }
}
```

### 5. Claude Code (CLI)
```bash
claude-code --mcp @practicaltools/reddit-mcp-server="npx -y @practicaltools/reddit-mcp-server" --env APIFY_API_TOKEN=YOUR_TOKEN
```

### 6. ChatGPT & Lovable (via Bridge)
ChatGPT and Lovable do not natively support external MCP servers yet. To use them, you can use a bridging tool like [mcp-bridge](https://github.com/lastmile-ai/mcp-bridge) which exposes the tools as GPT Actions or a local API that Lovable can interact with.

### 7. Antigravity & Agentic Frameworks
To use this server with agentic coding assistants like Antigravity, simply use the `npx` command in your agent's configuration. The agent will then be able to call `reddit_fast_search` and `reddit_lead_monitor` directly.

---

## 🛠 Local Development

If you want to run the server from source:

```bash
# 1. Install dependencies
npm install

# 2. Build for production (Generates dist/index.js)
npm run build

# 3. Running locally
node dist/index.js
```

## Usage Tips
- **Search Reddit**: "Search Reddit for 'Best budget keyboards' in r/MechanicalKeyboards"
- **Find Leads**: "Monitor Reddit for people looking for 'Logo Design' in the last 24 hours."
