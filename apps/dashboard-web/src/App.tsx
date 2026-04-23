import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Activity, Users, Calendar, BookOpen, Bell, Settings, Zap, LogOut } from 'lucide-react';
import { googleLogout } from '@react-oauth/google';

// --- COMPONENTS ---
import { SidebarItem } from './components/SidebarItem';
import { CampusGPT } from './components/CampusGPT';
import { RoleAwareDashboard } from './components/RoleAwareDashboard';
import { DashboardPage } from './components/DashboardPage';
import { StudentsPage } from './components/StudentsPage';
import { AssignmentsPage } from './components/AssignmentsPage';
import { TimetablePage } from './components/TimetablePage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';

// --- HOOKS ---
import { useBrainFeed } from './hooks/useBrainFeed';

// --- DEMO ROLE SWITCHER (Visible in dev/demo mode) ---
const DemoRoleSwitcher = ({ role, setRole }: { role: string, setRole: (r: string) => void }) => {
  const roles = [
    { id: 'student', label: '🎓 Student', color: 'hover:bg-blue-50' },
    { id: 'instructor', label: '👨‍🏫 Instructor', color: 'hover:bg-blue-50' },
    { id: 'superadmin', label: '👑 Super Admin', color: 'hover:bg-blue-50' },
  ];
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-[#e2e8f0] rounded-2xl p-1 shadow-2xl">
      <span className="text-[9px] font-black text-[#727786] uppercase tracking-[0.3em] px-3">DEMO</span>
      {roles.map(r => (
        <button
          key={r.id}
          onClick={() => setRole(r.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            role === r.id
              ? 'bg-[#066BF0] text-white shadow-lg shadow-blue-500/20'
              : `text-[#424655] ${r.color}`
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};

const Layout = ({ children, user, setUser, role, setRole }: { children: React.ReactNode, user: any, setUser: any, role: string, setRole: (r: string) => void }) => {
  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] antialiased selection:bg-blue-500/10">
      <aside className="w-72 glass flex flex-col p-8 sticky top-0 h-screen z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#066BF0] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
            <Zap className="text-white" size={26} fill="white" />
          </div>
          <div>
            <span className="font-bold text-2xl tracking-tighter block leading-none text-white font-['Space_Grotesk'] uppercase">CAMPUSOS</span>
            <span className="text-[10px] font-black text-blue-400 tracking-[0.3em] font-['Space_Grotesk']">VERSION ∞</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3">
          {role === 'superadmin' && <SidebarItem to="/superadmin" icon={Zap} label="SaaS Control" />}
          {role === 'superadmin' && <div className="h-px w-full bg-white/5 my-4"></div>}
          <SidebarItem to="/" icon={Activity} label="My Dashboard" />
          {role !== 'student' && <SidebarItem to="/students" icon={Users} label="Student Graph" />}
          {role !== 'student' && <SidebarItem to="/assignments" icon={BookOpen} label="Auto-Grading" />}
          {role !== 'student' && <SidebarItem to="/timetable" icon={Calendar} label="Hyper-Scheduler" />}
          <SidebarItem to="/notifications" icon={Bell} label="Notif Brain" />
          {role !== 'student' && <SidebarItem to="/settings" icon={Settings} label="System Config" />}
        </nav>
        
        <div className="mt-auto">
          {user && (
            <div className="mb-4 flex items-center gap-3 p-3 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm">
              <img src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=066BF0&color=fff`} alt="avatar" className="w-10 h-10 rounded-xl" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate text-[#191c1e]">{user.name}</p>
                <p className="text-[10px] text-[#727786] font-bold uppercase tracking-widest truncate">{role}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-[#727786] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                <LogOut size={16} />
              </button>
            </div>
          )}
          <div className="p-5 bg-[#263040] rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              <p className="text-[9px] text-blue-300 font-black uppercase tracking-[0.2em]">MESH_ACTIVE</p>
            </div>
            <p className="text-[10px] font-medium text-white/60 leading-relaxed uppercase tracking-tighter">Neural Engine v4.2.1-stable</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 relative bg-white/50 overflow-y-auto">
        {children}
        <CampusGPT />
        <DemoRoleSwitcher role={role} setRole={setRole} />
      </main>
    </div>
  );
};

function App() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState('student');
  const { brainEvents } = useBrainFeed();

  const handleLogin = (userData: any, selectedRole: string) => {
    setUser(userData);
    setRole(selectedRole);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={user} setUser={setUser} role={role} setRole={setRole}>
        <Routes>
          <Route path="/" element={<RoleAwareDashboard role={role} brainEvents={brainEvents} />} />
          <Route path="/analytics" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
