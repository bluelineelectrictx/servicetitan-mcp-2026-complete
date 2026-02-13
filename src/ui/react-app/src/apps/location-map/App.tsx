import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function LocationMap() {
  const { callTool, loading, error } = useCallTool();
  const [locations, setLocations] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const result = await callTool('servicetitan_list_locations', {
        active: true,
        pageSize: 100,
      });
      setLocations(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLocations = locations.filter(loc =>
    loc.name?.toLowerCase().includes(filter.toLowerCase()) ||
    loc.address?.city?.toLowerCase().includes(filter.toLowerCase()) ||
    loc.address?.zip?.includes(filter)
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>🗺️ Location Map</h1>
        <p>Service locations directory</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Locations</div>
          <div className="stat-value">{locations.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value">{locations.filter(l => l.active).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cities</div>
          <div className="stat-value">{new Set(locations.map(l => l.address?.city)).size}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">States</div>
          <div className="stat-value">{new Set(locations.map(l => l.address?.state)).size}</div>
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search locations by name, city, or ZIP..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {loading && <div className="loading">Loading locations...</div>}
        {error && <div className="error">{error}</div>}

        <div className="grid grid-2">
          {filteredLocations.map((location) => (
            <Card key={location.id}>
              <h3>{location.name} <Badge variant={location.active ? 'success' : 'default'}>{location.active ? 'Active' : 'Inactive'}</Badge></h3>
              <div style={{ marginTop: '10px' }}>
                <div><strong>Customer:</strong> #{location.customerId}</div>
                <div><strong>Address:</strong></div>
                <div>{location.address?.street}</div>
                <div>{location.address?.city}, {location.address?.state} {location.address?.zip}</div>
                {location.address?.country && <div>{location.address.country}</div>}
                {location.taxZoneId && <div style={{ marginTop: '8px' }}><strong>Tax Zone:</strong> {location.taxZoneId}</div>}
              </div>
            </Card>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9aa0a6', padding: '40px' }}>No locations found</p>
        )}
      </Card>
    </div>
  );
}
