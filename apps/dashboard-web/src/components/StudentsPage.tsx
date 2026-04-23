import React from 'react';

export const StudentsPage = () => (
    <div className="p-12 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-8 text-[#191c1e]">Digital Twins</h1>
      <div className="bg-white border border-[#e2e8f0] rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[#727786] text-[10px] font-black uppercase tracking-[0.3em]">
              <th className="p-8">Entity</th>
              <th className="p-8">Prediction</th>
              <th className="p-8">Graph Context</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[{n:'Alice S.', r:'2.4%', s:'Stable'}, {n:'Bob J.', r:'84%', s:'Critical'}].map((s,i)=>(
              <tr key={i} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                <td className="p-8 font-bold text-[#191c1e]">{s.n}</td>
                <td className="p-8"><span className={`px-3 py-1 rounded-lg font-bold text-[10px] ${s.s === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{s.s}</span></td>
                <td className="p-8 text-[#727786]">Risk Factor: {s.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
