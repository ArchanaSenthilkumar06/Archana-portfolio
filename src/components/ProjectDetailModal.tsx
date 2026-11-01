import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, Layers, AlertCircle, CheckCircle, Database } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0E0A0E] border border-[#E11D48]/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#181016] text-zinc-400 hover:text-white hover:bg-[#3B081A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#3B081A] text-[#FDA4AF] border border-[#E11D48]/30">
              {project.category}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono ${
                project.status === 'Live'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                  : project.status === 'In Progress'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
              }`}
            >
              Status: {project.status}
            </span>
          </div>

          <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-rose-200/90">
            {project.subtitle}
          </p>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Detailed Overview
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.detailedOverview}
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#140E14] border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-[#E11D48]" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#140E14] border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Architected Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Database & Architecture Metadata (if present, e.g. Career Craft AI) */}
        {project.metadata && (
          <div className="p-4 rounded-xl bg-[#1C0E16] border border-[#E11D48]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
              <Database className="w-4 h-4 text-[#E11D48]" />
              <span>Database Architecture</span>
            </div>
            <div className="space-y-1 text-xs text-zinc-300 font-mono">
              {Object.entries(project.metadata).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <span className="text-zinc-400 font-semibold">{key}:</span>
                  <span className="text-rose-200">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Key Engineering Features
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Badges */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#181118] border border-[#E11D48]/20 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links Footer */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Demo */}
            {project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#E11D48]/30 hover:shadow-lg hover:scale-[1.02] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140E14] border border-zinc-800 text-zinc-500 text-xs font-mono cursor-not-allowed">
                <span>Demo Link Coming Soon</span>
              </div>
            )}

            {/* GitHub Repository */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#140E14] hover:bg-[#1E141E] text-zinc-200 hover:text-white border border-zinc-700 text-xs sm:text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140E14] border border-zinc-800 text-zinc-500 text-xs font-mono cursor-not-allowed">
                <span>Repository Coming Soon</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
