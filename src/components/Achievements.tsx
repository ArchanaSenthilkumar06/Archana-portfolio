import React from 'react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Trophy, Award, Flame, Globe2, Star, CheckCircle } from 'lucide-react';

export const Achievements: React.FC = () => {
  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'Hackathon':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Community':
        return <Award className="w-5 h-5 text-rose-400" />;
      case 'Competition':
        return <Globe2 className="w-5 h-5 text-sky-400" />;
      case 'National':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      default:
        return <Star className="w-5 h-5 text-rose-300" />;
    }
  };

  return (
    <section id="achievements" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-[#E11D48]" />
            Honors & Distinctions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Achievements &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Competitive Recognitions
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified competitive programming rankings, hackathon victories, and developer community recognitions.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              className="burgundy-glass-card rounded-2xl p-6 flex flex-col justify-between border border-[#E11D48]/15 hover:border-[#E11D48]/45 transition-all group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#3B081A]/70 border border-[#E11D48]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getBadgeIcon(ach.category)}
                  </div>
                  {ach.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E11D48]/20 text-[#FDA4AF] border border-[#E11D48]/30">
                      {ach.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-100 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-mono text-rose-300 mt-1">
                    {ach.organization}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Resume Achievement</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
