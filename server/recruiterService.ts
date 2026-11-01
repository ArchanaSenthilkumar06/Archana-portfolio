import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import verifiedKnowledge from './data/portfolio.json' with { type: 'json' };

export const SYSTEM_PROMPT = `You are the official AI Recruiter for Archana S., an Artificial Intelligence and Data Science engineering student at M. Kumarasamy College of Engineering (B.Tech 2024–2028, CGPA 7.9).

Your objective is to answer recruiters, engineers, and technical interviewers about Archana's technical skills, projects, achievements, internship experience, and education.

STRICT ACCURACY RULES:
1. ONLY state facts present in the verified portfolio knowledge below.
2. DO NOT invent, extrapolate, or fabricate any jobs, roles, companies, dates, credentials, or project metrics.
3. If asked about something NOT in the verified knowledge (e.g., "Has she worked at Google?", "What is her salary?", "Can she build quantum algorithms?"), honestly state: "That information is not documented in Archana's verified portfolio. You can connect directly with Archana at itsachu06@gmail.com or via LinkedIn (https://www.linkedin.com/in/archanas06/)."
4. When discussing projects:
   - BHUMI-NET: An IoT-based emergency communication and worker-monitoring system prototype using ESP32, MAX30102, SIM800L. Emphasize that it is a working hardware/software prototype for subterranean/hazard zones, not a commercially deployed government system. Live demo: https://bhumi-software.vercel.app. Repository: https://github.com/ArchanaSenthilkumar06/BHUMI-SOFTWARE.git
   - Career Craft AI: A full-stack AI career guidance and resume analysis platform with React, TypeScript, Node.js, Express, MongoDB (database: careercraft_ai), and Gemini API. Note: it helps identify keyword gaps and resume improvements; it does NOT claim an official ATS score or guaranteed hiring.
   - Mind Mate AI: Adaptive student learning assistant analyzing learner patterns (planner, procrastinator, AI learner, self-studier). Repository: https://github.com/ArchanaSenthilkumar06/Mind-Mate-AI.git
   - Banking Simulation Management System: Java, Spring Boot, MySQL, three-tier architecture, SHA-256 and OTP authentication, developed during Infosys Springboard internship. Repository: https://github.com/ArchanaSenthilkumar06/Banking-simulator1.git
   - GeoGuard AI: Rockfall prediction & alert system concept for open-pit mines using AI/ML risk classification. Repository: https://github.com/ArchanaSenthilkumar06/Mineguard-Rockfall-Prediction.git
   - Heart Disease Prediction: Clinical biomarker classification using Python, Scikit-learn, Pandas. Repository: https://github.com/ArchanaSenthilkumar06/HEART-DISEASE-PREDICTION.git
   - Emoji Usage in Festival Tweets: NLP and sentiment analysis on festival tweets using Python. Repository: https://github.com/ArchanaSenthilkumar06/Emoji-usage-in-festival-tweets.git
5. Education: M. Kumarasamy College of Engineering, B.Tech AI & DS, 2024–2028, CGPA 7.9 (through 4th semester).
6. Internship: Java Full Stack Intern at Infosys Springboard (Oct–Dec 2025).
7. Achievements: 1st Place IGNITRIX Hackathon, Outstanding Performance GDG Cloud Kochi Code Vipassana Season 14, Exceptional Performance Season 13, TCS CodeVita Season XIII Global Rank 1933, Winner National Children's Science Congress.
8. Maintain a professional, polite, concise, and enthusiastic recruiter tone. Highlight her real technical depth in Java (Intermediate), Python (Proficient), Spring Boot, MySQL, and AI/ML.

VERIFIED KNOWLEDGE BASE:
${JSON.stringify(verifiedKnowledge, null, 2)}`;

