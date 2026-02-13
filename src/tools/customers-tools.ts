import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerCustomersTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_customers',
      description: 'List all customers with optional filters',
      inputSchema: z.object({
        active: z.boolean().optional().describe('Filter by active status'),
        name: z.string().optional().describe('Filter by customer name'),
        email: z.string().optional().describe('Filter by email address'),
        phoneNumber: z.string().optional().describe('Filter by phone number'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/crm/v2/customers', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_customer',
      description: 'Get customer details by ID',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
      }),
      handler: async (args: { customerId: number }) => {
        const result = await client.get(`/crm/v2/customers/${args.customerId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_customer',
      description: 'Create a new customer',
      inputSchema: z.object({
        name: z.string().describe('Customer name'),
        type: z.string().describe('Customer type (Residential or Commercial)'),
        email: z.string().optional().describe('Email address'),
        phoneNumber: z.string().optional().describe('Phone number'),
        street: z.string().optional().describe('Street address'),
        city: z.string().optional().describe('City'),
        state: z.string().optional().describe('State'),
        zip: z.string().optional().describe('ZIP code'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/crm/v2/customers', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_customer',
      description: 'Update customer information',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        name: z.string().optional().describe('Updated name'),
        email: z.string().optional().describe('Updated email'),
        phoneNumber: z.string().optional().describe('Updated phone'),
        doNotMail: z.boolean().optional().describe('Do not mail flag'),
        doNotService: z.boolean().optional().describe('Do not service flag'),
      }),
      handler: async (args: any) => {
        const { customerId, ...data } = args;
        const result = await client.patch(`/crm/v2/customers/${customerId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_deactivate_customer',
      description: 'Deactivate a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID to deactivate'),
      }),
      handler: async (args: { customerId: number }) => {
        const result = await client.patch(`/crm/v2/customers/${args.customerId}`, { active: false });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_customer_balance',
      description: 'Get customer account balance',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
      }),
      handler: async (args: { customerId: number }) => {
        const result = await client.get(`/crm/v2/customers/${args.customerId}/balance`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_customer_contacts',
      description: 'List all contacts for a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
      }),
      handler: async (args: { customerId: number }) => {
        const result = await client.get(`/crm/v2/customers/${args.customerId}/contacts`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_customer_contact',
      description: 'Create a new contact for a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
        name: z.string().describe('Contact name'),
        type: z.string().describe('Contact type'),
        email: z.string().optional().describe('Email'),
        phoneNumber: z.string().optional().describe('Phone number'),
      }),
      handler: async (args: any) => {
        const { customerId, ...data } = args;
        const result = await client.post(`/crm/v2/customers/${customerId}/contacts`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_customer_locations',
      description: 'List all locations for a customer',
      inputSchema: z.object({
        customerId: z.number().describe('Customer ID'),
      }),
      handler: async (args: { customerId: number }) => {
        const result = await client.get(`/crm/v2/customers/${args.customerId}/locations`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
