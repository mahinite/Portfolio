import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

interface ProjectDetailModalProps {
  isOpen: boolean;
  initialProject?: ProjectItem | null;
  onClose: () => void;
}

const renderFormattedDescription = (text: string) => {
  const parts: (string | React.ReactNode)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white underline hover:text-red-400 transition-colors"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {match[3]}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  initialProject,
  onClose,
}) => {
  const [activeProject, setActiveProject] = useState<ProjectItem>(
    initialProject || PROJECTS[0]
  );

  useEffect(() => {
    if (initialProject) {
      setActiveProject(initialProject);
    }
  }, [initialProject]);

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14]/95 backdrop-blur-2xl animate-modal-backdrop">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-end max-w-5xl mx-auto p-6 sm:p-8 animate-modal-slide-up">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#d94551]/30 bg-[#d94551]/10 hover:bg-[#d94551]/20 hover:border-[#d94551]/60 text-[#d94551] flex items-center justify-center transition-all cursor-pointer group"
          style={{ color: '#d94551' }}
          aria-label="Close modal"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 pt-2 space-y-8 animate-modal-slide-up">
        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0d131f] border border-white/[0.08] rounded-xl overflow-x-auto">
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeProject.id === proj.id
                  ? 'bg-white/10 text-white font-bold shadow-sm border border-white/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {proj.name}
            </button>
          ))}
        </div>

        {/* Selected Project Full Dossier */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeProject.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-sky-500/30 text-sky-400 bg-sky-950/30">
                  {activeProject.status}
                </span>
              </div>
              <p className="mt-2 text-base text-slate-300 font-medium">
                {activeProject.tagline}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {activeProject.category} · {activeProject.year}
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-white/15 bg-white/[0.03] text-xs font-mono text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <span>GitHub</span>
              </a>
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-xs font-mono text-red-300 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
                >
                  <span>Web App</span>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-slate-300 text-base leading-relaxed">
            <p>{renderFormattedDescription(activeProject.description)}</p>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slate-500 mr-2">Built with:</span>
            {activeProject.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 border border-white/10 bg-white/[0.02]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
