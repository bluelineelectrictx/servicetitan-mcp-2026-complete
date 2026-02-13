import React, { useState } from 'react';

interface Appointment {
  id: number;
  jobNumber: string;
  customer: string;
  technician: string;
  startTime: string;
  endTime: string;
  type: string;
  status: 'confirmed' | 'tentative' | 'completed';
}

export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-02-15');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  
  const [appointments] = useState<Appointment[]>([
    { id: 1, jobNumber: 'J-2024-001', customer: 'John Smith', technician: 'Mike Johnson', startTime: '09:00', endTime: '11:00', type: 'HVAC Maintenance', status: 'confirmed' },
    { id: 2, jobNumber: 'J-2024-002', customer: 'Sarah Johnson', technician: 'David Lee', startTime: '10:00', endTime: '12:00', type: 'Emergency Repair', status: 'confirmed' },
    { id: 3, jobNumber: 'J-2024-003', customer: 'Mike Davis', technician: 'Tom Wilson', startTime: '11:00', endTime: '13:00', type: 'Installation', status: 'completed' },
    { id: 4, jobNumber: 'J-2024-004', customer: 'Emily Wilson', technician: 'Chris Brown', startTime: '13:00', endTime: '15:00', type: 'Inspection', status: 'confirmed' },
    { id: 5, jobNumber: 'J-2024-005', customer: 'Robert Brown', technician: 'Mike Johnson', startTime: '14:00', endTime: '16:00', type: 'HVAC Repair', status: 'tentative' },
    { id: 6, jobNumber: 'J-2024-006', customer: 'Lisa Anderson', technician: 'David Lee', startTime: '15:00', endTime: '17:00', type: 'Maintenance', status: 'confirmed' },
  ]);
  
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8; // 8 AM to 6 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  const technicians = Array.from(new Set(appointments.map(a => a.technician)));
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-blue-500/20 border-blue-500 text-blue-400';
      case 'tentative': return 'bg-amber-500/20 border-amber-500 text-amber-400';
      case 'completed': return 'bg-green-500/20 border-green-500 text-green-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-400';
    }
  };
  
  const getAppointmentPosition = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    const top = (start - 8) * 80; // 80px per hour
    const height = (end - start) * 80;
    return { top, height };
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📅 Schedule Calendar</h1>
              <p className="text-gray-400">View and manage appointments</p>
            </div>
            <div className="flex gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#1e293b] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-2 bg-[#1e293b] rounded-lg p-1 border border-gray-700">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Week
                </button>
              </div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                + New Appointment
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Today's Appointments</div>
            <div className="text-3xl font-bold text-white">{appointments.length}</div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-blue-400">
              {appointments.filter(a => a.status === 'confirmed').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-400">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Technicians Active</div>
            <div className="text-3xl font-bold text-purple-400">{technicians.length}</div>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Schedule for {selectedDate}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="flex border-b border-gray-700 bg-[#0f172a]">
                <div className="w-20 p-3 border-r border-gray-700 text-xs font-medium text-gray-400">TIME</div>
                {technicians.map((tech, idx) => (
                  <div key={idx} className="flex-1 p-3 border-r border-gray-700 last:border-r-0">
                    <div className="text-sm font-medium text-white">{tech}</div>
                  </div>
                ))}
              </div>
              
              {/* Time Grid */}
              <div className="relative">
                {timeSlots.map((time, idx) => (
                  <div key={idx} className="flex border-b border-gray-700">
                    <div className="w-20 p-3 border-r border-gray-700 text-xs text-gray-400">{time}</div>
                    {technicians.map((tech, techIdx) => (
                      <div
                        key={techIdx}
                        className="flex-1 border-r border-gray-700 last:border-r-0 relative"
                        style={{ height: '80px' }}
                      >
                        {/* Render appointments for this tech and time slot */}
                        {appointments
                          .filter(apt => apt.technician === tech && apt.startTime.startsWith(time.split(':')[0]))
                          .map((apt) => {
                            const { height } = getAppointmentPosition(apt.startTime, apt.endTime);
                            return (
                              <div
                                key={apt.id}
                                className={`absolute left-1 right-1 rounded p-2 border-l-4 ${getStatusColor(apt.status)} cursor-pointer hover:opacity-80 transition-opacity`}
                                style={{ height: `${height - 4}px` }}
                              >
                                <div className="text-xs font-semibold mb-1">{apt.jobNumber}</div>
                                <div className="text-xs">{apt.customer}</div>
                                <div className="text-xs opacity-75">{apt.type}</div>
                                <div className="text-xs opacity-75">{apt.startTime} - {apt.endTime}</div>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/20 border-2 border-blue-500 rounded"></div>
            <span className="text-sm text-gray-400">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500/20 border-2 border-amber-500 rounded"></div>
            <span className="text-sm text-gray-400">Tentative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 border-2 border-green-500 rounded"></div>
            <span className="text-sm text-gray-400">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
