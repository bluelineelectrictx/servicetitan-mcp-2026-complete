import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerTechniciansTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_technicians',
      description: 'List all technicians',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
        businessUnitId: z.number().optional().describe('Filter by business unit'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/settings/v2/technicians', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician',
      description: 'Get technician details by ID',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
      }),
      handler: async (args: { technicianId: number }) => {
        const result = await client.get(`/settings/v2/technicians/${args.technicianId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_technician',
      description: 'Create a new technician',
      inputSchema: z.object({
        name: z.string().describe('Technician name'),
        businessUnitId: z.number().describe('Business unit ID'),
        email: z.string().optional().describe('Email address'),
        mobileNumber: z.string().optional().describe('Mobile phone number'),
        employeeId: z.string().optional().describe('Employee ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/settings/v2/technicians', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_technician',
      description: 'Update technician information',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        name: z.string().optional().describe('Updated name'),
        email: z.string().optional().describe('Updated email'),
        mobileNumber: z.string().optional().describe('Updated mobile'),
        active: z.boolean().optional().describe('Active status'),
      }),
      handler: async (args: any) => {
        const { technicianId, ...data } = args;
        const result = await client.patch(`/settings/v2/technicians/${technicianId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_deactivate_technician',
      description: 'Deactivate a technician',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
      }),
      handler: async (args: { technicianId: number }) => {
        const result = await client.patch(`/settings/v2/technicians/${args.technicianId}`, { active: false });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician_schedule',
      description: 'Get technician schedule for a date range',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        startDate: z.string().describe('Start date (ISO 8601)'),
        endDate: z.string().describe('End date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get(`/settings/v2/technicians/${args.technicianId}/schedule`, {
          startDate: args.startDate,
          endDate: args.endDate,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_technician_shifts',
      description: 'Get technician shifts for a date range',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        startDate: z.string().describe('Start date (ISO 8601)'),
        endDate: z.string().describe('End date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.get(`/settings/v2/technicians/${args.technicianId}/shifts`, {
          startDate: args.startDate,
          endDate: args.endDate,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_technician_shift',
      description: 'Create a shift for a technician',
      inputSchema: z.object({
        technicianId: z.number().describe('Technician ID'),
        start: z.string().describe('Shift start time (ISO 8601)'),
        end: z.string().describe('Shift end time (ISO 8601)'),
        zoneId: z.number().optional().describe('Dispatch zone ID'),
      }),
      handler: async (args: any) => {
        const { technicianId, ...data } = args;
        const result = await client.post(`/settings/v2/technicians/${technicianId}/shifts`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
