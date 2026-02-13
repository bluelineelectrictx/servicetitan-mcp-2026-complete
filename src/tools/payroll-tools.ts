import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerPayrollTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_payroll_records',
      description: 'List payroll records for technicians',
      inputSchema: z.object({
        technicianId: z.number().optional().describe('Filter by technician ID'),
        startDate: z.string().optional().describe('Filter by start date (ISO 8601)'),
        endDate: z.string().optional().describe('Filter by end date (ISO 8601)'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/payroll/v2/records', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician_timesheet',
      description: 'Get timesheet for a technician',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        startDate: z.string().describe('Timesheet start date (ISO 8601)'),
        endDate: z.string().describe('Timesheet end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get(`/payroll/v2/technicians/${args.technicianId}/timesheet`, {
          startDate: args.startDate,
          endDate: args.endDate,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician_commissions',
      description: 'Get commission data for a technician',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        startDate: z.string().describe('Commission start date (ISO 8601)'),
        endDate: z.string().describe('Commission end date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get(`/payroll/v2/technicians/${args.technicianId}/commissions`, {
          startDate: args.startDate,
          endDate: args.endDate,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_payroll_summary',
      description: 'Get payroll summary for a pay period',
      inputSchema: z.object({
        startDate: z.string().describe('Pay period start date (ISO 8601)'),
        endDate: z.string().describe('Pay period end date (ISO 8601)'),
        businessUnitId: z.number().optional().describe('Filter by business unit'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/payroll/v2/summary', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_export_payroll',
      description: 'Export payroll data for external processing',
      inputSchema: z.object({
        startDate: z.string().describe('Export start date (ISO 8601)'),
        endDate: z.string().describe('Export end date (ISO 8601)'),
        format: z.string().optional().describe('Export format (CSV, JSON)'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/payroll/v2/export', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
