import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-70 bg-[#0e1422] border border-white/20 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 font-mono text-xs animate-slideUp">
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
      <span>{message}</span>
    </div>
  );
};
