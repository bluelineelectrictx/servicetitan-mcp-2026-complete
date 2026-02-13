import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function CustomerDashboard() {
  const { callTool, loading, error } = useCallTool();
  const [customers, setCustomers] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    loadCustomers();
  }, [activeFilter]);

  const loadCustomers = async () => {
    try {
      const result = await callTool('servicetitan_list_customers', {
        active: activeFilter,
        pageSize: 50,
      });
      setCustomers(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCustomers = customers.filter(c =>
    c.name?.toLowerCase().includes(filter.toLowerCase()) ||
    c.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>👥 Customer Dashboard</h1>
        <p>Manage customer accounts</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Customers</div>
          <div className="stat-value">{customers.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value">{customers.filter(c => c.active).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Inactive</div>
          <div className="stat-value">{customers.filter(c => !c.active).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Commercial</div>
          <div className="stat-value">{customers.filter(c => c.type === 'Commercial').length}</div>
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search customers..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className="input"
            value={activeFilter === undefined ? '' : String(activeFilter)}
            onChange={(e) => setActiveFilter(e.target.value === '' ? undefined : e.target.value === 'true')}
            style={{ width: '150px' }}
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {loading && <div className="loading">Loading customers...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td><strong>{customer.name}</strong></td>
                <td>{customer.type}</td>
                <td>{customer.email || '-'}</td>
                <td>${customer.balance?.toFixed(2) || '0.00'}</td>
                <td><Badge variant={customer.active ? 'success' : 'default'}>{customer.active ? 'Active' : 'Inactive'}</Badge></td>
                <td>{new Date(customer.createdOn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
