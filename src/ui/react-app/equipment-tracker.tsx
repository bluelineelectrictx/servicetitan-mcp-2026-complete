import React, { useState } from 'react';

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  customer: string;
  location: string;
  installDate: string;
  lastService: string;
  nextService: string;
  warrantyExpires: string;
  status: 'active' | 'needs-service' | 'warranty-expiring' | 'retired';
}

export default function EquipmentTracker() {
  const [equipment] = useState<Equipment[]>([
    { id: 1, type: 'HVAC System', brand: 'Carrier', model: 'Infinity 20', serialNumber: 'CAR-2023-001', customer: 'John Smith', location: '123 Main St, Austin, TX', installDate: '2023-08-22', lastService: '2024-02-15', nextService: '2024-08-15', warrantyExpires: '2025-08-22', status: 'active' },
    { id: 2, type: 'Water Heater', brand: 'Rheem', model: 'Professional Classic', serialNumber: 'RHE-2022-045', customer: 'Sarah Johnson', location: '456 Oak Ave, Houston, TX', installDate: '2022-03-15', lastService: '2023-09-10', nextService: '2024-03-10', warrantyExpires: '2024-03-15', status: 'warranty-expiring' },
    { id: 3, type: 'Furnace', brand: 'Trane', model: 'XC95m', serialNumber: 'TRA-2023-112', customer: 'Mike Davis', location: '789 Pine St, Dallas, TX', installDate: '2023-11-05', lastService: '2024-01-20', nextService: '2024-05-05', warrantyExpires: '2026-11-05', status: 'active' },
    { id: 4, type: 'Heat Pump', brand: 'Lennox', model: 'XP25', serialNumber: 'LEN-2021-089', customer: 'Emily Wilson', location: '321 Elm St, Austin, TX', installDate: '2021-06-10', lastService: '2023-12-05', nextService: '2024-02-20', warrantyExpires: '2024-06-10', status: 'needs-service' },
  ]);
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEquipment = equipment.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchTerm && !item.customer.toLowerCase().includes(searchTerm.toLowerCase()) && !item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'needs-service': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'warranty-expiring': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'retired': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">⚙️ Equipment Tracker</h1>
          <p className="text-gray-400">Monitor and manage customer equipment</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Equipment</div>
            <div className="text-3xl font-bold text-white">{equipment.length}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Active</div>
            <div className="text-3xl font-bold text-green-400">
              {equipment.filter(e => e.status === 'active').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Needs Service</div>
            <div className="text-3xl font-bold text-amber-400">
              {equipment.filter(e => e.status === 'needs-service').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Warranty Expiring</div>
            <div className="text-3xl font-bold text-orange-400">
              {equipment.filter(e => e.status === 'warranty-expiring').length}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by customer or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="needs-service">Needs Service</option>
              <option value="warranty-expiring">Warranty Expiring</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
        
        {/* Equipment List */}
        <div className="space-y-4">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{item.type}</h3>
                  <p className="text-gray-400">{item.brand} {item.model}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Equipment Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Serial #:</span>
                      <span className="text-white">{item.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Installed:</span>
                      <span className="text-white">{item.installDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Customer</h4>
                  <div className="space-y-1 text-sm">
                    <div className="text-white">{item.customer}</div>
                    <div className="text-gray-400">{item.location}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Service Schedule</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Service:</span>
                      <span className="text-white">{item.lastService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Service:</span>
                      <span className="text-blue-400">{item.nextService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Warranty Until:</span>
                      <span className="text-amber-400">{item.warrantyExpires}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredEquipment.length} of {equipment.length} items
        </div>
      </div>
    </div>
  );
}
