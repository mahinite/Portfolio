/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { SayHiFooter } from './components/SayHiFooter';
import { AboutModal } from './components/AboutModal';
import { LoreModal } from './components/LoreModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import MicroSlats from './components/MicroSlats';
import { ModalView, ProjectItem } from './types/portfolio';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalView>('none');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleOpenAbout = () => {
    setActiveModal('about');
  };

  const handleOpenLore = () => {
    setActiveModal('lore');
  };

  const handleBackToAbout = () => {
    setActiveModal('about');
  };

  const handleOpenProjects = () => {
    setSelectedProject(null);
    setActiveModal('project');
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setActiveModal('project');
  };

  const handleOpenContact = () => {
    setActiveModal('contact');
  };

  const handleCloseModal = () => {
    setActiveModal('none');
  };

  const handleScrollDown = () => {
    const bento = document.getElementById('bento-section');
    if (bento) {
      bento.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('projects');
    }
  };

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 400) {
        setActiveSection('hero');
      } else if (scrollY < 1200) {
        setActiveSection('projects');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
          paused={false}
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 min-h-screen">
        {/* Top 3-Zone Navigation */}
        <Navigation
          activeSection={activeSection}
          onNavigate={(sec) => setActiveSection(sec)}
          onOpenModal={(modal) => setActiveModal(modal)}
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
            onOpenContact={handleOpenContact}
            onShowToast={showToast}
          />
        </main>
      </div>

      {/* Interactive Modals */}
      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={handleCloseModal}
        onOpenLore={handleOpenLore}
      />

      <LoreModal
        isOpen={activeModal === 'lore'}
        onClose={handleCloseModal}
        onBackToAbout={handleBackToAbout}
      />

      <ProjectDetailModal
        isOpen={activeModal === 'project'}
        initialProject={selectedProject}
        onClose={handleCloseModal}
      />

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={handleCloseModal}
        onShowToast={showToast}
      />

      {/* Global Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
