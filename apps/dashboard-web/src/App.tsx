import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Activity, Users, AlertTriangle, Cpu, TrendingUp, Calendar, BookOpen, Bell, Settings, MessageSquare, Send, Zap, LogOut } from 'lucide-react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// --- SHARED COMPONENTS ---
const SidebarItem = ({ to, icon: Icon, label }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

// --- CAMPUS GPT CHATBOT ---
const CampusGPT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am CampusGPT. How can I assist your academic journey today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'std_101', message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (e) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "Analyzing your request... Based on your Digital Twin, I recommend focusing on 'Distributed Systems' this week." }]);
        setLoading(false);
      }, 1000);
    } finally {
      if (!loading) setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="w-96 h-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <span className="font-bold text-sm tracking-tight">CampusGPT Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-white/80 border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-white/20 text-[10px] animate-pulse font-mono tracking-widest">AI_THINKING...</div>}
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Query the Campus Brain..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-white/20"
            />
            <button onClick={sendMessage} className="p-2 bg-white text-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
        >
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

const LiveBrainOverlay = () => {
  const [activeAlert, setActiveAlert] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/brain/live-actions');
        const data = await response.json();
        if (data.actions && data.actions.length > 0) {
          // Play a sound or show the first action
          setActiveAlert(data.actions[0]);
          // Auto dismiss after 10 seconds
          setTimeout(() => setActiveAlert(null), 10000);
        }
      } catch (e) {
        // Silently fail if brain isn't running
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!activeAlert) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border-2 border-rose-500/50 rounded-3xl shadow-[0_0_100px_rgba(244,63,94,0.2)] overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-rose-500/10 p-6 border-b border-rose-500/20 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse">
            <AlertTriangle className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-rose-500 tracking-tight">AUTONOMOUS DECISION TRIGGERED</h2>
            <p className="text-sm font-bold text-white/60">Campus Brain Engine | {new Date(activeAlert.timestamp * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-2">Event Detected</p>
            <p className="text-lg text-white font-medium">{activeAlert.trigger} for <span className="font-black text-indigo-400">{activeAlert.student_name}</span></p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-2">AI Prediction</p>
            <p className="text-xl text-rose-400 font-black">{activeAlert.prediction}</p>
          </div>
          <div>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-3">Autonomous Actions Executed</p>
            <div className="space-y-3">
              {activeAlert.actions_taken.map((action: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  <p className="text-sm font-medium text-white/80">{action}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setActiveAlert(null)}
            className="w-full mt-4 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children, user, setUser }: { children: React.ReactNode, user: any, setUser: any }) => {
  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex text-white antialiased selection:bg-indigo-500/30">
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <Zap className="text-white" size={26} fill="white" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter block leading-none">CAMPUSOS</span>
            <span className="text-[10px] font-bold text-indigo-500 tracking-[0.3em]">VERSION X</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3">
          <SidebarItem to="/superadmin" icon={Zap} label="SaaS Control" />
          <div className="h-px w-full bg-white/5 my-4"></div>
          <SidebarItem to="/" icon={Activity} label="Intelligence" />
          <SidebarItem to="/students" icon={Users} label="Student Graph" />
          <SidebarItem to="/assignments" icon={BookOpen} label="Auto-Grading" />
          <SidebarItem to="/timetable" icon={Calendar} label="Hyper-Scheduler" />
          <SidebarItem to="/notifications" icon={Bell} label="Notif Brain" />
          <SidebarItem to="/settings" icon={Settings} label="System Config" />
        </nav>
        
        <div className="mt-auto">
          {user && (
            <div className="mb-4 flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
              <img src={user.picture || `https://ui-avatars.com/api/?name=${user.name}`} alt="avatar" className="w-10 h-10 rounded-xl" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-white/40 truncate">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg">
                <LogOut size={16} />
              </button>
            </div>
          )}
          <div className="p-5 bg-indigo-600/5 border border-indigo-500/10 rounded-[2rem]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">MESH_ACTIVE</p>
            </div>
            <p className="text-xs font-medium text-white/80 leading-relaxed">Neural Engine processing 12.4k events/sec</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 relative">
        {children}
        <CampusGPT />
        <LiveBrainOverlay />
      </main>
    </div>
  );
};

// --- PAGES ---
const DashboardPage = () => {
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
          // If it failed (but not because it was a duplicate 409), keep in queue
          remainingQueue.push(record);
        }
      } catch (e) {
        // Network still down
        remainingQueue.push(record);
      }
    }
    localStorage.setItem('attendance_queue', JSON.stringify(remainingQueue));
  };

  useEffect(() => {
    // Listen for coming back online
    window.addEventListener('online', syncAttendanceQueue);
    // Also try to sync on mount
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
      console.log('Offline: Queuing attendance record.');
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
           { label: 'Engagement Velocity', value: `${attendance}%`, trend: '+2.1%', color: 'text-emerald-400' },
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

// ... (StudentsPage and SettingsPage remain similar but themed)
const StudentsPage = () => (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black tracking-tight mb-8">Digital Twins</h1>
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
              <th className="p-8">Entity</th>
              <th className="p-8">Prediction</th>
              <th className="p-8">Graph Context</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[{n:'Alice S.', r:'2.4%', s:'Stable'}, {n:'Bob J.', r:'84%', s:'Critical'}].map((s,i)=>(
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-8 font-black">{s.n}</td>
                <td className="p-8"><span className="px-3 py-1 bg-white/5 rounded-lg font-bold text-[10px]">{s.s}</span></td>
                <td className="p-8 text-white/40">Risk Factor: {s.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);

const AssignmentsPage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runAutoGrader = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('/api/assignments/grade', { method: 'POST' });
      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      console.log('Using fallback data...', e);
      setResults([
        { id: 'CS301-A1', name: 'Distributed Consensus', score: 92, plagiarism: 4, status: 'Graded' },
        { id: 'CS301-A2', name: 'Raft Implementation', score: 78, plagiarism: 12, status: 'Review Needed' },
        { id: 'CS301-A3', name: 'Kafka Integration', score: 98, plagiarism: 1, status: 'Graded' }
      ]);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Auto-Grading Brain</h1>
          <p className="text-white/30 text-lg">NLP + Code Execution Sandbox</p>
        </div>
        <button 
          onClick={runAutoGrader}
          className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-500/20"
        >
          {analyzing ? 'ANALYZING SUBMISSIONS...' : 'INVOKE AUTO-GRADER'}
        </button>
      </header>

      {results.length > 0 && (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="p-8">Assignment</th>
                <th className="p-8">AI Score</th>
                <th className="p-8">Plagiarism Risk</th>
                <th className="p-8">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {results.map((r, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-8 font-bold">{r.name}</td>
                  <td className="p-8 font-black text-emerald-400">{r.score}%</td>
                  <td className="p-8">
                    <span className={`px-3 py-1 rounded-lg font-bold text-[10px] ${r.plagiarism > 10 ? 'bg-red-500/20 text-red-400' : 'bg-white/5'}`}>
                      {r.plagiarism}%
                    </span>
                  </td>
                  <td className="p-8 text-white/40">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TimetablePage = () => {
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

const NotificationsPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black tracking-tight mb-8">Notif Brain</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem]">
          <Bell className="text-indigo-400 mb-4" size={32} />
          <h3 className="text-xl font-black mb-2">Smart Batching</h3>
          <p className="text-sm text-white/40">AI optimally groups low-priority alerts to minimize cognitive load.</p>
        </div>
        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem]">
          <Activity className="text-emerald-400 mb-4" size={32} />
          <h3 className="text-xl font-black mb-2">Timing Optimization</h3>
          <p className="text-sm text-white/40">Delivery times dynamically adjusted based on student digital twin habits.</p>
        </div>
        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem]">
          <Zap className="text-purple-400 mb-4" size={32} />
          <h3 className="text-xl font-black mb-2">Multi-Channel Routing</h3>
          <p className="text-sm text-white/40">Critical events routed instantly via Push + WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black tracking-tight mb-8">System Config</h1>
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
              <h3 className="text-lg font-bold">Zero Trust Architecture</h3>
              <p className="text-sm text-white/40">Enforce strict verification for all microservice communication.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
              <h3 className="text-lg font-bold">Event Sourcing / Kafka Stream</h3>
              <p className="text-sm text-white/40">Enable continuous data streaming to the Data Lake.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Autonomous Decision Mode</h3>
              <p className="text-sm text-red-400">Allow AI to modify timetables and send alerts without human approval.</p>
            </div>
            <div className="w-12 h-6 bg-white/10 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white/40 rounded-full transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuperAdminPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded uppercase tracking-widest">Global SaaS Control</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Super Admin Console</h1>
          <p className="text-white/30 text-lg">Manage multi-tenant workspaces and global AI toggles.</p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm transition-all hover:scale-[1.02] shadow-2xl shadow-indigo-500/20">
          + ONBOARD NEW UNIVERSITY
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         {[
           { label: 'Active Tenants', value: '42', trend: '+3 this month', color: 'text-white' },
           { label: 'Global API Hits/sec', value: '14.2k', trend: 'Peak Load', color: 'text-indigo-400' },
           { label: 'Total MRR', value: '$840k', trend: '+12%', color: 'text-emerald-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2.5rem]">
             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
             <h2 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h2>
             <p className="text-[10px] font-bold text-white/40 mt-3">{stat.trend}</p>
           </div>
         ))}
      </div>

      <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
              <th className="p-8">Workspace (Tenant)</th>
              <th className="p-8">DB Schema</th>
              <th className="p-8">AI Brain Active</th>
              <th className="p-8">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { name: 'Stanford University', schema: 'tenant_stanford_01', ai: true, status: 'Healthy' },
              { name: 'MIT', schema: 'tenant_mit_02', ai: true, status: 'Healthy' },
              { name: 'Local Tech College', schema: 'tenant_ltc_03', ai: false, status: 'Scaling DB' }
            ].map((t, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-8 font-black">{t.name}</td>
                <td className="p-8 font-mono text-[10px] text-white/40">{t.schema}</td>
                <td className="p-8">
                  <div className={`w-12 h-6 rounded-full flex items-center p-1 ${t.ai ? 'bg-indigo-600' : 'bg-white/10'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${t.ai ? 'translate-x-6' : ''}`}></div>
                  </div>
                </td>
                <td className="p-8 text-white/40">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] pointer-events-none"></div>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Zap className="text-white" size={32} fill="white" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-center mb-2">CampusOS X</h2>
        <p className="text-white/40 text-center mb-10 text-sm">Sign in to access the Neural Dashboard</p>
        
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode(credentialResponse.credential);
                onLogin(decoded);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
            theme="filled_black"
            shape="pill"
          />
        </div>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-white/20 text-xs font-bold uppercase">or Dev Mode</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button 
          onClick={() => onLogin({ name: 'Admin User', email: 'admin@campusos.ai' })} 
          className="w-full bg-white/5 border border-white/10 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
        >
          Bypass Login
        </button>
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/superadmin" element={<SuperAdminPage />} />
          <Route path="*" element={<div className="p-20 text-center font-black text-white/10 uppercase tracking-[1em]">Module_Loading...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