export function getRecruiterStatus() {
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();

  const hasOpenAi = Boolean(openAiKey && openAiKey.length > 10);
  const hasGemini = Boolean(geminiKey && geminiKey.length > 10);
  const configured = hasOpenAi || hasGemini;

  const provider = hasOpenAi
    ? 'OpenAI (Official SDK)'
    : hasGemini
    ? 'Google Gemini (Official SDK)'
    : 'Portfolio Knowledge Base';

  const model = hasOpenAi
    ? process.env.OPENAI_MODEL || 'gpt-4o-mini'
    : hasGemini
    ? process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
    : 'offline-facts';

  return {
    status: configured ? 'configured' : 'fallback',
    provider,
    configured,
    model,
    candidate: 'Archana S.',
    verifiedFactsCount: {
      projects: 7,
      achievements: 5,
      certifications: 8,
      education: 3
    }
  };
}

export function getQuickVerifiedAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('skill') || q.includes('technolog')) {
    return "Verified Skills: Archana is proficient in Python and MySQL, with intermediate proficiency in Java and Spring Boot, and experience with Three-Tier Architecture and Generative AI (GenAI). Her developer tools include Git, GitHub, VS Code, and IntelliJ IDEA.";
  }
  if (q.includes('bhumi') || q.includes('iot')) {
    return "BHUMI-NET: An IoT-based emergency communication and worker-monitoring system for communication-denied environments (mining, disaster zones). Built with ESP32, MAX30102 pulse sensor, SIM800L GSM, real-time alerts, and a web dashboard. Live demo: https://bhumi-software.vercel.app | Repository: https://github.com/ArchanaSenthilkumar06/BHUMI-SOFTWARE.git";
  }
  if (q.includes('career') || q.includes('resume')) {
    return "Career Craft AI: An AI-powered full-stack career platform designed with React, TypeScript, Node.js, Express, and MongoDB (database: careercraft_ai). It compares resumes with job descriptions, identifies missing keywords, evaluates skill gaps, and provides personalized improvement suggestions.";
  }
  if (q.includes('intern') || q.includes('infosys') || q.includes('banking')) {
    return "Infosys Springboard Internship: Java Full Stack Intern (October–December 2025). Archana developed an enterprise Banking Simulation Management System using Java, Spring Boot, and MySQL with a three-tier architecture, SHA-256 and OTP authentication, atomic transactions, and mini-statement generation.";
  }
  if (q.includes('achieve') || q.includes('award') || q.includes('hackathon')) {
    return "Verified Achievements: 1st Place at IGNITRIX Hackathon, Outstanding Performance at GDG Cloud Kochi Code Vipassana Season 14, Exceptional Performance at Season 13, TCS CodeVita Season XIII Global Rank 1933, and Winner at National Children's Science Congress.";
  }
  if (q.includes('education') || q.includes('college') || q.includes('cgpa')) {
    return "Education: Archana is pursuing B.Tech in Artificial Intelligence and Data Science at M. Kumarasamy College of Engineering (2024–2028) with a verified CGPA of 7.9 through the 4th semester. She completed HSC with 85.1% and SSLC with 82.2%.";
  }
  return "Archana S. is an AI & Data Science engineering student at M. Kumarasamy College of Engineering with expertise in Java, Spring Boot, Python, MySQL, and GenAI. Connected live to provide verified technical insights.";
}

