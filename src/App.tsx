/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigate = (id: string) => {
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

      {/* Floating Responsive Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Responsive Content */}
      <div className="w-full relative">
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
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
