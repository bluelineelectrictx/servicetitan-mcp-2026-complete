import React, { useState } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function ReportingDashboard() {
  const { callTool, loading, error } = useCallTool();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenueReport, setRevenueReport] = useState<any>(null);

  const loadReport = async () => {
    if (!startDate || !endDate) return;
    try {
      const result = await callTool('servicetitan_get_revenue_report', {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });
      setRevenueReport(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📊 Reporting Dashboard</h1>
        <p>Financial reports and analytics</p>
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
          <button className="btn btn-primary" onClick={loadReport}>Generate Report</button>
        </div>

        {loading && <div className="loading">Generating report...</div>}
        {error && <div className="error">{error}</div>}

        {revenueReport && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Revenue</div>
                <div className="stat-value">${revenueReport.totalRevenue?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Invoice Revenue</div>
                <div className="stat-value">${revenueReport.invoiceRevenue?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Payment Revenue</div>
                <div className="stat-value">${revenueReport.paymentRevenue?.toLocaleString() || '0'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Period</div>
                <div className="stat-value" style={{ fontSize: '16px' }}>{new Date(revenueReport.startDate).toLocaleDateString()} - {new Date(revenueReport.endDate).toLocaleDateString()}</div>
              </div>
            </div>

            {revenueReport.byBusinessUnit && (
              <>
                <h3>Revenue by Business Unit</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Business Unit</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueReport.byBusinessUnit.map((bu: any) => (
                      <tr key={bu.businessUnitId}>
                        <td><strong>{bu.businessUnitName}</strong></td>
                        <td>${bu.revenue?.toLocaleString() || '0'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {revenueReport.byJobType && (
              <>
                <h3 style={{ marginTop: '30px' }}>Revenue by Job Type</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Job Type</th>
                      <th>Job Count</th>
                      <th>Revenue</th>
                      <th>Avg Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueReport.byJobType.map((jt: any) => (
                      <tr key={jt.jobTypeId}>
                        <td><strong>{jt.jobTypeName}</strong></td>
                        <td>{jt.jobCount}</td>
                        <td>${jt.revenue?.toLocaleString() || '0'}</td>
                        <td>${((jt.revenue || 0) / (jt.jobCount || 1)).toFixed(2)}</td>
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
