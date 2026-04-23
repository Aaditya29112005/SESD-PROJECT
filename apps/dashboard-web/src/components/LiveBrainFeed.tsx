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
      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
        LIVE BRAIN DECISIONS
      </p>
      {brainEvents.map((evt, i) => (
        <div key={i} className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl flex items-start gap-5 animate-in slide-in-from-top-2 duration-500">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30 flex-shrink-0 mt-0.5">
            <Zap className="text-white" size={18} />
          </div>
          <div className="flex-1">
            <p className="font-black text-white text-lg mb-2">
              {(roleMessages[role] || roleMessages['student'])(evt)}
            </p>
            <div className="flex flex-wrap gap-2">
              {evt.actions_taken?.map((a: string, j: number) => (
                <span key={j} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[10px] text-white/20 font-bold flex-shrink-0">
            {new Date(evt.timestamp * 1000).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};
