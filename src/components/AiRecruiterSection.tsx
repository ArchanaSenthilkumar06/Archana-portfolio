import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RotateCcw, AlertTriangle, Sparkles, CheckCircle2, HelpCircle, Terminal, Key } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  error?: boolean;
  setupGuide?: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  fallbackAnswer?: string;
}

interface ServerStatus {
  status: string;
  provider: string;
  configured: boolean;
  model: string;
  candidate: string;
}

const SUGGESTED_QUESTIONS = [
  "What are Archana's strongest technical skills?",
  "Explain Career Craft AI.",
  "What problem does BHUMI-NET solve?",
  "Tell me about her full-stack development experience.",
  "What certifications and achievements are listed?",
  "Where can I find her GitHub projects?"
];

export const AiRecruiterSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hi! I'm Archana's AI Recruiter. Ask me about her technical skills, engineering projects, achievements, education, or internship experience. Everything I provide is verified from her actual academic and project records.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check backend recruiter status on mount
  useEffect(() => {
    async function checkStatus() {
      try {
        setCheckingStatus(true);
        const res = await fetch('/api/ai-recruiter/status');
        if (res.ok) {
          const data = await res.json();
          setServerStatus(data);
        }
      } catch (err) {
        console.error('Failed to query recruiter status:', err);
      } finally {
        setCheckingStatus(false);
      }
    }
    checkStatus();
  }, []);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        role: 'user',
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Format sanitized history for the backend
    const sanitizedHistory = newMessages
      .filter((m) => !m.error)
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch('/api/ai-recruiter/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: sanitizedHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'API_KEY_REQUIRED') {
          setMessages((prev) => [
            ...prev,
            {
              id: `err-${Date.now()}`,
              role: 'assistant',
              content: data.message,
              error: true,
              setupGuide: data.setupGuide,
              fallbackAnswer: data.fallbackAnswer,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `err-${Date.now()}`,
              role: 'assistant',
              content: data.message || 'Unable to contact the AI Recruiter service right now.',
              error: true,
              fallbackAnswer: data.fallbackAnswer,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Network connection error while contacting /api/ai-recruiter/chat. Please ensure the backend server is running.',
          error: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          "Conversation restarted. Ask me anything regarding Archana's engineering background, projects, or credentials.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <section id="ai-recruiter" className="py-24 relative bg-transparent border-t border-[#E11D48]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B081A]/50 border border-[#E11D48]/30 text-xs font-mono text-[#FDA4AF] uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-[#E11D48]" />
            Real AI Agent Integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-[#E11D48]">
              Recruiter Assistant
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            Interview Archana's verified credentials in real-time. Grounded strictly in her resume, projects, and actual technical contributions.
          </p>
        </div>

        {/* Recruiter Interface Card */}
        <div className="burgundy-glass-card rounded-3xl border border-[#E11D48]/30 overflow-hidden shadow-2xl flex flex-col h-[700px] max-h-[85vh]">
          
          {/* Chat Window Top Bar */}
          <div className="bg-[#140A10]/95 px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Futuristic Mascot Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E11D48] via-[#6D102D] to-[#3B081A] flex items-center justify-center text-white shadow-md shadow-[#E11D48]/30">
                  <Bot className="w-5 h-5 text-rose-100" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#140A10] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Archana's AI Recruiter
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3B081A] text-rose-300 border border-[#E11D48]/30">
                    Official OpenAI SDK
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Strict Factual Integrity • No Fabrications</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48]"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#090508]/80 subtle-grid-bg">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[88%] sm:max-w-[80%] text-sm leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white rounded-br-none border border-[#E11D48]/40'
                        : msg.error
                        ? 'bg-[#220D12] text-rose-200 border border-rose-800/60 rounded-bl-none'
                        : 'bg-[#160E15] text-zinc-200 border border-zinc-800 rounded-bl-none'
                    }`}
                  >
                    {/* Header for assistant */}
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-rose-300">
                        <Bot className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>AI Recruiter</span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Setup Guide Banner when API Key is missing */}
                    {msg.setupGuide && (
                      <div className="mt-3 p-3 rounded-xl bg-[#14080E] border border-rose-900/60 text-xs space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400">
                          <Key className="w-3.5 h-3.5" />
                          <span>To Enable Dynamic OpenAI Responses in VS Code / Server:</span>
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-zinc-300 font-mono text-[11px]">
                          <li>{msg.setupGuide.step1}</li>
                          <li>{msg.setupGuide.step2}</li>
                          <li>{msg.setupGuide.step3}</li>
                          <li>{msg.setupGuide.step4}</li>
                        </ol>
                      </div>
                    )}

                    {/* Fallback verified facts display */}
                    {msg.fallbackAnswer && (
                      <div className="mt-3 p-3 rounded-xl bg-[#1A0E18] border border-[#E11D48]/30 text-xs space-y-1">
                        <div className="flex items-center gap-1 font-semibold text-[#FDA4AF]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Portfolio Fact:</span>
                        </div>
                        <p className="text-zinc-200 text-xs">{msg.fallbackAnswer}</p>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono p-2">
                <div className="w-7 h-7 rounded-lg bg-[#3B081A] flex items-center justify-center text-[#E11D48]">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="flex items-center gap-1">
                  <span>Synthesizing verified facts</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Shelf */}
          <div className="px-4 py-2.5 bg-[#100A0E] border-t border-zinc-800/80 overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap scrollbar-none">
              <span className="text-[11px] font-mono text-zinc-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E11D48]" />
                Prompt ideas:
              </span>
              {SUGGESTED_QUESTIONS.map((question, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => handleSend(question)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg text-xs bg-[#190F17] hover:bg-[#251522] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E11D48]/40 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E11D48] shrink-0 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box Footer */}
          <div className="p-4 bg-[#140A10] border-t border-zinc-800 flex items-center gap-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Archana's skills, projects, or background (Press Enter to send)..."
              disabled={isLoading}
              className="flex-1 bg-[#090508] text-white text-base sm:text-sm rounded-xl px-4 py-3 min-h-[44px] border border-zinc-800 focus:border-[#E11D48] focus:outline-none focus:ring-1 focus:ring-[#E11D48] placeholder-zinc-500 resize-none max-h-24 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[#6D102D] to-[#E11D48] text-white font-medium text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#E11D48]/30 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              aria-label="Send query to AI Recruiter"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Server & AI Integration Status Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 px-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Endpoint: POST /api/ai-recruiter/chat</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Provider: OpenAI SDK ({serverStatus?.model || 'gpt-4o-mini'})</span>
          </div>
        </div>

      </div>
    </section>
  );
};
