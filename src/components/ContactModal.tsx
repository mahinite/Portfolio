import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [interest, setInterest] = useState('Collaboration');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    onShowToast('Copied email to clipboard!');
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f87171', '#ffffff', '#fbbf24'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
      });
      onShowToast('Message transmitted! Preparing mailto client...');

      // Open mailto link
      const subject = encodeURIComponent(`[Portfolio Reach-Out] ${interest} from ${name || 'A Visitor'}`);
      const body = encodeURIComponent(
        `Hi Mahin,\n\n${message}\n\nFrom: ${name} (${contactEmail || 'No email provided'})\nInterest: ${interest}`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14]/95 backdrop-blur-2xl animate-fadeIn">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between max-w-5xl mx-auto p-6 sm:p-8">
        <span className="font-mono text-xs text-red-400 tracking-widest uppercase font-bold">
          TRANSMIT MESSAGE / SAY HI
        </span>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer group"
          aria-label="Close modal"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-20 pt-2 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Let's connect.
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Whether you want to collaborate on AI agents, discuss ideas, or just say hello — my inbox is always open.
          </p>
        </div>

        {/* 1-Click Copy Bar */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0d131f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              Direct Contact
            </span>
            <p className="font-mono text-sm text-white font-semibold">
              {PERSONAL_INFO.email}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs font-mono text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{copied ? '✓ Copied' : 'Copy Email Address'}</span>
          </button>
        </div>

        {/* Message Form */}
        {isSuccess ? (
          <div className="p-8 rounded-2xl border border-sky-500/30 bg-sky-950/20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Message dispatched</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your default email composer should open to send the note. If not, feel free to email directly to{' '}
              <span className="font-mono text-red-400">{PERSONAL_INFO.email}</span>.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-slate-300">Your Email / Discord</label>
                <input
                  type="text"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-slate-300">Topic of Interest</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Collaboration', 'AI Agents / Shelf', 'General Chat'].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setInterest(item)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                      interest === item
                        ? 'border-red-500 bg-red-500/10 text-white font-semibold'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-slate-300">Your Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on, or what would you like to explore together?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/60"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-500">
                Direct mailto transport
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-red-900/30 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
