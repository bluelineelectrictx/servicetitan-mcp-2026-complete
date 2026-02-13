import React, { useState } from 'react';

interface Call {
  id: number;
  timestamp: string;
  caller: string;
  phone: string;
  duration: string;
  outcome: 'booked' | 'quoted' | 'voicemail' | 'missed' | 'transferred';
  source: string;
  estimatedValue?: number;
  notes?: string;
}

export default function CallTracking() {
  const [calls] = useState<Call[]>([
    { id: 1, timestamp: '2024-02-15 09:15 AM', caller: 'John Smith', phone: '(555) 123-4567', duration: '5:23', outcome: 'booked', source: 'Google Ads', estimatedValue: 850, notes: 'HVAC repair needed' },
    { id: 2, timestamp: '2024-02-15 09:45 AM', caller: 'Sarah Johnson', phone: '(555) 234-5678', duration: '3:12', outcome: 'quoted', source: 'Website', estimatedValue: 2500 },
    { id: 3, timestamp: '2024-02-15 10:20 AM', caller: 'Mike Davis', phone: '(555) 345-6789', duration: '0:45', outcome: 'voicemail', source: 'Referral' },
    { id: 4, timestamp: '2024-02-15 10:55 AM', caller: 'Emily Wilson', phone: '(555) 456-7890', duration: '7:30', outcome: 'booked', source: 'Facebook', estimatedValue: 1200 },
    { id: 5, timestamp: '2024-02-15 11:15 AM', caller: 'Robert Brown', phone: '(555) 567-8901', duration: '0:00', outcome: 'missed', source: 'Google Organic' },
    { id: 6, timestamp: '2024-02-15 11:45 AM', caller: 'Lisa Anderson', phone: '(555) 678-9012', duration: '4:05', outcome: 'transferred', source: 'Yelp', estimatedValue: 650 },
  ]);
  
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  
  const stats = {
    totalCalls: calls.length,
    booked: calls.filter(c => c.outcome === 'booked').length,
    quoted: calls.filter(c => c.outcome === 'quoted').length,
    missed: calls.filter(c => c.outcome === 'missed').length,
    totalValue: calls.reduce((sum, c) => sum + (c.estimatedValue || 0), 0),
    avgDuration: calls.reduce((sum, c) => sum + parseInt(c.duration.split(':')[0]) * 60 + parseInt(c.duration.split(':')[1]), 0) / calls.length / 60,
  };
  
  const conversionRate = ((stats.booked / stats.totalCalls) * 100).toFixed(1);
  
  const filteredCalls = calls.filter(call => {
    if (outcomeFilter !== 'all' && call.outcome !== outcomeFilter) return false;
    if (sourceFilter !== 'all' && call.source !== sourceFilter) return false;
    return true;
  });
  
  const getOutcomeColor = (outcome: string) => {
    switch(outcome) {
      case 'booked': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'quoted': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'voicemail': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'missed': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'transferred': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  const uniqueSources = Array.from(new Set(calls.map(c => c.source)));
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📞 Call Tracking</h1>
          <p className="text-gray-400">Monitor and analyze customer calls</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Calls</div>
            <div className="text-3xl font-bold text-white">{stats.totalCalls}</div>
            <div className="text-green-400 text-sm mt-2">Today</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Jobs Booked</div>
            <div className="text-3xl font-bold text-green-400">{stats.booked}</div>
            <div className="text-green-400 text-sm mt-2">{conversionRate}% conversion</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Estimated Value</div>
            <div className="text-3xl font-bold text-blue-400">${stats.totalValue.toLocaleString()}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Avg Duration</div>
            <div className="text-3xl font-bold text-purple-400">{stats.avgDuration.toFixed(1)} min</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Outcomes</option>
              <option value="booked">Booked</option>
              <option value="quoted">Quoted</option>
              <option value="voicemail">Voicemail</option>
              <option value="missed">Missed</option>
              <option value="transferred">Transferred</option>
            </select>
            
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              {uniqueSources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Calls Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Caller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Outcome</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Est. Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCalls.map((call) => (
                <tr key={call.id} className="hover:bg-[#0f172a] transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm text-gray-300">{call.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{call.caller}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{call.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{call.duration}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/30">
                      {call.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getOutcomeColor(call.outcome)}`}>
                      {call.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-green-400 font-medium">
                    {call.estimatedValue ? `$${call.estimatedValue.toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredCalls.length} of {calls.length} calls
        </div>
      </div>
    </div>
  );
}
