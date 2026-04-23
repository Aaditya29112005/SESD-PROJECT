import React, { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, GraduationCap, School, HelpCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface LoginPageProps {
  onLogin: (userData: any, role: string) => void;
  onNavigateToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup }) => {
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
    { id: 'instructor', label: 'Faculty', icon: School, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'superadmin', label: 'Admin', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] antialiased font-['Manrope'] overflow-hidden">
      {/* Left Side: High-Impact Visual Area */}
      <section className="hidden lg:flex lg:w-7/12 relative items-center justify-center overflow-hidden bg-[#0054c0]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
            alt="Futuristic Glass Campus Building" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0054c0] via-[#0054c0]/70 to-transparent"></div>
        </div>
        
        {/* Floating Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="relative z-10 p-16 max-w-2xl">
          <div className="mb-10">
            <span className="px-5 py-1.5 bg-white/10 text-white text-[11px] font-black rounded-full border border-white/20 uppercase tracking-[0.3em] backdrop-blur-md">
              System v4.0
            </span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tighter font-['Space_Grotesk']">
            Welcome to the <br/> <span className="text-blue-200">Future of Learning</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-lg mb-12 leading-relaxed">
            Experience a unified operating system for higher education. Streamlined, intelligent, and designed for academic excellence.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all cursor-default">
              <div className="w-10 h-10 bg-blue-200/20 rounded-xl flex items-center justify-center mb-6 text-blue-200">
                <Zap size={22} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">Real-time Insights</h3>
              <p className="text-sm text-white/50 leading-relaxed">Data-driven decisions at every campus touchpoint.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all cursor-default">
              <div className="w-10 h-10 bg-blue-200/20 rounded-xl flex items-center justify-center mb-6 text-blue-200">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">Institutional Grade</h3>
              <p className="text-sm text-white/50 leading-relaxed">Secure access and privacy-first architecture.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">Connecting 500+ Institutions Worldwide</span>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <main className="w-full lg:w-5/12 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
        {/* Help Center Link */}
        <div className="absolute top-8 right-8">
          <button className="flex items-center gap-2 text-[#727786] hover:text-[#066BF0] transition-colors group">
            <HelpCircle size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Help Center</span>
          </button>
        </div>

        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#066BF0] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transition-transform hover:scale-105">
                <Zap className="text-white" size={30} fill="white" />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-[#191c1e] font-['Space_Grotesk'] uppercase">CampusOS</span>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-[#191c1e] mb-2 tracking-tight font-['Space_Grotesk']">Login to your account</h2>
              <p className="text-[#727786] text-lg font-medium">Welcome back! Please enter your details.</p>
            </div>
          </header>

          <form onSubmit={handleManualLogin} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Institutional Role</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                      selectedRole === role.id 
                        ? `border-[#066BF0] ${role.bg} ${role.color} shadow-lg shadow-blue-500/10` 
                        : 'border-[#f1f5f9] bg-white text-[#727786] hover:border-[#cbd5e1]'
                    }`}
                  >
                    <role.icon size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1" htmlFor="email">Institutional Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={20} />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-14 pr-5 py-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#066BF0] focus:ring-4 focus:ring-blue-500/5 transition-all text-[#191c1e] text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em]" htmlFor="password">Password</label>
                <a href="#" className="text-[11px] font-bold text-[#066BF0] hover:underline uppercase tracking-widest">Forgot Password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={20} />
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#066BF0] focus:ring-4 focus:ring-blue-500/5 transition-all text-[#191c1e] text-lg"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#727786] hover:text-[#191c1e] transition-colors"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="remember" className="w-6 h-6 rounded-lg border-[#e2e8f0] text-[#066BF0] focus:ring-[#066BF0]/20 transition-all cursor-pointer" />
              <label htmlFor="remember" className="text-[15px] text-[#727786] font-medium cursor-pointer select-none">Remember me for 30 days</label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#066BF0] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/20"
            >
              Sign In
              <ArrowRight size={22} />
            </button>
          </form>

          <div className="space-y-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2e8f0]"></div>
              </div>
              <span className="relative px-6 bg-white text-[11px] font-black text-[#cbd5e1] uppercase tracking-[0.2em]">Or continue with</span>
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

          <footer className="pt-10 border-t border-[#e2e8f0] space-y-8">
            <p className="text-center text-[#727786] font-medium">
              Don't have an institutional account? <br/>
              <button onClick={onNavigateToSignup} className="text-[#066BF0] font-bold hover:underline mt-1">Contact your administrator</button>
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-[11px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-[11px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest transition-colors">Terms of Service</a>
              <a href="#" className="text-[11px] font-bold text-[#cbd5e1] hover:text-[#727786] uppercase tracking-widest transition-colors">Institutional Access</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
