import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Cpu, Server, Network, Compass, GraduationCap, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      description:
        'Designing predictive models, behavioral student analytics, and generative AI systems with an emphasis on practical reasoning and ethical deployment.'
    },
    {
      icon: Server,
      title: 'Full-Stack & Three-Tier Architecture',
      description:
        'Developing robust enterprise backends using Java, Spring Boot, and MySQL with secure SHA-256 / OTP authentication and clean separation of concerns.'
    },
    {
      icon: Network,
      title: 'IoT & Emergency Telemetry',
      description:
        'Prototyping responsive hardware-to-cloud systems using ESP32, optical biometric sensors, and GSM beacons for communication-denied hazard zones.'
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Systems for the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Real World
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Bridging algorithmic intelligence, modern enterprise architectures, and physical computing.
          </p>
        </div>

        {/* Bio Card & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main narrative */}
          <div className="lg:col-span-8 burgundy-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6D102D]/40 border border-[#E11D48]/30 flex items-center justify-center text-[#FDA4AF]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Undergraduate Engineering Candidate</h3>
                  <p className="text-xs text-rose-300 font-mono">M. Kumarasamy College of Engineering (2024–2028)</p>
                </div>
              </div>

              <blockquote className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal pl-4 border-l-2 border-[#E11D48]">
                "{PERSONAL_INFO.shortBio}"
              </blockquote>

              <p className="text-sm text-zinc-400 leading-relaxed">
                As an Artificial Intelligence and Data Science undergraduate, my approach centers on combining methodical computer science foundations with hands-on systems building. From architecting transactional banking services in Spring Boot during my Infosys Springboard internship, to prototyping hardware emergency communication networks (BHUMI-NET), my focus is on dependable, verified implementation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>Emphasis on verified, testable code</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>3-Tier Enterprise Design & REST APIs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>Practical GenAI & Machine Learning models</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                  <span>Algorithmic problem solving (TCS CodeVita 1933)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="burgundy-glass-card rounded-2xl p-5 flex flex-col justify-center border border-[#E11D48]/15"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-[#FDA4AF]">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="burgundy-glass-card rounded-2xl p-6 space-y-4 hover:border-[#E11D48]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B081A] to-[#140A10] border border-[#E11D48]/30 flex items-center justify-center text-[#FDA4AF] group-hover:scale-105 group-hover:border-[#E11D48] transition-all">
                  <Icon className="w-6 h-6 text-[#E11D48]" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-100 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
