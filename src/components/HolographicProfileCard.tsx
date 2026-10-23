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
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-[#121926] via-[#0d131f] to-[#070a10] p-6 flex flex-col justify-between overflow-hidden backface-hidden shadow-inner"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Holographic Iridescent Foil Sheen */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.75 : 0.35,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(244, 63, 94, 0.15) 25%, rgba(59, 130, 246, 0.15) 50%, rgba(245, 158, 11, 0.12) 75%, transparent 100%)`,
              mixBlendMode: 'color-dodge',
            }}
          />

          {/* Diagonal rainbow streak simulation */}
          <div
            className="absolute -inset-full pointer-events-none opacity-20 transform -rotate-45 transition-all duration-700"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.4), rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4), transparent)',
              transform: `translateX(${(glarePosition.x - 50) * 2}%) rotate(-45deg)`,
            }}
          />

          {/* Top Row: Dotted Photo Badge & NFC Chip */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center font-mono text-[11px] text-slate-300 bg-white/[0.04]">
                [ photo ]
              </div>
              <div>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  ID CARD
                </p>
                <p className="font-mono text-xs text-white font-semibold">
                  #MAHIN-2026
                </p>
              </div>
            </div>

            {/* Simulated Smart Chip */}
            <div className="w-9 h-7 rounded border border-amber-400/60 bg-gradient-to-br from-amber-300/30 to-amber-600/30 flex items-center justify-center p-1 shadow-sm">
              <div className="w-full h-full border border-amber-400/40 grid grid-cols-2 gap-0.5 opacity-80">
                <div className="border-r border-amber-400/40" />
                <div />
              </div>
            </div>
          </div>

          {/* Center Identity */}
          <div className="relative z-10 space-y-2 my-auto">
            <span className="font-mono text-[10px] tracking-widest text-red-400 uppercase">
              Developer Specimen
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              AI Engineer · Product Builder · Student
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Dhaka, Bangladesh · 23.81° N</span>
            </div>
          </div>

          {/* Bottom Card Strip */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Profile card (holographic, as shipped)</span>
            <span className="text-slate-300 group-hover:text-red-400 transition-colors flex items-center gap-1">
              <span>Flip</span> ↺
            </span>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-[#0c1017] via-[#101726] to-[#070a10] p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
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

          {/* Back Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">
              SYSTEM CREDENTIALS
            </span>
            <span className="font-mono text-[11px] text-emerald-400 font-bold">
              VERIFIED
            </span>
          </div>

          {/* Back Stats */}
          <div className="relative z-10 space-y-4 my-auto">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase">
                Shipped Products
              </span>
              <p className="font-mono text-sm text-white font-semibold">
                Fikro · TAWT · Shelf
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase">
                Core Stack
              </span>
              <p className="font-mono text-xs text-slate-300">
                Python, React, Dart, Flutter, PyTorch, FastMCP
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase">
                Focus Areas
              </span>
              <p className="font-mono text-xs text-slate-300">
                Autonomous AI agents, student utilities, context-aware UX
              </p>
            </div>

            {/* Mini Barcode / Security Strip */}
            <div className="pt-2">
              <div className="h-6 w-full bg-white/10 flex items-center justify-between px-2 gap-1 rounded overflow-hidden">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-white/60"
                    style={{ width: (i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 1) + 'px' }}
                  />
                ))}
              </div>
              <p className="font-mono text-[9px] text-slate-500 text-center mt-1">
                AUTH-SHA256: 9b2e9e66768ce4d1
              </p>
            </div>
          </div>

          {/* Back Footer */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>github.com/{PERSONAL_INFO.githubHandle}</span>
            <span className="text-slate-300 group-hover:text-red-400 transition-colors flex items-center gap-1">
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
