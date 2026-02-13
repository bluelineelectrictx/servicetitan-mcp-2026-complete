# ServiceTitan MCP Server

Complete Model Context Protocol (MCP) server for ServiceTitan field service management platform with **108 tools** and **15 React apps**.

## Features

### 🔧 Tools (108 total)

#### Jobs Management (8 tools)
- `servicetitan_list_jobs` - List jobs with filters
- `servicetitan_get_job` - Get job details
- `servicetitan_create_job` - Create new job
- `servicetitan_update_job` - Update job details
- `servicetitan_complete_job` - Mark job complete
- `servicetitan_cancel_job` - Cancel a job
- `servicetitan_list_job_appointments` - List job appointments
- `servicetitan_get_job_history` - Get job history

#### Customers Management (9 tools)
- `servicetitan_list_customers` - List customers
- `servicetitan_get_customer` - Get customer details
- `servicetitan_create_customer` - Create new customer
- `servicetitan_update_customer` - Update customer
- `servicetitan_deactivate_customer` - Deactivate customer
- `servicetitan_get_customer_balance` - Get account balance
- `servicetitan_list_customer_contacts` - List customer contacts
- `servicetitan_create_customer_contact` - Create contact
- `servicetitan_list_customer_locations` - List customer locations

#### Estimates Management (8 tools)
- `servicetitan_list_estimates` - List estimates
- `servicetitan_get_estimate` - Get estimate details
- `servicetitan_create_estimate` - Create new estimate
- `servicetitan_update_estimate` - Update estimate
- `servicetitan_mark_estimate_sold` - Mark estimate as sold
- `servicetitan_dismiss_estimate` - Dismiss estimate
- `servicetitan_get_estimate_items` - Get estimate line items
- `servicetitan_add_estimate_item` - Add line item

#### Invoices & Payments (10 tools)
- `servicetitan_list_invoices` - List invoices
- `servicetitan_get_invoice` - Get invoice details
- `servicetitan_create_invoice` - Create new invoice
- `servicetitan_update_invoice` - Update invoice
- `servicetitan_post_invoice` - Post invoice
- `servicetitan_void_invoice` - Void invoice
- `servicetitan_get_invoice_items` - Get invoice items
- `servicetitan_add_invoice_item` - Add invoice item
- `servicetitan_list_invoice_payments` - List payments
- `servicetitan_create_payment` - Record payment

#### Dispatching (8 tools)
- `servicetitan_list_appointments` - List appointments
- `servicetitan_get_appointment` - Get appointment details
- `servicetitan_create_appointment` - Schedule appointment
- `servicetitan_update_appointment` - Update appointment
- `servicetitan_assign_technician` - Assign technician
- `servicetitan_cancel_appointment` - Cancel appointment
- `servicetitan_list_dispatch_zones` - List dispatch zones
- `servicetitan_get_dispatch_board` - Get dispatch board view

#### Technicians (8 tools)
- `servicetitan_list_technicians` - List technicians
- `servicetitan_get_technician` - Get technician details
- `servicetitan_create_technician` - Create technician
- `servicetitan_update_technician` - Update technician
- `servicetitan_deactivate_technician` - Deactivate technician
- `servicetitan_get_technician_schedule` - Get schedule
- `servicetitan_get_technician_shifts` - Get shifts
- `servicetitan_create_technician_shift` - Create shift

#### Equipment Management (6 tools)
- `servicetitan_list_equipment` - List equipment
- `servicetitan_get_equipment` - Get equipment details
- `servicetitan_create_equipment` - Register new equipment
- `servicetitan_update_equipment` - Update equipment
- `servicetitan_deactivate_equipment` - Deactivate equipment
- `servicetitan_get_equipment_history` - Get service history

#### Memberships (7 tools)
- `servicetitan_list_memberships` - List memberships
- `servicetitan_get_membership` - Get membership details
- `servicetitan_create_membership` - Create membership
- `servicetitan_cancel_membership` - Cancel membership
- `servicetitan_renew_membership` - Renew membership
- `servicetitan_list_membership_types` - List membership types
- `servicetitan_get_membership_type` - Get membership type

#### Inventory Management (7 tools)
- `servicetitan_list_inventory_items` - List inventory items
- `servicetitan_get_inventory_item` - Get item details
- `servicetitan_create_inventory_item` - Create item/SKU
- `servicetitan_update_inventory_item` - Update item
- `servicetitan_deactivate_inventory_item` - Deactivate item
- `servicetitan_get_inventory_levels` - Get stock levels
- `servicetitan_adjust_inventory` - Adjust stock

#### Locations (6 tools)
- `servicetitan_list_locations` - List locations
- `servicetitan_get_location` - Get location details
- `servicetitan_create_location` - Create service location
- `servicetitan_update_location` - Update location
- `servicetitan_deactivate_location` - Deactivate location
- `servicetitan_list_location_equipment` - List location equipment

#### Marketing & Leads (10 tools)
- `servicetitan_list_campaigns` - List campaigns
- `servicetitan_get_campaign` - Get campaign details
- `servicetitan_create_campaign` - Create campaign
- `servicetitan_update_campaign` - Update campaign
- `servicetitan_list_leads` - List leads
- `servicetitan_get_lead` - Get lead details
- `servicetitan_create_lead` - Create lead
- `servicetitan_convert_lead` - Convert lead to customer
- `servicetitan_list_call_tracking` - List call tracking
- `servicetitan_get_lead_sources_report` - Get lead sources report

