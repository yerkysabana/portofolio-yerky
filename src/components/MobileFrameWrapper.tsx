import React from 'react';
import { Wifi, BatteryMedium, Signal, FolderGit2, User, Briefcase, Mail } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface MobileFrameWrapperProps {
  isMobileFrame: boolean;
  children: React.ReactNode;
  onNavigateTab?: (id: string) => void;
  activeTab?: string;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  isMobileFrame,
  children,
  onNavigateTab,
  activeTab = 'hero',
}) => {
  if (!isMobileFrame) {
    return <div className="w-full min-h-screen relative">{children}</div>;
  }

  const handleTabPress = (id: string) => {
    triggerHaptic('selection');
    if (onNavigateTab) {
      onNavigateTab(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] py-6 px-3 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute w-[500px] h-[500px] bg-[#C6FF3D]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Frame Container */}
      <div className="w-full max-w-[420px] h-[860px] bg-[#0A0A0C] border-[6px] border-[#222228] rounded-[50px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden ring-1 ring-white/15">
        {/* Mobile Status Bar */}
        <div className="h-11 px-7 flex items-center justify-between text-xs text-white z-40 bg-[#0A0A0C]/90 backdrop-blur-md select-none shrink-0">
          <span className="font-semibold text-[13px] font-mono tracking-tight">09:41</span>
          
          {/* Dynamic Island pill */}
          <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 mr-1 animate-pulse"></div>
            <span className="text-[9px] font-mono text-zinc-400">RN Engine</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4 text-[#C6FF3D]" />
          </div>
        </div>

        {/* Inner Scrollable Mobile Screen */}
        <div
          id="mobile-scroll-container"
          className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth focus:outline-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
        </div>

        {/* Native Mobile Bottom Navigation Bar (Thumb Zone) */}
        <div className="h-16 bg-[#121216]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-40 shrink-0">
          <button
            onClick={() => handleTabPress('hero')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'hero' ? 'text-[#C6FF3D]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-tight mt-1">Profil</span>
          </button>

          <button
            onClick={() => handleTabPress('proyek')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'proyek' ? 'text-[#C6FF3D]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-tight mt-1">Proyek</span>
          </button>

          <button
            onClick={() => handleTabPress('karir')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'karir' ? 'text-[#C6FF3D]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-tight mt-1">Karir</span>
          </button>

          <button
            onClick={() => handleTabPress('kontak')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'kontak' ? 'text-[#C6FF3D]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-tight mt-1">Kontak</span>
          </button>
        </div>

        {/* Home Indicator line */}
        <div className="h-3.5 bg-[#121216] flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
