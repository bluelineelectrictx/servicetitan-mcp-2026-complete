import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerLocationsTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_locations',
      description: 'List all locations (service addresses)',
      inputSchema: z.object({
        customerId: z.number().optional().describe('Filter by customer ID'),
        active: z.boolean().optional().describe('Filter by active status'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/crm/v2/locations', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_location',
      description: 'Get location details by ID',
      inputSchema: z.object({
        locationId: z.number().describe('Location ID'),
      }),
      handler: async (args: { locationId: number }) => {
        const result = await client.get(`/crm/v2/locations/${args.locationId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_location',
      description: 'Create a new service location for a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        name: z.string().describe('Location name'),
        street: z.string().describe('Street address'),
        city: z.string().describe('City'),
        state: z.string().describe('State'),
        zip: z.string().describe('ZIP code'),
        taxZoneId: z.number().optional().describe('Tax zone ID'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/crm/v2/locations', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_location',
      description: 'Update location details',
      inputSchema: z.object({
        locationId: z.number().describe('Location ID'),
        name: z.string().optional().describe('Updated name'),
        street: z.string().optional().describe('Updated street'),
        city: z.string().optional().describe('Updated city'),
        state: z.string().optional().describe('Updated state'),
        zip: z.string().optional().describe('Updated ZIP'),
      }),
      handler: async (args: any) => {
        const { locationId, ...data } = args;
        const result = await client.patch(`/crm/v2/locations/${locationId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_deactivate_location',
      description: 'Deactivate a location',
      inputSchema: z.object({
        locationId: z.number().describe('Location ID'),
      }),
      handler: async (args: { locationId: number }) => {
        const result = await client.patch(`/crm/v2/locations/${args.locationId}`, { active: false });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_location_equipment',
      description: 'List equipment at a location',
      inputSchema: z.object({
        locationId: z.number().describe('Location ID'),
      }),
      handler: async (args: { locationId: number }) => {
        const result = await client.get(`/crm/v2/locations/${args.locationId}/equipment`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
