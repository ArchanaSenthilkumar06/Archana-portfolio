import React from 'react';
import { CrimsonParticleBackground } from './components/CrimsonParticleBackground';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { AiRecruiterSection } from './components/AiRecruiterSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Bot } from 'lucide-react';

export default function App() {
  const handleScrollToRecruiter = () => {
    const el = document.getElementById('ai-recruiter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#10060D] text-[#F8FAFC] flex flex-col relative selection:bg-[#E11D48] selection:text-white">
      {/* Global Shared Crimson Particle Background (Inherited across entire app & all sections/routes) */}
      <CrimsonParticleBackground />

      {/* Interactive Pink Circular Cursor Glow */}
      <CursorGlow />

      {/* Navigation Bar */}
      <Navbar onOpenRecruiter={handleScrollToRecruiter} />

      {/* Foreground Main Content Sections - Transparent layouts allowing particle network to shine through */}
      <main className="flex-grow relative z-10">
        {/* Hero Section with Archana's Portrait and Credentials */}
        <Hero onOpenRecruiter={handleScrollToRecruiter} />

        {/* About Section */}
        <About />

        {/* Technical Skills & Competencies */}
        <Skills />

        {/* Project Showcase & Modals */}
        <Projects />

        {/* Experience & Infosys Springboard Internship */}
        <Experience />

        {/* Education & Academic Record */}
        <Education />

        {/* Achievements, Competitions & Hackathons */}
        <Achievements />

        {/* Certifications & Presentations */}
        <Certifications />

        {/* AI Recruiter Interactive Chat */}
        <AiRecruiterSection />

        {/* Direct Contact & Email Dispatch */}
        <Contact />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Persistent Floating AI Recruiter Launcher Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={handleScrollToRecruiter}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#6D102D] via-[#E11D48] to-[#E11D48] text-white text-xs font-semibold shadow-xl shadow-[#E11D48]/30 hover:shadow-2xl hover:shadow-[#E11D48]/50 hover:scale-105 active:scale-95 transition-all border border-rose-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Jump to AI Recruiter"
        >
          <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-rose-100 group-hover:rotate-12 transition-transform" />
          </div>
          <span>Talk to AI Recruiter</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-200"></span>
          </span>
        </button>
      </div>
    </div>
  );
}
