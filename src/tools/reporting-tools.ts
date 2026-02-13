import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerReportingTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_get_revenue_report',
      description: 'Get revenue report for a date range',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
        businessUnitId: z.number().optional().describe('Filter by business unit'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/revenue', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician_performance',
      description: 'Get technician performance metrics',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
        technicianId: z.number().optional().describe('Filter by technician ID'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/technician-performance', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_job_costing_report',
      description: 'Get job costing and profitability report',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
        jobId: z.number().optional().describe('Filter by job ID'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/job-costing', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_sales_report',
      description: 'Get sales report (estimates, invoices, revenue)',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
        businessUnitId: z.number().optional().describe('Filter by business unit'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/sales', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_customer_acquisition_report',
      description: 'Get customer acquisition metrics',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/customer-acquisition', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_ar_aging_report',
      description: 'Get accounts receivable aging report',
      inputSchema: z.object({
        asOfDate: z.string().optional().describe('Report as-of date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/ar-aging', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_membership_revenue_report',
      description: 'Get membership revenue and metrics',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/membership-revenue', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_job_type_analysis',
      description: 'Get job type breakdown and performance',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/job-type-analysis', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_dispatch_metrics',
      description: 'Get dispatch efficiency metrics',
      inputSchema: z.object({
        startDate: z.string().describe('Report start date (ISO 8601)'),
        endDate: z.string().describe('Report end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/reporting/v2/dispatch-metrics', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
