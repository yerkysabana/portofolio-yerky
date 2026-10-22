/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MobileOptimizerBar } from './components/MobileOptimizerBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { Project } from './types';

export default function App() {
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'proyek', 'tentang', 'karir', 'kontak'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    if (isMobileFrame) {
      const container = document.getElementById('mobile-scroll-container');
      const target = document.getElementById(id);
      if (container && target) {
        const top = target.offsetTop;
        container.scrollTo({ top: top - 20, behavior: 'smooth' });
        return;
      }
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F4F4F5] relative overflow-x-hidden selection:bg-[#C6FF3D] selection:text-[#0A0A0C]">
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#C6FF3D]/[0.045] blur-[150px] rounded-full"></div>
        <div className="absolute top-[45%] -left-[10%] w-[600px] h-[600px] bg-white/[0.015] blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[700px] h-[700px] bg-[#C6FF3D]/[0.035] blur-[160px] rounded-full"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
      </div>

      {/* React Native Optimization & Mode Switcher Bar */}
      <MobileOptimizerBar
        isMobileFrame={isMobileFrame}
        onToggleFrame={setIsMobileFrame}
        hapticEnabled={hapticEnabled}
        onToggleHaptic={setHapticEnabled}
      />

      {/* Floating Header (Shown in full responsive view) */}
      {!isMobileFrame && <Header onNavigate={handleNavigate} />}

      {/* Main Content (Wrapped in either Full Responsive or Smartphone Device Frame) */}
      <MobileFrameWrapper
        isMobileFrame={isMobileFrame}
        onNavigateTab={handleNavigate}
        activeTab={activeTab}
      >
        <main className="relative z-10">
          <HeroSection
            onExploreProjects={() => handleNavigate('proyek')}
            onOpenConsultation={() => handleNavigate('kontak')}
          />
          <MarqueeTicker />
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
          <AboutSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </MobileFrameWrapper>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
