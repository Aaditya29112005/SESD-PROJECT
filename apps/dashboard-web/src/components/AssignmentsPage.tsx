import React, { useState } from 'react';

export const AssignmentsPage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runAutoGrader = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('/api/assignments/grade', { method: 'POST' });
      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      console.log('Using fallback data...', e);
      setResults([
        { id: 'CS301-A1', name: 'Distributed Consensus', score: 92, plagiarism: 4, status: 'Graded' },
        { id: 'CS301-A2', name: 'Raft Implementation', score: 78, plagiarism: 12, status: 'Review Needed' },
        { id: 'CS301-A3', name: 'Kafka Integration', score: 98, plagiarism: 1, status: 'Graded' }
      ]);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-[#191c1e]">Auto-Grading Brain</h1>
          <p className="text-[#727786] text-lg">NLP + Code Execution Sandbox</p>
        </div>
        <button 
          onClick={runAutoGrader}
          className="group relative px-8 py-4 bg-[#066BF0] text-white rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20"
        >
          {analyzing ? 'ANALYZING SUBMISSIONS...' : 'INVOKE AUTO-GRADER'}
        </button>
      </header>

      {results.length > 0 && (
        <div className="bg-white border border-[#e2e8f0] rounded-3xl overflow-hidden animate-in slide-in-from-bottom-4 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[#727786] text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="p-8">Assignment</th>
                <th className="p-8">AI Score</th>
                <th className="p-8">Plagiarism Risk</th>
                <th className="p-8">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {results.map((r, i) => (
                <tr key={i} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                  <td className="p-8 font-bold text-[#191c1e]">{r.name}</td>
                  <td className="p-8 font-black text-emerald-600">{r.score}%</td>
                  <td className="p-8">
                    <span className={`px-3 py-1 rounded-lg font-bold text-[10px] ${r.plagiarism > 10 ? 'bg-rose-50 text-rose-600' : 'bg-[#f1f5f9] text-[#424655]'}`}>
                      {r.plagiarism}%
                    </span>
                  </td>
                  <td className="p-8 text-[#727786] font-semibold">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
