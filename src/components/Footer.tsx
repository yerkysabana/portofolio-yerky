import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { triggerHaptic } from '../utils/haptics';

export const Footer: React.FC = () => {
  const [jakartaTime, setJakartaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('id-ID', options).format(now);
      setJakartaTime(`${formatted} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    triggerHaptic('light');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070709] py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8F909A]">
        {/* Live Jakarta Clock */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse"></span>
          <span className="text-zinc-300">
            WAKTU LOKAL JAKARTA:{' '}
            <span className="text-white font-mono font-medium tracking-wider">
              {jakartaTime || 'Memuat...'}
            </span>
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p>© {new Date().getFullYear()} {profileData.name}. Dibuat dengan presisi tanpa kompromi.</p>
        </div>

        {/* Back to Top Trigger */}
        <button
          onClick={scrollToTop}
          className="text-zinc-400 hover:text-[#C6FF3D] flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0 p-0 text-xs font-mono uppercase"
        >
          <span>KEMBALI KE ATAS</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
