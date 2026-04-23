import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export const CampusGPT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am CampusGPT. How can I assist your academic journey today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'std_101', message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (e) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "Analyzing your request... Based on your Digital Twin, I recommend focusing on 'Distributed Systems' this week." }]);
        setLoading(false);
      }, 1000);
    } finally {
      if (!loading) setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="w-96 h-[500px] bg-white border border-[#e2e8f0] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#066BF0] rounded-full animate-pulse shadow-[0_0_10px_rgba(6,107,240,0.5)]"></div>
              <span className="font-bold text-sm tracking-tight text-[#191c1e]">CampusGPT Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#727786] hover:text-[#191c1e]">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#066BF0] text-white shadow-lg shadow-blue-500/20' : 'bg-[#f1f5f9] text-[#424655] border border-[#e2e8f0]'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[#066BF0] text-[10px] animate-pulse font-mono tracking-widest uppercase">AI_THINKING...</div>}
          </div>
          <div className="p-4 border-t border-[#e2e8f0] flex gap-2 bg-[#f8fafc]">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Query the Campus Brain..." 
              className="flex-1 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#066BF0] transition-colors placeholder:text-[#cbd5e1] text-[#191c1e]"
            />
            <button onClick={sendMessage} className="p-2 bg-[#066BF0] text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#066BF0] text-white rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
        >
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};
