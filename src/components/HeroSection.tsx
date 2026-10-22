import React, { useState } from 'react';
import { ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerHaptic } from '../utils/haptics';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenConsultation,
}) => {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  const handleCopyEmail = async () => {
    triggerHaptic('success');
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="hero" className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        {/* Left Column: Giant Typographic Headline & Tagline */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
              Frontend Dev & Product Designer
            </span>
          </div>

          <h1 className="font-extrabold hero-editorial-title uppercase text-white mb-8 tracking-tighter leading-none select-none">
            Merancang <br />
            Produk Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Dengan Presisi
            </span>{' '}
            <span className="inline-block text-[#C6FF3D] italic font-light">& Jiwa.</span>
          </h1>

          <p className="text-[#8F909A] text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            {profileData.bio}
          </p>

          {/* Interactive Actions: CTA + Copy Email Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                triggerHaptic('light');
                onExploreProjects();
              }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#C6FF3D] text-[#0A0A0C] font-bold text-sm hover:bg-[#B5F228] transition-all duration-200 shadow-[0_0_25px_rgba(198,255,61,0.25)] hover:shadow-[0_0_35px_rgba(198,255,61,0.45)] cursor-pointer"
            >
              <span>Jelajahi Proyek</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Quick Copy Email Button with Tooltip */}
            <div className="relative">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#121216] border border-white/10 hover:border-[#C6FF3D]/50 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 group cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#C6FF3D]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#C6FF3D]" />
                )}
                <span>{profileData.email}</span>
              </button>

              {/* Toast Tooltip */}
              {copied && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#C6FF3D] text-[#0A0A0C] text-[10px] font-bold font-mono tracking-wider shadow-lg animate-in fade-in zoom-in duration-150 whitespace-nowrap">
                  TERSALIN!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Minimalist Tech Card / Profile Widget */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div
            onMouseMove={handleMouseMove}
            style={
              {
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`,
              } as React.CSSProperties
            }
            className="spotlight-card rounded-3xl bg-[#121216]/85 border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden group shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8F909A]">
                Lokasi & Zona Waktu
              </span>
              <span className="text-xs font-mono text-[#C6FF3D] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]"></span>
                {profileData.location}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/15 overflow-hidden flex-shrink-0 relative">
                <img
                  alt="Profile Avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlEfPAwWqyB_bfuRn6JW2U2VPr0eglA2FZisg6Vb8x850wxpnnuu5r4q6mnL_0tl6kFj8wQM8lSevk2e2_HHAnyGmZ8tqU98KFWb3ldmorykAZrYZzaj0ENFov7tCwGLRUdnnHkRn-E6kLbzzUB7N0CdOuWrgc1qA0K89nNP9z4MLqMqHcox29TY_ClzWje5saZoM2fB_TNVeKJj3CWEq7ooLKgvrW58HcIMQeNEEtxht56LMkdNa8qg"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="font-bold text-white text-base tracking-tight">{profileData.name}</p>
                <p className="text-xs text-[#8F909A] mt-0.5">{profileData.title}</p>
                <p className="text-[11px] font-mono text-zinc-400 mt-1">
                  {profileData.experienceYears} Pengalaman Industri
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-white/5">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-lg font-extrabold text-white tracking-tight font-mono">
                  {profileData.projectsCompleted}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8F909A]">
                  Karya Rilis
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-lg font-extrabold text-[#C6FF3D] tracking-tight font-mono">
                  {profileData.clientSatisfaction}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8F909A]">
                  Kepuasan Klien
                </p>
              </div>
            </div>
          </div>

          {/* Micro Availability Card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-ping"></div>
              <p className="text-xs text-zinc-300 font-mono">Buka kontrak baru untuk Q3/Q4</p>
            </div>
            <button
              onClick={() => {
                triggerHaptic('light');
                onOpenConsultation();
              }}
              className="text-xs font-mono text-[#C6FF3D] underline hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Konsultasi</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
