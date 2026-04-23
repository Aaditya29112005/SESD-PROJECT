import React, { useState, useEffect } from 'react';
import { Zap, Calendar, AlertTriangle } from 'lucide-react';
import { LiveBrainFeed } from './LiveBrainFeed';

const DEMO_DATA: Record<string, any> = {
  student: {
    type: 'student', risk: 'HIGH',
    ai_message: 'You are falling behind ⚠️ — The AI has generated your recovery plan.',
    metrics: [
      { label: 'Current GPA', value: '2.8', color: 'text-rose-400' },
      { label: 'Attendance', value: '72%', color: 'text-rose-400' },
      { label: 'Assignments Due', value: '3', color: 'text-amber-400' },
      { label: 'Risk Score', value: '82%', color: 'text-rose-500' },
    ],
    today_plan: [
      { time: '10:00 AM', task: 'Complete Assignment 2 (30 min)' },
      { time: '02:00 PM', task: 'Attend Lecture: Distributed Systems' },
      { time: '10:00 PM', task: 'Best time for you to study (based on Digital Twin)' },
    ],
    ai_cards: [
      { title: 'Risk Alert', content: 'Probability of failing CS-301 is 82% without immediate intervention.', type: 'danger' },
      { title: 'Recommendation', content: "Complete the 'Raft Consensus' task to improve your score by 15%.", type: 'action', action: 'Start Now' },
    ],
  },
  instructor: {
    type: 'instructor',
    ai_message: 'Your AI Teaching Assistant is active. 3 students need your attention.',
    metrics: [
      { label: 'Avg Attendance', value: '88%', color: 'text-emerald-400' },
      { label: 'Assignments to Grade', value: '42', color: 'text-indigo-400' },
      { label: 'At-Risk Students', value: '3', color: 'text-rose-400' },
      { label: 'Course Health', value: 'Fair', color: 'text-amber-400' },
    ],
    at_risk_students: [
      { name: 'Alex Mercer (std_101)', issue: 'Missed 3 consecutive classes', action: 'Notify' },
    ],
    ai_cards: [
      { title: 'Anomaly Detected', content: 'Assignment 3 has a 70% drop rate. It may be too difficult.', type: 'warning', action: 'Extend Deadline' },
      { title: 'Action Needed', content: '3 students are predicted to fail. Schedule 1-on-1 sessions today.', type: 'danger', action: 'Schedule Session' },
    ],
  },
  superadmin: {
    type: 'superadmin',
    ai_message: 'Global SaaS Control is Nominal. 2 anomalies detected across tenants.',
    metrics: [
      { label: 'Active Tenants', value: '42', color: 'text-white' },
      { label: 'Total MRR', value: '$840k', color: 'text-emerald-400' },
      { label: 'Global API RPS', value: '14.2k', color: 'text-indigo-400' },
      { label: 'System Health', value: '99.9%', color: 'text-emerald-400' },
    ],
    ai_cards: [
      { title: 'System-wide Alert', content: 'Local Tech College (tenant_ltc_03) has a rising dropout risk above threshold.', type: 'warning', action: 'View Tenant' },
      { title: 'Simulation Ready', content: 'Engagement is dropping in 3 campuses. Run a What-If Simulation?', type: 'action', action: 'Run Simulation' },
    ],
  },
};

export const RoleAwareDashboard = ({ role, brainEvents }: { role: string, brainEvents: any[] }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/role-dashboard/', {
          headers: { 'role': role }
        });
        if (!response.ok) throw new Error('Backend unavailable');
        const data = await response.json();
        setDashboardData(data);
      } catch (e) {
        // Fallback to rich demo data
        setDashboardData(DEMO_DATA[role] || DEMO_DATA['student']);
      }
    };
    fetchDashboard();
  }, [role]);

  if (!dashboardData) return <div className="p-20 text-center animate-pulse text-xl font-black text-white/20 tracking-widest">LOADING AI BRAIN...</div>;

  return (
    <div className="p-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded uppercase tracking-widest">{role} VIEW</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-2">Personal AI Control Panel</h1>
        <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl inline-flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="text-white" size={20} />
          </div>
          <p className="text-white/90 text-lg font-bold">{dashboardData.ai_message}</p>
        </div>
      </header>

      {/* 🧠 LIVE BRAIN DECISIONS - embedded at top */}
      <LiveBrainFeed role={role} brainEvents={brainEvents} />

      {/* Dynamic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {dashboardData.metrics?.map((stat: any, i: number) => (
           <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/10 transition-colors">
             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
             <h2 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h2>
           </div>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6">AI Decisions & Insights</h2>
      
      {/* AI Card System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {dashboardData.ai_cards?.map((card: any, i: number) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border ${card.type === 'danger' ? 'bg-rose-500/5 border-rose-500/20' : card.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-indigo-500/5 border-indigo-500/20'} flex flex-col justify-between`}>
            <div>
              <h3 className={`text-xs font-black uppercase tracking-widest mb-4 ${card.type === 'danger' ? 'text-rose-400' : card.type === 'warning' ? 'text-amber-400' : 'text-indigo-400'}`}>{card.title}</h3>
              <p className="text-xl font-medium text-white/90 mb-8">{card.content}</p>
            </div>
            {card.action && (
              <button className={`self-start px-6 py-3 font-bold text-sm rounded-xl transition-transform hover:scale-105 shadow-xl ${card.type === 'danger' ? 'bg-rose-500 text-white shadow-rose-500/20' : card.type === 'warning' ? 'bg-amber-500 text-black shadow-amber-500/20' : 'bg-white text-black shadow-white/10'}`}>
                {card.action}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Role Specific Sections */}
      {role === 'student' && dashboardData.today_plan && (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl"><Calendar className="text-indigo-400" size={24} /></div>
            AI Daily Optimization Plan
          </h2>
          <div className="space-y-4">
            {dashboardData.today_plan.map((plan: any, i: number) => (
              <div key={i} className="flex items-center gap-6 p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="text-xs font-black text-indigo-400 tracking-wider w-24">{plan.time}</span>
                <p className="font-bold text-white/90 text-lg">{plan.task}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {role === 'instructor' && dashboardData.at_risk_students && (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <div className="p-2 bg-rose-500/20 rounded-xl"><AlertTriangle className="text-rose-400" size={24} /></div>
            At-Risk Students
          </h2>
          <div className="space-y-4">
            {dashboardData.at_risk_students.map((student: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-5 bg-rose-500/5 border border-rose-500/20 rounded-2xl hover:bg-rose-500/10 transition-colors">
                <div>
                  <p className="font-black text-lg">{student.name}</p>
                  <p className="text-sm font-bold text-rose-400 mt-1">{student.issue}</p>
                </div>
                <button className="px-6 py-3 bg-rose-500 text-white text-sm font-black rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20">
                  {student.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
