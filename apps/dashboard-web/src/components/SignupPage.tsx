import React, { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, User, ShieldCheck, GraduationCap, School, ShieldCheck as Shield } from 'lucide-react';

interface SignupPageProps {
  onNavigateToLogin: () => void;
  onSignup: (userData: any, role: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToLogin, onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({ name, email, picture: '' }, selectedRole);
  };

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'instructor', label: 'Faculty', icon: School },
    { id: 'superadmin', label: 'Admin', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] antialiased font-['Manrope'] overflow-hidden">
      {/* Left Side: High-Impact Visual Area */}
      <section className="hidden lg:flex lg:w-5/12 relative items-center justify-center overflow-hidden bg-[#0054c0]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=2000" 
            alt="University Campus Life" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0054c0] via-[#0054c0]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-16 space-y-12">
          <div className="space-y-4">
             <h1 className="text-5xl font-bold text-white tracking-tight leading-tight font-['Space_Grotesk']">
               Elevate Academic <br/> Excellence.
             </h1>
             <p className="text-white/70 text-lg max-w-sm leading-relaxed">
               Join the intelligent ecosystem designed to streamline institutional management and student success in a unified cloud OS.
             </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex gap-4 items-start">
               <div className="p-2 bg-blue-400/20 rounded-xl text-blue-200">
                 <ShieldCheck size={24} />
               </div>
               <div>
                 <h3 className="text-white font-bold mb-1">Enterprise Security</h3>
                 <p className="text-white/50 text-sm">AES-256 encrypted institutional data storage.</p>
               </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex gap-4 items-start">
               <div className="p-2 bg-blue-400/20 rounded-xl text-blue-200">
                 <Zap size={24} />
               </div>
               <div>
                 <h3 className="text-white font-bold mb-1">Smart Integration</h3>
                 <p className="text-white/50 text-sm">Seamless connection with legacy campus systems.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Signup Form */}
      <main className="w-full lg:w-7/12 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative overflow-y-auto">
        <div className="w-full max-w-xl space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <header className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#066BF0] rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/10">
                  <Zap className="text-white" size={22} fill="white" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-[#191c1e] font-['Space_Grotesk'] uppercase">CampusOS</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#191c1e] mb-1 font-['Space_Grotesk']">Create Your Account</h2>
                <p className="text-[#727786] font-medium">Enter your details to join the CampusOS community.</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-6">
              <button className="text-[#727786] font-bold text-xs hover:text-[#191c1e] transition-colors">Help</button>
              <button className="text-[#727786] font-bold text-xs hover:text-[#191c1e] transition-colors">Support</button>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Dr. Alexander Wright"
                    className="w-full pl-14 pr-5 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="a.wright@university.edu"
                    className="w-full pl-14 pr-5 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Institutional Role</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center justify-center gap-3 py-4 rounded-xl border-2 transition-all font-bold text-sm ${
                      selectedRole === role.id 
                        ? 'border-[#066BF0] bg-blue-50 text-[#066BF0]' 
                        : 'border-[#f1f5f9] bg-white text-[#727786] hover:border-[#cbd5e1]'
                    }`}
                  >
                    <role.icon size={18} />
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-5 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#727786] uppercase tracking-[0.15em] ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#727786] group-focus-within:text-[#066BF0] transition-colors" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-5 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#066BF0] transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="terms" className="w-5 h-5 rounded border-[#e2e8f0] text-[#066BF0] focus:ring-[#066BF0]/20" required />
              <label htmlFor="terms" className="text-sm text-[#727786] font-medium">
                I agree to the <button type="button" className="text-[#066BF0] font-bold">Terms of Service</button> and <button type="button" className="text-[#066BF0] font-bold">Privacy Policy</button>.
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#066BF0] text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-[#727786] font-medium pt-4">
            Already have an account? <button onClick={onNavigateToLogin} className="text-[#066BF0] font-bold hover:underline">Log in</button>
          </p>

          <div className="flex justify-center gap-12 pt-8 border-t border-[#e2e8f0]">
             {[
               { icon: Lock, label: 'SSL SECURED' },
               { icon: Zap, label: 'ENCRYPTED DATA' },
               { icon: ShieldCheck, label: 'HIPAA COMPLIANT' }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-2 text-[#cbd5e1]">
                 <item.icon size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full p-8 flex justify-between items-center border-t border-[#f1f5f9] bg-white lg:hidden">
         <span className="text-xs font-bold text-[#cbd5e1]">© 2024 CAMPUSOS</span>
         <div className="flex gap-6">
           <button className="text-[10px] font-black text-[#cbd5e1] uppercase tracking-widest">Privacy</button>
           <button className="text-[10px] font-black text-[#cbd5e1] uppercase tracking-widest">Security</button>
         </div>
      </footer>
    </div>
  );
};
