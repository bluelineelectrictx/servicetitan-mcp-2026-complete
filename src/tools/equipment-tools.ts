import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerEquipmentTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_equipment',
      description: 'List equipment at locations',
      inputSchema: z.object({
        locationId: z.number().optional().describe('Filter by location ID'),
        active: z.boolean().optional().describe('Filter by active status'),
        type: z.string().optional().describe('Filter by equipment type'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/settings/v2/equipment', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_equipment',
      description: 'Get equipment details by ID',
      inputSchema: z.object({
        equipmentId: z.number().describe('Equipment ID'),
      }),
      handler: async (args: { equipmentId: number }) => {
        const result = await client.get(`/settings/v2/equipment/${args.equipmentId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_equipment',
      description: 'Register new equipment at a location',
      inputSchema: z.object({
        locationId: z.number().describe('Location ID'),
        name: z.string().describe('Equipment name'),
        type: z.string().describe('Equipment type (HVAC, Plumbing, Electrical, etc.)'),
        manufacturer: z.string().optional().describe('Manufacturer'),
        model: z.string().optional().describe('Model number'),
        serialNumber: z.string().optional().describe('Serial number'),
        installDate: z.string().optional().describe('Install date (ISO 8601)'),
        warrantyExpiration: z.string().optional().describe('Warranty expiration (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/settings/v2/equipment', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_equipment',
      description: 'Update equipment details',
      inputSchema: z.object({
        equipmentId: z.number().describe('Equipment ID'),
        name: z.string().optional().describe('Updated name'),
        manufacturer: z.string().optional().describe('Updated manufacturer'),
        model: z.string().optional().describe('Updated model'),
        serialNumber: z.string().optional().describe('Updated serial number'),
        warrantyExpiration: z.string().optional().describe('Updated warranty expiration'),
      }),
      handler: async (args: any) => {
        const { equipmentId, ...data } = args;
        const result = await client.patch(`/settings/v2/equipment/${equipmentId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_deactivate_equipment',
      description: 'Deactivate/remove equipment',
      inputSchema: z.object({
        equipmentId: z.number().describe('Equipment ID'),
      }),
      handler: async (args: { equipmentId: number }) => {
        const result = await client.patch(`/settings/v2/equipment/${args.equipmentId}`, { active: false });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_equipment_history',
      description: 'Get service history for equipment',
      inputSchema: z.object({
        equipmentId: z.number().describe('Equipment ID'),
      }),
      handler: async (args: { equipmentId: number }) => {
        const result = await client.get(`/settings/v2/equipment/${args.equipmentId}/history`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
