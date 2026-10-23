import React, { useEffect } from 'react';
import { HolographicProfileCard } from './HolographicProfileCard';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLore: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenLore,
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14]/95 backdrop-blur-2xl animate-fadeIn">
      {/* Top Bar with Close Button */}
      <div className="sticky top-0 z-50 flex items-center justify-end max-w-5xl mx-auto p-6 sm:p-8">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer group"
          aria-label="Close modal"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 pt-2 flex flex-col items-center text-center">

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

        {/* Bottom LORE Banner Card */}
        <div
          onClick={onOpenLore}
          className="w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 sm:p-7 text-left hover:border-white/20 transition-all duration-300 shadow-xl cursor-pointer group mt-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-red-500 tracking-wider">
              LORE
            </h2>
            <span className="text-amber-400 group-hover:translate-x-1.5 group-hover:text-amber-300 transition-all text-lg font-mono">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
