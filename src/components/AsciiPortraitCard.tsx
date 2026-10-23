import React, { useState } from 'react';
import AsciiImage from './AsciiImage';

interface AsciiPortraitCardProps {
  onOpenAbout: () => void;
}

export const AsciiPortraitCard: React.FC<AsciiPortraitCardProps> = ({ onOpenAbout }) => {
  const [charSize, setCharSize] = useState<number>(8.0);
  const [mode, setMode] = useState<'split' | 'full'>('split');

  const mask =
    mode === 'split'
      ? 'linear-gradient(to bottom, black 25%, transparent 100%)'
      : 'linear-gradient(to bottom, black 100%, black 100%)';

  const baseMask =
    mode === 'split'
      ? 'linear-gradient(to bottom, transparent 25%, black 100%)'
      : 'linear-gradient(to bottom, transparent 100%, transparent 100%)';

  return (
    <AsciiImage
      src="/assets/aistudio/pfp_18865b9f.jpg"
      width={400}
      height={480}
      charSize={charSize}
      mask={mask}
      baseMask={baseMask}
      className="relative w-full max-w-[390px] h-[480px] rounded-2xl border border-white/[0.1] bg-[#0d131f] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:shadow-red-950/25 group"
    >
      {/* Top glare reflection edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Subtle bottom vignette gradient to ensure footer UI readability */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090d15]/95 via-[#090d15]/60 to-transparent pointer-events-none" />

      {/* Card Content Overlay */}
      <div className="relative z-30 h-full flex flex-col justify-between p-5 select-none">
        {/* Top Badges / Mode Switcher */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mahin · Dhaka</span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-300 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setMode((m) => (m === 'split' ? 'full' : 'split'))}
              className="hover:text-white px-1.5 py-0.5 rounded transition-colors cursor-pointer"
              title="Toggle ASCII Split Transition"
            >
              {mode === 'split' ? 'ASCII ↔ Photo' : 'Full ASCII'}
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setCharSize((prev) => (prev <= 4 ? 10 : prev - 2))}
              className="hover:text-red-400 font-bold px-1 transition-colors cursor-pointer"
              title="Cycle character cell resolution"
            >
              {charSize}px
            </button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-4 bg-black/50 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/[0.08]">
          <span className="font-mono text-xs text-slate-300 tracking-wide">
            Photo, pixel style
          </span>

          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] text-xs font-mono text-slate-100 hover:text-white hover:border-white/35 hover:bg-white/[0.12] transition-all cursor-pointer group/btn"
          >
            <span>About me</span>
            <span className="text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all">
              →
            </span>
          </button>
        </div>
      </div>
    </AsciiImage>
  );
};

export default AsciiPortraitCard;
