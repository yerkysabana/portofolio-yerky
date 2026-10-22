import React from 'react';
import { tickerSkills } from '../data/portfolioData';

export const MarqueeTicker: React.FC = () => {
  // Repeat array twice for seamless continuous scroll
  const items = [...tickerSkills, ...tickerSkills];

  return (
    <div className="border-y border-white/10 py-3.5 bg-[#0E0E12] overflow-hidden whitespace-nowrap relative select-none">
      <div className="inline-flex animate-marquee items-center gap-8 font-bold tracking-tight text-xs sm:text-sm uppercase text-zinc-400">
        {items.map((skill, index) => (
          <span key={index} className="flex items-center gap-3 shrink-0">
            <span className="text-[#C6FF3D] font-mono text-xs">◆</span>
            <span className="tracking-wider">{skill}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
