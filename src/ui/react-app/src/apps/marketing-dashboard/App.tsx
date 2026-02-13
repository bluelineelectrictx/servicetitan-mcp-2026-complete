import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import '../../styles/common.css';

export default function MarketingDashboard() {
  const { callTool, loading, error } = useCallTool();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [campaignsData, leadsData] = await Promise.all([
        callTool('servicetitan_list_campaigns', { active: true, pageSize: 50 }),
        callTool('servicetitan_list_leads', { pageSize: 100 }),
      ]);
      setCampaigns(campaignsData.data || []);
      setLeads(leadsData.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📢 Marketing Dashboard</h1>
        <p>Track campaigns and lead generation</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Campaigns</div>
          <div className="stat-value">{campaigns.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Leads</div>
          <div className="stat-value">{leads.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Converted</div>
          <div className="stat-value">{leads.filter(l => l.convertedOn).length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Conversion Rate</div>
          <div className="stat-value">{leads.length > 0 ? ((leads.filter(l => l.convertedOn).length / leads.length) * 100).toFixed(1) : '0'}%</div>
        </div>
      </div>

      <Card>
        <h3>Active Campaigns</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Source</th>
              <th>Medium</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td><strong>{campaign.name}</strong></td>
                <td>{campaign.category}</td>
                <td>{campaign.source || '-'}</td>
                <td>{campaign.medium || '-'}</td>
                <td><Badge variant="success">Active</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h3>Recent Leads</h3>
        {loading && <div className="loading">Loading leads...</div>}
        {error && <div className="error">{error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Created</th>
              <th>Converted</th>
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, 20).map((lead) => (
              <tr key={lead.id}>
                <td>{lead.source}</td>
                <td>Customer #{lead.customerId || 'N/A'}</td>
                <td><Badge variant={lead.convertedOn ? 'success' : 'default'}>{lead.status}</Badge></td>
                <td>{new Date(lead.createdOn).toLocaleDateString()}</td>
                <td>{lead.convertedOn ? new Date(lead.convertedOn).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
