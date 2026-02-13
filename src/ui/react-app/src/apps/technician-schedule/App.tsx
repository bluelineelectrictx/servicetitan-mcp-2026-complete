import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function TechnicianSchedule() {
  const { callTool, loading, error } = useCallTool();
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [schedule, setSchedule] = useState<any>(null);

  useEffect(() => {
    loadTechnicians();
  }, []);

  const loadTechnicians = async () => {
    try {
      const result = await callTool('servicetitan_list_technicians', { active: true, pageSize: 50 });
      setTechnicians(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSchedule = async () => {
    if (!selectedTech) return;
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const result = await callTool('servicetitan_get_technician_schedule', {
        technicianId: parseInt(selectedTech),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      setSchedule(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📆 Technician Schedule</h1>
        <p>View technician availability and shifts</p>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <select
            className="input"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">Select Technician</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={loadSchedule}>Load Schedule</button>
        </div>

        {loading && <div className="loading">Loading schedule...</div>}
        {error && <div className="error">{error}</div>}

        {schedule && (
          <>
            <h3>Next 7 Days</h3>
            <div style={{ marginTop: '20px' }}>
              {schedule.shifts?.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Zone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.shifts.map((shift: any, idx: number) => (
                      <tr key={idx}>
                        <td>{new Date(shift.start).toLocaleDateString()}</td>
                        <td>{new Date(shift.start).toLocaleTimeString()}</td>
                        <td>{new Date(shift.end).toLocaleTimeString()}</td>
                        <td>{shift.zoneId || 'All Zones'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#9aa0a6' }}>No shifts scheduled for this period</p>
              )}
            </div>
          </>
        )}
      </Card>

      <div className="stats-grid">
        {technicians.slice(0, 8).map((tech) => (
          <div key={tech.id} className="stat-card">
            <div className="stat-label">{tech.name}</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>
              <Badge variant={tech.active ? 'success' : 'default'}>{tech.active ? 'Active' : 'Inactive'}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
