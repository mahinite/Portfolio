import React from 'react';
import { LiveWatchCard } from './LiveWatchCard';
import { PROJECTS, TECH_MARQUEE_ITEMS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

interface BentoGridProps {
  onOpenAbout: () => void;
  onOpenProjects: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  onOpenAbout,
  onOpenProjects,
  onSelectProject,
}) => {
  return (
    <section id="bento-section" className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      {/* Top 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Card 1: Projects (Span 6 or 7 on desktop) */}
        <div className="md:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-white/15 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Projects
              </h2>
              <span className="font-mono text-xs text-slate-500">
                Selected Works
              </span>
            </div>

            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-white/[0.04] hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">
                      {project.name}
                    </span>
                    <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors" />
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    {project.tagline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/[0.04] flex items-center justify-between">
            <button
              onClick={onOpenProjects}
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>{PROJECTS.length} projects</span>
              <span className="group-hover/link:translate-x-1 transition-transform">
                →
              </span>
            </button>
            <span className="text-[11px] font-mono text-slate-500">
              Click to inspect
            </span>
          </div>
        </div>

        {/* Right Column: Stacked About Me & Live Watch (Span 5 on desktop) */}
        <div className="md:col-span-5 flex flex-col gap-6 justify-between">
          {/* Card 2: About Me */}
          <div
            onClick={onOpenAbout}
            className="rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group shadow-lg cursor-pointer min-h-[170px]"
          >
            <div className="flex items-start justify-end">
              <span className="font-mono text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                Bio & ID
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                About me
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span>Open</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Time on my watch */}
          <LiveWatchCard />
        </div>
      </div>

      {/* Card 4: Now Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0d131f]/90 p-6 sm:p-8 hover:border-white/20 transition-all duration-300 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-slate-400 tracking-wide uppercase">
            Now
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline flex-wrap">
          <span>Building this portfolio site.</span>
          <span className="text-red-500 font-bold ml-1 animate-cursor-blink">|</span>
        </div>
      </div>

      {/* Card 5: Infinite Marquee Tech Ticker */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0d131f]/60 py-4 px-2 overflow-hidden backdrop-blur-sm shadow-md">
        <div className="animate-marquee items-center gap-8 text-sm sm:text-base font-mono text-slate-300 font-medium select-none">
          {/* Double array for seamless infinite loop */}
          {[...TECH_MARQUEE_ITEMS, ...TECH_MARQUEE_ITEMS].map((tech, idx) => (
            <React.Fragment key={idx}>
              <span className="whitespace-nowrap hover:text-white transition-colors">
                {tech}
              </span>
              <span className="text-red-500/70 select-none">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
