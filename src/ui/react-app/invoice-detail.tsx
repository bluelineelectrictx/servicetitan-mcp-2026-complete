import React, { useState } from 'react';

interface InvoiceDetail {
  invoiceNumber: string;
  status: string;
  issueDate: string;
  dueDate: string;
  customer: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  jobNumber: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  payments: Array<{
    date: string;
    amount: number;
    method: string;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
}

export default function InvoiceDetail() {
  const [invoice] = useState<InvoiceDetail>({
    invoiceNumber: 'INV-2024-001',
    status: 'partial',
    issueDate: '2024-02-15',
    dueDate: '2024-02-28',
    customer: {
      name: 'John Smith',
      address: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    jobNumber: 'J-2024-001',
    lineItems: [
      { description: 'HVAC System Inspection', quantity: 1, rate: 150, amount: 150 },
      { description: 'Air Filter Replacement (MERV 13)', quantity: 2, rate: 45, amount: 90 },
      { description: 'Duct Cleaning - Full System', quantity: 1, rate: 350, amount: 350 },
      { description: 'Labor - 2 hours', quantity: 2, rate: 85, amount: 170 },
    ],
    payments: [
      { date: '2024-02-16', amount: 400, method: 'Credit Card' },
    ],
    subtotal: 760,
    tax: 60.80,
    total: 820.80,
    amountPaid: 400,
    balance: 420.80,
  });
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Invoice {invoice.invoiceNumber}</h1>
              <p className="text-gray-400">Job #{invoice.jobNumber}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Send Invoice
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Record Payment
              </button>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' :
            invoice.status === 'partial' ? 'bg-amber-500/20 text-amber-400' :
            invoice.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {invoice.status.toUpperCase()}
          </span>
        </div>
        
        {/* Invoice Content */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-8">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-700">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">BILL TO</h3>
              <div className="text-white">
                <div className="font-semibold mb-1">{invoice.customer.name}</div>
                <div className="text-sm text-gray-400">{invoice.customer.address}</div>
                <div className="text-sm text-gray-400">
                  {invoice.customer.city}, {invoice.customer.state} {invoice.customer.zip}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="mb-4">
                <div className="text-sm text-gray-400">Issue Date</div>
                <div className="text-white font-medium">{invoice.issueDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Due Date</div>
                <div className="text-white font-medium">{invoice.dueDate}</div>
              </div>
            </div>
          </div>
          
          {/* Line Items */}
          <table className="w-full mb-6">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 text-sm font-semibold text-gray-400">DESCRIPTION</th>
                <th className="text-center py-3 text-sm font-semibold text-gray-400">QTY</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-400">RATE</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-400">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {invoice.lineItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 text-white">{item.description}</td>
                  <td className="py-3 text-center text-gray-300">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-300">${item.rate.toFixed(2)}</td>
                  <td className="py-3 text-right text-white font-medium">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Tax (8%):</span>
                <span className="text-white">${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-t border-gray-700 font-semibold">
                <span className="text-white">Total:</span>
                <span className="text-white">${invoice.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 bg-green-500/10 px-3 rounded">
                <span className="text-green-400">Amount Paid:</span>
                <span className="text-green-400">-${invoice.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-t border-gray-700 font-bold text-lg">
                <span className="text-amber-400">Balance Due:</span>
                <span className="text-amber-400">${invoice.balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment History */}
          {invoice.payments.length > 0 && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">PAYMENT HISTORY</h3>
              <div className="space-y-2">
                {invoice.payments.map((payment, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#0f172a] p-3 rounded">
                    <div>
                      <div className="text-white font-medium">{payment.method}</div>
                      <div className="text-sm text-gray-400">{payment.date}</div>
                    </div>
                    <div className="text-green-400 font-semibold">${payment.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
