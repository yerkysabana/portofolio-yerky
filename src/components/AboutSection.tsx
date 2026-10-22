import React, { useState } from 'react';
import { metricsData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const stackItems = [
    'React JS & Next.js',
    'TypeScript & JS',
    'React Native & Expo',
    'Tailwind CSS',
    'REST API Integration',
    'Turborepo Monorepo',
    'PHP & MySQL',
    'Python & OpenCV',
  ];

  return (
    <section id="tentang" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Editorial Section Info */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[#C6FF3D] tracking-[0.2em] uppercase">
              02 / TENTANG SAYA
            </span>
            <span className="h-px w-8 bg-[#C6FF3D]/40"></span>
          </div>

          <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
            Filosofi Desain, <br />
            Kode Bersih, <br />
            <span className="text-[#C6FF3D]">& Dampak Nyata.</span>
          </h2>

          <div className="mt-8 space-y-4 text-[#8F909A] text-sm sm:text-base leading-relaxed">
            <p>
              Saya memandang desain bukan sekadar hiasan visual, melainkan instrumen pemecahan
              masalah bisnis yang paling tajam. Setiap piksel dan baris kode dibangun dengan sengaja.
            </p>
            <p>
              Dengan latar belakang ganda di bidang UI/UX dan Rekayasa Frontend, saya menjembatani
              kesenjangan antara estetika artistik dan realitas teknis performa web dan mobile.
            </p>
          </div>

          {/* Quick Skills Pills */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-wider text-white mb-3">
              Stack & Alat Utama:
            </p>
            <div className="flex flex-wrap gap-2">
              {stackItems.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 hover:border-[#C6FF3D]/50 hover:text-white transition-colors select-none"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Bento Metric & Principle Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metricsData.map((metric, idx) => {
            const pos = mousePos[idx] || { x: -200, y: -200 };

            return (
              <div
                key={metric.label}
                onMouseMove={(e) => handleMouseMove(idx, e)}
                style={
                  {
                    '--mouse-x': `${pos.x}px`,
                    '--mouse-y': `${pos.y}px`,
                  } as React.CSSProperties
                }
                className="spotlight-card rounded-2xl bg-[#121216] border border-white/10 p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
              >
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    metric.highlight ? 'text-[#C6FF3D]' : 'text-[#8F909A]'
                  }`}
                >
                  {metric.label}
                </span>

                <div className="my-4">
                  <p
                    className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-mono ${
                      metric.highlight ? 'text-[#C6FF3D]' : 'text-white'
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      metric.label === 'Fokus Utama' ? 'text-[#C6FF3D] font-mono text-xs' : 'text-zinc-300'
                    }`}
                  >
                    {metric.sublabel}
                  </p>
                </div>

                <p className="text-xs text-[#8F909A] leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
