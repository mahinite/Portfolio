import React, { useEffect } from 'react';
import { HolographicProfileCard } from './HolographicProfileCard';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useQuality } from '../hooks/useQuality';

interface AboutModalProps {
  isOpen: boolean;
  isLoreOpen?: boolean;
  onClose: () => void;
  onOpenLore: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  isLoreOpen = false,
  onClose,
  onOpenLore,
}) => {
  const quality = useQuality();

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoreOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoreOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        quality === 'minimal'
          ? 'bg-[#080c14] animate-modal-backdrop-minimal'
          : quality === 'lite'
          ? 'bg-[#080c14] animate-modal-backdrop-lowpower'
          : 'bg-[#080c14]/95 backdrop-blur-2xl animate-modal-backdrop'
      }`}
    >
      {/* Top Bar with Close Button */}
      <div
        className={`sticky top-0 z-50 flex items-center justify-end max-w-5xl mx-auto p-6 sm:p-8 ${
          quality === 'minimal'
            ? 'animate-modal-slide-up-minimal'
            : quality === 'lite'
            ? 'animate-modal-slide-up-lowpower'
            : 'animate-modal-slide-up'
        }`}
      >
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#d94551]/30 bg-[#d94551]/10 hover:bg-[#d94551]/20 hover:border-[#d94551]/60 text-[#d94551] flex items-center justify-center transition-all cursor-pointer group"
          style={{ color: '#d94551' }}
          aria-label="Close modal"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
        </button>
      </div>

      <div
        className={`max-w-3xl mx-auto px-6 pb-20 pt-2 flex flex-col items-center text-center ${
          quality === 'minimal'
            ? 'animate-modal-slide-up-minimal'
            : quality === 'lite'
            ? 'animate-modal-slide-up-lowpower'
            : 'animate-modal-slide-up'
        }`}
      >

        {/* Full Name */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {PERSONAL_INFO.name}
        </h1>

        {/* Bio with golden highlights */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
          {PERSONAL_INFO.bioPrefix}
          <span className="text-amber-400 font-medium">
            {PERSONAL_INFO.bioHighlight1}
          </span>
          {PERSONAL_INFO.bioMiddle}
          <span className="text-amber-400 font-medium">
            {PERSONAL_INFO.bioHighlight2}
          </span>
          {PERSONAL_INFO.bioSuffix}
        </p>

        {/* Tech Skill Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-xl">
          {['AI agents', 'React', 'Dart / Flutter', 'DaVinci Resolve'].map(
            (skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 border border-white/10 bg-white/[0.03] shadow-sm hover:border-white/20 transition-colors"
              >
                {skill}
              </span>
            )
          )}
        </div>

        {/* Centerpiece: Interactive 3D Holographic Card */}
        <div className="w-full flex justify-center my-6">
          <HolographicProfileCard />
        </div>
      </div>
    </div>
  );
};
