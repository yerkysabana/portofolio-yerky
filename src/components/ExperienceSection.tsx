import React from 'react';
import { experiencesData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="karir" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-[#C6FF3D] tracking-[0.2em] uppercase">
          03 / PERJALANAN
        </span>
        <span className="h-px w-8 bg-[#C6FF3D]/40"></span>
      </div>

      <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase mb-12">
        Pengalaman Profesional
      </h2>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {experiencesData.map((exp, index) => (
          <div
            key={index}
            className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-white/[0.015] px-4 -mx-4 rounded-xl transition-colors duration-200"
          >
            <div className="md:col-span-3">
              <span
                className={`text-xs font-mono tracking-wider ${
                  index === 0 ? 'text-[#C6FF3D]' : 'text-zinc-400'
                }`}
              >
                {exp.period}
              </span>
              <p className="text-xs text-[#8F909A] mt-0.5">{exp.location}</p>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-bold text-lg text-white group-hover:text-[#C6FF3D] transition-colors">
                {exp.role}
              </h3>
              <p className="text-sm text-zinc-400">{exp.company}</p>
            </div>

            <div className="md:col-span-5 text-sm text-[#8F909A] leading-relaxed">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
