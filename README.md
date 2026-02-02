> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/servicetitan)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 ServiceTitan MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your ServiceTitan field service management platform.** Instead of manually dispatching jobs, tracking technicians, or managing invoices, just *tell* AI what you need.

### 🔧 Field Service Power Moves

The AI can manage your entire service operation with natural language:

| Use Case | What AI Does | Tools Used |
|----------|--------------|------------|
| **"Schedule HVAC repair for customer #1234 tomorrow at 2pm"** | Creates job with customer, location, timing, and assigns technician | `create_job`, `list_customers`, `list_technicians` |
| **"Show me all open jobs assigned to technician Mike Rodriguez"** | Filters jobs by status and technician assignment | `list_jobs`, `list_technicians` |
| **"Find high-value customers who haven't been serviced in 90 days"** | Cross-references invoices and job history to identify at-risk accounts | `list_customers`, `list_jobs`, `list_invoices` |
| **"Generate weekly dispatch report: jobs completed, revenue, technician utilization"** | Aggregates job completions, invoice totals, and technician performance metrics | `list_jobs`, `list_invoices`, `list_technicians` |
| **"Create urgent job for pipe burst at 123 Main St, notify on-call plumber"** | Creates priority job, finds available technician, schedules appointment | `create_job`, `list_technicians`, `list_appointments` |

### 🔗 The Real Power: Workflow Automation

AI chains ServiceTitan operations together:

- **Revenue intelligence** → Query invoices → Identify trends → Flag at-risk customers
- **Dispatch optimization** → Check technician availability → Match skills to job type → Schedule appointments
- **Customer retention** → Analyze service history → Identify overdue maintenance → Create follow-up jobs

## 📦 What's Inside

**8 field service tools** covering jobs, customers, invoices, technicians, and appointments:

1. **`list_jobs`** — List and filter work orders by status, customer, technician, or date range
2. **`get_job`** — Get detailed job info including line items, equipment, and service history
3. **`create_job`** — Schedule new service jobs with customer, location, and priority
4. **`list_customers`** — Search customers by name, email, phone, or account status
5. **`get_customer`** — View complete customer profile with locations and service history
6. **`list_invoices`** — Query invoices with filters for status, amount, customer, or job
7. **`list_technicians`** — View field workers with skills, availability, and business unit
8. **`list_appointments`** — Check scheduled appointments with booking windows and assignments

All with automatic OAuth token refresh, proper error handling, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/ServiceTitan-MCP-2026-Complete.git
   cd servicetitan-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your ServiceTitan API credentials:**
   - Log in to ServiceTitan
   - Go to **Settings → Integrations → API Application Access**
   - Click **Create Application** and note your:
     - Client ID
     - Client Secret
     - Tenant ID
   - Required permissions: Jobs (Read/Write), Customers (Read), Invoices (Read), Dispatch (Read)

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "servicetitan": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/servicetitan-mcp-2026-complete/dist/index.js"],
         "env": {
           "SERVICETITAN_CLIENT_ID": "your-client-id",
           "SERVICETITAN_CLIENT_SECRET": "your-client-secret",
           "SERVICETITAN_TENANT_ID": "your-tenant-id"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/servicetitan-mcp)

1. Click the button above
2. Set your ServiceTitan credentials in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t servicetitan-mcp .
docker run -p 3000:3000 \
  -e SERVICETITAN_CLIENT_ID=your-client-id \
  -e SERVICETITAN_CLIENT_SECRET=your-secret \
  -e SERVICETITAN_TENANT_ID=your-tenant \
  servicetitan-mcp
```

## 🔐 Authentication

ServiceTitan uses OAuth 2.0 client credentials flow:

1. **Get credentials**: ServiceTitan Settings → Integrations → API Application Access
2. **Required scopes**: `jpm.jobs`, `crm.customers`, `accounting.invoices`, `dispatch`
3. **Token refresh**: Handled automatically by the MCP server

📚 **Official docs**: [ServiceTitan Developer Portal](https://developer.servicetitan.io/docs/authentication)

## 🎯 Example Prompts

Once connected to Claude, use natural language:

**Dispatch & Scheduling:**
- *"Show me all jobs scheduled for today with status 'In Progress'"*
- *"Create a job for customer 5678 at location 9012, job type 'AC Repair', priority Urgent"*
- *"List all appointments for technician ID 234 next week"*

**Customer Management:**
- *"Find customers created in the last 30 days"*
- *"Get full details for customer ID 1234 including service history"*
- *"Search for customers with email ending in '@example.com'"*

**Financial Analysis:**
- *"List all invoices over $5,000 from the last quarter"*
- *"Show me pending invoices for job 4567"*
- *"Generate revenue report: total invoice amounts by month"*

**Technician Operations:**
- *"List all active technicians in business unit 3"*
- *"Find available technicians for tomorrow afternoon"*
- *"Show completed jobs for technician Mike this week"*

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

### "ServiceTitan auth error: 401"
- Double-check your Client ID and Client Secret are correct
- Verify your Tenant ID matches your ServiceTitan account
- Ensure your API application has the required permissions (Jobs, Customers, Invoices, Dispatch)
- Check that your credentials haven't been revoked in ServiceTitan settings

### "Tools not appearing in Claude"
- Restart Claude Desktop after updating config
- Check that the path in `claude_desktop_config.json` is absolute (not relative)
- Verify the build completed successfully: `ls dist/index.js`
- Check Claude Desktop logs: `tail -f ~/Library/Logs/Claude/mcp*.log`

### "Request timed out"
- ServiceTitan API can be slow for large datasets — increase timeout or use pagination
- Check your network connection and firewall settings
- Verify ServiceTitan API status at [status.servicetitan.com](https://status.servicetitan.com)

## 📖 Resources

- [ServiceTitan Developer Portal](https://developer.servicetitan.io/)
- [ServiceTitan API Reference](https://developer.servicetitan.io/apis/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://claude.ai/desktop)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/job-cancellation`)
3. Commit your changes (`git commit -m 'Add job cancellation tool'`)
4. Push to the branch (`git push origin feature/job-cancellation`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngage](https://mcpengage.com) — AI infrastructure for business software.

Want more MCP servers? Check our [catalog](https://mcpengine.pages.dev) covering 30+ business platforms.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengage).
