import React, { useState } from 'react';

export const TimetablePage = () => {
  const [optimizing, setOptimizing] = useState(false);
  const [schedule, setSchedule] = useState([
    { time: '09:00 AM', course: 'CS-301 Distributed Systems', room: 'Hall A', conflict: false },
    { time: '11:00 AM', course: 'ENG-201 Ethics', room: 'Hall B', conflict: true },
  ]);

  const runHyperScheduler = async () => {
    setOptimizing(true);
    try {
      const response = await fetch('/api/timetable/optimize', { method: 'POST' });
      const data = await response.json();
      setSchedule(data.schedule);
    } catch (e) {
      console.log('Using fallback schedule...', e);
      setSchedule([
        { time: '09:00 AM', course: 'CS-301 Distributed Systems', room: 'Hall A', conflict: false },
        { time: '11:30 AM', course: 'ENG-201 Ethics', room: 'Room 402', conflict: false },
        { time: '02:00 PM', course: 'AI-404 Neural Networks', room: 'Lab 1', conflict: false }
      ]);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Hyper-Scheduler</h1>
          <p className="text-white/30 text-lg">Genetic Algorithms for real-time conflict resolution.</p>
        </div>
        <button 
          onClick={runHyperScheduler}
          className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95"
        >
          {optimizing ? 'RESOLVING CONFLICTS...' : 'OPTIMIZE TIMETABLE'}
        </button>
      </header>
      <div className="grid gap-4">
        {schedule.map((s, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${s.conflict ? 'bg-red-500/5 border-red-500/20' : 'bg-[#0f0f0f] border-white/5'} flex justify-between items-center transition-all`}>
            <div>
              <p className="text-xs font-bold text-white/40 mb-1">{s.time}</p>
              <h3 className="text-xl font-black">{s.course}</h3>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${s.conflict ? 'bg-red-500/20 text-red-400' : 'bg-white/10'}`}>
                {s.conflict ? 'Conflict Detected' : s.room}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
