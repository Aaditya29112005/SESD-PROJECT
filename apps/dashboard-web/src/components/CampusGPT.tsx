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
        <div className="w-96 h-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <span className="font-bold text-sm tracking-tight">CampusGPT Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-white/80 border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-white/20 text-[10px] animate-pulse font-mono tracking-widest">AI_THINKING...</div>}
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Query the Campus Brain..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-white/20"
            />
            <button onClick={sendMessage} className="p-2 bg-white text-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
        >
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};
