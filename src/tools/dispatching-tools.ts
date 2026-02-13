import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerDispatchingTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_appointments',
      description: 'List appointments with filters',
      inputSchema: z.object({
        jobId: z.number().optional().describe('Filter by job ID'),
        technicianId: z.number().optional().describe('Filter by technician ID'),
        start: z.string().optional().describe('Filter by start date/time (ISO 8601)'),
        end: z.string().optional().describe('Filter by end date/time (ISO 8601)'),
        status: z.string().optional().describe('Filter by status'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/dispatch/v2/appointments', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_appointment',
      description: 'Get appointment details by ID',
      inputSchema: z.object({
        appointmentId: z.number().describe('Appointment ID'),
      }),
      handler: async (args: { appointmentId: number }) => {
        const result = await client.get(`/dispatch/v2/appointments/${args.appointmentId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_appointment',
      description: 'Schedule a new appointment for a job',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
        start: z.string().describe('Start date/time (ISO 8601)'),
        end: z.string().describe('End date/time (ISO 8601)'),
        arrivalWindowStart: z.string().describe('Arrival window start (ISO 8601)'),
        arrivalWindowEnd: z.string().describe('Arrival window end (ISO 8601)'),
        technicianIds: z.array(z.number()).optional().describe('Technician IDs to assign'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/dispatch/v2/appointments', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_appointment',
      description: 'Update appointment time or technician assignment',
      inputSchema: z.object({
        appointmentId: z.number().describe('Appointment ID'),
        start: z.string().optional().describe('Updated start time'),
        end: z.string().optional().describe('Updated end time'),
        technicianIds: z.array(z.number()).optional().describe('Updated technician assignments'),
      }),
      handler: async (args: any) => {
        const { appointmentId, ...data } = args;
        const result = await client.patch(`/dispatch/v2/appointments/${appointmentId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_assign_technician',
      description: 'Assign a technician to an appointment',
      inputSchema: z.object({
        appointmentId: z.number().describe('Appointment ID'),
        technicianId: z.number().describe('Technician ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/dispatch/v2/appointments/${args.appointmentId}/assign`, {
          technicianId: args.technicianId,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_cancel_appointment',
      description: 'Cancel an appointment',
      inputSchema: z.object({
        appointmentId: z.number().describe('Appointment ID'),
        reason: z.string().optional().describe('Cancellation reason'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/dispatch/v2/appointments/${args.appointmentId}/cancel`, {
          reason: args.reason,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_dispatch_zones',
      description: 'List all dispatch zones',
      inputSchema: z.object({
        businessUnitId: z.number().optional().describe('Filter by business unit'),
        active: z.boolean().optional().describe('Filter by active status'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/settings/v2/dispatch-zones', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_dispatch_board',
      description: 'Get dispatch board view for a specific date',
      inputSchema: z.object({
        date: z.string().describe('Date for dispatch board (YYYY-MM-DD)'),
        zoneId: z.number().optional().describe('Filter by zone ID'),
        businessUnitId: z.number().optional().describe('Filter by business unit'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/dispatch/v2/board', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
