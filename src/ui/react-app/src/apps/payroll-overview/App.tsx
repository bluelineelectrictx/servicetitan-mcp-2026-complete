import React, { useState } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function PayrollOverview() {
  const { callTool, loading, error } = useCallTool();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState<any>(null);

  const loadPayroll = async () => {
    if (!startDate || !endDate) return;
    try {
      const result = await callTool('servicetitan_get_payroll_summary', {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });
      setSummary(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>💵 Payroll Overview</h1>
        <p>Track technician payroll and commissions</p>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="date"
            className="input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            className="input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <button className="btn btn-primary" onClick={loadPayroll}>Load Payroll</button>
        </div>

        {loading && <div className="loading">Loading payroll data...</div>}
        {error && <div className="error">{error}</div>}

        {summary && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Payroll</div>
                <div className="stat-value">${summary.totalPayroll?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Commissions</div>
                <div className="stat-value">${summary.totalCommissions?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Hours</div>
                <div className="stat-value">{summary.totalHours?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Avg Hourly Rate</div>
                <div className="stat-value">${summary.avgHourlyRate?.toFixed(2) || '0.00'}</div>
              </div>
            </div>

            {summary.byTechnician && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Technician</th>
                    <th>Hours</th>
                    <th>Regular Pay</th>
                    <th>Commissions</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.byTechnician.map((tech: any) => (
                    <tr key={tech.technicianId}>
                      <td><strong>{tech.technicianName}</strong></td>
                      <td>{tech.hours}</td>
                      <td>${tech.regularPay?.toFixed(2) || '0.00'}</td>
                      <td>${tech.commissions?.toFixed(2) || '0.00'}</td>
                      <td><strong>${(tech.regularPay + tech.commissions)?.toFixed(2) || '0.00'}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
