import React, { useState, useEffect } from 'react';
import { AsciiPortraitCard } from './AsciiPortraitCard';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useQuality } from '../hooks/useQuality';

interface HeroSectionProps {
  onOpenAbout: () => void;
  onScrollDown: () => void;
}

const PHRASES = [
  'software with AI',
  'AI agents',
  'useful tools',
  'thoughtful products',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAbout, onScrollDown }) => {
  const quality = useQuality();
  const isMinimal = quality === 'minimal';
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(isMinimal ? PHRASES[0] : '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isMinimal) return;

    const currentPhrase = PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 45 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, isMinimal]);

  const activeText = isMinimal ? PHRASES[0] : displayText;

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between max-w-6xl mx-auto px-6 pt-10 pb-8 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Heading & Typewriter */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <p className="font-serif italic text-3xl sm:text-4xl text-slate-400 font-light tracking-wide">
              Salam,
            </p>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none">
              I'm Mahin
            </h1>
          </div>

          {/* Typewriter line */}
          <div className="text-2xl sm:text-3xl text-slate-300 font-normal flex items-baseline flex-wrap gap-2 pt-2">
            <span>I build</span>
            <span className="font-semibold text-white">
              {activeText}
              <span className="text-red-500 font-bold ml-0.5 animate-cursor-blink">|</span>
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 pt-4">
            {PERSONAL_INFO.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 border border-white/10 bg-white/[0.02] shadow-sm hover:border-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: ASCII Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <AsciiPortraitCard onOpenAbout={onOpenAbout} />
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="flex flex-col items-center justify-center pt-8 select-none">
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-1 font-mono text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="tracking-widest">scroll</span>
          <span className="text-xs group-hover:translate-y-1 transition-transform">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};
