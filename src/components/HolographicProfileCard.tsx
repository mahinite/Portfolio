import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useQuality } from '../hooks/useQuality';

export const HolographicProfileCard: React.FC = () => {
  const isCoarse = useCoarsePointer();
  const quality = useQuality();
  const isStatic = isCoarse || quality === 'minimal';
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic || !cardRef.current) return;
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

  const handleMouseEnter = () => {
    if (!isStatic) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isStatic) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div className={isStatic ? "flex flex-col items-center justify-center my-6 select-none" : "flex flex-col items-center justify-center my-6 select-none perspective-1000"}>
      <div
        ref={cardRef}
        onMouseMove={isStatic ? undefined : handleMouseMove}
        onMouseEnter={isStatic ? undefined : handleMouseEnter}
        onMouseLeave={isStatic ? undefined : handleMouseLeave}
        className={isStatic ? "relative w-[300px] sm:w-[360px] h-[440px] sm:h-[480px] rounded-2xl group shadow-2xl" : "relative w-[300px] sm:w-[360px] h-[440px] sm:h-[480px] rounded-2xl transition-transform duration-200 ease-out group shadow-2xl"}
        style={isStatic ? undefined : {
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-gradient-to-br from-[#121926] via-[#0d131f] to-[#070a10] overflow-hidden shadow-inner flex flex-col justify-end"
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
        </div>
      </div>
    </div>
  );
};
