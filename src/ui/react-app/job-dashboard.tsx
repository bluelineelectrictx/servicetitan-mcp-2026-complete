import React, { useState, useEffect } from 'react';

interface Job {
  id: number;
  jobNumber: string;
  customer: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'high' | 'normal' | 'low' | 'emergency';
  type: string;
  date: string;
  technician?: string;
  revenue?: number;
}

export default function JobDashboard() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, jobNumber: 'J-2024-001', customer: 'John Smith', status: 'scheduled', priority: 'normal', type: 'HVAC Maintenance', date: '2024-02-15', technician: 'Mike Johnson', revenue: 350 },
    { id: 2, jobNumber: 'J-2024-002', customer: 'Sarah Johnson', status: 'in-progress', priority: 'emergency', type: 'Emergency Repair', date: '2024-02-14', technician: 'David Lee', revenue: 850 },
    { id: 3, jobNumber: 'J-2024-003', customer: 'Mike Davis', status: 'completed', priority: 'normal', type: 'Installation', date: '2024-02-14', technician: 'Tom Wilson', revenue: 2500 },
    { id: 4, jobNumber: 'J-2024-004', customer: 'Emily Wilson', status: 'scheduled', priority: 'low', type: 'Inspection', date: '2024-02-16', technician: 'Chris Brown', revenue: 150 },
    { id: 5, jobNumber: 'J-2024-005', customer: 'Robert Brown', status: 'in-progress', priority: 'high', type: 'HVAC Repair', date: '2024-02-15', technician: 'Mike Johnson', revenue: 650 },
    { id: 6, jobNumber: 'J-2024-006', customer: 'Lisa Anderson', status: 'completed', priority: 'normal', type: 'Maintenance', date: '2024-02-13', technician: 'David Lee', revenue: 400 },
    { id: 7, jobNumber: 'J-2024-007', customer: 'James Martinez', status: 'scheduled', priority: 'high', type: 'Water Heater Install', date: '2024-02-16', technician: 'Tom Wilson', revenue: 1800 },
  ]);
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const stats = {
    total: jobs.length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    totalRevenue: jobs.reduce((sum, j) => sum + (j.revenue || 0), 0),
    avgRevenue: jobs.length > 0 ? jobs.reduce((sum, j) => sum + (j.revenue || 0), 0) / jobs.length : 0,
  };
  
  const filteredJobs = jobs.filter(job => {
    if (statusFilter !== 'all' && job.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && job.priority !== priorityFilter) return false;
    if (searchTerm && !job.customer.toLowerCase().includes(searchTerm.toLowerCase()) && !job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'in-progress': return 'bg-amber-500/20 text-amber-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'emergency': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'normal': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'low': return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📊 Job Dashboard</h1>
          <p className="text-gray-400">Monitor and manage all service jobs</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Jobs</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-green-400 text-sm mt-2">↑ 12% from last week</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Scheduled</div>
            <div className="text-3xl font-bold text-blue-400">{stats.scheduled}</div>
            <div className="text-green-400 text-sm mt-2">↑ 8%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">In Progress</div>
            <div className="text-3xl font-bold text-amber-400">{stats.inProgress}</div>
            <div className="text-gray-400 text-sm mt-2">Active now</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">↑ 15%</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search jobs or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        {/* Jobs Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Job #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Technician</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#0f172a] transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">{job.jobNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{job.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{job.technician}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">
                      ${job.revenue?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{job.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
