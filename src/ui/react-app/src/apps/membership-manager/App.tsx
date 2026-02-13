import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function MembershipManager() {
  const { callTool, loading, error } = useCallTool();
  const [memberships, setMemberships] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('Active');

  useEffect(() => {
    loadMemberships();
  }, [statusFilter]);

  const loadMemberships = async () => {
    try {
      const result = await callTool('servicetitan_list_memberships', {
        status: statusFilter,
        pageSize: 100,
      });
      setMemberships(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      'Active': 'success',
      'Expired': 'error',
      'Cancelled': 'default',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>💎 Membership Manager</h1>
        <p>Manage service memberships and recurring revenue</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Memberships</div>
          <div className="stat-value">{memberships.filter(m => m.status === 'Active').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Expired</div>
          <div className="stat-value">{memberships.filter(m => m.status === 'Expired').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value">{memberships.filter(m => m.status === 'Cancelled').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Count</div>
          <div className="stat-value">{memberships.length}</div>
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
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading && <div className="loading">Loading memberships...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership) => (
              <tr key={membership.id}>
                <td>Customer #{membership.customerId}</td>
                <td>Location #{membership.locationId}</td>
                <td>Type #{membership.membershipTypeId}</td>
                <td><Badge variant={getStatusBadge(membership.status)}>{membership.status}</Badge></td>
                <td>{new Date(membership.from).toLocaleDateString()}</td>
                <td>{new Date(membership.to).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
