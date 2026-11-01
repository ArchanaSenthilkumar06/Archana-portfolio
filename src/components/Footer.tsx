import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080509]/75 backdrop-blur-md border-t border-[#E11D48]/15 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] to-[#6D102D] flex items-center justify-center font-bold text-white text-base shadow-md shadow-[#E11D48]/30">
              AS
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {PERSONAL_INFO.role}
              </div>
            </div>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#140E14] text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#E11D48]/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#140E14] text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#E11D48]/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-[#140E14] text-zinc-400 hover:text-white border border-zinc-800 hover:border-[#E11D48]/40 transition-colors"
              aria-label="Email Archana"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#3B081A]/60 text-rose-300 hover:text-white border border-[#E11D48]/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
              aria-label="Scroll to top of page"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Archana S. — Engineered with verified facts and OpenAI Recruiter API.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Built for intelligent systems & real-world impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
