import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerMembershipsTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_memberships',
      description: 'List customer memberships',
      inputSchema: z.object({
        customerId: z.number().optional().describe('Filter by customer ID'),
        locationId: z.number().optional().describe('Filter by location ID'),
        status: z.string().optional().describe('Filter by status (Active, Expired, Cancelled)'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/memberships/v2/memberships', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_membership',
      description: 'Get membership details by ID',
      inputSchema: z.object({
        membershipId: z.number().describe('Membership ID'),
      }),
      handler: async (args: { membershipId: number }) => {
        const result = await client.get(`/memberships/v2/memberships/${args.membershipId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_membership',
      description: 'Create a new membership for a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        locationId: z.number().describe('Location ID'),
        membershipTypeId: z.number().describe('Membership type ID'),
        from: z.string().describe('Start date (ISO 8601)'),
        to: z.string().describe('End date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/memberships/v2/memberships', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_cancel_membership',
      description: 'Cancel a membership',
      inputSchema: z.object({
        membershipId: z.number().describe('Membership ID'),
        cancellationReason: z.string().optional().describe('Reason for cancellation'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/memberships/v2/memberships/${args.membershipId}/cancel`, {
          cancellationReason: args.cancellationReason,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_renew_membership',
      description: 'Renew an existing membership',
      inputSchema: z.object({
        membershipId: z.number().describe('Membership ID'),
        to: z.string().describe('New expiration date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/memberships/v2/memberships/${args.membershipId}/renew`, { to: args.to });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_membership_types',
      description: 'List available membership types/plans',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/memberships/v2/membership-types', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_membership_type',
      description: 'Get membership type details',
      inputSchema: z.object({
        membershipTypeId: z.number().describe('Membership type ID'),
      }),
      handler: async (args: { membershipTypeId: number }) => {
        const result = await client.get(`/memberships/v2/membership-types/${args.membershipTypeId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
