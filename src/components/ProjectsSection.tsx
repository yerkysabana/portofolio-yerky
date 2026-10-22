import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { triggerHaptic } from '../utils/haptics';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'uiux' | 'mobile'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const filterButtons = [
    { id: 'all', label: `Semua (${projectsData.length})` },
    { id: 'web', label: 'Web App' },
    { id: 'mobile', label: 'Mobile' },
  ] as const;

  return (
    <section id="proyek" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header with Micro-Label and Interactive Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[#C6FF3D] tracking-[0.2em] uppercase">
              01 / PORTOFOLIO
            </span>
            <span className="h-px w-8 bg-[#C6FF3D]/40"></span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Karya Terpilih{' '}
            <span className="text-[#8F909A] font-normal text-2xl sm:text-3xl">(2022–2024)</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                triggerHaptic('light');
                setActiveFilter(btn.id);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-[#C6FF3D] text-[#0A0A0C] font-bold shadow-[0_0_15px_rgba(198,255,61,0.25)]'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isLarge = project.colSpan === 2;
          const pos = mousePos[project.id] || { x: -200, y: -200 };

          return (
            <div
              key={project.id}
              onClick={() => {
                triggerHaptic('medium');
                onSelectProject(project);
              }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onMouseMove={(e) => handleMouseMove(project.id, e)}
              style={
                {
                  '--mouse-x': `${pos.x}px`,
                  '--mouse-y': `${pos.y}px`,
                } as React.CSSProperties
              }
              className={`spotlight-card rounded-3xl bg-[#121216]/90 border border-white/10 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-white/25 cursor-pointer ${
                isLarge ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div className="p-6 sm:p-8">
                {/* Top Badge Row & Arrow Trigger */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-zinc-300">
                      {project.categoryLabel}
                    </span>
                    {project.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[11px] font-mono text-[#C6FF3D] font-medium">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 group-hover:bg-[#C6FF3D] group-hover:text-[#0A0A0C] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                {/* Title & Summary */}
                <h3 className="font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#C6FF3D] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#8F909A] text-sm mt-2 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[11px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview Image Area */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1">
                <div
                  className={`w-full rounded-2xl bg-[#09090C] border border-white/10 overflow-hidden relative group-hover:border-[#C6FF3D]/30 transition-colors ${
                    isLarge ? 'h-52 sm:h-64' : 'h-44 sm:h-52'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent z-10 opacity-70"></div>
                  <img
                    alt={project.title}
                    src={project.image}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
                  />

                  {/* Corner indicator badge for live production or click affordance */}
                  {project.id === 'fintech-analytics' ? (
                    <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0C]/90 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Live Production</span>
                    </div>
                  ) : (
                    <div className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                      <Sparkles className="w-3 h-3 text-[#C6FF3D]" />
                      <span>Eksplor Detail</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
