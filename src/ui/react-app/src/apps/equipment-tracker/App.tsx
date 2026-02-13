import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function EquipmentTracker() {
  const { callTool, loading, error } = useCallTool();
  const [equipment, setEquipment] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    loadEquipment();
  }, [typeFilter]);

  const loadEquipment = async () => {
    try {
      const result = await callTool('servicetitan_list_equipment', {
        type: typeFilter || undefined,
        active: true,
        pageSize: 100,
      });
      setEquipment(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🔧 Equipment Tracker</h1>
        <p>Monitor customer equipment and warranties</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Equipment</div>
          <div className="stat-value">{equipment.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">HVAC Units</div>
          <div className="stat-value">{equipment.filter(e => e.type === 'HVAC').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Plumbing</div>
          <div className="stat-value">{equipment.filter(e => e.type === 'Plumbing').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Under Warranty</div>
          <div className="stat-value">{equipment.filter(e => e.warrantyExpiration && new Date(e.warrantyExpiration) > new Date()).length}</div>
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
            <option value="HVAC">HVAC</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>

        {loading && <div className="loading">Loading equipment...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Serial #</th>
              <th>Warranty</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>{item.type}</td>
                <td>Location #{item.locationId}</td>
                <td>{item.manufacturer || '-'}</td>
                <td>{item.model || '-'}</td>
                <td>{item.serialNumber || '-'}</td>
                <td>
                  {item.warrantyExpiration ? (
                    new Date(item.warrantyExpiration) > new Date() ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="error">Expired</Badge>
                    )
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
