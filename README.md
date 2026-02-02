> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/servicetitan)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 ServiceTitan MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your entire ServiceTitan workspace.** Instead of clicking through interfaces, you just *tell* it what you need.

### 🎯 ServiceTitan-Native Power Moves

The AI can directly control your ServiceTitan account with natural language:

- **Smart automation** — Complex workflows in plain English
- **Data intelligence** — Query, analyze, and export your ServiceTitan data
- **Rapid operations** — Bulk actions that would take hours manually
- **Cross-platform integration** — Combine ServiceTitan with other tools seamlessly

### 🔗 The Real Power: Combining Tools

AI can chain multiple ServiceTitan operations together:

- Query data → Filter results → Generate reports
- Search records → Update fields → Notify team
- Analyze metrics → Create tasks → Schedule follow-ups

## 📦 What's Inside

**124 API tools** covering the entire ServiceTitan platform (Field Service).

All with proper error handling, automatic authentication, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/ServiceTitan-MCP-2026-Complete.git
   cd servicetitan-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your ServiceTitan API credentials** (see Authentication section below)

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "servicetitan": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/servicetitan-mcp/dist/index.js"],
         "env": {
           "SERVICETITAN_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/servicetitan-mcp)

1. Click the button above
2. Set your ServiceTitan API credentials in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t servicetitan-mcp .
docker run -p 3000:3000 \
  -e SERVICETITAN_API_KEY=your-key \
  servicetitan-mcp
```

## 🔐 Authentication

See the official [ServiceTitan API documentation](https://docs.servicetitan.com) for authentication details.

The MCP server handles token refresh automatically.

## 🎯 Example Prompts

Once connected to Claude, you can use natural language. Examples:

- *"Show me recent activity in ServiceTitan"*
- *"Create a new record with these details..."*
- *"Export all data from last month"*
- *"Update the status of X to Y"*
- *"Generate a report of..."*

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- ServiceTitan account with API access

### Setup

```bash
git clone https://github.com/BusyBee3333/ServiceTitan-MCP-2026-Complete.git
cd servicetitan-mcp-2026-complete
npm install
cp .env.example .env
# Edit .env with your ServiceTitan credentials
npm run build
npm start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 🐛 Troubleshooting

### "Authentication failed"
- Verify your API credentials are correct
- Check that your API key hasn't been revoked
- Ensure you have the necessary permissions

### "Tools not appearing in Claude"
- Restart Claude Desktop after updating config
- Check that the path in `claude_desktop_config.json` is absolute
- Verify the build completed successfully (`dist/index.js` exists)

## 📖 Resources

- [ServiceTitan API Documentation](https://docs.servicetitan.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://claude.ai/desktop)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngine](https://mcpengage.com) — AI infrastructure for business software.

Want more MCP servers? Check out our [full catalog](https://mcpengage.com) covering 30+ business platforms.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengine).
