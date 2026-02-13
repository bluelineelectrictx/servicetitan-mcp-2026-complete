import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  membershipStatus: string;
  lifetimeValue: number;
  jobsCompleted: number;
  lastJobDate: string;
}

export default function CustomerGrid() {
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', city: 'Austin', state: 'TX', membershipStatus: 'Gold', lifetimeValue: 8450, jobsCompleted: 12, lastJobDate: '2024-02-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 234-5678', city: 'Houston', state: 'TX', membershipStatus: 'Silver', lifetimeValue: 4200, jobsCompleted: 7, lastJobDate: '2024-02-10' },
    { id: 3, name: 'Mike Davis', email: 'mike.d@email.com', phone: '(555) 345-6789', city: 'Dallas', state: 'TX', membershipStatus: 'Platinum', lifetimeValue: 15600, jobsCompleted: 23, lastJobDate: '2024-02-14' },
    { id: 4, name: 'Emily Wilson', email: 'emily.w@email.com', phone: '(555) 456-7890', city: 'San Antonio', state: 'TX', membershipStatus: 'Gold', lifetimeValue: 9800, jobsCompleted: 15, lastJobDate: '2024-02-12' },
    { id: 5, name: 'Robert Brown', email: 'robert.b@email.com', phone: '(555) 567-8901', city: 'Austin', state: 'TX', membershipStatus: 'Bronze', lifetimeValue: 2100, jobsCompleted: 4, lastJobDate: '2024-02-08' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '(555) 678-9012', city: 'Fort Worth', state: 'TX', membershipStatus: 'Silver', lifetimeValue: 5500, jobsCompleted: 9, lastJobDate: '2024-02-13' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('all');
  
  const filteredCustomers = customers.filter(customer => {
    if (membershipFilter !== 'all' && customer.membershipStatus !== membershipFilter) return false;
    if (searchTerm && !customer.name.toLowerCase().includes(searchTerm.toLowerCase()) && !customer.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  const getMembershipColor = (status: string) => {
    switch(status) {
      case 'Platinum': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Gold': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Silver': return 'bg-slate-400/20 text-slate-300 border-slate-400/50';
      case 'Bronze': return 'bg-orange-700/20 text-orange-400 border-orange-700/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">👥 Customer Grid</h1>
          <p className="text-gray-400">View and manage all customers</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Customers</div>
            <div className="text-3xl font-bold text-white">{customers.length}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Avg Lifetime Value</div>
            <div className="text-3xl font-bold text-green-400">
              ${Math.round(customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length).toLocaleString()}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Platinum Members</div>
            <div className="text-3xl font-bold text-purple-400">
              {customers.filter(c => c.membershipStatus === 'Platinum').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Gold Members</div>
            <div className="text-3xl font-bold text-amber-400">
              {customers.filter(c => c.membershipStatus === 'Gold').length}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            
            <select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Memberships</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
        </div>
        
        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getMembershipColor(customer.membershipStatus)}`}>
                  {customer.membershipStatus}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-2">📧</span>
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-2">📱</span>
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-2">📍</span>
                  {customer.city}, {customer.state}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Lifetime Value</div>
                  <div className="text-green-400 font-bold">${customer.lifetimeValue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Jobs Done</div>
                  <div className="text-blue-400 font-bold">{customer.jobsCompleted}</div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                Last job: {customer.lastJobDate}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>
    </div>
  );
}
