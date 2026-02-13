import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function InventoryManager() {
  const { callTool, loading, error } = useCallTool();
  const [items, setItems] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    loadInventory();
  }, [typeFilter]);

  const loadInventory = async () => {
    try {
      const result = await callTool('servicetitan_list_inventory_items', {
        type: typeFilter || undefined,
        active: true,
        pageSize: 100,
      });
      setItems(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📦 Inventory Manager</h1>
        <p>Track materials and stock levels</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Items</div>
          <div className="stat-value">{items.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Materials</div>
          <div className="stat-value">{items.filter(i => i.type === 'Material').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Equipment</div>
          <div className="stat-value">{items.filter(i => i.type === 'Equipment').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Services</div>
          <div className="stat-value">{items.filter(i => i.type === 'Service').length}</div>
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: '20px' }}>
          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Types</option>
            <option value="Material">Material</option>
            <option value="Equipment">Equipment</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {loading && <div className="loading">Loading inventory...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Margin</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const margin = item.cost && item.price ? (((item.price - item.cost) / item.price) * 100).toFixed(1) : '0';
              return (
                <tr key={item.id}>
                  <td><strong>{item.code}</strong></td>
                  <td>{item.description}</td>
                  <td><Badge>{item.type}</Badge></td>
                  <td>${item.cost?.toFixed(2) || '0.00'}</td>
                  <td>${item.price?.toFixed(2) || '0.00'}</td>
                  <td>{margin}%</td>
                  <td><Badge variant="success">Active</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
