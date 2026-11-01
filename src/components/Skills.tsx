import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Sparkles, Database, Wrench, Layers, Lightbulb } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming Languages': <Code2 className="w-4 h-4 text-[#E11D48]" />,
    'Frameworks & Architecture': <Layers className="w-4 h-4 text-rose-400" />,
    'Generative AI & Machine Learning': <Sparkles className="w-4 h-4 text-pink-400" />,
    'Databases & Storage': <Database className="w-4 h-4 text-rose-300" />,
    'Developer Tools & Platforms': <Wrench className="w-4 h-4 text-amber-400" />,
    'Areas of Interest': <Lightbulb className="w-4 h-4 text-yellow-400" />,
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5 text-[#E11D48]" />
            Technical Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Domain Expertise
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Verified technical toolchain, languages, frameworks, and active engineering research domains.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white shadow-md shadow-[#E11D48]/30 border border-[#E11D48]/50'
                  : 'bg-[#141115] text-zinc-400 hover:text-white hover:bg-[#1E171E] border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((catGroup, idx) => (
            <div
              key={idx}
              className="burgundy-glass-card rounded-2xl p-6 flex flex-col justify-between border border-[#E11D48]/20 hover:border-[#E11D48]/40 transition-all space-y-5"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#3B081A]/60 border border-[#E11D48]/30">
                    {categoryIcons[catGroup.title] || <Code2 className="w-4 h-4 text-[#E11D48]" />}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {catGroup.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {catGroup.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {catGroup.skills.map((skill, sIdx) => {
                  const isHighlight = skill.highlight;
                  return (
                    <div
                      key={sIdx}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isHighlight
                          ? 'bg-[#3B081A]/70 text-white border border-[#E11D48]/40 shadow-sm shadow-[#E11D48]/20'
                          : 'bg-[#141115] text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      <span className={isHighlight ? 'font-semibold text-rose-100' : 'text-zinc-200'}>
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          skill.level === 'Proficient'
                            ? 'bg-[#E11D48]/20 text-[#FDA4AF]'
                            : skill.level === 'Intermediate'
                            ? 'bg-rose-950/60 text-rose-300'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Transparency */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-zinc-500">
            * Skill proficiencies are accurately categorized without arbitrary percentage meters.
          </p>
        </div>

      </div>
    </section>
  );
};
