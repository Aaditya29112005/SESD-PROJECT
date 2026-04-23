import React from 'react';

export const SettingsPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black tracking-tight mb-8">System Config</h1>
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
              <h3 className="text-lg font-bold">Zero Trust Architecture</h3>
              <p className="text-sm text-white/40">Enforce strict verification for all microservice communication.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
              <h3 className="text-lg font-bold">Event Sourcing / Kafka Stream</h3>
              <p className="text-sm text-white/40">Enable continuous data streaming to the Data Lake.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Autonomous Decision Mode</h3>
              <p className="text-sm text-red-400">Allow AI to modify timetables and send alerts without human approval.</p>
            </div>
            <div className="w-12 h-6 bg-white/10 rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
