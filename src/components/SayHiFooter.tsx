import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUpRight, Copy, Check, Instagram, Facebook } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SayHiFooterProps {
  onShowToast: (msg: string) => void;
}

export const SayHiFooter: React.FC<SayHiFooterProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#ef4444', '#f87171', '#ffffff', '#fbbf24'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const socialCards = [
    {
      name: 'GitHub',
      handle: '@' + PERSONAL_INFO.githubHandle,
      url: PERSONAL_INFO.github,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@_.mahin.n_',
      url: 'https://www.instagram.com/_.mahin.n_/',
      icon: <Instagram className="w-5 h-5 text-current" />,
    },
    {
      name: 'Facebook',
      handle: 'arifeenmahin',
      url: 'https://www.facebook.com/arifeenmahin',
      icon: <Facebook className="w-5 h-5 text-current" />,
    },
  ];

  return (
    <footer id="contact-section" className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 space-y-16">
      {/* Top Action Bar: Email Copy Pill */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.04]">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
          Get in touch
        </span>

        <button
          onClick={handleCopyEmail}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer font-mono text-xs text-slate-300 hover:text-white"
          title="Click to copy email address"
        >
          <span>{PERSONAL_INFO.email}</span>
          <span className="text-slate-500">·</span>
          {copied ? (
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <Check className="w-3.5 h-3.5" /> copied
            </span>
          ) : (
            <span className="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
              <Copy className="w-3.5 h-3.5" /> copy
            </span>
          )}
        </button>
      </div>

      {/* Row 1: Social Cards (Image 1 inspired, matching our existing bento glass style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialCards.map((card) => (
          <a
            key={card.name}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-white/[0.08] bg-[#0d131f] p-5 hover:border-white/25 hover:bg-[#121a2b] transition-all duration-300 shadow-xl flex items-start justify-between cursor-pointer"
          >
            <div className="space-y-2">
              <div className="text-slate-400 group-hover:text-red-400 transition-colors">
                {card.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {card.name}
                </h4>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  {card.handle}
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] group-hover:border-red-500/40 group-hover:bg-red-500/10 flex items-center justify-center text-slate-400 group-hover:text-red-300 transition-all">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>

      {/* Row 2: Minimal HeyClicky-style Navigation Columns Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0d131f] p-6 sm:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
        {/* Work */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
            Work
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a
                href="https://github.com/farazkayan/SoundMesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                SoundMesh
              </a>
            </li>
            <li>
              <a
                href="https://tawt.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                TAWT
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Mahinite/shelf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Shelf
              </a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
            Explore
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('bento-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                About & Works
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
            Connect
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a
                href="https://www.instagram.com/_.mahin.n_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/arifeenmahin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Meta */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
            Location
          </h5>
          <ul className="space-y-1.5 text-slate-400">
            <li>{PERSONAL_INFO.location}</li>
            <li>{PERSONAL_INFO.utcOffset} Timezone</li>
            <li className="pt-1 text-slate-500">Student & Product Builder</li>
          </ul>
        </div>
      </div>

      {/* Row 3: Iconic "Say hi." Giant Statement Display Component (In place of heyclicky) */}
      <div className="pt-6 select-none">
        <h2
          className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tight text-white cursor-default select-none transition-all leading-none"
          style={{
            textShadow: '6px 8px 0px #ef4444, 8px 10px 0px rgba(0,0,0,0.4)',
          }}
        >
          Say hi.
        </h2>
      </div>

      {/* Row 4: Sub-Footer Copyright Bar */}
      <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
