import React, { useState } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function DispatchBoard() {
  const { callTool, loading, error } = useCallTool();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);

  const loadDispatchBoard = async () => {
    try {
      const appts = await callTool('servicetitan_list_appointments', {
        start: `${date}T00:00:00Z`,
        end: `${date}T23:59:59Z`,
        pageSize: 100,
      });
      setAppointments(appts.data || []);

      const techs = await callTool('servicetitan_list_technicians', { active: true, pageSize: 50 });
      setTechnicians(techs.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getAppointmentsByTech = (techId: number) => {
    return appointments.filter(a => a.technicianIds?.includes(techId));
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📅 Dispatch Board</h1>
        <p>Manage daily technician schedules</p>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '200px' }}
          />
          <button className="btn btn-primary" onClick={loadDispatchBoard}>Load Schedule</button>
        </div>

        {loading && <div className="loading">Loading dispatch board...</div>}
        {error && <div className="error">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Appointments</div>
            <div className="stat-value">{appointments.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Technicians</div>
            <div className="stat-value">{technicians.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Unassigned</div>
            <div className="stat-value">{appointments.filter(a => !a.technicianIds || a.technicianIds.length === 0).length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Scheduled</div>
            <div className="stat-value">{appointments.filter(a => a.status === 'Scheduled').length}</div>
          </div>
        </div>

        {technicians.map((tech) => {
          const techAppts = getAppointmentsByTech(tech.id);
          return (
            <Card key={tech.id}>
              <h3>{tech.name} <Badge>{techAppts.length} appointments</Badge></h3>
              {techAppts.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Job</th>
                      <th>Status</th>
                      <th>Appointment #</th>
                    </tr>
                  </thead>
                  <tbody>
                    {techAppts.map((appt) => (
                      <tr key={appt.id}>
                        <td>{new Date(appt.start).toLocaleTimeString()} - {new Date(appt.end).toLocaleTimeString()}</td>
                        <td>Job #{appt.jobId}</td>
                        <td><Badge>{appt.status}</Badge></td>
                        <td>{appt.appointmentNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#9aa0a6' }}>No appointments scheduled</p>
              )}
            </Card>
          );
        })}

        {appointments.filter(a => !a.technicianIds || a.technicianIds.length === 0).length > 0 && (
          <Card>
            <h3>Unassigned Appointments <Badge variant="warning">{appointments.filter(a => !a.technicianIds || a.technicianIds.length === 0).length}</Badge></h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Appointment #</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(a => !a.technicianIds || a.technicianIds.length === 0).map((appt) => (
                  <tr key={appt.id}>
                    <td>{new Date(appt.start).toLocaleTimeString()} - {new Date(appt.end).toLocaleTimeString()}</td>
                    <td>Job #{appt.jobId}</td>
                    <td><Badge>{appt.status}</Badge></td>
                    <td>{appt.appointmentNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </Card>
    </div>
  );
}
