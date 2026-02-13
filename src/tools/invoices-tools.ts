import { z } from 'zod';
import type { ServiceTitanClient } from '../clients/servicetitan.js';

export function registerInvoicesTools(client: ServiceTitanClient) {
  return [
    {
      name: 'servicetitan_list_invoices',
      description: 'List invoices with optional filters',
      inputSchema: z.object({
        jobId: z.number().optional().describe('Filter by job ID'),
        customerId: z.number().optional().describe('Filter by customer ID'),
        status: z.string().optional().describe('Filter by status (Draft, Posted, Paid, Void)'),
        createdOnOrAfter: z.string().optional().describe('Filter by creation date'),
        page: z.number().optional().describe('Page number'),
        pageSize: z.number().optional().describe('Results per page'),
      }),
      handler: async (args: any) => {
        const result = await client.get('/accounting/v2/invoices', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_invoice',
      description: 'Get invoice details by ID',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
      }),
      handler: async (args: { invoiceId: number }) => {
        const result = await client.get(`/accounting/v2/invoices/${args.invoiceId}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_invoice',
      description: 'Create a new invoice',
      inputSchema: z.object({
        jobId: z.number().describe('Job ID'),
        customerId: z.number().describe('Customer ID'),
        locationId: z.number().describe('Location ID'),
        businessUnitId: z.number().describe('Business unit ID'),
        summary: z.string().optional().describe('Invoice summary'),
        dueDate: z.string().optional().describe('Due date (ISO 8601)'),
      }),
      handler: async (args: any) => {
        const result = await client.post('/accounting/v2/invoices', args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_update_invoice',
      description: 'Update invoice details',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
        summary: z.string().optional().describe('Updated summary'),
        dueDate: z.string().optional().describe('Updated due date'),
      }),
      handler: async (args: any) => {
        const { invoiceId, ...data } = args;
        const result = await client.patch(`/accounting/v2/invoices/${invoiceId}`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_post_invoice',
      description: 'Post an invoice (make it official)',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
      }),
      handler: async (args: { invoiceId: number }) => {
        const result = await client.post(`/accounting/v2/invoices/${args.invoiceId}/post`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_void_invoice',
      description: 'Void an invoice',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
        reason: z.string().optional().describe('Void reason'),
      }),
      handler: async (args: any) => {
        const result = await client.post(`/accounting/v2/invoices/${args.invoiceId}/void`, { reason: args.reason });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_get_invoice_items',
      description: 'Get line items for an invoice',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
      }),
      handler: async (args: { invoiceId: number }) => {
        const result = await client.get(`/accounting/v2/invoices/${args.invoiceId}/items`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_add_invoice_item',
      description: 'Add line item to an invoice',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
        skuId: z.number().optional().describe('SKU ID'),
        description: z.string().describe('Item description'),
        quantity: z.number().describe('Quantity'),
        unitPrice: z.number().describe('Unit price'),
        itemType: z.string().describe('Item type (Service, Material, Equipment)'),
      }),
      handler: async (args: any) => {
        const { invoiceId, ...data } = args;
        const result = await client.post(`/accounting/v2/invoices/${invoiceId}/items`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_list_invoice_payments',
      description: 'List payments for an invoice',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
      }),
      handler: async (args: { invoiceId: number }) => {
        const result = await client.get(`/accounting/v2/invoices/${args.invoiceId}/payments`);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
    {
      name: 'servicetitan_create_payment',
      description: 'Record a payment for an invoice',
      inputSchema: z.object({
        invoiceId: z.number().describe('Invoice ID'),
        amount: z.number().describe('Payment amount'),
        paymentType: z.string().describe('Payment type (Cash, Check, Credit Card, ACH)'),
        memo: z.string().optional().describe('Payment memo'),
      }),
      handler: async (args: any) => {
        const { invoiceId, ...data } = args;
        const result = await client.post(`/accounting/v2/invoices/${invoiceId}/payments`, data);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    },
  ];
}
