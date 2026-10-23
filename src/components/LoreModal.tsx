import React, { useState, useEffect } from 'react';
import { LORE_CHAPTERS } from '../data/portfolioData';
import { LoreItem } from '../types/portfolio';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToAbout: () => void;
}

export const LoreModal: React.FC<LoreModalProps> = ({
  isOpen,
  onClose,
  onBackToAbout,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<LoreItem | null>(null);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedChapter) {
          setSelectedChapter(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedChapter, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14]/95 backdrop-blur-2xl animate-fadeIn">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between max-w-5xl mx-auto p-6 sm:p-8">
        <button
          onClick={onBackToAbout}
          className="font-mono text-xs text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-white transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>← Back to About</span>
        </button>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer group"
          aria-label="Close modal"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 pt-4">
        {/* Lore Heading */}
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
            Lore
          </h1>
          <p className="mt-2 font-mono text-xs text-slate-400">
            Personal chapters, gaming nostalgia, and late-night build stories. Click any chapter to read.
          </p>
        </div>

        {/* Chapters List */}
        <div className="space-y-8">
          {LORE_CHAPTERS.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter)}
              className="group flex items-start gap-4 sm:gap-6 p-4 -mx-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-200 cursor-pointer"
            >
              {/* Category Pill Tag */}
              <div className="shrink-0 pt-0.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-400 border border-white/10 bg-white/[0.02] group-hover:border-red-500/40 group-hover:text-red-300 transition-colors">
                  {chapter.badge}
                </span>
              </div>

              {/* Title & Preview */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {chapter.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read chapter →
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-normal">
                  {chapter.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Detail Slide-over / Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0e1422] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedChapter(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 hover:border-white/30 text-white flex items-center justify-center text-sm transition-all"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono text-red-400 border border-red-500/30 bg-red-950/20">
                {selectedChapter.badge}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {selectedChapter.date}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {selectedChapter.title}
              </h2>
              <p className="text-sm font-mono text-slate-400 mt-1">
                {selectedChapter.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{selectedChapter.story}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                Key Highlights & Memories
              </h4>
              <ul className="space-y-1.5">
                {selectedChapter.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-red-400 font-bold">›</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all cursor-pointer"
              >
                Close Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
