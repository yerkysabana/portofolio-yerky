import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { profileData } from '../data/portfolioData';

interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setVisible(true); // scrolling up
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (id: string) => {
    triggerHaptic('light');
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-12 left-0 right-0 z-40 px-4 sm:px-6 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border transition-all duration-200 ${
            scrolled
              ? 'bg-[#121216]/90 backdrop-blur-xl border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
              : 'bg-[#121216]/75 backdrop-blur-lg border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
          }`}
        >
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left bg-transparent border-0 p-0"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C6FF3D]/70 flex-shrink-0 shadow-[0_0_10px_rgba(198,255,61,0.3)] bg-zinc-900 transition-transform group-hover:scale-105 duration-200">
              <img
                src="/avatar.jpg"
                alt={profileData.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#C6FF3D] transition-colors">
                {profileData.name}
              </span>
              <span className="text-xs text-[#8F909A] hidden sm:inline font-mono">/ portofolio</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('proyek')}
              className="px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#8F909A] hover:text-white transition-colors rounded-full hover:bg-white/[0.05] cursor-pointer"
            >
              <span className="text-[#C6FF3D]/80 mr-1">01</span> Proyek
            </button>
            <button
              onClick={() => handleNavClick('tentang')}
              className="px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#8F909A] hover:text-white transition-colors rounded-full hover:bg-white/[0.05] cursor-pointer"
            >
              <span className="text-[#C6FF3D]/80 mr-1">02</span> Tentang
            </button>
            <button
              onClick={() => handleNavClick('karir')}
              className="px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#8F909A] hover:text-white transition-colors rounded-full hover:bg-white/[0.05] cursor-pointer"
            >
              <span className="text-[#C6FF3D]/80 mr-1">03</span> Karir
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#8F909A] hover:text-white transition-colors rounded-full hover:bg-white/[0.05] cursor-pointer"
            >
              <span className="text-[#C6FF3D]/80 mr-1">04</span> Kontak
            </button>
          </nav>

          {/* Right Side: Status Badge & CTA */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF3D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF3D]"></span>
              </span>
              <span>Tersedia Q3/Q4</span>
            </div>

            <button
              onClick={() => handleNavClick('kontak')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C6FF3D] text-[#0A0A0C] text-xs font-bold hover:bg-[#B5F228] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-[0_0_15px_rgba(198,255,61,0.25)]"
            >
              <span>Ayo Ngobrol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                triggerHaptic('light');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Buka Menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#121216]/98 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavClick('proyek')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.05] cursor-pointer flex items-center"
              >
                <span className="text-[#C6FF3D] mr-2">01</span> Proyek Unggulan
              </button>
              <button
                onClick={() => handleNavClick('tentang')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.05] cursor-pointer flex items-center"
              >
                <span className="text-[#C6FF3D] mr-2">02</span> Tentang Saya
              </button>
              <button
                onClick={() => handleNavClick('karir')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.05] cursor-pointer flex items-center"
              >
                <span className="text-[#C6FF3D] mr-2">03</span> Jejak Karir
              </button>
              <button
                onClick={() => handleNavClick('kontak')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.05] cursor-pointer flex items-center"
              >
                <span className="text-[#C6FF3D] mr-2">04</span> Kontak & Kolaborasi
              </button>

              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 px-3">
                <span>Status Kolaborasi:</span>
                <span className="text-[#C6FF3D] flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF3D] animate-pulse"></span>
                  Terbuka
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
