import React from 'react';

interface AsciiPortraitCardProps {
  onOpenAbout: () => void;
}

export const AsciiPortraitCard: React.FC<AsciiPortraitCardProps> = ({ onOpenAbout }) => {
  return (
    <div className="relative w-full max-sm:w-[78%] max-sm:mx-auto max-w-[390px] aspect-[5/6] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d131f] transition-all duration-300 hover:border-red-500/40 group">
      {/* Static Pre-rendered ASCII Portrait (LCP image) */}
      <img
        src="/assets/pfp-ascii-800_95457e99.webp"
        srcSet="/assets/pfp-ascii-400_7bf34271.webp 400w, /assets/pfp-ascii-800_95457e99.webp 800w"
        sizes="(max-width: 640px) 78vw, 390px"
        width={800}
        height={960}
        alt="Portrait of Mahin"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 z-0 block h-full w-full object-cover"
      />

      {/* Top glare reflection edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Subtle bottom vignette gradient to ensure button readability */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#090d15]/95 via-[#090d15]/50 to-transparent pointer-events-none" />

      {/* Card Content Overlay */}
      <div className="relative z-30 h-full flex flex-col justify-end p-5 select-none">
        {/* Bottom Row with About me button */}
        <div className="flex items-center justify-end">
          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/15 text-[11px] sm:text-xs font-mono text-slate-100 hover:text-white hover:border-white/35 bg-black/80 hover:bg-black/95 transition-all cursor-pointer group/btn"
          >
            <span>About me</span>
            <span className="text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsciiPortraitCard;
