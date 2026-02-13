import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function JobBoard() {
  const { callTool, loading, error } = useCallTool();
  const [jobs, setJobs] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadJobs();
  }, [statusFilter]);

  const loadJobs = async () => {
    try {
      const result = await callTool('servicetitan_list_jobs', {
        jobStatus: statusFilter || undefined,
        pageSize: 50,
      });
      setJobs(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      'InProgress': 'info',
      'Completed': 'success',
      'Cancelled': 'error',
      'OnHold': 'warning',
    };
    return variants[status] || 'default';
  };

  const filteredJobs = jobs.filter(job =>
    job.summary?.toLowerCase().includes(filter.toLowerCase()) ||
    job.jobNumber?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>🔧 Job Board</h1>
        <p>View and manage all service jobs</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Jobs</div>
          <div className="stat-value">{jobs.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Progress</div>
          <div className="stat-value">{jobs.filter(j => j.jobStatus === 'InProgress').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{jobs.filter(j => j.jobStatus === 'Completed').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">On Hold</div>
          <div className="stat-value">{jobs.filter(j => j.jobStatus === 'OnHold').length}</div>
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search jobs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Statuses</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="OnHold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading && <div className="loading">Loading jobs...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Job #</th>
              <th>Summary</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td><strong>{job.jobNumber}</strong></td>
                <td>{job.summary}</td>
                <td>Customer #{job.customerId}</td>
                <td><Badge variant={getStatusBadge(job.jobStatus)}>{job.jobStatus}</Badge></td>
                <td><Badge variant={job.priority === 'High' ? 'warning' : 'default'}>{job.priority}</Badge></td>
                <td>{new Date(job.createdOn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
