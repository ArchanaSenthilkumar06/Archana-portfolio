import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-[#E11D48]" />
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Academic History
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified academic milestones in Artificial Intelligence, Data Science, and foundational sciences.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu, idx) => {
            const isCollege = idx === 0;
            return (
              <div
                key={idx}
                className={`burgundy-glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
                  isCollege
                    ? 'border-[#E11D48]/40 shadow-xl shadow-[#E11D48]/10'
                    : 'border-zinc-800 hover:border-[#E11D48]/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E11D48]" />
                      {edu.period}
                    </span>
                    {isCollege && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#3B081A] text-rose-300 border border-[#E11D48]/30">
                        Undergraduate
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-rose-200/90 mt-1">
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-zinc-600" />
                        {edu.location}
                      </p>
                    )}
                  </div>

                  {edu.details && (
                    <ul className="space-y-1.5 pt-2">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-zinc-400 leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Score Banner */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    {edu.scoreType}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#3B081A]/60 border border-[#E11D48]/30 text-rose-100 font-bold text-sm">
                    <Award className="w-4 h-4 text-[#E11D48]" />
                    <span>{edu.score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
