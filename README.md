# Reddit MCP Server 🤖
[![NPM Version](https://img.shields.io/npm/v/@practicaltools/reddit-mcp-server?style=flat-square&color=cb3837)](https://www.npmjs.com/package/@practicaltools/reddit-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mypracticaltools/Reddit-MCP-Server/build.yml?style=flat-square)](https://github.com/mypracticaltools/Reddit-MCP-Server/actions)

An MCP server that allows AI agents to search Reddit or find specific leads by delegating the scraping task to high-performance Apify cloud actors.

## 🌟 Key Features

- **`reddit_fast_search`**: Quickly search for Reddit posts, comments, or users. Best for general information gathering.
- **`reddit_lead_monitor`**: Find high-intent leads or brand mentions while filtering out noise.

---

## ⚡️ Quick Install

Choose your platform to install **Reddit MCP** in seconds:

<details>
<summary><b>Claude Desktop (macOS/Windows)</b></summary>

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
</details>

<details>
<summary><b>Cursor & Windsurf</b></summary>

1. Open **Settings** -> **MCP Servers**.
2. Add a new server:
   - **Name**: `Reddit MCP`
   - **Type**: `stdio`
   - **Command**: `npx -y @practicaltools/reddit-mcp-server`
   - **Env**: `APIFY_API_TOKEN=YOUR_TOKEN`
</details>

<details>
<summary><b>Claude Code (CLI)</b></summary>

```bash
claude-code --mcp @practicaltools/reddit-mcp-server="npx -y @practicaltools/reddit-mcp-server" --env APIFY_API_TOKEN=YOUR_TOKEN
```
</details>

<details>
<summary><b>VS Code (Copilot Agent)</b></summary>

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
</details>

---

## 🔑 Getting Your Apify API Token

To use this server, you need an Apify API token.

1.  **Sign up/Log in**: [Apify Console](https://console.apify.com/).
2.  **Settings**: Click the **Settings** icon in the bottom-left sidebar.
3.  **Integrations**: Select the **Integrations** tab at the top.
4.  **Copy Token**: Copy the string at the top of the page.

---

## 🛠 Local Development

If you want to contribute or run from source:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run locally
node dist/index.js
```

## 🤝 Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License
MIT License - see [LICENSE](LICENSE) for details.

---
<p align="center">
  Built with ❤️ by <a href="https://github.com/mypracticaltools">Practical Tools</a>
</p>
