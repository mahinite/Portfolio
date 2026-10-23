import React, { useState } from 'react';
import { ASCII_PORTRAIT } from '../data/portfolioData';

interface AsciiPortraitCardProps {
  onOpenAbout: () => void;
}

export const AsciiPortraitCard: React.FC<AsciiPortraitCardProps> = ({ onOpenAbout }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 400);
  };

  return (
    <div
      onMouseEnter={handleGlitch}
      className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d131f]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-red-500/30 hover:shadow-red-950/20 group"
    >
      {/* Subtle top glare highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* ASCII art container */}
      <div className="relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] select-none overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute w-48 h-48 rounded-full bg-red-600/10 blur-3xl -z-10 group-hover:bg-red-600/20 transition-all duration-500" />

        <pre
          className={`font-mono text-[10px] sm:text-[11px] leading-[13px] sm:leading-[14px] text-red-400 font-semibold tracking-wider text-center transition-all duration-200 ${
            isGlitching ? 'scale-[1.02] text-red-300 filter blur-[0.4px]' : 'group-hover:text-red-300'
          }`}
          style={{
            textShadow: '0 0 10px rgba(239, 68, 68, 0.45)',
          }}
        >
          {ASCII_PORTRAIT}
        </pre>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-400 tracking-wide">
          Photo, pixel style
        </span>

        <button
          onClick={onOpenAbout}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-xs font-mono text-slate-200 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all cursor-pointer group/btn"
        >
          <span>About me</span>
          <span className="text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all">
            →
          </span>
        </button>
      </div>
    </div>
  );
};
