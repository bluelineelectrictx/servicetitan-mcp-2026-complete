#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================
// CONFIGURATION
// ============================================
const MCP_NAME = "servicetitan";
const MCP_VERSION = "1.0.0";

// ServiceTitan API base URL
const API_BASE_URL = "https://api.servicetitan.io";
const AUTH_URL = "https://auth.servicetitan.io/connect/token";

// ============================================
// API CLIENT
// ============================================
class ServiceTitanClient {
  private clientId: string;
  private clientSecret: string;
  private tenantId: string;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(clientId: string, clientSecret: string, tenantId: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tenantId = tenantId;
    this.baseUrl = API_BASE_URL;
  }

  async getAccessToken(): Promise<string> {
    // Return cached token if still valid (with 5 min buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    // Request new token using client credentials
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ServiceTitan auth error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    return this.accessToken!;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const token = await this.getAccessToken();
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "ST-App-Key": this.clientId,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ServiceTitan API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getTenantId() {
    return this.tenantId;
  }
}

// ============================================
// TOOL DEFINITIONS
// ============================================
const tools = [
  {
    name: "list_jobs",
    description: "List jobs/work orders. Jobs represent scheduled service work including location, customer, and technician assignments.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 100)" },
        status: { type: "string", description: "Filter by status: Scheduled, InProgress, Completed, Canceled" },
        customerId: { type: "number", description: "Filter by customer ID" },
        technicianId: { type: "number", description: "Filter by technician ID" },
        createdOnOrAfter: { type: "string", description: "Filter jobs created on or after (ISO 8601)" },
        completedOnOrAfter: { type: "string", description: "Filter jobs completed on or after (ISO 8601)" },
      },
    },
  },
  {
    name: "get_job",
    description: "Get detailed information about a specific job including line items, equipment, and history.",
    inputSchema: {
      type: "object" as const,
      properties: {
        job_id: { type: "number", description: "Job ID" },
      },
      required: ["job_id"],
    },
  },
  {
    name: "create_job",
    description: "Create a new job/work order. Requires customer, location, and job type.",
    inputSchema: {
      type: "object" as const,
      properties: {
        customerId: { type: "number", description: "Customer ID" },
        locationId: { type: "number", description: "Service location ID" },
        jobTypeId: { type: "number", description: "Job type ID" },
        priority: { type: "string", description: "Priority: Low, Normal, High, Urgent" },
        businessUnitId: { type: "number", description: "Business unit ID" },
        campaignId: { type: "number", description: "Marketing campaign ID" },
        summary: { type: "string", description: "Job summary/description" },
        scheduledStart: { type: "string", description: "Scheduled start time (ISO 8601)" },
        scheduledEnd: { type: "string", description: "Scheduled end time (ISO 8601)" },
      },
      required: ["customerId", "locationId", "jobTypeId"],
    },
  },
  {
    name: "list_customers",
    description: "List customers in the CRM. Includes contact info, locations, and account details.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 100)" },
        name: { type: "string", description: "Filter by customer name (partial match)" },
        email: { type: "string", description: "Filter by email address" },
        phone: { type: "string", description: "Filter by phone number" },
        createdOnOrAfter: { type: "string", description: "Filter customers created on or after (ISO 8601)" },
        active: { type: "boolean", description: "Filter by active status" },
      },
    },
  },
  {
    name: "get_customer",
    description: "Get detailed customer information including all locations, contacts, and service history.",
    inputSchema: {
      type: "object" as const,
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "list_invoices",
    description: "List invoices. Includes amounts, status, line items, and payment information.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 100)" },
        status: { type: "string", description: "Filter by status: Pending, Posted, Exported" },
        customerId: { type: "number", description: "Filter by customer ID" },
        jobId: { type: "number", description: "Filter by job ID" },
        createdOnOrAfter: { type: "string", description: "Filter invoices created on or after (ISO 8601)" },
        total_gte: { type: "number", description: "Filter by minimum total amount" },
      },
    },
  },
  {
    name: "list_technicians",
    description: "List technicians/field workers. Includes contact info, skills, and availability.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 100)" },
        active: { type: "boolean", description: "Filter by active status" },
        businessUnitId: { type: "number", description: "Filter by business unit" },
      },
    },
  },
  {
    name: "list_appointments",
    description: "List scheduled appointments. Shows booking windows, assigned technicians, and status.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 100)" },
        startsOnOrAfter: { type: "string", description: "Filter appointments starting on or after (ISO 8601)" },
        startsOnOrBefore: { type: "string", description: "Filter appointments starting on or before (ISO 8601)" },
        technicianId: { type: "number", description: "Filter by assigned technician" },
        jobId: { type: "number", description: "Filter by job ID" },
      },
    },
  },
];

