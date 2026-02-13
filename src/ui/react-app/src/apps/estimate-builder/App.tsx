import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function EstimateBuilder() {
  const { callTool, loading, error } = useCallTool();
  const [estimates, setEstimates] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadEstimates();
  }, [statusFilter]);

  const loadEstimates = async () => {
    try {
      const result = await callTool('servicetitan_list_estimates', {
        status: statusFilter || undefined,
        pageSize: 50,
      });
      setEstimates(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      'Sold': 'success',
      'Presented': 'info',
      'Draft': 'default',
      'Dismissed': 'error',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>💰 Estimate Builder</h1>
        <p>Create and manage estimates</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Estimates</div>
          <div className="stat-value">{estimates.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sold</div>
          <div className="stat-value">{estimates.filter(e => e.status === 'Sold').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{estimates.filter(e => e.status === 'Presented').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Value</div>
          <div className="stat-value">${estimates.reduce((sum, e) => sum + (e.total || 0), 0).toLocaleString()}</div>
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
            <option value="Presented">Presented</option>
            <option value="Sold">Sold</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>

        {loading && <div className="loading">Loading estimates...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Estimate #</th>
              <th>Name</th>
              <th>Job</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate) => (
              <tr key={estimate.id}>
                <td><strong>#{estimate.id}</strong></td>
                <td>{estimate.name}</td>
                <td>Job #{estimate.jobId}</td>
                <td><Badge variant={getStatusBadge(estimate.status)}>{estimate.status}</Badge></td>
                <td>${estimate.subtotal?.toFixed(2) || '0.00'}</td>
                <td>${estimate.total?.toFixed(2) || '0.00'}</td>
                <td>{new Date(estimate.createdOn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
