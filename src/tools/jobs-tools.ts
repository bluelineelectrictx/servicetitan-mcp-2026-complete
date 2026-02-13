import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerJobsTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_jobs',
      description: 'List jobs with optional filters (status, date range, customer, location, etc.)',
      inputSchema: z.object({
        customerId: z.number().optional().describe('Filter by customer ID'),
        locationId: z.number().optional().describe('Filter by location ID'),
        businessUnitId: z.number().optional().describe('Filter by business unit ID'),
        jobStatus: z.string().optional().describe('Filter by job status'),
        startDate: z.string().optional().describe('Filter jobs after this date (ISO 8601)'),
        endDate: z.string().optional().describe('Filter jobs before this date (ISO 8601)'),
        page: z.number().optional().describe('Page number for pagination'),
        pageSize: z.number().optional().describe('Number of results per page (max 500)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/jpm/v2/jobs', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_job',
      description: 'Get details of a specific job by ID',
      inputSchema: z.object({
        jobId: z.number().describe('The job ID'),
      }),
      handler: async (args: { jobId: number }) => {
        const result = await client.get(`/jpm/v2/jobs/${args.jobId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_job',
      description: 'Create a new job for a customer and location',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        locationId: z.number().describe('Location ID'),
        businessUnitId: z.number().describe('Business unit ID'),
        jobTypeId: z.number().describe('Job type ID'),
        priority: z.string().describe('Job priority (Low, Normal, High, Emergency)'),
        summary: z.string().optional().describe('Job summary/description'),
        campaignId: z.number().optional().describe('Marketing campaign ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/jpm/v2/jobs', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_job',
      description: 'Update job details (summary, priority, status, etc.)',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID to update'),
        summary: z.string().optional().describe('Updated summary'),
        priority: z.string().optional().describe('Updated priority'),
        jobStatus: z.string().optional().describe('Updated job status'),
      }),
      handler: async (args: any) => {
        const { jobId, ...data } = args;
        const result = await client.patch(`/jpm/v2/jobs/${jobId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_complete_job',
      description: 'Mark a job as complete',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID to complete'),
      }),
      handler: async (args: { jobId: number }) => {
        const result = await client.post(`/jpm/v2/jobs/${args.jobId}/complete`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_cancel_job',
      description: 'Cancel a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID to cancel'),
        reason: z.string().optional().describe('Cancellation reason'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/jpm/v2/jobs/${args.jobId}/cancel`, { reason: args.reason });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_job_appointments',
      description: 'List all appointments for a specific job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
      }),
      handler: async (args: { jobId: number }) => {
        const result = await client.get(`/jpm/v2/jobs/${args.jobId}/appointments`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_job_history',
      description: 'Get history and timeline of a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
      }),
      handler: async (args: { jobId: number }) => {
        const result = await client.get(`/jpm/v2/jobs/${args.jobId}/history`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
