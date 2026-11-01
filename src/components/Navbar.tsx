import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenRecruiter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRecruiter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090609]/90 backdrop-blur-md border-b border-[#E11D48]/20 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded-lg p-1"
          aria-label="Archana S. Portfolio Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#6D102D] to-[#3B081A] flex items-center justify-center font-bold text-white text-base tracking-wider shadow-md shadow-[#E11D48]/30 group-hover:scale-105 transition-transform">
            AS
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white text-sm sm:text-base tracking-tight group-hover:text-[#FDA4AF] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              AI & Software
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* AI Recruiter Button */}
          <button
            onClick={onOpenRecruiter}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white hover:shadow-lg hover:shadow-[#E11D48]/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#E11D48]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Bot className="w-3.5 h-3.5 text-[#FDA4AF] group-hover:animate-pulse" />
            <span>AI Recruiter</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-300"></span>
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onOpenRecruiter}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E11D48] text-white"
            aria-label="Open AI Recruiter"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI Bot</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080509]/98 backdrop-blur-xl border-b border-[#E11D48]/25 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#6D102D]/30 active:bg-[#E11D48]/30 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRecruiter();
                }}
                className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl text-xs font-semibold bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white shadow-md shadow-[#E11D48]/25"
              >
                <Bot className="w-4 h-4" />
                <span>Launch Recruiter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
