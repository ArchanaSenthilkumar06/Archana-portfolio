import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, Bot, ShieldCheck, Terminal, Award, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenRecruiter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRecruiter }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT COLUMN: Bio, Credentials and Actions */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B081A]/70 border border-[#E11D48]/35 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#FDA4AF] uppercase">
                {PERSONAL_INFO.eyebrow}
              </span>
            </div>

            {/* Main headings */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1] break-words">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-[#E11D48]">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl font-medium text-rose-100/90 tracking-tight">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            {/* Professional introduction */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              {PERSONAL_INFO.shortBio}
            </p>

            {/* Verified Credentials Pills */}
            <div className="flex flex-wrap gap-2 pt-1 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141115]/90 border border-zinc-800 text-xs text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                <span>B.Tech AI & Data Science (CGPA 7.9)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141115]/90 border border-zinc-800 text-xs text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Infosys Springboard Intern</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141115]/90 border border-zinc-800 text-xs text-zinc-300">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1st Place IGNITRIX</span>
              </div>
            </div>

            {/* Call to Actions & Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6D102D] via-[#E11D48] to-[#E11D48] text-white font-semibold text-sm shadow-lg shadow-[#E11D48]/25 hover:shadow-xl hover:shadow-[#E11D48]/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#141115] hover:bg-[#1C171C] text-zinc-200 hover:text-white font-medium text-sm border border-zinc-800 hover:border-[#E11D48]/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                <Mail className="w-4 h-4 text-[#FDA4AF]" />
                <span>Contact Me</span>
              </a>

              {/* Social links */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0 sm:ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white bg-[#141115] hover:bg-[#20151E] border border-zinc-800 hover:border-[#E11D48]/50 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                  aria-label="Visit Archana's GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white bg-[#141115] hover:bg-[#20151E] border border-zinc-800 hover:border-[#E11D48]/50 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                  aria-label="Visit Archana's LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* AI Recruiter Interactive Launch Banner */}
            <div className="pt-2 w-full max-w-lg">
              <button
                onClick={onOpenRecruiter}
                className="w-full text-left p-3.5 rounded-xl burgundy-glass hover:bg-[#1E1018] border border-[#E11D48]/30 transition-all flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#6D102D] to-[#E11D48] flex items-center justify-center text-white shadow-md shadow-[#E11D48]/30 group-hover:scale-105 transition-transform shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-rose-200 transition-colors flex items-center gap-1.5">
                      <span>Interactive AI Recruiter</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E11D48]/30 text-rose-300 font-mono">
                        Real AI
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 line-clamp-1 sm:line-clamp-none">
                      Query Archana's verified skills, projects, and achievements.
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#FDA4AF] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                  Launch <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Authentic Transparent Cutout Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-2 pb-0">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.95 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative flex items-center justify-center w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px]"
            >
              {/* Standalone Cutout Portrait with genuine Alpha Channel */}
              <img
                src="/images/archana-portfolio.png"
                alt="Professional portrait of Archana S."
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                }}
                className="w-full h-auto max-h-[420px] sm:max-h-[560px] lg:max-h-[680px] object-contain object-bottom select-none pointer-events-none filter contrast-[1.03]"
                loading="eager"
              />

              {/* Floating 3D AI Recruiter Mascot */}
              <motion.button
                onClick={onOpenRecruiter}
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 right-1 sm:right-4 z-20 group flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-[#140A10]/95 backdrop-blur-md border border-[#E11D48]/40 shadow-xl hover:border-[#E11D48] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                aria-label="Talk to AI Mascot"
              >
                <div className="relative">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#6D102D] via-[#E11D48] to-rose-400 flex items-center justify-center text-white shadow-md shadow-[#E11D48]/30 group-hover:scale-105 transition-transform">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
                </div>
                <div className="hidden xs:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white group-hover:text-rose-200 transition-colors flex items-center gap-1">
                    AI Recruiter
                    <Sparkles className="w-2.5 h-2.5 text-rose-300" />
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono">Ask about Archana</span>
                </div>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* GLOWING CRIMSON WAVES RIBBON AT THE BOTTOM (Matching image_35b86183.png reference) */}
      <div className="relative w-full overflow-hidden pointer-events-none -mt-8 sm:-mt-12 z-0">
        <svg
          viewBox="0 0 1920 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24 sm:h-32 lg:h-40 object-cover opacity-90"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="crimsonLineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E11D48" stopOpacity="0.0" />
              <stop offset="25%" stopColor="#E11D48" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FDA4AF" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#E11D48" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6D102D" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="waveFillBurgundy1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" stopOpacity="0.18" />
              <stop offset="45%" stopColor="#6D102D" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#090609" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="waveFillBurgundy2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9F1239" stopOpacity="0.14" />
              <stop offset="60%" stopColor="#3B081A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#090609" stopOpacity="0.0" />
            </linearGradient>

            <filter id="crimsonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M0,110 C360,70 680,140 1020,85 C1360,30 1680,115 1920,80 L1920,160 L0,160 Z"
            fill="url(#waveFillBurgundy2)"
          />

          <path
            d="M0,80 C320,30 640,110 960,65 C1280,20 1600,95 1920,55 L1920,160 L0,160 Z"
            fill="url(#waveFillBurgundy1)"
          />

          <path
            d="M0,110 C360,70 680,140 1020,85 C1360,30 1680,115 1920,80"
            stroke="url(#crimsonLineGlow)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          <path
            d="M0,80 C320,30 640,110 960,65 C1280,20 1600,95 1920,55"
            stroke="url(#crimsonLineGlow)"
            strokeWidth="2.2"
            filter="url(#crimsonGlowFilter)"
          />
        </svg>
      </div>
    </section>
  );
};
