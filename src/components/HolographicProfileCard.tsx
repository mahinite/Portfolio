import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HolographicProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -14;
    const tiltY = ((x - centerX) / centerX) * 14;

    setRotateX(tiltX);
    setRotateY(tiltY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none perspective-1000">
      <div
        ref={cardRef}
        onClick={handleFlip}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[300px] sm:w-[360px] h-[440px] sm:h-[480px] rounded-2xl cursor-pointer transition-transform duration-200 ease-out preserve-3d group shadow-2xl"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${isFlipped ? rotateY + 180 : rotateY}deg)`,
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-[#121926] via-[#0d131f] to-[#070a10] overflow-hidden backface-hidden shadow-inner flex flex-col justify-end"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Holographic Iridescent Foil Sheen */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              opacity: isHovered ? 0.75 : 0.35,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(244, 63, 94, 0.15) 25%, rgba(59, 130, 246, 0.15) 50%, rgba(245, 158, 11, 0.12) 75%, transparent 100%)`,
              mixBlendMode: 'color-dodge',
            }}
          />

          {/* Diagonal rainbow streak simulation */}
          <div
            className="absolute -inset-full pointer-events-none opacity-20 transform -rotate-45 transition-all duration-700 z-10"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.4), rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4), transparent)',
              transform: `translateX(${(glarePosition.x - 50) * 2}%) rotate(-45deg)`,
            }}
          />

          {/* Full-span Picture */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            <img
              src="/assets/aistudio/Arifeen_Siddiquei_Mahin_4c622d58.svg"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Accessible Heading for Screen Readers */}
          <h3 className="sr-only">{PERSONAL_INFO.name}</h3>

          {/* Bottom Card Strip (Minimal, floating seamlessly without any background shelf lines) */}
          <div className="relative z-20 w-full pb-3.5 px-5 flex items-center justify-end text-[11px] font-mono text-slate-300">
            <span
              className="text-slate-200 group-hover:text-red-400 transition-colors flex items-center gap-1 font-semibold"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.95)',
              }}
            >
              <span>Flip</span> ↺
            </span>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-[#0c1017] via-[#101726] to-[#070a10] p-6 flex flex-col justify-end overflow-hidden shadow-2xl"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle back glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(59, 130, 246, 0.2))',
            }}
          />

          {/* Back Footer */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>github.com/{PERSONAL_INFO.githubHandle}</span>
            <span className="text-slate-300 group-hover:text-red-400 transition-colors flex items-center gap-1 font-semibold">
              <span>Flip</span> ↺
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs font-mono text-slate-500">
        Hover to tilt in 3D · Click anywhere to flip
      </p>
    </div>
  );
};
