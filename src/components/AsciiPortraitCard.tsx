import React from 'react';
import AsciiImage from './AsciiImage';
import { useQuality } from '../hooks/useQuality';

interface AsciiPortraitCardProps {
  onOpenAbout: () => void;
}

export const AsciiPortraitCard: React.FC<AsciiPortraitCardProps> = ({ onOpenAbout }) => {
  const quality = useQuality();

  return (
    <AsciiImage
      src="/assets/aistudio/pfp_18865b9f.jpg"
      width={400}
      height={480}
      charSize={4}
      className="relative w-full max-w-[390px] h-[480px] rounded-2xl border border-white/[0.1] bg-[#0d131f] shadow-2xl transition-all duration-300 hover:border-red-500/40 hover:shadow-red-950/25 group"
    >
      {/* Top glare reflection edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Subtle bottom vignette gradient to ensure button readability */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090d15]/95 via-[#090d15]/50 to-transparent pointer-events-none" />

      {/* Card Content Overlay */}
      <div className="relative z-30 h-full flex flex-col justify-end p-5 select-none">
        {/* Bottom Row with About me button */}
        <div className="flex items-center justify-end">
          <button
            onClick={onOpenAbout}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-slate-100 hover:text-white hover:border-white/35 hover:bg-black/80 transition-all cursor-pointer group/btn shadow-lg ${
              quality === 'full' ? 'bg-black/60 backdrop-blur-md' : 'bg-black/75'
            }`}
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
