import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-[#E11D48]" />
            Professional Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Internship &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Industry Practice
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified corporate training and hands-on enterprise software development.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="burgundy-glass-card rounded-3xl p-6 sm:p-8 border border-[#E11D48]/25 hover:border-[#E11D48]/40 transition-all relative overflow-hidden"
            >
              {/* Subtle crimson accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6D102D] via-[#E11D48] to-rose-300" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#3B081A] text-rose-300 border border-[#E11D48]/30">
                    {exp.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
                    {exp.organization}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 space-y-4">
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300">
                    Core Engineering Contributions
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.keyContributions.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#E11D48] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="pt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 mr-2">Tech Stack:</span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#140E14] text-zinc-200 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
