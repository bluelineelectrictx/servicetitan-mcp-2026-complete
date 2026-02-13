import React, { useState } from 'react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  jobNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  dueDate: string;
  paidDate?: string;
  balance: number;
}

export default function InvoiceDashboard() {
  const [invoices] = useState<Invoice[]>([
    { id: 1, invoiceNumber: 'INV-2024-001', customer: 'John Smith', jobNumber: 'J-2024-001', amount: 350, status: 'paid', dueDate: '2024-02-20', paidDate: '2024-02-18', balance: 0 },
    { id: 2, invoiceNumber: 'INV-2024-002', customer: 'Sarah Johnson', jobNumber: 'J-2024-002', amount: 850, status: 'pending', dueDate: '2024-02-25', balance: 850 },
    { id: 3, invoiceNumber: 'INV-2024-003', customer: 'Mike Davis', jobNumber: 'J-2024-003', amount: 2500, status: 'overdue', dueDate: '2024-02-10', balance: 2500 },
    { id: 4, invoiceNumber: 'INV-2024-004', customer: 'Emily Wilson', jobNumber: 'J-2024-004', amount: 150, status: 'pending', dueDate: '2024-02-28', balance: 150 },
    { id: 5, invoiceNumber: 'INV-2024-005', customer: 'Robert Brown', jobNumber: 'J-2024-005', amount: 650, status: 'partial', dueDate: '2024-02-22', balance: 300 },
  ]);
  
  const [statusFilter, setStatusFilter] = useState('all');
  
  const stats = {
    totalInvoiced: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    totalPaid: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    totalPending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.balance, 0),
    totalOverdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.balance, 0),
  };
  
  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
    return true;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-blue-500/20 text-blue-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
      case 'partial': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">💰 Invoice Dashboard</h1>
          <p className="text-gray-400">Track and manage customer invoices</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Invoiced</div>
            <div className="text-3xl font-bold text-white">${stats.totalInvoiced.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">This month</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Paid</div>
            <div className="text-3xl font-bold text-green-400">${stats.totalPaid.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">↑ 18%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-blue-400">${stats.totalPending.toLocaleString()}</div>
            <div className="text-gray-400 text-sm mt-2">Awaiting payment</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Overdue</div>
            <div className="text-3xl font-bold text-red-400">${stats.totalOverdue.toLocaleString()}</div>
            <div className="text-red-400 text-sm mt-2">Needs attention</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="partial">Partial Payment</option>
          </select>
        </div>
        
        {/* Invoices Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Job #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#0f172a] transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-blue-400">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm text-white">{invoice.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{invoice.jobNumber}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-amber-400 font-medium">
                    {invoice.balance > 0 ? `$${invoice.balance.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{invoice.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </div>
      </div>
    </div>
  );
}
