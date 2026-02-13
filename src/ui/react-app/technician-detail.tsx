import React, { useState } from 'react';

interface TechDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  certifications: string[];
  specialties: string[];
  stats: {
    jobsCompleted: number;
    avgRating: number;
    totalRevenue: number;
    efficiency: number;
  };
  schedule: Array<{
    date: string;
    jobs: Array<{
      jobNumber: string;
      customer: string;
      timeWindow: string;
      status: string;
    }>;
  }>;
}

export default function TechnicianDetail() {
  const [tech] = useState<TechDetail>({
    id: 1,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '(555) 987-6543',
    status: 'on-job',
    certifications: ['HVAC Certified', 'EPA 608 Universal', 'NATE Certified'],
    specialties: ['HVAC Systems', 'Heat Pumps', 'Air Quality'],
    stats: {
      jobsCompleted: 342,
      avgRating: 4.8,
      totalRevenue: 145600,
      efficiency: 92,
    },
    schedule: [
      {
        date: '2024-02-15',
        jobs: [
          { jobNumber: 'J-2024-001', customer: 'John Smith', timeWindow: '9:00 AM - 11:00 AM', status: 'in-progress' },
          { jobNumber: 'J-2024-004', customer: 'Emily Wilson', timeWindow: '1:00 PM - 3:00 PM', status: 'scheduled' },
          { jobNumber: 'J-2024-007', customer: 'James Martinez', timeWindow: '3:30 PM - 5:30 PM', status: 'scheduled' },
        ],
      },
      {
        date: '2024-02-16',
        jobs: [
          { jobNumber: 'J-2024-012', customer: 'Linda Davis', timeWindow: '8:00 AM - 10:00 AM', status: 'scheduled' },
          { jobNumber: 'J-2024-015', customer: 'Robert Taylor', timeWindow: '11:00 AM - 1:00 PM', status: 'scheduled' },
        ],
      },
    ],
  });
  
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'performance'>('overview');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'in-progress': return 'bg-amber-500/20 text-amber-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{tech.name}</h1>
              <p className="text-gray-400">Technician #{tech.id}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Assign Job
              </button>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            tech.status === 'available' ? 'bg-green-500/20 text-green-400' :
            tech.status === 'on-job' ? 'bg-blue-500/20 text-blue-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {tech.status.replace('-', ' ')}
          </span>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Jobs Completed</div>
            <div className="text-3xl font-bold text-white">{tech.stats.jobsCompleted}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Avg Rating</div>
            <div className="text-3xl font-bold text-amber-400">{tech.stats.avgRating} ⭐</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-green-400">${tech.stats.totalRevenue.toLocaleString()}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Efficiency</div>
            <div className="text-3xl font-bold text-purple-400">{tech.stats.efficiency}%</div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-700">
          <div className="flex gap-6">
            {(['overview', 'schedule', 'performance'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">{tech.email}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">{tech.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {tech.certifications.map((cert, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {tech.specialties.map((specialty, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/50">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {tech.schedule.map((day, idx) => (
              <div key={idx} className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">{day.date}</h3>
                <div className="space-y-3">
                  {day.jobs.map((job, jIdx) => (
                    <div key={jIdx} className="bg-[#0f172a] rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-blue-400 font-semibold mb-1">{job.jobNumber}</div>
                          <div className="text-white">{job.customer}</div>
                          <div className="text-sm text-gray-400 mt-1">⏰ {job.timeWindow}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Job Completion Rate</span>
                  <span className="text-white font-semibold">96%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Customer Satisfaction</span>
                  <span className="text-white font-semibold">94%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">On-Time Arrival</span>
                  <span className="text-white font-semibold">89%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '89%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
