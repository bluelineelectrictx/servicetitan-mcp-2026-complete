import React, { useState } from 'react';

interface Member {
  id: number;
  customer: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: string;
  renewalDate: string;
  monthlyFee: number;
  benefits: string[];
  servicesUsed: number;
  totalSavings: number;
  status: 'active' | 'expiring-soon' | 'expired';
}

export default function MembershipManager() {
  const [members] = useState<Member[]>([
    {
      id: 1,
      customer: 'John Smith',
      tier: 'Gold',
      joinDate: '2022-03-15',
      renewalDate: '2024-03-15',
      monthlyFee: 49.99,
      benefits: ['Priority Service', '15% Discount', 'Annual Inspection'],
      servicesUsed: 8,
      totalSavings: 850,
      status: 'active',
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      tier: 'Silver',
      joinDate: '2023-01-10',
      renewalDate: '2024-01-10',
      monthlyFee: 34.99,
      benefits: ['10% Discount', 'Seasonal Inspection'],
      servicesUsed: 5,
      totalSavings: 420,
      status: 'active',
    },
    {
      id: 3,
      customer: 'Mike Davis',
      tier: 'Platinum',
      joinDate: '2021-06-20',
      renewalDate: '2024-06-20',
      monthlyFee: 79.99,
      benefits: ['VIP Service', '20% Discount', 'Quarterly Inspections', 'Free Parts'],
      servicesUsed: 15,
      totalSavings: 2100,
      status: 'active',
    },
    {
      id: 4,
      customer: 'Emily Wilson',
      tier: 'Bronze',
      joinDate: '2023-09-05',
      renewalDate: '2024-02-28',
      monthlyFee: 24.99,
      benefits: ['5% Discount'],
      servicesUsed: 3,
      totalSavings: 150,
      status: 'expiring-soon',
    },
  ]);
  
  const [tierFilter, setTierFilter] = useState('all');
  
  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    expiringCount: members.filter(m => m.status === 'expiring-soon').length,
    monthlyRevenue: members.reduce((sum, m) => sum + (m.status === 'active' ? m.monthlyFee : 0), 0),
  };
  
  const filteredMembers = members.filter(member => {
    if (tierFilter !== 'all' && member.tier !== tierFilter) return false;
    return true;
  });
  
  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Gold': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Silver': return 'bg-slate-400/20 text-slate-300 border-slate-400/50';
      case 'Bronze': return 'bg-orange-700/20 text-orange-400 border-orange-700/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'expiring-soon': return 'bg-amber-500/20 text-amber-400';
      case 'expired': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">💎 Membership Manager</h1>
          <p className="text-gray-400">Manage customer memberships and benefits</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Members</div>
            <div className="text-3xl font-bold text-white">{stats.totalMembers}</div>
            <div className="text-green-400 text-sm mt-2">↑ 12%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Active Members</div>
            <div className="text-3xl font-bold text-green-400">{stats.activeMembers}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Expiring Soon</div>
            <div className="text-3xl font-bold text-amber-400">{stats.expiringCount}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Monthly Revenue</div>
            <div className="text-3xl font-bold text-green-400">${stats.monthlyRevenue.toFixed(2)}</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Tiers</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        
        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.customer}</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(member.tier)}`}>
                      {member.tier}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Monthly Fee</div>
                  <div className="text-green-400 font-bold text-xl">${member.monthlyFee}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Membership Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Join Date:</span>
                      <span className="text-white">{member.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Renewal:</span>
                      <span className="text-white">{member.renewalDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Usage & Savings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Services Used:</span>
                      <span className="text-blue-400 font-medium">{member.servicesUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Savings:</span>
                      <span className="text-green-400 font-medium">${member.totalSavings}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Benefits</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.benefits.map((benefit, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/30">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                  Renew
                </button>
                {member.tier !== 'Platinum' && (
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
