import React from 'react';
import { Zap } from 'lucide-react';

export const LiveBrainFeed = ({ role, brainEvents }: { role: string, brainEvents: any[] }) => {
  const roleMessages: Record<string, (e: any) => string> = {
    student: (e) => `⚠️ Your AI Guide: ${e.prediction}`,
    instructor: (e) => `🧑‍🏫 Student Alert: ${e.student_name} — ${e.trigger}`,
    superadmin: (e) => `🌍 System Event: Dropout risk rising in tenant campus. ${e.prediction}`,
  };

  if (brainEvents.length === 0) return null;

  return (
    <div className="mb-10 space-y-4">
      <p className="text-[10px] text-[#727786] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.4)]"></span>
        LIVE BRAIN DECISIONS
      </p>
      {brainEvents.map((evt, i) => (
        <div key={i} className="p-6 bg-white border border-[#e2e8f0] rounded-3xl flex items-start gap-5 animate-in slide-in-from-top-2 duration-500 shadow-sm premium-shadow">
          <div className="w-10 h-10 bg-[#066BF0] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0 mt-0.5">
            <Zap className="text-white" size={18} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#191c1e] text-lg mb-2">
              {(roleMessages[role] || roleMessages['student'])(evt)}
            </p>
            <div className="flex flex-wrap gap-2">
              {evt.actions_taken?.map((a: string, j: number) => (
                <span key={j} className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[10px] text-[#727786] font-bold flex-shrink-0">
            {new Date(evt.timestamp * 1000).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};
