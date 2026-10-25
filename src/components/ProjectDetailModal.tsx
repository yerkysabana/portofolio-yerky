import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Project } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#121216] border border-white/15 p-6 sm:p-8 shadow-2xl text-white my-8 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-zinc-300">
                {project.categoryLabel}
              </span>
              {project.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[11px] font-mono text-[#C6FF3D] font-medium">
                  {project.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            aria-label="Tutup Detail"
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto space-y-6 pt-6 pr-1">
          {/* Description */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#C6FF3D] mb-2">
              Gambaran Arsitektur & Performa
            </h3>
            <p className="text-[#8F909A] text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <span className="text-xs text-[#8F909A] block">{m.label}</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Key Features List */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-3">
              Fitur & Implementasi Kunci:
            </h3>
            <div className="space-y-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-[#8F909A]">
                  <Check className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Stack Teknologi:
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-zinc-500">
            Esc untuk menutup atau klik di luar modal
          </span>
          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-[#C6FF3D] text-[#0A0A0C] font-bold text-xs hover:bg-[#B5F228] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
