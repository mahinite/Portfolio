import React from 'react';
import { ModalView } from '../types/portfolio';
import { RandomLetterSwap } from './ui/random-letter-swap';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenModal: (modal: ModalView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onOpenModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0f17]/80 border-b border-white/[0.04] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
        {/* Nav Zone with RandomLetterSwap effect */}
        <nav className="flex items-center gap-8">
          <button
            onClick={() => {
              onNavigate('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative py-1 text-sm tracking-wide transition-colors cursor-pointer group ${
              activeSection === 'hero' ? 'text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RandomLetterSwap
              label="Home"
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
            {activeSection === 'hero' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              onNavigate('about');
              const el = document.getElementById('bento-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`relative py-1 text-sm tracking-wide transition-colors cursor-pointer group ${
              activeSection === 'about' ? 'text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RandomLetterSwap
              label="About"
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              onNavigate('contact');
              const el = document.getElementById('contact-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`relative py-1 text-sm tracking-wide transition-colors cursor-pointer group ${
              activeSection === 'contact' ? 'text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RandomLetterSwap
              label="Contact"
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
