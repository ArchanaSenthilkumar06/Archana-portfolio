import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { ShieldCheck, Award, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filterTabs = ['All', 'Certification', 'Presentation', 'Participation'];

  const filteredItems =
    filter === 'All'
      ? CERTIFICATIONS_DATA
      : CERTIFICATIONS_DATA.filter((item) => item.category === filter);

  return (
    <section id="certifications" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E11D48]" />
            Continuous Learning
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications, Papers &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Presentations
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Professional certifications and research symposium presentations documented in Archana's academic record.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] ${
                filter === tab
                  ? 'bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white shadow-md shadow-[#E11D48]/30 border border-[#E11D48]/50'
                  : 'bg-[#141115] text-zinc-400 hover:text-white hover:bg-[#1E171E] border border-zinc-800'
              }`}
            >
              {tab === 'All' ? 'All Credentials' : `${tab}s`}
            </button>
          ))}
        </div>

        {/* Grid of Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((cert, idx) => (
            <div
              key={idx}
              className="burgundy-glass-card rounded-2xl p-5 flex flex-col justify-between border border-[#E11D48]/15 hover:border-[#E11D48]/40 transition-all hover:-translate-y-0.5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#3B081A]/60 border border-[#E11D48]/30 flex items-center justify-center text-[#FDA4AF]">
                    {cert.category === 'Certification' ? (
                      <Award className="w-4 h-4 text-[#E11D48]" />
                    ) : cert.category === 'Presentation' ? (
                      <FileText className="w-4 h-4 text-rose-300" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#140E14] text-zinc-400 border border-zinc-800">
                    {cert.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-100 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-rose-300 font-medium mt-1">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{cert.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center text-xs font-mono text-zinc-500">
          * Displayed credentials are strictly sourced from Archana's verified resume without invented verification codes or mock links.
        </div>

      </div>
    </section>
  );
};
