import React from 'react';

export const StudentsPage = () => (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-black tracking-tight mb-8">Digital Twins</h1>
      <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
              <th className="p-8">Entity</th>
              <th className="p-8">Prediction</th>
              <th className="p-8">Graph Context</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[{n:'Alice S.', r:'2.4%', s:'Stable'}, {n:'Bob J.', r:'84%', s:'Critical'}].map((s,i)=>(
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-8 font-black">{s.n}</td>
                <td className="p-8"><span className="px-3 py-1 bg-white/5 rounded-lg font-bold text-[10px]">{s.s}</span></td>
                <td className="p-8 text-white/40">Risk Factor: {s.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
