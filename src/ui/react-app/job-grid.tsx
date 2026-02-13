import React, { useState } from 'react';

interface Job {
  id: number;
  jobNumber: string;
  customer: string;
  status: string;
  type: string;
  revenue: number;
  date: string;
}

export default function JobGrid() {
  const [jobs] = useState<Job[]>([
    { id: 1, jobNumber: 'J-2024-001', customer: 'John Smith', status: 'scheduled', type: 'HVAC Maintenance', revenue: 350, date: '2024-02-15' },
    { id: 2, jobNumber: 'J-2024-002', customer: 'Sarah Johnson', status: 'in-progress', type: 'Emergency Repair', revenue: 850, date: '2024-02-14' },
    { id: 3, jobNumber: 'J-2024-003', customer: 'Mike Davis', status: 'completed', type: 'Installation', revenue: 2500, date: '2024-02-14' },
    { id: 4, jobNumber: 'J-2024-004', customer: 'Emily Wilson', status: 'scheduled', type: 'Inspection', revenue: 150, date: '2024-02-16' },
    { id: 5, jobNumber: 'J-2024-005', customer: 'Robert Brown', status: 'in-progress', type: 'HVAC Repair', revenue: 650, date: '2024-02-15' },
    { id: 6, jobNumber: 'J-2024-006', customer: 'Lisa Anderson', status: 'completed', type: 'Maintenance', revenue: 400, date: '2024-02-13' },
    { id: 7, jobNumber: 'J-2024-007', customer: 'James Martinez', status: 'scheduled', type: 'Water Heater Install', revenue: 1800, date: '2024-02-16' },
    { id: 8, jobNumber: 'J-2024-008', customer: 'Patricia Garcia', status: 'completed', type: 'Plumbing Repair', revenue: 450, date: '2024-02-13' },
  ]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'in-progress': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📋 Job Grid</h1>
            <p className="text-gray-400">Visual overview of all jobs</p>
          </div>
          
          <div className="flex gap-2 bg-[#1e293b] rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-blue-400 font-bold">{job.jobNumber}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                
                <h3 className="text-white font-semibold mb-2">{job.customer}</h3>
                <p className="text-gray-400 text-sm mb-4">{job.type}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-green-400 font-bold">${job.revenue.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">{job.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Job #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#0f172a] transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-blue-400">{job.jobNumber}</td>
                    <td className="px-6 py-4 text-sm text-white">{job.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{job.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-green-400 font-medium">${job.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{job.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
