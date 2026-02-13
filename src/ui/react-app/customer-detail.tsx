import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  membershipStatus: string;
  joinDate: string;
  lifetimeValue: number;
  jobsCompleted: number;
  jobs: Array<{
    jobNumber: string;
    type: string;
    date: string;
    amount: number;
    status: string;
  }>;
  equipment: Array<{
    type: string;
    brand: string;
    model: string;
    installDate: string;
    lastService: string;
  }>;
}

export default function CustomerDetail() {
  const [customer] = useState<Customer>({
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    membershipStatus: 'Gold',
    joinDate: '2022-03-15',
    lifetimeValue: 8450,
    jobsCompleted: 12,
    jobs: [
      { jobNumber: 'J-2024-001', type: 'HVAC Maintenance', date: '2024-02-15', amount: 350, status: 'completed' },
      { jobNumber: 'J-2023-145', type: 'Emergency Repair', date: '2023-12-10', amount: 850, status: 'completed' },
      { jobNumber: 'J-2023-089', type: 'Installation', date: '2023-08-22', amount: 4500, status: 'completed' },
    ],
    equipment: [
      { type: 'HVAC System', brand: 'Carrier', model: 'Infinity 20', installDate: '2023-08-22', lastService: '2024-02-15' },
      { type: 'Water Heater', brand: 'Rheem', model: 'Professional Classic', installDate: '2022-03-15', lastService: '2023-09-10' },
    ],
  });
  
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'equipment'>('overview');
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{customer.name}</h1>
              <p className="text-gray-400">Customer #{customer.id}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Edit Customer
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                New Job
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium border border-amber-500/50">
              {customer.membershipStatus} Member
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              {customer.jobsCompleted} Jobs Completed
            </span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Lifetime Value</div>
            <div className="text-3xl font-bold text-green-400">${customer.lifetimeValue.toLocaleString()}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Jobs Completed</div>
            <div className="text-3xl font-bold text-blue-400">{customer.jobsCompleted}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Member Since</div>
            <div className="text-3xl font-bold text-purple-400">{customer.joinDate}</div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-700">
          <div className="flex gap-6">
            {(['overview', 'jobs', 'equipment'] as const).map((tab) => (
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
                  <div className="text-white">{customer.email}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">{customer.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Service Address</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Address</div>
                  <div className="text-white">{customer.address}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">City, State ZIP</div>
                  <div className="text-white">{customer.city}, {customer.state} {customer.zip}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Job #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {customer.jobs.map((job, idx) => (
                  <tr key={idx} className="hover:bg-[#0f172a] transition-colors cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-blue-400">{job.jobNumber}</td>
                    <td className="px-6 py-4 text-sm text-white">{job.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{job.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-green-400 font-medium">${job.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.equipment.map((item, idx) => (
              <div key={idx} className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">{item.type}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Brand:</span>
                    <span className="text-white">{item.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white">{item.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Installed:</span>
                    <span className="text-white">{item.installDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Service:</span>
                    <span className="text-blue-400">{item.lastService}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
