import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SidebarItem = ({ to, icon: Icon, label }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};
