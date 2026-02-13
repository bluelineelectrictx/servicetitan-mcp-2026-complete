import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function JobDetail() {
  const { callTool, loading, error } = useCallTool();
  const [jobId, setJobId] = useState('');
  const [job, setJob] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const loadJob = async () => {
    if (!jobId) return;
    try {
      const jobData = await callTool('servicetitan_get_job', { jobId: parseInt(jobId) });
      setJob(jobData);
      
      const appts = await callTool('servicetitan_list_job_appointments', { jobId: parseInt(jobId) });
      setAppointments(appts.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📋 Job Detail</h1>
        <p>View complete job information</p>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="number"
            className="input"
            placeholder="Enter Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={loadJob}>Load Job</button>
        </div>

        {loading && <div className="loading">Loading job...</div>}
        {error && <div className="error">{error}</div>}

        {job && (
          <>
            <h3>Job #{job.jobNumber}</h3>
            <div className="grid grid-2" style={{ marginTop: '20px' }}>
              <div>
                <strong>Summary:</strong> {job.summary}
              </div>
              <div>
                <strong>Status:</strong> <Badge>{job.jobStatus}</Badge>
              </div>
              <div>
                <strong>Priority:</strong> <Badge variant={job.priority === 'High' ? 'warning' : 'default'}>{job.priority}</Badge>
              </div>
              <div>
                <strong>Customer ID:</strong> {job.customerId}
              </div>
              <div>
                <strong>Location ID:</strong> {job.locationId}
              </div>
              <div>
                <strong>Business Unit:</strong> {job.businessUnitId}
              </div>
              <div>
                <strong>Created:</strong> {new Date(job.createdOn).toLocaleString()}
              </div>
              <div>
                <strong>Modified:</strong> {new Date(job.modifiedOn).toLocaleString()}
              </div>
            </div>

            {appointments.length > 0 && (
              <>
                <h3 style={{ marginTop: '30px' }}>Appointments</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Appointment #</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Status</th>
                      <th>Technicians</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt) => (
                      <tr key={appt.id}>
                        <td>{appt.appointmentNumber}</td>
                        <td>{new Date(appt.start).toLocaleString()}</td>
                        <td>{new Date(appt.end).toLocaleString()}</td>
                        <td><Badge>{appt.status}</Badge></td>
                        <td>{appt.technicianIds?.join(', ') || 'Unassigned'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
