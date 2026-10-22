import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Check, Zap, Smartphone, Layers, Flame, RotateCcw } from 'lucide-react';
import { Project } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // FitPulse Interactive Simulator State
  const [reps, setReps] = useState(12);
  const [calories, setCalories] = useState(148);

  // Fintech Interactive Simulator State
  const [fintechRange, setFintechRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [cashflowBalance, setCashflowBalance] = useState('Rp 1.245.678.900');

  // Apex Interactive Token State
  const [activeTokenTheme, setActiveTokenTheme] = useState<'lime' | 'cyan' | 'violet'>('lime');

  // CloudFlow Audit State
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditDone, setAuditDone] = useState(true);

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

  const handleAddRep = () => {
    triggerHaptic('medium');
    setReps((prev) => prev + 1);
    setCalories((prev) => prev + 3);
  };

  const handleResetRep = () => {
    triggerHaptic('light');
    setReps(0);
    setCalories(0);
  };

  const handleFintechRange = (range: '1D' | '1W' | '1M' | '1Y') => {
    triggerHaptic('selection');
    setFintechRange(range);
    if (range === '1D') setCashflowBalance('Rp 48.500.000');
    if (range === '1W') setCashflowBalance('Rp 312.450.000');
    if (range === '1M') setCashflowBalance('Rp 1.245.678.900');
    if (range === '1Y') setCashflowBalance('Rp 14.890.000.000');
  };

  const runCloudAudit = () => {
    triggerHaptic('medium');
    setAuditRunning(true);
    setAuditDone(false);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditDone(true);
      triggerHaptic('success');
    }, 900);
  };

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
          {/* Main Visual Banner */}
          <div className="w-full h-56 sm:h-72 rounded-2xl bg-[#09090C] border border-white/10 overflow-hidden relative">
            <img
              alt={project.title}
              src={project.image}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-80"></div>
          </div>

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

          {/* Interactive Feature Simulator tailored to the project */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0A0C] border border-[#C6FF3D]/25 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Live Demo Simulator: {project.id === 'fitpulse-mobile' ? 'React Native Touch Engine' : 'Optimasi Mobile'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#C6FF3D]">60 FPS Latency &lt;16ms</span>
            </div>

            {/* FitPulse Interactive Demo */}
            {project.id === 'fitpulse-mobile' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Uji performa sentuhan haptik React Native untuk pencatatan latihan instan:
                </p>
                <div className="flex items-center justify-around p-4 rounded-xl bg-[#121216] border border-white/10">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-[#C6FF3D] font-mono block">
                      {reps}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">REPETISI</span>
                  </div>
                  <div className="h-10 w-px bg-white/10"></div>
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-white font-mono flex items-center justify-center gap-1">
                      <Flame className="w-5 h-5 text-orange-400 inline" />
                      {calories}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">KALORI TERBAKAR</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddRep}
                    className="flex-1 py-3 px-4 rounded-full bg-[#C6FF3D] text-[#0A0A0C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#B5F228] active:scale-95 transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Tekan Repetisi (Haptic Pulse)</span>
                  </button>
                  <button
                    onClick={handleResetRep}
                    className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Fintech Interactive Demo */}
            {project.id === 'fintech-analytics' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Simulasi pergantian rentang waktu real-time tanpa frame drop:
                </p>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#121216] border border-white/10">
                  <div>
                    <span className="text-xs text-zinc-400 font-mono block">Total Arus Kas Terhitung</span>
                    <span className="text-2xl font-extrabold text-white font-mono block mt-1">
                      {cashflowBalance}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                    +18.4% Net Growth
                  </span>
                </div>

                <div className="flex gap-2">
                  {(['1D', '1W', '1M', '1Y'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleFintechRange(r)}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        fintechRange === r
                          ? 'bg-[#C6FF3D] text-[#0A0A0C]'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Apex Enterprise Demo */}
            {project.id === 'apex-enterprise' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Uji pergantian runtime token warna tanpa kompilasi ulang:
                </p>
                <div
                  className="p-4 rounded-xl border transition-colors flex items-center justify-between"
                  style={{
                    backgroundColor:
                      activeTokenTheme === 'lime'
                        ? 'rgba(198, 255, 61, 0.08)'
                        : activeTokenTheme === 'cyan'
                        ? 'rgba(56, 189, 248, 0.08)'
                        : 'rgba(168, 85, 247, 0.08)',
                    borderColor:
                      activeTokenTheme === 'lime'
                        ? '#C6FF3D'
                        : activeTokenTheme === 'cyan'
                        ? '#38BDF8'
                        : '#A855F7',
                  }}
                >
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-400 block">
                      Token Palette Aktif: {activeTokenTheme.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-white block mt-0.5">
                      Apex Semantic Token v2.4 (React Native & Web)
                    </span>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        activeTokenTheme === 'lime'
                          ? '#C6FF3D'
                          : activeTokenTheme === 'cyan'
                          ? '#38BDF8'
                          : '#A855F7',
                    }}
                  ></div>
                </div>

                <div className="flex gap-2">
                  {(['lime', 'cyan', 'violet'] as const).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        triggerHaptic('selection');
                        setActiveTokenTheme(theme);
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                        activeTokenTheme === theme
                          ? 'bg-white text-[#0A0A0C]'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {theme} Theme
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CloudFlow Demo */}
            {project.id === 'cloudflow-saas' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Audit performa web real-time berstandar Google Core Web Vitals:
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-white/10">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono block">
                      {auditRunning ? '..' : '99'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Performance</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-white/10">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono block">
                      {auditRunning ? '..' : '100'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Accessibility</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-white/10">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono block">
                      {auditRunning ? '..' : '100'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Best Practices</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#121216] border border-white/10">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono block">
                      {auditRunning ? '..' : '100'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">SEO</span>
                  </div>
                </div>

                <button
                  onClick={runCloudAudit}
                  disabled={auditRunning}
                  className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>{auditRunning ? 'Mengukur Core Web Vitals...' : 'Jalankan Ulang Benchmark'}</span>
                </button>
              </div>
            )}
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
