import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Github, Linkedin, Copy, Check, Send, Sparkles, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject,
          message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Message delivered successfully! Archana will review it promptly.');
        setSenderName('');
        setSenderEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Failed to dispatch message. Please check the fields and try again.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Network connection issue. You can also write directly to itsachu06@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenMailto = () => {
    const mailtoSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${senderName || 'Recruiter/Colleague'}`
    );
    const bodyContent = encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\nMessage:\n${message}\n\n---\nSent via Archana S. Portfolio Website`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${bodyContent}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/40 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Together
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Open to engineering internships, technical collaborations, and intelligent systems discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="burgundy-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-[#E11D48]/20">
              <h3 className="text-xl font-bold text-white">Direct Communication</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Feel free to reach out directly via email or connect on LinkedIn and GitHub. I respond promptly to technical inquiries, project proposals, and recruiter discussions.
              </p>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-[#140E14] border border-zinc-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Primary Email
                </div>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-semibold text-rose-200 hover:text-white transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-[#3B081A]/60 text-zinc-300 hover:text-white border border-[#E11D48]/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48] shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location & Status Badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#140E14] border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3B081A] flex items-center justify-center text-[#E11D48]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-mono">Location</div>
                    <div className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open to Internships</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Professional Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#140E14] hover:bg-[#20151E] border border-zinc-800 hover:border-[#E11D48]/40 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
                  >
                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    <div>
                      <div className="text-xs font-semibold">GitHub</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Open-source</div>
                    </div>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#140E14] hover:bg-[#20151E] border border-zinc-800 hover:border-[#E11D48]/40 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
                  >
                    <Linkedin className="w-5 h-5 text-rose-300 group-hover:text-white transition-colors" />
                    <div>
                      <div className="text-xs font-semibold">LinkedIn</div>
                      <div className="text-[10px] text-zinc-500 font-mono">Professional</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form connected to backend /api/contact */}
          <div className="lg:col-span-7">
            <div className="burgundy-glass-card rounded-3xl p-6 sm:p-8 border border-[#E11D48]/20 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Inquiry</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Send your message directly to Archana's email inbox.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B081A]/60 border border-[#E11D48]/30 text-[11px] font-mono text-rose-300">
                  <Sparkles className="w-3 h-3 text-[#E11D48]" />
                  <span>POST /api/contact</span>
                </div>
              </div>

              {/* Status Banner */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/50 flex items-start gap-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-left">
                    <div className="text-sm font-semibold text-emerald-200">Email Sent</div>
                    <div className="text-xs text-emerald-300/90">{statusMessage}</div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-700/50 flex items-start gap-3 animate-in fade-in duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-left">
                    <div className="text-sm font-semibold text-rose-200">Delivery Notice</div>
                    <div className="text-xs text-rose-300/90">{statusMessage}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Connor / Engineering Lead"
                      className="w-full bg-[#100A0E] text-white text-base sm:text-sm rounded-xl px-4 py-3 min-h-[44px] border border-zinc-800 focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48] placeholder-zinc-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#100A0E] text-white text-base sm:text-sm rounded-xl px-4 py-3 min-h-[44px] border border-zinc-800 focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48] placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AI / Full Stack Opportunity at TechCorp"
                    className="w-full bg-[#100A0E] text-white text-base sm:text-sm rounded-xl px-4 py-3 min-h-[44px] border border-zinc-800 focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48] placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message or inquiry here..."
                    className="w-full bg-[#100A0E] text-white text-base sm:text-sm rounded-xl px-4 py-3 border border-zinc-800 focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48] placeholder-zinc-600 resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    className="text-xs font-mono text-zinc-400 hover:text-rose-300 underline text-left transition-colors"
                  >
                    Or compose in email client (itsachu06@gmail.com)
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6D102D] via-[#E11D48] to-[#E11D48] text-white font-semibold text-sm shadow-md shadow-[#E11D48]/30 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
                  >
                    <span>{isSubmitting ? 'Delivering...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
