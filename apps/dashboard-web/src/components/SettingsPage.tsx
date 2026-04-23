import React from 'react';

export const SettingsPage = () => {
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-8 text-[#191c1e]">System Config</h1>
      <div className="bg-white border border-[#e2e8f0] rounded-3xl p-10 shadow-sm">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-6">
            <div>
              <h3 className="text-lg font-bold text-[#191c1e]">Zero Trust Architecture</h3>
              <p className="text-sm text-[#727786]">Enforce strict verification for all microservice communication.</p>
            </div>
            <div className="w-12 h-6 bg-[#066BF0] rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-6">
            <div>
              <h3 className="text-lg font-bold text-[#191c1e]">Event Sourcing / Kafka Stream</h3>
              <p className="text-sm text-[#727786]">Enable continuous data streaming to the Data Lake.</p>
            </div>
            <div className="w-12 h-6 bg-[#066BF0] rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-[#191c1e]">Autonomous Decision Mode</h3>
              <p className="text-sm text-rose-600 font-semibold">Allow AI to modify timetables and send alerts without human approval.</p>
            </div>
            <div className="w-12 h-6 bg-[#cbd5e1] rounded-full flex items-center p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
