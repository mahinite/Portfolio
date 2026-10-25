/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { SayHiFooter } from './components/SayHiFooter';
import { AboutModal } from './components/AboutModal';
import { LoreModal } from './components/LoreModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Toast } from './components/Toast';
import MicroSlats from './components/MicroSlats';
import { ModalView, ProjectItem } from './types/portfolio';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalView>('none');
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const heroFadeRef = useRef(1);

  // Compute hero fade level for cursor effects, throttled with requestAnimationFrame
  useEffect(() => {
    const FADE_START = 0.5;
    let rafId = 0;

    const updateFade = () => {
      rafId = 0;
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const ratio = rect.height > 0 ? rect.bottom / rect.height : 0;
      const x = Math.max(0, Math.min(1, ratio / FADE_START));
      const f = x * x * (3 - 2 * x); // smoothstep(0, FADE_START, ratio)
      heroFadeRef.current = Math.max(0, Math.min(1, f));
    };

    const onScrollOrResize = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateFade);
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateFade();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  // Lock body scroll whenever any modal is active
  useEffect(() => {
    if (activeModal !== 'none' || isLoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeModal, isLoreOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleOpenAbout = () => {
    setActiveModal('about');
    setIsLoreOpen(false);
  };

  const handleOpenLore = () => {
    setActiveModal('about');
    setIsLoreOpen(true);
  };

  const handleCloseLore = () => {
    setIsLoreOpen(false);
  };

  const handleOpenProjects = () => {
    setSelectedProject(null);
    setIsLoreOpen(false);
    setActiveModal('project');
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsLoreOpen(false);
    setActiveModal('project');
  };

  const handleCloseModal = () => {
    setActiveModal('none');
    setIsLoreOpen(false);
  };

  const handleScrollDown = () => {
    const bento = document.getElementById('bento-section');
    if (bento) {
      bento.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('about');
    }
  };

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bentoEl = document.getElementById('bento-section');
      const contactEl = document.getElementById('contact-section');

      const bentoTop = bentoEl ? bentoEl.offsetTop - 180 : 500;
      const contactTop = contactEl ? contactEl.offsetTop - 240 : 1300;

      if (scrollY < bentoTop) {
        setActiveSection('hero');
      } else if (scrollY < contactTop) {
        setActiveSection('about');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 selection:bg-red-500/30 selection:text-white font-sans relative">
      {/* Full-Screen MicroSlats Interactive Background from React Bits */}
      <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MicroSlats
          preset="swell"
          color="#182536"
          glintColor="#f87171"
          backgroundColor="#080c14"
          slatWidth={12}
          slatHeight={22}
          gap={3}
          roundness={0.75}
          interactive
          cursorStrength={1.5}
          cursorSize={45}
          swirl={0.2}
          trail={1.5}
          lean={0.2}
          intro
          scale={1.5}
          speed={0.65}
          direction={250}
          chop={0.55}
          stretch={0.15}
          glint={1.1}
          contrast={1.4}
          perspective={0.55}
          fog={0.5}
          introDuration={1.5}
          paused={activeModal !== 'none' || isLoreOpen}
          effectLevelRef={heroFadeRef}
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 min-h-screen">
        {/* Top 3-Zone Navigation */}
        <Navigation
          activeSection={activeSection}
          onNavigate={(sec) => setActiveSection(sec)}
          onOpenModal={(modal) => {
            setActiveModal(modal);
            setIsLoreOpen(false);
          }}
        />

        {/* Main Page Layout (lives on top of MicroSlats background) */}
        <main>
          {/* Screen 1: Hero Section */}
          <HeroSection
            onOpenAbout={handleOpenAbout}
            onScrollDown={handleScrollDown}
          />

          {/* Screen 2: Bento Grid (Projects, About me, Watch, Now, Marquee) */}
          <BentoGrid
            onOpenAbout={handleOpenAbout}
            onOpenProjects={handleOpenProjects}
            onSelectProject={handleSelectProject}
          />

          {/* Screen 3: Say hi 3D Footer */}
          <SayHiFooter
            onShowToast={showToast}
          />
        </main>
      </div>

      {/* Interactive Modals */}
      <AboutModal
        isOpen={activeModal === 'about'}
        isLoreOpen={isLoreOpen}
        onClose={handleCloseModal}
        onOpenLore={handleOpenLore}
      />

      <LoreModal
        isOpen={isLoreOpen && activeModal === 'about'}
        onClose={handleCloseLore}
        onBackToAbout={handleCloseLore}
      />

      <ProjectDetailModal
        isOpen={activeModal === 'project'}
        initialProject={selectedProject}
        onClose={handleCloseModal}
      />

      {/* Global Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
