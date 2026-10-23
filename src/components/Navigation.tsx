import React from 'react';
import { ModalView } from '../types/portfolio';

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
        {/* Nav Zone */}
        <nav className="flex items-center gap-8">
          <button
            onClick={() => {
              onNavigate('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative py-1 text-sm tracking-wide transition-colors cursor-pointer ${
              activeSection === 'hero' ? 'text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
            {activeSection === 'hero' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onOpenModal('about')}
            className="relative py-1 text-sm tracking-wide text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => onOpenModal('contact')}
            className="relative py-1 text-sm tracking-wide text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};
