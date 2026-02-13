import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ServiceTitanClient } from './clients/servicetitan.js';
import { registerJobsTools } from './tools/jobs-tools.js';
import { registerCustomersTools } from './tools/customers-tools.js';
import { registerEstimatesTools } from './tools/estimates-tools.js';
import { registerInvoicesTools } from './tools/invoices-tools.js';
import { registerDispatchingTools } from './tools/dispatching-tools.js';
import { registerTechniciansTools } from './tools/technicians-tools.js';
import { registerEquipmentTools } from './tools/equipment-tools.js';
import { registerMembershipsTools } from './tools/memberships-tools.js';
import { registerInventoryTools } from './tools/inventory-tools.js';
import { registerLocationsTools } from './tools/locations-tools.js';
import { registerMarketingTools } from './tools/marketing-tools.js';
import { registerReportingTools } from './tools/reporting-tools.js';
import { registerTagsTools } from './tools/tags-tools.js';
import { registerPayrollTools } from './tools/payroll-tools.js';

export interface ServerConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  appKey: string;
}

export function createServiceTitanServer(config: ServerConfig) {
  const server = new Server(
    {
      name: 'servicetitan-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Initialize ServiceTitan client
  const client = new ServiceTitanClient({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    tenantId: config.tenantId,
    appKey: config.appKey,
  });

  // Register all tools from all domains
  const allTools = [
    ...registerJobsTools(client),
    ...registerCustomersTools(client),
    ...registerEstimatesTools(client),
    ...registerInvoicesTools(client),
    ...registerDispatchingTools(client),
    ...registerTechniciansTools(client),
    ...registerEquipmentTools(client),
    ...registerMembershipsTools(client),
    ...registerInventoryTools(client),
    ...registerLocationsTools(client),
    ...registerMarketingTools(client),
    ...registerReportingTools(client),
    ...registerTagsTools(client),
    ...registerPayrollTools(client),
  ];

  // Create tools map for quick lookup
  const toolsMap = new Map(allTools.map((tool) => [tool.name, tool]));

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: allTools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })),
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = toolsMap.get(request.params.name);
    if (!tool) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    try {
      const result = await tool.handler(request.params.arguments as any || {});
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

export async function runStdioServer(config: ServerConfig) {
  const server = createServiceTitanServer(config);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('ServiceTitan MCP server running on stdio');
}
