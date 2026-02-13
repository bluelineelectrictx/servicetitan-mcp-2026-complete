import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerEstimatesTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_estimates',
      description: 'List all estimates with optional filters',
      inputSchema: z.object({
        jobId: z.number().optional().describe('Filter by job ID'),
        status: z.string().optional().describe('Filter by status (Draft, Presented, Sold, Dismissed)'),
        createdOnOrAfter: z.string().optional().describe('Filter by creation date (ISO 8601)'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/sales/v2/estimates', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_estimate',
      description: 'Get estimate details by ID',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
      }),
      handler: async (args: { estimateId: number }) => {
        const result = await client.get(`/sales/v2/estimates/${args.estimateId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_estimate',
      description: 'Create a new estimate for a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
        name: z.string().describe('Estimate name'),
        summary: z.string().optional().describe('Estimate summary'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/sales/v2/estimates', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_estimate',
      description: 'Update estimate details',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
        name: z.string().optional().describe('Updated name'),
        summary: z.string().optional().describe('Updated summary'),
        status: z.string().optional().describe('Updated status'),
      }),
      handler: async (args: any) => {
        const { estimateId, ...data } = args;
        const result = await client.patch(`/sales/v2/estimates/${estimateId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_mark_estimate_sold',
      description: 'Mark an estimate as sold',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
        soldBy: z.number().optional().describe('Technician ID who sold it'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/sales/v2/estimates/${args.estimateId}/sold`, { soldBy: args.soldBy });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_dismiss_estimate',
      description: 'Dismiss/reject an estimate',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
        reason: z.string().optional().describe('Dismissal reason'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/sales/v2/estimates/${args.estimateId}/dismiss`, { reason: args.reason });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_estimate_items',
      description: 'Get line items for an estimate',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
      }),
      handler: async (args: { estimateId: number }) => {
        const result = await client.get(`/sales/v2/estimates/${args.estimateId}/items`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_add_estimate_item',
      description: 'Add a line item to an estimate',
      inputSchema: z.object({
        estimateId: z.number().describe('Estimate ID'),
        skuId: z.number().optional().describe('SKU/Item ID'),
        description: z.string().describe('Item description'),
        quantity: z.number().describe('Quantity'),
        unitPrice: z.number().describe('Unit price'),
      }),
      handler: async (args: any) => {
        const { estimateId, ...data } = args;
        const result = await client.post(`/sales/v2/estimates/${estimateId}/items`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
