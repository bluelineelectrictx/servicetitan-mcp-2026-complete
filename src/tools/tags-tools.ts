import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerTagsTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_tag_types',
      description: 'List all tag types/categories',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/settings/v2/tag-types', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_tag_type',
      description: 'Create a new tag type/category',
      inputSchema: z.object({
        name: z.string().describe('Tag type name'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/settings/v2/tag-types', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_add_job_tag',
      description: 'Add a tag to a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
        tagTypeId: z.number().describe('Tag type ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/jpm/v2/jobs/${args.jobId}/tags`, {
          tagTypeId: args.tagTypeId,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_remove_job_tag',
      description: 'Remove a tag from a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
        tagTypeId: z.number().describe('Tag type ID'),
      }),
      handler: async (args: any) => {
        const result = await client.delete(`/jpm/v2/jobs/${args.jobId}/tags/${args.tagTypeId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_job_tags',
      description: 'List all tags on a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
      }),
      handler: async (args: { jobId: number }) => {
        const result = await client.get(`/jpm/v2/jobs/${args.jobId}/tags`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_add_customer_tag',
      description: 'Add a tag to a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        tagTypeId: z.number().describe('Tag type ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/crm/v2/customers/${args.customerId}/tags`, {
          tagTypeId: args.tagTypeId,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_remove_customer_tag',
      description: 'Remove a tag from a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        tagTypeId: z.number().describe('Tag type ID'),
      }),
      handler: async (args: any) => {
        const result = await client.delete(`/crm/v2/customers/${args.customerId}/tags/${args.tagTypeId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
