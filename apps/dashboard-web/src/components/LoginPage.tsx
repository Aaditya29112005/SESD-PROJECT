import React, { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, GraduationCap, School } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface LoginPageProps {
  onLogin: (userData: any, role: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ 
      name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Demo User', 
      email: email || 'demo@university.edu',
      picture: ''
    }, selectedRole);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);
    onLogin({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    }, selectedRole);
  };

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'instructor', label: 'Instructor', icon: School, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'superadmin', label: 'Admin', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] antialiased font-['Manrope']">
      {/* Left Side: Visual Area */}
      <section className="hidden lg:flex lg:w-7/12 relative items-center justify-center overflow-hidden bg-[#0054c0]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
            alt="Campus" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0054c0] via-[#0054c0]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-12 max-w-2xl">
          <div className="mb-8">
            <span className="px-4 py-1 bg-white/10 text-white text-[10px] font-bold rounded-full border border-white/20 uppercase tracking-[0.2em] backdrop-blur-md">
              CampusOS Infinity
            </span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight tracking-tighter font-['Space_Grotesk']">
            Autonomous <br/> <span className="text-blue-200">Campus Intelligence</span>
          </h1>
          <p className="text-lg text-white/80 max-w-lg mb-10 leading-relaxed">
            The world's first AI-native operating system for higher education. Real-time neural mesh processing for institutional excellence.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
              <Zap className="text-blue-200 mb-4" size={24} fill="currentColor" />
              <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">Neural Decisions</h3>
              <p className="text-xs text-white/60">Autonomous AI agents managing student success graphs.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
              <div className="w-6 h-6 bg-blue-200/20 rounded flex items-center justify-center mb-4 text-blue-200">
                <Lock size={16} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">Zero Trust</h3>
              <p className="text-xs text-white/60">Secure microservice communication with event-sourcing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <main className="w-full lg:w-5/12 flex items-center justify-center p-8 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <header>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#066BF0] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                <Zap className="text-white" size={26} fill="white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#191c1e] font-['Space_Grotesk'] uppercase">CampusOS</span>
            </div>
            <h2 className="text-4xl font-bold text-[#191c1e] mb-2 tracking-tight font-['Space_Grotesk']">Welcome back</h2>
            <p className="text-[#727786] font-medium">Select your role and sign in to access the mesh.</p>
          </header>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  selectedRole === role.id 
                    ? `border-[#066BF0] ${role.bg} ${role.color} shadow-lg shadow-blue-500/10` 
                    : 'border-[#e2e8f0] bg-white text-[#727786] hover:border-[#cbd5e1]'
                }`}
              >
                <role.icon size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">{role.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#727786] uppercase tracking-widest ml-1" htmlFor="email">Institutional Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] focus:ring-4 focus:ring-blue-500/5 transition-all text-[#191c1e] text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-[#727786] uppercase tracking-widest" htmlFor="password">Password</label>
                <a href="#" className="text-[10px] font-bold text-[#066BF0] hover:underline uppercase tracking-widest">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] focus:ring-4 focus:ring-blue-500/5 transition-all text-[#191c1e] text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727786] hover:text-[#191c1e] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#066BF0] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-blue-500/20"
            >
              Access System
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2e8f0]"></div>
              </div>
              <span className="relative px-4 bg-white text-[10px] font-black text-[#cbd5e1] uppercase tracking-[0.2em]">Or use neural auth</span>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap
                theme="outline"
                shape="pill"
                width="100%"
              />
            </div>
          </div>

          <footer className="pt-6 border-t border-[#e2e8f0] text-center">
            <p className="text-xs text-[#727786] font-medium mb-4">
              Authorized access only. <a href="#" className="text-[#066BF0] font-bold hover:underline">Request access</a>
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-[10px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-[10px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest">Terms</a>
              <a href="#" className="text-[10px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest">Help</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
