import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerInventoryTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_inventory_items',
      description: 'List inventory items/SKUs',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
        type: z.string().optional().describe('Filter by type (Material, Equipment, Service)'),
        search: z.string().optional().describe('Search by name or SKU'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/pricebook/v2/materials', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_inventory_item',
      description: 'Get inventory item details by ID',
      inputSchema: z.object({
        itemId: z.number().describe('Inventory item ID'),
      }),
      handler: async (args: { itemId: number }) => {
        const result = await client.get(`/pricebook/v2/materials/${args.itemId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_inventory_item',
      description: 'Create a new inventory item/SKU',
      inputSchema: z.object({
        code: z.string().describe('Item/SKU code'),
        description: z.string().describe('Item description'),
        cost: z.number().describe('Unit cost'),
        price: z.number().describe('Unit price'),
        type: z.string().describe('Item type (Material, Equipment, Service)'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/pricebook/v2/materials', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_inventory_item',
      description: 'Update inventory item details',
      inputSchema: z.object({
        itemId: z.number().describe('Item ID'),
        description: z.string().optional().describe('Updated description'),
        cost: z.number().optional().describe('Updated cost'),
        price: z.number().optional().describe('Updated price'),
      }),
      handler: async (args: any) => {
        const { itemId, ...data } = args;
        const result = await client.patch(`/pricebook/v2/materials/${itemId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_deactivate_inventory_item',
      description: 'Deactivate an inventory item',
      inputSchema: z.object({
        itemId: z.number().describe('Item ID'),
      }),
      handler: async (args: { itemId: number }) => {
        const result = await client.patch(`/pricebook/v2/materials/${args.itemId}`, { active: false });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_inventory_levels',
      description: 'Get stock levels for inventory items',
      inputSchema: z.object({
        warehouseId: z.number().optional().describe('Filter by warehouse'),
        itemId: z.number().optional().describe('Filter by item ID'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/inventory/v2/levels', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_adjust_inventory',
      description: 'Adjust inventory stock levels',
      inputSchema: z.object({
        itemId: z.number().describe('Item ID'),
        warehouseId: z.number().describe('Warehouse ID'),
        quantity: z.number().describe('Adjustment quantity (positive or negative)'),
        reason: z.string().optional().describe('Adjustment reason'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/inventory/v2/adjustments', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
