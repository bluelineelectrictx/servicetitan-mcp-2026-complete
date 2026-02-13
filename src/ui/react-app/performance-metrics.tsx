import React, { useState } from 'react';

interface Metric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export default function PerformanceMetrics() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('month');
  
  const [metrics] = useState<Metric[]>([
    { name: 'Customer Satisfaction', value: 94, target: 90, unit: '%', trend: 'up', change: 3 },
    { name: 'First-Time Fix Rate', value: 87, target: 85, unit: '%', trend: 'up', change: 2 },
    { name: 'Avg Response Time', value: 45, target: 60, unit: 'min', trend: 'down', change: -5 },
    { name: 'Jobs Per Technician', value: 5.2, target: 5.0, unit: 'jobs', trend: 'up', change: 0.3 },
    { name: 'Revenue Per Job', value: 945, target: 900, unit: '$', trend: 'up', change: 45 },
    { name: 'Callback Rate', value: 8, target: 10, unit: '%', trend: 'down', change: -2 },
    { name: 'On-Time Arrival', value: 89, target: 90, unit: '%', trend: 'stable', change: 0 },
    { name: 'Technician Utilization', value: 82, target: 80, unit: '%', trend: 'up', change: 4 },
  ]);
  
  const getPerformanceColor = (value: number, target: number, unit: string) => {
    // For percentages and money, higher is better
    // For time/callbacks, lower is better
    if (unit === 'min' || unit.includes('Rate') && unit.includes('Callback')) {
      return value <= target ? 'text-green-400' : 'text-amber-400';
    }
    return value >= target ? 'text-green-400' : 'text-amber-400';
  };
  
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '→';
    }
  };
  
  const getTrendColor = (trend: string, unit: string) => {
    // For time and callback rates, down is good
    if (unit === 'min' || unit.includes('Callback')) {
      return trend === 'down' ? 'text-green-400' : trend === 'up' ? 'text-red-400' : 'text-gray-400';
    }
    // For everything else, up is good
    return trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📊 Performance Metrics</h1>
              <p className="text-gray-400">Monitor key business performance indicators</p>
            </div>
            <div className="flex gap-2 bg-[#1e293b] rounded-lg p-1 border border-gray-700">
              {(['today', 'week', 'month'] as const).map((range) => (
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
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Metrics On Target</div>
            <div className="text-3xl font-bold text-green-400">
              {metrics.filter(m => {
                if (m.unit === 'min' || m.name.includes('Callback')) {
                  return m.value <= m.target;
                }
                return m.value >= m.target;
              }).length}/{metrics.length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Improving Metrics</div>
            <div className="text-3xl font-bold text-blue-400">
              {metrics.filter(m => {
                if (m.unit === 'min' || m.name.includes('Callback')) {
                  return m.trend === 'down';
                }
                return m.trend === 'up';
              }).length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Needs Attention</div>
            <div className="text-3xl font-bold text-amber-400">
              {metrics.filter(m => {
                if (m.unit === 'min' || m.name.includes('Callback')) {
                  return m.value > m.target;
                }
                return m.value < m.target;
              }).length}
            </div>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
                <span className={`text-sm font-medium ${getTrendColor(metric.trend, metric.unit)}`}>
                  {getTrendIcon(metric.trend)} {Math.abs(metric.change)}{metric.unit === '%' ? '%' : ''}
                </span>
              </div>
              
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {metric.unit === '$' && '$'}
                    {metric.value}
                    {metric.unit !== '$' && metric.unit !== 'jobs' && metric.unit}
                  </div>
                  <div className="text-sm text-gray-400">
                    Target: {metric.unit === '$' && '$'}{metric.target}{metric.unit !== '$' && metric.unit !== 'jobs' && metric.unit}
                  </div>
                </div>
              </div>
              
              <div className="relative pt-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      (metric.unit === 'min' || metric.name.includes('Callback'))
                        ? (metric.value <= metric.target ? 'bg-green-500' : 'bg-amber-500')
                        : (metric.value >= metric.target ? 'bg-green-500' : 'bg-amber-500')
                    }`}
                    style={{
                      width: `${Math.min((metric.value / metric.target) * 100, 100)}%`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0</span>
                  <span>{metric.target}{metric.unit !== '$' && metric.unit !== 'jobs' && metric.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Performance Table */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Detailed Breakdown</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#0f172a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Metric</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Current</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Target</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Trend</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {metrics.map((metric, idx) => {
                const onTarget = (metric.unit === 'min' || metric.name.includes('Callback'))
                  ? metric.value <= metric.target
                  : metric.value >= metric.target;
                
                return (
                  <tr key={idx} className="hover:bg-[#0f172a] transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{metric.name}</td>
                    <td className="px-6 py-4 text-sm text-right font-bold text-white">
                      {metric.unit === '$' && '$'}{metric.value}{metric.unit !== '$' && metric.unit !== 'jobs' && metric.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-400">
                      {metric.unit === '$' && '$'}{metric.target}{metric.unit !== '$' && metric.unit !== 'jobs' && metric.unit}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${getTrendColor(metric.trend, metric.unit)}`}>
                      {getTrendIcon(metric.trend)} {Math.abs(metric.change)}{metric.unit === '%' ? '%' : ''}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        onTarget ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {onTarget ? 'On Target' : 'Below Target'}
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
