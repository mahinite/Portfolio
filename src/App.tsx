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
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-red-500/30 selection:text-white font-sans relative">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/[0.04] blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/[0.03] blur-[160px] pointer-events-none -z-10" />

      {/* Full-Screen MicroSlats Interactive Background from React Bits */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <MicroSlats
          preset="swell"
          color="#0c141d"
          glintColor="#d94551"
          backgroundColor="#080c14"
          slatWidth={12}
          slatHeight={22}
          gap={3}
          roundness={0.75}
          interactive
          cursorStrength={1}
          cursorSize={40}
          swirl={0.15}
          trail={1.4}
          lean={0}
          intro
          scale={1.5}
          speed={0.6}
          direction={250}
          chop={0.55}
          stretch={0}
          glint={0.7}
          contrast={1.25}
          perspective={0.55}
          fog={0.55}
          introDuration={1.5}
          paused={false}
        />
      </div>

      {/* Top 3-Zone Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={(sec) => setActiveSection(sec)}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* Main Page Layout (lives on top of MicroSlats background) */}
      <main className="relative z-10">
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
