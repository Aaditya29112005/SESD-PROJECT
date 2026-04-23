import React from 'react';
import { Bell, Activity, Zap } from 'lucide-react';

export const NotificationsPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-8 text-[#191c1e]">Notif Brain</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-[#e2e8f0] p-8 rounded-3xl shadow-sm hover:border-blue-500/20 transition-all">
          <Bell className="text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#191c1e]">Smart Batching</h3>
          <p className="text-sm text-[#727786]">AI optimally groups low-priority alerts to minimize cognitive load.</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] p-8 rounded-3xl shadow-sm hover:border-emerald-500/20 transition-all">
          <Activity className="text-emerald-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#191c1e]">Timing Optimization</h3>
          <p className="text-sm text-[#727786]">Delivery times dynamically adjusted based on student digital twin habits.</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] p-8 rounded-3xl shadow-sm hover:border-purple-500/20 transition-all">
          <Zap className="text-purple-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#191c1e]">Multi-Channel Routing</h3>
          <p className="text-sm text-[#727786]">Critical events routed instantly via Push + WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};
