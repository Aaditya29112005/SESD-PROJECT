import React from 'react';
import { Bell, Activity, Zap } from 'lucide-react';

export const NotificationsPage = () => {
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
