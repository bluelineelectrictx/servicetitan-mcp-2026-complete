import React, { useState } from 'react';

interface LeadSource {
  name: string;
  leads: number;
  conversions: number;
  revenue: number;
  cost: number;
  conversionRate: number;
  roi: number;
}

export default function LeadSourceAnalytics() {
  const [sources] = useState<LeadSource[]>([
    { name: 'Google Ads', leads: 145, conversions: 68, revenue: 58400, cost: 12500, conversionRate: 46.9, roi: 367 },
    { name: 'Facebook Ads', leads: 98, conversions: 42, revenue: 35700, cost: 6800, conversionRate: 42.9, roi: 425 },
    { name: 'Google Organic', leads: 76, conversions: 38, revenue: 31200, cost: 0, conversionRate: 50.0, roi: Infinity },
    { name: 'Referrals', leads: 54, conversions: 45, revenue: 48900, cost: 0, conversionRate: 83.3, roi: Infinity },
    { name: 'Yelp', leads: 32, conversions: 18, revenue: 15300, cost: 800, conversionRate: 56.3, roi: 1813 },
    { name: 'Direct Mail', leads: 28, conversions: 12, revenue: 10200, cost: 4500, conversionRate: 42.9, roi: 127 },
    { name: 'Website', leads: 89, conversions: 51, revenue: 42800, cost: 2200, conversionRate: 57.3, roi: 1845 },
  ]);
  
  const [sortBy, setSortBy] = useState<'leads' | 'conversions' | 'revenue' | 'roi'>('revenue');
  
  const totalLeads = sources.reduce((sum, s) => sum + s.leads, 0);
  const totalConversions = sources.reduce((sum, s) => sum + s.conversions, 0);
  const totalRevenue = sources.reduce((sum, s) => sum + s.revenue, 0);
  const totalCost = sources.reduce((sum, s) => sum + s.cost, 0);
  const overallConversion = ((totalConversions / totalLeads) * 100).toFixed(1);
  const overallROI = totalCost > 0 ? (((totalRevenue - totalCost) / totalCost) * 100).toFixed(0) : 'N/A';
  
  const sortedSources = [...sources].sort((a, b) => {
    if (sortBy === 'roi') {
      const aROI = a.roi === Infinity ? 999999 : a.roi;
      const bROI = b.roi === Infinity ? 999999 : b.roi;
      return bROI - aROI;
    }
    return b[sortBy] - a[sortBy];
  });
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📈 Lead Source Analytics</h1>
          <p className="text-gray-400">Track marketing performance by lead source</p>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Leads</div>
            <div className="text-3xl font-bold text-white">{totalLeads}</div>
            <div className="text-green-400 text-sm mt-2">This month</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Conversions</div>
            <div className="text-3xl font-bold text-green-400">{totalConversions}</div>
            <div className="text-gray-400 text-sm mt-2">{overallConversion}% rate</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-blue-400">${totalRevenue.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">↑ 18%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Overall ROI</div>
            <div className="text-3xl font-bold text-purple-400">
              {typeof overallROI === 'number' ? `${overallROI}%` : overallROI}
            </div>
            <div className="text-gray-400 text-sm mt-2">Cost: ${totalCost.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex gap-4 items-center">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <div className="flex gap-2">
              {(['leads', 'conversions', 'revenue', 'roi'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    sortBy === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#0f172a] text-gray-400 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Lead Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {sortedSources.map((source, idx) => (
            <div key={idx} className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{source.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  source.conversionRate >= 50 ? 'bg-green-500/20 text-green-400' :
                  source.conversionRate >= 40 ? 'bg-blue-500/20 text-blue-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {source.conversionRate.toFixed(1)}% conversion
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Leads</div>
                  <div className="text-white font-bold text-2xl">{source.leads}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Conversions</div>
                  <div className="text-green-400 font-bold text-2xl">{source.conversions}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Revenue</div>
                  <div className="text-blue-400 font-bold text-lg">${source.revenue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Cost</div>
                  <div className="text-red-400 font-bold text-lg">
                    {source.cost > 0 ? `$${source.cost.toLocaleString()}` : 'Free'}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">ROI</span>
                  <span className="text-purple-400 font-bold text-xl">
                    {source.roi === Infinity ? '∞' : `${source.roi}%`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Detailed Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Performance Breakdown</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Source</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Leads</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Conversions</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Conv. Rate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedSources.map((source, idx) => (
                <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{source.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-300">{source.leads}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-400 font-medium">{source.conversions}</td>
                  <td className="px-6 py-4 text-sm text-right text-blue-400">{source.conversionRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-sm text-right text-green-400 font-bold">${source.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-red-400">
                    {source.cost > 0 ? `$${source.cost.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-purple-400 font-bold">
                    {source.roi === Infinity ? '∞' : `${source.roi}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
