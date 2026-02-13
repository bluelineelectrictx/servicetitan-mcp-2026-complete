import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function InvoiceDashboard() {
  const { callTool, loading, error } = useCallTool();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadInvoices();
  }, [statusFilter]);

  const loadInvoices = async () => {
    try {
      const result = await callTool('servicetitan_list_invoices', {
        status: statusFilter || undefined,
        pageSize: 50,
      });
      setInvoices(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      'Paid': 'success',
      'Posted': 'info',
      'Draft': 'default',
      'Void': 'error',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🧾 Invoice Dashboard</h1>
        <p>Manage invoices and payments</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Invoices</div>
          <div className="stat-value">{invoices.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">${invoices.reduce((sum, i) => sum + (i.total || 0), 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value">${invoices.reduce((sum, i) => sum + (i.balance || 0), 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Paid</div>
          <div className="stat-value">{invoices.filter(i => i.status === 'Paid').length}</div>
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: '20px' }}>
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Posted">Posted</option>
            <option value="Paid">Paid</option>
            <option value="Void">Void</option>
          </select>
        </div>

        {loading && <div className="loading">Loading invoices...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Job</th>
              <th>Total</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td><strong>{invoice.invoiceNumber}</strong></td>
                <td>Customer #{invoice.customerId}</td>
                <td>Job #{invoice.jobId}</td>
                <td>${invoice.total?.toFixed(2) || '0.00'}</td>
                <td>${invoice.balance?.toFixed(2) || '0.00'}</td>
                <td><Badge variant={getStatusBadge(invoice.status)}>{invoice.status}</Badge></td>
                <td>{new Date(invoice.createdOn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
