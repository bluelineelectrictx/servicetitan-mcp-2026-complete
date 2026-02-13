import React, { useState } from 'react';

interface RevenueData {
  period: string;
  revenue: number;
  jobs: number;
  avgTicket: number;
}

export default function RevenueDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  const [monthlyData] = useState<RevenueData[]>([
    { period: 'Jan', revenue: 145000, jobs: 156, avgTicket: 929 },
    { period: 'Feb', revenue: 168000, jobs: 178, avgTicket: 944 },
    { period: 'Mar', revenue: 152000, jobs: 165, avgTicket: 921 },
    { period: 'Apr', revenue: 178000, jobs: 189, avgTicket: 942 },
    { period: 'May', revenue: 195000, jobs: 205, avgTicket: 951 },
    { period: 'Jun', revenue: 210000, jobs: 225, avgTicket: 933 },
  ]);
  
  const currentMonth = monthlyData[monthlyData.length - 1];
  const lastMonth = monthlyData[monthlyData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100).toFixed(1);
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalJobs = monthlyData.reduce((sum, d) => sum + d.jobs, 0);
  const avgTicket = totalRevenue / totalJobs;
  
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">💵 Revenue Dashboard</h1>
              <p className="text-gray-400">Track financial performance and trends</p>
            </div>
            <div className="flex gap-2 bg-[#1e293b] rounded-lg p-1 border border-gray-700">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md transition-colors capitalize ${
                    timeRange === range ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Revenue (YTD)</div>
            <div className="text-3xl font-bold text-green-400">${totalRevenue.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">↑ {revenueGrowth}% vs last month</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">This Month</div>
            <div className="text-3xl font-bold text-white">${currentMonth.revenue.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2">↑ ${(currentMonth.revenue - lastMonth.revenue).toLocaleString()}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Jobs</div>
            <div className="text-3xl font-bold text-blue-400">{totalJobs}</div>
            <div className="text-green-400 text-sm mt-2">↑ 8%</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Avg Ticket</div>
            <div className="text-3xl font-bold text-purple-400">${Math.round(avgTicket)}</div>
            <div className="text-green-400 text-sm mt-2">↑ 2%</div>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyData.map((data, idx) => {
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full relative group">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all hover:from-blue-500 hover:to-blue-300"
                      style={{ height: `${height * 2.4}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0f172a] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${data.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-400">{data.period}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Breakdown Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Period</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Jobs</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Avg Ticket</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {monthlyData.map((data, idx) => {
                const prevData = idx > 0 ? monthlyData[idx - 1] : null;
                const growth = prevData ? ((data.revenue - prevData.revenue) / prevData.revenue * 100).toFixed(1) : '0.0';
                
                return (
                  <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{data.period}</td>
                    <td className="px-6 py-4 text-sm text-right text-green-400 font-bold">
                      ${data.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-blue-400">{data.jobs}</td>
                    <td className="px-6 py-4 text-sm text-right text-purple-400">${data.avgTicket}</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <span className={parseFloat(growth) >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {parseFloat(growth) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(growth))}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