// ============================================
// TOOL HANDLERS
// ============================================
async function handleTool(client: ServiceTitanClient, name: string, args: any) {
  const tenantId = client.getTenantId();
  
  switch (name) {
    case "list_jobs": {
      const { page = 1, pageSize = 50, status, customerId, technicianId, createdOnOrAfter, completedOnOrAfter } = args;
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(Math.min(pageSize, 100)));
      if (status) params.append("status", status);
      if (customerId) params.append("customerId", String(customerId));
      if (technicianId) params.append("technicianId", String(technicianId));
      if (createdOnOrAfter) params.append("createdOnOrAfter", createdOnOrAfter);
      if (completedOnOrAfter) params.append("completedOnOrAfter", completedOnOrAfter);
      
      return await client.get(`/jpm/v2/tenant/${tenantId}/jobs?${params}`);
    }
    
    case "get_job": {
      const { job_id } = args;
      return await client.get(`/jpm/v2/tenant/${tenantId}/jobs/${job_id}`);
    }
    
    case "create_job": {
      const { customerId, locationId, jobTypeId, priority = "Normal", businessUnitId, campaignId, summary, scheduledStart, scheduledEnd } = args;
      
      const jobData: any = {
        customerId,
        locationId,
        jobTypeId,
        priority,
      };
      
      if (businessUnitId) jobData.businessUnitId = businessUnitId;
      if (campaignId) jobData.campaignId = campaignId;
      if (summary) jobData.summary = summary;
      if (scheduledStart) jobData.start = scheduledStart;
      if (scheduledEnd) jobData.end = scheduledEnd;
      
      return await client.post(`/jpm/v2/tenant/${tenantId}/jobs`, jobData);
    }
    
    case "list_customers": {
      const { page = 1, pageSize = 50, name, email, phone, createdOnOrAfter, active } = args;
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(Math.min(pageSize, 100)));
      if (name) params.append("name", name);
      if (email) params.append("email", email);
      if (phone) params.append("phone", phone);
      if (createdOnOrAfter) params.append("createdOnOrAfter", createdOnOrAfter);
      if (active !== undefined) params.append("active", String(active));
      
      return await client.get(`/crm/v2/tenant/${tenantId}/customers?${params}`);
    }
    
    case "get_customer": {
      const { customer_id } = args;
      return await client.get(`/crm/v2/tenant/${tenantId}/customers/${customer_id}`);
    }
    
    case "list_invoices": {
      const { page = 1, pageSize = 50, status, customerId, jobId, createdOnOrAfter, total_gte } = args;
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(Math.min(pageSize, 100)));
      if (status) params.append("status", status);
      if (customerId) params.append("customerId", String(customerId));
      if (jobId) params.append("jobId", String(jobId));
      if (createdOnOrAfter) params.append("createdOnOrAfter", createdOnOrAfter);
      if (total_gte) params.append("total", `>=${total_gte}`);
      
      return await client.get(`/accounting/v2/tenant/${tenantId}/invoices?${params}`);
    }
    
    case "list_technicians": {
      const { page = 1, pageSize = 50, active, businessUnitId } = args;
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(Math.min(pageSize, 100)));
      if (active !== undefined) params.append("active", String(active));
      if (businessUnitId) params.append("businessUnitId", String(businessUnitId));
      
      return await client.get(`/dispatch/v2/tenant/${tenantId}/technicians?${params}`);
    }
    
    case "list_appointments": {
      const { page = 1, pageSize = 50, startsOnOrAfter, startsOnOrBefore, technicianId, jobId } = args;
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(Math.min(pageSize, 100)));
      if (startsOnOrAfter) params.append("startsOnOrAfter", startsOnOrAfter);
      if (startsOnOrBefore) params.append("startsOnOrBefore", startsOnOrBefore);
      if (technicianId) params.append("technicianId", String(technicianId));
      if (jobId) params.append("jobId", String(jobId));
      
      return await client.get(`/dispatch/v2/tenant/${tenantId}/appointments?${params}`);
    }
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// SERVER SETUP
// ============================================
async function main() {
  const clientId = process.env.SERVICETITAN_CLIENT_ID;
  const clientSecret = process.env.SERVICETITAN_CLIENT_SECRET;
  const tenantId = process.env.SERVICETITAN_TENANT_ID;
  
  if (!clientId) {
    console.error("Error: SERVICETITAN_CLIENT_ID environment variable required");
    process.exit(1);
  }
  
  if (!clientSecret) {
    console.error("Error: SERVICETITAN_CLIENT_SECRET environment variable required");
    process.exit(1);
  }
  
  if (!tenantId) {
    console.error("Error: SERVICETITAN_TENANT_ID environment variable required");
    process.exit(1);
  }

  const client = new ServiceTitanClient(clientId, clientSecret, tenantId);

  const server = new Server(
    { name: `${MCP_NAME}-mcp`, version: MCP_VERSION },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleTool(client, name, args || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${MCP_NAME} MCP server running on stdio`);
}

main().catch(console.error);
