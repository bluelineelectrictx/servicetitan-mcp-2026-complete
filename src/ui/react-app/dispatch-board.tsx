import React, { useState } from 'react';

interface Technician {
  id: number;
  name: string;
  status: 'available' | 'on-job' | 'break' | 'offline';
  currentJob?: string;
  location: string;
}

interface Job {
  id: number;
  jobNumber: string;
  customer: string;
  address: string;
  timeWindow: string;
  priority: string;
  technicianId?: number;
  status: string;
}

export default function DispatchBoard() {
  const [technicians] = useState<Technician[]>([
    { id: 1, name: 'Mike Johnson', status: 'on-job', currentJob: 'J-2024-001', location: 'Austin, TX' },
    { id: 2, name: 'David Lee', status: 'available', location: 'Houston, TX' },
    { id: 3, name: 'Tom Wilson', status: 'on-job', currentJob: 'J-2024-003', location: 'Dallas, TX' },
    { id: 4, name: 'Chris Brown', status: 'break', location: 'Austin, TX' },
    { id: 5, name: 'Sarah Martinez', status: 'available', location: 'San Antonio, TX' },
  ]);
  
  const [unassignedJobs] = useState<Job[]>([
    { id: 1, jobNumber: 'J-2024-007', customer: 'James Martinez', address: '456 Oak Ave', timeWindow: '2:00 PM - 4:00 PM', priority: 'high', status: 'unassigned' },
    { id: 2, jobNumber: 'J-2024-008', customer: 'Patricia Garcia', address: '789 Pine St', timeWindow: '3:00 PM - 5:00 PM', priority: 'normal', status: 'unassigned' },
    { id: 3, jobNumber: 'J-2024-009', customer: 'Michael Rodriguez', address: '321 Elm St', timeWindow: '1:00 PM - 3:00 PM', priority: 'emergency', status: 'unassigned' },
  ]);
  
  const [selectedDate] = useState('2024-02-15');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'on-job': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'break': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'offline': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'emergency': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'normal': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">🚚 Dispatch Board</h1>
              <p className="text-gray-400">Manage technician assignments and schedules</p>
            </div>
            <div className="flex gap-3">
              <input
                type="date"
                value={selectedDate}
                className="bg-[#1e293b] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Auto-Assign
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Available Techs</div>
            <div className="text-3xl font-bold text-green-400">
              {technicians.filter(t => t.status === 'available').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">On Job</div>
            <div className="text-3xl font-bold text-blue-400">
              {technicians.filter(t => t.status === 'on-job').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Unassigned Jobs</div>
            <div className="text-3xl font-bold text-amber-400">{unassignedJobs.length}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Emergency Jobs</div>
            <div className="text-3xl font-bold text-red-400">
              {unassignedJobs.filter(j => j.priority === 'emergency').length}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technicians */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">👷 Technicians</h2>
            <div className="space-y-3">
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-[#1e293b] rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{tech.name}</h3>
                      <p className="text-sm text-gray-400">{tech.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tech.status)}`}>
                      {tech.status}
                    </span>
                  </div>
                  
                  {tech.currentJob && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="text-sm text-gray-400">Current Job:</div>
                      <div className="text-blue-400 font-medium">{tech.currentJob}</div>
                    </div>
                  )}
                  
                  {tech.status === 'available' && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                        Assign Job
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Unassigned Jobs */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">📋 Unassigned Jobs</h2>
            <div className="space-y-3">
              {unassignedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#1e293b] rounded-lg p-4 border border-gray-700 hover:border-amber-500 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-blue-400 font-semibold mb-1">{job.jobNumber}</div>
                      <h3 className="text-white font-medium">{job.customer}</h3>
                      <p className="text-sm text-gray-400">{job.address}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      ⏰ {job.timeWindow}
                    </div>
                    <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
