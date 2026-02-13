import React, { useState } from 'react';

interface Technician {
  id: number;
  name: string;
  status: string;
  jobsToday: number;
  jobsCompleted: number;
  revenue: number;
  efficiency: number;
  location: string;
  currentJob?: string;
}

export default function TechnicianDashboard() {
  const [technicians] = useState<Technician[]>([
    { id: 1, name: 'Mike Johnson', status: 'on-job', jobsToday: 5, jobsCompleted: 3, revenue: 1850, efficiency: 92, location: 'Austin, TX', currentJob: 'J-2024-001' },
    { id: 2, name: 'David Lee', status: 'available', jobsToday: 4, jobsCompleted: 4, revenue: 2100, efficiency: 95, location: 'Houston, TX' },
    { id: 3, name: 'Tom Wilson', status: 'on-job', jobsToday: 6, jobsCompleted: 4, revenue: 3200, efficiency: 88, location: 'Dallas, TX', currentJob: 'J-2024-003' },
    { id: 4, name: 'Chris Brown', status: 'break', jobsToday: 3, jobsCompleted: 2, revenue: 950, efficiency: 85, location: 'Austin, TX' },
    { id: 5, name: 'Sarah Martinez', status: 'available', jobsToday: 5, jobsCompleted: 5, revenue: 2450, efficiency: 97, location: 'San Antonio, TX' },
  ]);
  
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'efficiency'>('revenue');
  
  const totalRevenue = technicians.reduce((sum, t) => sum + t.revenue, 0);
  const avgEfficiency = technicians.reduce((sum, t) => sum + t.efficiency, 0) / technicians.length;
  const totalJobs = technicians.reduce((sum, t) => sum + t.jobsCompleted, 0);
  
  const sortedTechnicians = [...technicians].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'efficiency') return b.efficiency - a.efficiency;
    return 0;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-500/20 text-green-400';
      case 'on-job': return 'bg-blue-500/20 text-blue-400';
      case 'break': return 'bg-amber-500/20 text-amber-400';
      case 'offline': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">👷 Technician Dashboard</h1>
          <p className="text-gray-400">Monitor technician performance and availability</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">${totalRevenue.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">Today</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Jobs Completed</div>
            <div className="text-3xl font-bold text-blue-400">{totalJobs}</div>
            <div className="text-green-400 text-sm mt-2">↑ 15%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Avg Efficiency</div>
            <div className="text-3xl font-bold text-purple-400">{avgEfficiency.toFixed(0)}%</div>
            <div className="text-green-400 text-sm mt-2">↑ 3%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Active Techs</div>
            <div className="text-3xl font-bold text-white">{technicians.filter(t => t.status !== 'offline').length}</div>
            <div className="text-gray-400 text-sm mt-2">of {technicians.length}</div>
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex gap-4 items-center">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <div className="flex gap-2">
              {(['name', 'revenue', 'efficiency'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    sortBy === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#0f172a] text-gray-400 hover:text-white'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Technician Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.status)}`}>
                  {tech.status}
                </span>
              </div>
              
              {tech.currentJob && (
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                  <div className="text-xs text-gray-400 mb-1">Current Job</div>
                  <div className="text-blue-400 font-medium">{tech.currentJob}</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Today's Jobs</div>
                  <div className="text-white font-bold text-lg">{tech.jobsCompleted}/{tech.jobsToday}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Revenue</div>
                  <div className="text-green-400 font-bold text-lg">${tech.revenue.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Efficiency</span>
                  <span className="text-white font-semibold">{tech.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      tech.efficiency >= 90 ? 'bg-green-500' :
                      tech.efficiency >= 80 ? 'bg-blue-500' :
                      'bg-amber-500'
                    }`}
                    style={{ width: `${tech.efficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
