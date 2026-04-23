import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export const DashboardPage = () => {
  const [attendance, setAttendance] = useState(84.2);
  const [events, setEvents] = useState([
    { time: 'Just now', text: 'AI Brain optimized CS-301 Timetable', type: 'SYSTEM' },
    { time: '2m ago', text: 'Distributed trace logged for Auth Service', type: 'MESH' }
  ]);
  
  const syncAttendanceQueue = async () => {
    const queue = JSON.parse(localStorage.getItem('attendance_queue') || '[]');
    if (queue.length === 0) return;

    console.log(`Syncing ${queue.length} offline attendance records...`);
    const remainingQueue = [];

    for (const record of queue) {
      try {
        const response = await fetch('/api/attendance/check-in', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Idempotency-Key': record.idempotency_key
          },
          body: JSON.stringify(record.payload)
        });
        
        if (!response.ok && response.status !== 409) {
          remainingQueue.push(record);
        }
      } catch (e) {
        remainingQueue.push(record);
      }
    }
    localStorage.setItem('attendance_queue', JSON.stringify(remainingQueue));
  };

  useEffect(() => {
    window.addEventListener('online', syncAttendanceQueue);
    syncAttendanceQueue();
    return () => window.removeEventListener('online', syncAttendanceQueue);
  }, []);

  const recordAttendance = async () => {
    setAttendance(prev => Math.min(100, (prev + 0.5)));
    const newEvent = { time: 'Just now', text: 'AI Analyzing Student std_101 Check-in...', type: 'AI' };
    setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    
    const payload = { student_id: 'std_101', course_id: 'cs_301', latitude: 37.7749, longitude: -122.4194, device_id: 'iphone_15_PRO_MAX_XYZ' };
    const idempotencyKey = `checkin_std_101_${Date.now()}`;

    if (!navigator.onLine) {
      const queue = JSON.parse(localStorage.getItem('attendance_queue') || '[]');
      queue.push({ payload, idempotency_key: idempotencyKey });
      localStorage.setItem('attendance_queue', JSON.stringify(queue));
      setEvents(prev => [{ time: 'Just now', text: '📶 Offline: Check-in queued for sync.', type: 'SYSTEM' }, ...prev]);
      return;
    }

    try {
      const response = await fetch('/api/attendance/check-in', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify(payload)
      });
      
      if (response.status === 403) {
        setEvents(prev => [{ time: 'Just now', text: '🚨 FRAUD ALERT: Proxy attendance rejected.', type: 'SYSTEM' }, ...prev]);
        return;
      }

      setTimeout(() => {
        setEvents(prev => [{ time: 'Just now', text: '✅ Digital Twin updated. Risk Score: 2.1%', type: 'AI' }, ...prev]);
      }, 1500);
    } catch (e) {
      console.log("Mocking backend response...", e);
    }
  };

  const simulateMissedClass = async () => {
    const newEvent = { time: 'Just now', text: 'Student std_101 Missed CS-301 Class', type: 'SYSTEM' };
    setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    setAttendance(prev => Math.max(0, (prev - 5.0)));
    try {
      await fetch('/api/brain/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'CLASS_MISSED', student_id: 'std_101', data: {} })
      });
    } catch (e) {
      console.log("Brain not reachable...");
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-widest">Live System</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Neural Analytics</h1>
          <p className="text-white/30 text-lg">The autonomous digital nervous system is operational.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={simulateMissedClass} 
            className="group relative px-6 py-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl font-black text-sm transition-all hover:bg-rose-500/20 active:scale-95"
          >
            SIMULATE CLASS MISSED (x3 for Risk)
          </button>
          <button 
            onClick={recordAttendance} 
            className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/10"
          >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <span className="relative">SIMULATE CHECK-IN</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
         {[
           { label: 'Engagement Velocity', value: `${attendance.toFixed(1)}%`, trend: '+2.1%', color: 'text-emerald-400' },
           { label: 'Neural Mesh Load', value: '14%', trend: 'Stable', color: 'text-indigo-400' },
           { label: 'Active Predictions', value: '1,204', trend: 'Live', color: 'text-white' },
           { label: 'System Health', value: '99.9%', trend: 'Nominal', color: 'text-emerald-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/10 transition-all">
             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
             <h2 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h2>
             <p className="text-[10px] font-bold text-white/40 mt-3">{stat.trend}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px]"></div>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Activity className="text-indigo-500" size={24} />
            Predictive Pulse
          </h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 40, 90, 30].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-full hover:bg-indigo-500/50 transition-all cursor-crosshair group relative" style={{ height: `${h}%` }}>
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">{h}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-2xl font-black mb-8">Brain Feed</h2>
          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className="flex gap-4 group cursor-default">
                <div className={`w-1 h-12 rounded-full ${event.type === 'AI' ? 'bg-indigo-500' : 'bg-white/10'} group-hover:scale-y-110 transition-transform`}></div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{event.time}</p>
                  <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{event.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
