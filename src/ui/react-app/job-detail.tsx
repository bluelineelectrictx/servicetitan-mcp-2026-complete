import React, { useState } from 'react';

interface JobDetail {
  id: number;
  jobNumber: string;
  status: string;
  priority: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  technician: {
    name: string;
    phone: string;
  };
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
  services: Array<{
    name: string;
    price: number;
    status: string;
  }>;
  materials: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  notes: Array<{
    timestamp: string;
    author: string;
    text: string;
  }>;
}

export default function JobDetail() {
  const [job] = useState<JobDetail>({
    id: 1,
    jobNumber: 'J-2024-001',
    status: 'in-progress',
    priority: 'high',
    customer: {
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
    },
    location: {
      address: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
    technician: {
      name: 'Mike Johnson',
      phone: '(555) 987-6543',
    },
    schedule: {
      date: '2024-02-15',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
    },
    services: [
      { name: 'HVAC System Inspection', price: 150, status: 'completed' },
      { name: 'Air Filter Replacement', price: 45, status: 'completed' },
      { name: 'Duct Cleaning', price: 350, status: 'in-progress' },
    ],
    materials: [
      { name: 'MERV 13 Air Filter', quantity: 2, price: 35 },
      { name: 'Cleaning Solution', quantity: 1, price: 25 },
    ],
    notes: [
      { timestamp: '2024-02-15 09:15 AM', author: 'Mike Johnson', text: 'Customer reported unusual noise from main unit' },
      { timestamp: '2024-02-15 09:30 AM', author: 'Mike Johnson', text: 'Found debris in air ducts, proceeding with cleaning' },
      { timestamp: '2024-02-15 10:00 AM', author: 'Mike Johnson', text: 'Replaced filters, system running smoothly' },
    ],
  });
  
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'materials' | 'notes'>('overview');
  
  const totalServices = job.services.reduce((sum, s) => sum + s.price, 0);
  const totalMaterials = job.materials.reduce((sum, m) => sum + (m.price * m.quantity), 0);
  const totalAmount = totalServices + totalMaterials;
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Job Details</h1>
              <p className="text-gray-400">{job.jobNumber}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Edit Job
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Complete Job
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
              {job.status.replace('-', ' ')}
            </span>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium border border-orange-500/50">
              {job.priority} priority
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-700">
          <div className="flex gap-6">
            {(['overview', 'services', 'materials', 'notes'] as const).map((tab) => (
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
            {/* Customer Info */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Name</div>
                  <div className="text-white font-medium">{job.customer.name}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">{job.customer.phone}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">{job.customer.email}</div>
                </div>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Service Location</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Address</div>
                  <div className="text-white font-medium">{job.location.address}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">City, State ZIP</div>
                  <div className="text-white">{job.location.city}, {job.location.state} {job.location.zip}</div>
                </div>
              </div>
            </div>
            
            {/* Technician Info */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Assigned Technician</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Name</div>
                  <div className="text-white font-medium">{job.technician.name}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">{job.technician.phone}</div>
                </div>
              </div>
            </div>
            
            {/* Schedule Info */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Schedule</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Date</div>
                  <div className="text-white font-medium">{job.schedule.date}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Time Window</div>
                  <div className="text-white">{job.schedule.startTime} - {job.schedule.endTime}</div>
                </div>
              </div>
            </div>
            
            {/* Financial Summary */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Financial Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Services Total:</span>
                  <span className="text-white font-medium">${totalServices.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Materials Total:</span>
                  <span className="text-white font-medium">${totalMaterials.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between">
                  <span className="text-white font-semibold">Total Amount:</span>
                  <span className="text-green-400 font-bold text-xl">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {job.services.map((service, idx) => (
                  <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                    <td className="px-6 py-4 text-white">{service.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-green-400 font-medium">${service.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0f172a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Material</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Unit Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {job.materials.map((material, idx) => (
                  <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                    <td className="px-6 py-4 text-white">{material.name}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{material.quantity}</td>
                    <td className="px-6 py-4 text-right text-gray-300">${material.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-green-400 font-medium">${(material.price * material.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {job.notes.map((note, idx) => (
              <div key={idx} className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-white">{note.author}</div>
                  <div className="text-sm text-gray-400">{note.timestamp}</div>
                </div>
                <p className="text-gray-300">{note.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
