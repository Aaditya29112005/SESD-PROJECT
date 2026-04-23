import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Activity, Users, Calendar, BookOpen, Bell, Settings, Zap, LogOut, ShieldAlert } from 'lucide-react';
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
import { SignupPage } from './components/SignupPage';

// --- HOOKS ---
import { useBrainFeed } from './hooks/useBrainFeed';

// --- ACCESS CONTROL CONFIG ---
const ROLE_PERMISSIONS: Record<string, string[]> = {
  student: ['/', '/notifications'],
  instructor: ['/', '/analytics', '/students', '/assignments', '/timetable', '/notifications', '/settings'],
  superadmin: ['/', '/analytics', '/students', '/assignments', '/timetable', '/notifications', '/settings', '/superadmin']
};

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const location = useLocation();
  const allowedPaths = ROLE_PERMISSIONS[role] || [];
  
  const isAllowed = allowedPaths.some(path => 
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );

  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 mb-6 shadow-xl shadow-rose-600/10">
          <ShieldAlert size={40} />
        </div>
        <h2 className="text-3xl font-bold text-[#191c1e] mb-2 font-['Space_Grotesk']">Access Restricted</h2>
        <p className="text-[#727786] max-w-md mx-auto mb-8">
          Your institutional role ({role}) does not have permission to access the neural node at <span className="font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{location.pathname}</span>.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-[#066BF0] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

// --- DEMO ROLE SWITCHER (Restricted to Super Admin) ---
const DemoRoleSwitcher = ({ role, setRole }: { role: string, setRole: (r: string) => void }) => {
  if (role !== 'superadmin') return null;

  const roles = [
    { id: 'student', label: '🎓 Student', color: 'hover:bg-blue-50' },
    { id: 'instructor', label: '👨‍🏫 Instructor', color: 'hover:bg-blue-50' },
    { id: 'superadmin', label: '👑 Admin', color: 'hover:bg-blue-50' },
  ];
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-[#e2e8f0] rounded-2xl p-1 shadow-2xl">
      <span className="text-[9px] font-black text-[#727786] uppercase tracking-[0.3em] px-3">SIMULATOR</span>
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

  const allowedPaths = ROLE_PERMISSIONS[role] || [];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] antialiased selection:bg-blue-500/10 font-['Manrope']">
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
          {allowedPaths.includes('/superadmin') && <SidebarItem to="/superadmin" icon={Zap} label="SaaS Control" />}
          {allowedPaths.includes('/superadmin') && <div className="h-px w-full bg-white/5 my-4"></div>}
          
          <SidebarItem to="/" icon={Activity} label="My Dashboard" />
          
          {allowedPaths.includes('/students') && <SidebarItem to="/students" icon={Users} label="Student Graph" />}
          {allowedPaths.includes('/assignments') && <SidebarItem to="/assignments" icon={BookOpen} label="Auto-Grading" />}
          {allowedPaths.includes('/timetable') && <SidebarItem to="/timetable" icon={Calendar} label="Hyper-Scheduler" />}
          
          <SidebarItem to="/notifications" icon={Bell} label="Notif Brain" />
          
          {allowedPaths.includes('/settings') && <SidebarItem to="/settings" icon={Settings} label="System Config" />}
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
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const { brainEvents } = useBrainFeed();

  const handleAuth = (userData: any, selectedRole: string) => {
    setUser(userData);
    setRole(selectedRole);
  };

  if (!user) {
    return authView === 'login' ? (
      <LoginPage onLogin={handleAuth} onNavigateToSignup={() => setAuthView('signup')} />
    ) : (
      <SignupPage onSignup={handleAuth} onNavigateToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <Router>
      <Layout user={user} setUser={setUser} role={role} setRole={setRole}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute role={role}>
              <RoleAwareDashboard role={role} brainEvents={brainEvents} />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute role={role}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/students" element={
            <ProtectedRoute role={role}>
              <StudentsPage />
            </ProtectedRoute>
          } />
          <Route path="/assignments" element={
            <ProtectedRoute role={role}>
              <AssignmentsPage />
            </ProtectedRoute>
          } />
          <Route path="/timetable" element={
            <ProtectedRoute role={role}>
              <TimetablePage />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute role={role}>
              <NotificationsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute role={role}>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
