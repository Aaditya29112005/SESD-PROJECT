import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Users, AlertTriangle, Cpu, TrendingUp, Calendar, BookOpen, Bell, Settings, MessageSquare, Send, Zap } from 'lucide-react';

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
      const response = await fetch('http://localhost:4007/chat', { 
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

const Layout = ({ children }: { children: React.ReactNode }) => (
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
        <SidebarItem to="/" icon={Activity} label="Intelligence" />
        <SidebarItem to="/students" icon={Users} label="Student Graph" />
        <SidebarItem to="/assignments" icon={BookOpen} label="Auto-Grading" />
        <SidebarItem to="/timetable" icon={Calendar} label="Hyper-Scheduler" />
        <SidebarItem to="/notifications" icon={Bell} label="Notif Brain" />
        <SidebarItem to="/settings" icon={Settings} label="System Config" />
      </nav>
      
      <div className="mt-auto p-5 bg-indigo-600/5 border border-indigo-500/10 rounded-[2rem]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">MESH_ACTIVE</p>
        </div>
        <p className="text-xs font-medium text-white/80 leading-relaxed">Neural Engine processing 12.4k events/sec</p>
      </div>
    </aside>
    <main className="flex-1 relative">
      {children}
      <CampusGPT />
    </main>
  </div>
);

// --- PAGES ---
const DashboardPage = () => {
  const [attendance, setAttendance] = useState(84.2);
  const [events, setEvents] = useState([
    { time: 'Just now', text: 'AI Brain optimized CS-301 Timetable', type: 'SYSTEM' },
    { time: '2m ago', text: 'Distributed trace logged for Auth Service', type: 'MESH' }
  ]);
  
  const recordAttendance = async () => {
    // 1. FRONTEND: Update UI instantly (Optimistic)
    setAttendance(prev => Math.min(100, (prev + 0.5)));
    
    // 2. AI SIMULATION: Add "Brain Thinking" event
    const newEvent = { time: 'Just now', text: 'AI Analyzing Student std_101 Check-in...', type: 'AI' };
    setEvents(prev => [newEvent, ...prev.slice(0, 4)]);

    // 3. BACKEND: Hit the real microservice
    try {
      await fetch('http://localhost:4002/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: 'std_101', course_id: 'cs_301', latitude: 37.77, longitude: -122.41, device_id: 'iphone_15' })
      });
      
      // 4. AI FEEDBACK: Brain returns result after Kafka processing
      setTimeout(() => {
        setEvents(prev => [{ time: 'Just now', text: '✅ Digital Twin updated. Risk Score: 2.1%', type: 'AI' }, ...prev]);
      }, 1500);

    } catch (e) {
      console.log("Mocking backend response...");
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
        <button 
          onClick={recordAttendance} 
          className="group relative px-8 py-4 bg-white text-black rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/10"
        >
          <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <span className="relative">SIMULATE CAMPUS EVENT</span>
        </button>
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="*" element={<div className="p-20 text-center font-black text-white/10 uppercase tracking-[1em]">Module_Loading...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