#### Reporting & Analytics (9 tools)
- `servicetitan_get_revenue_report` - Revenue report
- `servicetitan_get_technician_performance` - Technician performance
- `servicetitan_get_job_costing_report` - Job costing report
- `servicetitan_get_sales_report` - Sales report
- `servicetitan_get_customer_acquisition_report` - Customer acquisition
- `servicetitan_get_ar_aging_report` - AR aging report
- `servicetitan_get_membership_revenue_report` - Membership revenue
- `servicetitan_get_job_type_analysis` - Job type analysis
- `servicetitan_get_dispatch_metrics` - Dispatch metrics

#### Tags (7 tools)
- `servicetitan_list_tag_types` - List tag types
- `servicetitan_create_tag_type` - Create tag type
- `servicetitan_add_job_tag` - Add job tag
- `servicetitan_remove_job_tag` - Remove job tag
- `servicetitan_list_job_tags` - List job tags
- `servicetitan_add_customer_tag` - Add customer tag
- `servicetitan_remove_customer_tag` - Remove customer tag

#### Payroll (5 tools)
- `servicetitan_list_payroll_records` - List payroll records
- `servicetitan_get_technician_timesheet` - Get timesheet
- `servicetitan_get_technician_commissions` - Get commissions
- `servicetitan_get_payroll_summary` - Get payroll summary
- `servicetitan_export_payroll` - Export payroll data

### 🎨 React Apps (15 total)

1. **Job Board** - View and manage all service jobs with filtering
2. **Job Detail** - Complete job information with appointments
3. **Customer Dashboard** - Manage customer accounts and activity
4. **Customer Detail** - Full customer profile with locations and contacts
5. **Dispatch Board** - Daily technician schedules and assignments
6. **Estimate Builder** - Create and track estimates and quotes
7. **Invoice Dashboard** - Manage invoices and track payments
8. **Technician Schedule** - View technician availability and shifts
9. **Equipment Tracker** - Monitor customer equipment and warranties
10. **Membership Manager** - Manage recurring service memberships
11. **Marketing Dashboard** - Track campaigns and lead generation
12. **Inventory Manager** - Track materials and stock levels
13. **Payroll Overview** - Track technician payroll and commissions
14. **Reporting Dashboard** - Financial reports and analytics
15. **Location Map** - Service locations directory

All apps feature:
- 🌑 Dark theme optimized for readability
- 📱 Responsive design
- ⚡ Real-time data via MCP tools
- 🎯 Intuitive filtering and search

## Installation

```bash
cd /Users/jakeshore/.clawdbot/workspace/mcpengine-repo/servers/servicetitan
npm install
cd src/ui/react-app && npm install && cd ../../..
```

## Configuration

Create a `.env` file:

```bash
SERVICETITAN_CLIENT_ID=your_client_id_here
SERVICETITAN_CLIENT_SECRET=your_client_secret_here
SERVICETITAN_TENANT_ID=your_tenant_id_here
SERVICETITAN_APP_KEY=your_app_key_here
```

### Getting ServiceTitan API Credentials

1. Log into your ServiceTitan account
2. Go to Settings → Integrations → API Application Management
3. Create a new API application
4. Copy your Client ID, Client Secret, Tenant ID, and App Key
5. Configure OAuth2 scopes as needed

## Build

```bash
npm run build
```

This will:
1. Compile TypeScript server code
2. Build all 15 React apps
3. Make the main entry point executable

## Usage

### As MCP Server

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "servicetitan": {
      "command": "node",
      "args": ["/path/to/servers/servicetitan/dist/main.js"],
      "env": {
        "SERVICETITAN_CLIENT_ID": "your_client_id",
        "SERVICETITAN_CLIENT_SECRET": "your_client_secret",
        "SERVICETITAN_TENANT_ID": "your_tenant_id",
        "SERVICETITAN_APP_KEY": "your_app_key"
      }
    }
  }
}
```

### Direct Usage

```bash
npm start
```

## Development

```bash
# Watch TypeScript compilation
npm run watch

# Run in development mode
npm run dev

# Build React apps only
npm run build:apps
```

## Architecture

```
servicetitan/
├── src/
│   ├── clients/
│   │   └── servicetitan.ts       # API client with OAuth2
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── tools/                     # 14 tool modules
│   │   ├── jobs-tools.ts
│   │   ├── customers-tools.ts
│   │   ├── estimates-tools.ts
│   │   ├── invoices-tools.ts
│   │   ├── dispatching-tools.ts
│   │   ├── technicians-tools.ts
│   │   ├── equipment-tools.ts
│   │   ├── memberships-tools.ts
│   │   ├── inventory-tools.ts
│   │   ├── locations-tools.ts
│   │   ├── marketing-tools.ts
│   │   ├── reporting-tools.ts
│   │   ├── tags-tools.ts
│   │   └── payroll-tools.ts
│   ├── ui/
│   │   └── react-app/             # 15 React applications
│   │       └── src/
│   │           ├── apps/
│   │           ├── components/
│   │           ├── hooks/
│   │           └── styles/
│   ├── server.ts                  # MCP server setup
│   └── main.ts                    # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## API Coverage

This MCP server covers all major ServiceTitan API v2 endpoints:
- ✅ Job Management (JPM)
- ✅ Customer Relationship Management (CRM)
- ✅ Sales & Estimates
- ✅ Accounting & Invoicing
- ✅ Dispatch & Scheduling
- ✅ Technician Management
- ✅ Equipment Tracking
- ✅ Memberships & Recurring Revenue
- ✅ Inventory & Materials
- ✅ Marketing & Lead Generation
- ✅ Reporting & Analytics
- ✅ Payroll & Commissions
- ✅ Settings & Configuration

## License

MIT

## Author

MCP Engine - BusyBee3333

## Links

- [ServiceTitan API Documentation](https://developer.servicetitan.io/)
- [MCP Specification](https://modelcontextprotocol.io/)
- [GitHub Repository](https://github.com/BusyBee3333/mcpengine)
