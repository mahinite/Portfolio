import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SayHiFooterProps {
  onOpenContact: () => void;
  onShowToast: (msg: string) => void;
}

export const SayHiFooter: React.FC<SayHiFooterProps> = ({ onOpenContact, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    onShowToast('Copied email to clipboard: ' + PERSONAL_INFO.email);

    // Fire subtle celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#ef4444', '#f87171', '#ffffff', '#fbbf24'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact-section" className="max-w-6xl mx-auto px-6 pt-16 pb-12 select-none">
      {/* Massive 3D Typographic Headline */}
      <div className="inline-block cursor-pointer group my-8" onClick={onOpenContact}>
        <h2
          className="text-7xl sm:text-9xl font-black tracking-tight text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            textShadow: '6px 8px 0px #ef4444, 8px 10px 0px rgba(0,0,0,0.4)',
          }}
        >
          Say hi.
        </h2>
      </div>

      {/* Meta Footer Line */}
      <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-white/[0.02] hover:bg-white/[0.06] px-2.5 py-1 rounded border border-white/5"
            title="Click to copy email address"
          >
            <span>email:</span>
            <span className="text-slate-200 underline decoration-slate-600 underline-offset-4">
              {PERSONAL_INFO.email}
            </span>
            {copied && <span className="text-sky-400 text-[10px]">✓ copied!</span>}
          </button>

          <span className="text-slate-600">·</span>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-white/[0.02] hover:bg-white/[0.06] px-2.5 py-1 rounded border border-white/5"
          >
            <span>github.com/{PERSONAL_INFO.githubHandle}</span>
          </a>
        </div>

        <div className="text-slate-400">
          © {new Date().getFullYear()} {PERSONAL_INFO.shortName}
        </div>
      </div>
    </footer>
  );
};
