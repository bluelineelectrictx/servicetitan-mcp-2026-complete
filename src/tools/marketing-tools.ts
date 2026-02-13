import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerMarketingTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_campaigns',
      description: 'List marketing campaigns',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
        category: z.string().optional().describe('Filter by category'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/marketing/v2/campaigns', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_campaign',
      description: 'Get campaign details by ID',
      inputSchema: z.object({
        campaignId: z.number().describe('Campaign ID'),
      }),
      handler: async (args: { campaignId: number }) => {
        const result = await client.get(`/marketing/v2/campaigns/${args.campaignId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_campaign',
      description: 'Create a new marketing campaign',
      inputSchema: z.object({
        name: z.string().describe('Campaign name'),
        category: z.string().describe('Campaign category'),
        source: z.string().optional().describe('Campaign source'),
        medium: z.string().optional().describe('Campaign medium'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/marketing/v2/campaigns', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_campaign',
      description: 'Update campaign details',
      inputSchema: z.object({
        campaignId: z.number().describe('Campaign ID'),
        name: z.string().optional().describe('Updated name'),
        active: z.boolean().optional().describe('Active status'),
      }),
      handler: async (args: any) => {
        const { campaignId, ...data } = args;
        const result = await client.patch(`/marketing/v2/campaigns/${campaignId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_leads',
      description: 'List marketing leads',
      inputSchema: z.object({
        campaignId: z.number().optional().describe('Filter by campaign ID'),
        status: z.string().optional().describe('Filter by status (New, Contacted, Converted)'),
        createdOnOrAfter: z.string().optional().describe('Filter by creation date'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/marketing/v2/leads', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_lead',
      description: 'Get lead details by ID',
      inputSchema: z.object({
        leadId: z.number().describe('Lead ID'),
      }),
      handler: async (args: { leadId: number }) => {
        const result = await client.get(`/marketing/v2/leads/${args.leadId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_lead',
      description: 'Create a new marketing lead',
      inputSchema: z.object({
        campaignId: z.number().optional().describe('Campaign ID'),
        source: z.string().describe('Lead source'),
        customerName: z.string().describe('Customer name'),
        phoneNumber: z.string().optional().describe('Phone number'),
        email: z.string().optional().describe('Email'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/marketing/v2/leads', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_convert_lead',
      description: 'Mark lead as converted to customer',
      inputSchema: z.object({
        leadId: z.number().describe('Lead ID'),
        customerId: z.number().optional().describe('Customer ID it converted to'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/marketing/v2/leads/${args.leadId}/convert`, {
          customerId: args.customerId,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_call_tracking',
      description: 'List call tracking records',
      inputSchema: z.object({
        startDate: z.string().optional().describe('Filter by start date (ISO 8601)'),
        endDate: z.string().optional().describe('Filter by end date (ISO 8601)'),
        campaignId: z.number().optional().describe('Filter by campaign ID'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/marketing/v2/calls', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_lead_sources_report',
      description: 'Get lead sources performance report',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/marketing/v2/reports/lead-sources', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
