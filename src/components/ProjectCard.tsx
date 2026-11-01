import React from 'react';
import { Project } from '../data/portfolioData';
import { ExternalLink, Github, Eye, Sparkles, Terminal, Radio } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <div className="burgundy-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group border border-[#E11D48]/15 hover:border-[#E11D48]/40">
      
      {/* Top Header */}
      <div className="space-y-4">
        
        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#3B081A]/60 text-[#FDA4AF] border border-[#E11D48]/30">
            {project.category}
          </span>
          
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            {project.status === 'Live' ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo
              </span>
            ) : project.status === 'In Progress' ? (
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                In Progress
              </span>
            ) : project.status === 'Prototype' ? (
              <span className="flex items-center gap-1.5 text-rose-300">
                <Radio className="w-3 h-3 text-[#E11D48]" />
                Prototype
              </span>
            ) : (
              <span className="text-zinc-400">Research</span>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-rose-100 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs text-rose-300/80 font-medium mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Key Highlights
          </div>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                <span className="w-1 h-1 rounded-full bg-[#E11D48] mt-1.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#140E14] text-zinc-300 border border-zinc-800"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#140E14] text-zinc-500 border border-zinc-800">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(project)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B081A]/40 hover:bg-[#3B081A] text-xs font-medium text-rose-200 border border-[#E11D48]/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
        >
          <Eye className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>View Details</span>
        </button>

        <div className="flex items-center gap-2">
          {/* GitHub Repository Button */}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-300 hover:text-white bg-[#140E14] hover:bg-[#1E141E] rounded-lg border border-zinc-800 hover:border-[#E11D48]/50 transition-colors"
              title="View GitHub Repository"
              aria-label={`GitHub Repository for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          ) : (
            <span
              className="px-2 py-1 rounded text-[10px] font-mono text-zinc-500 bg-[#140E14] border border-zinc-900 cursor-not-allowed"
              title="Repository link not yet public"
            >
              Repo Soon
            </span>
          )}

          {/* Live Demo Button */}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white text-xs font-semibold shadow-sm shadow-[#E11D48]/20 hover:scale-105 transition-all"
              title="Open Live Demonstration"
              aria-label={`Live Demo for ${project.title}`}
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
};