export async function processChatTurn(message: string, history: any[]) {
  if (!message || typeof message !== 'string') {
    return {
      statusCode: 400,
      data: { error: 'INVALID_REQUEST', message: 'A valid text prompt message is required.' }
    };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return {
      statusCode: 400,
      data: { error: 'EMPTY_MESSAGE', message: 'Message cannot be empty.' }
    };
  }

  if (trimmedMessage.length > 1000) {
    return {
      statusCode: 400,
      data: { error: 'MESSAGE_TOO_LONG', message: 'Please keep your question under 1,000 characters.' }
    };
  }

  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const hasOpenAi = Boolean(openAiKey && openAiKey.length > 10);
  const hasGemini = Boolean(geminiKey && geminiKey.length > 10);

  // If neither key is configured, provide fallback verified response
  if (!hasOpenAi && !hasGemini) {
    return {
      statusCode: 503,
      data: {
        error: 'API_KEY_REQUIRED',
        message:
          'The AI Recruiter requires an API key configured in your server environment (.env).',
        setupGuide: {
          step1: 'Add OPENAI_API_KEY in .env or configure GEMINI_API_KEY.',
          step2: 'Restart the development server (`npm run dev`).'
        },
        fallbackAnswer: getQuickVerifiedAnswer(trimmedMessage)
      }
    };
  }

  // Option 1: OpenAI
  if (hasOpenAi) {
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const openai = new OpenAI({ apiKey: openAiKey });

    const formattedMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    if (Array.isArray(history)) {
      const sanitizedHistory = history.slice(-6);
      for (const item of sanitizedHistory) {
        if (item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string') {
          formattedMessages.push({
            role: item.role,
            content: item.content.slice(0, 1000)
          });
        }
      }
    }

    formattedMessages.push({
      role: 'user',
      content: trimmedMessage
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const completion = await openai.chat.completions.create(
        {
          model,
          messages: formattedMessages,
          max_tokens: 650,
          temperature: 0.3
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      const reply = completion.choices[0]?.message?.content?.trim();
      if (!reply) {
        return {
          statusCode: 502,
          data: { error: 'EMPTY_RESPONSE', message: 'The AI provider returned an empty response.' }
        };
      }

      return {
        statusCode: 200,
        data: { reply, model, timestamp: new Date().toISOString() }
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const providerError = error instanceof OpenAI.APIError ? error : undefined;
      const isAuthError = providerError?.status === 401 || providerError?.code === 'invalid_api_key';
      const isOutOfCredits =
        providerError?.status === 429 &&
        (providerError.code === 'insufficient_quota' || providerError.type === 'insufficient_quota');
      const isRateLimited = providerError?.status === 429 && !isOutOfCredits;
      const message = isAuthError
        ? 'The configured OpenAI API key was rejected. Check or replace it in your server .env file.'
        : isOutOfCredits
        ? 'The OpenAI API account has no credits available. Add API billing credits or adjust its usage limit, then try again.'
        : isRateLimited
        ? 'The OpenAI API rate limit was reached. Please wait a moment and try again.'
        : 'The AI provider could not complete the request. Please try again later.';

      console.error('OpenAI chat completion failed', {
        status: providerError?.status,
        code: providerError?.code,
        type: providerError?.type
      });

      return {
        statusCode: isAuthError ? 401 : isOutOfCredits || isRateLimited ? 503 : 502,
        data: {
          error: isAuthError
            ? 'INVALID_API_KEY'
            : isOutOfCredits
            ? 'OPENAI_CREDITS_EXHAUSTED'
            : isRateLimited
            ? 'OPENAI_RATE_LIMITED'
            : 'AI_SERVICE_ERROR',
          message,
          fallbackAnswer: getQuickVerifiedAnswer(trimmedMessage)
        }
      };
    }
  }

  // Option 2: Google Gemini (Built-in environment key)
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const ai = new GoogleGenAI();

    const contents: any[] = [];
    if (Array.isArray(history)) {
      const sanitizedHistory = history.slice(-6);
      for (const item of sanitizedHistory) {
        if (item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string') {
          contents.push({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.content.slice(0, 1000) }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }]
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 650,
        temperature: 0.3
      }
    });

    const reply = response.text?.trim();
    if (!reply) {
      return {
        statusCode: 502,
        data: { error: 'EMPTY_RESPONSE', message: 'The AI provider returned an empty response.' }
      };
    }

    return {
      statusCode: 200,
      data: { reply, model, timestamp: new Date().toISOString() }
    };
  } catch (error: any) {
    console.error('Gemini error:', error);
    return {
      statusCode: 500,
      data: {
        error: 'AI_SERVICE_ERROR',
        message: 'An error occurred with the AI service. Using verified facts.',
        fallbackAnswer: getQuickVerifiedAnswer(trimmedMessage)
      }
    };
  }
}
