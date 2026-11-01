import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRecruiterStatus, processChatTurn } from './server/recruiterService.ts';
import verifiedKnowledge from './server/data/portfolio.json' with { type: 'json' };

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '64kb' }));

// Basic in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const rateLimiter = (req: Request, res: Response, next: () => void) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 40;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (entry.count >= maxRequests) {
    return res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please wait a minute before sending more inquiries.'
    });
  }

  entry.count += 1;
  next();
};

// 1. Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    environment: isProd ? 'production' : 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// 2. Verified portfolio data endpoint
app.get('/api/portfolio', (_req: Request, res: Response) => {
  res.json(verifiedKnowledge);
});

// 3. AI Recruiter status endpoint
app.get('/api/ai-recruiter/status', (_req: Request, res: Response) => {
  res.json(getRecruiterStatus());
});

// 4. AI Recruiter live chat turn endpoint
app.post('/api/ai-recruiter/chat', rateLimiter, async (req: Request, res: Response) => {
  const { message, history } = req.body;
  const result = await processChatTurn(message, history);
  res.status(result.statusCode).json(result.data);
});

// 5. Contact message dispatch endpoint
app.post('/api/contact', rateLimiter, async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'INVALID_NAME', message: 'Your name is required.' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'INVALID_EMAIL', message: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'INVALID_MESSAGE', message: 'Please provide a message.' });
  }

  const senderName = name.trim().slice(0, 100);
  const senderEmail = email.trim().slice(0, 150);
  const emailSubject =
    (typeof subject === 'string' ? subject.trim() : '').replace(/[\r\n]+/g, ' ').slice(0, 200) ||
    'Portfolio Inquiry';
  const emailMessage = message.trim().slice(0, 3000);
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();

  if (!resendApiKey || !fromEmail || !recipient) {
    return res.status(503).json({
      error: 'EMAIL_NOT_CONFIGURED',
      message:
        'Contact email delivery is not configured yet. Please email Archana directly at itsachu06@gmail.com.'
    });
  }

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return entities[character];
    });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        reply_to: `${senderName} <${senderEmail}>`,
        subject: emailSubject,
        text: `From: ${senderName} <${senderEmail}>\n\n${emailMessage}`,
        html: `<p><strong>From:</strong> ${escapeHtml(senderName)} &lt;${escapeHtml(senderEmail)}&gt;</p><p>${escapeHtml(emailMessage).replace(/\n/g, '<br>')}</p>`
      }),
      signal: controller.signal
    });

    const result = await response.json();
    if (!response.ok) {
      const errorName =
        typeof result === 'object' &&
        result !== null &&
        'name' in result &&
        typeof result.name === 'string'
          ? result.name
          : undefined;
      console.error('[Contact Email] Resend rejected the message', {
        status: response.status,
        error: errorName
      });
      return res.status(502).json({
        error: 'EMAIL_DELIVERY_FAILED',
        message:
          'The email provider could not deliver this message. Please try again later or email Archana directly at itsachu06@gmail.com.'
      });
    }

    console.log('[Contact Email] Message accepted by Resend');
    return res.status(200).json({
      success: true,
      message: 'Your message was sent to Archana’s email inbox.'
    });
  } catch (error: unknown) {
    console.error('[Contact Email] Resend request failed', {
      error: error instanceof Error ? error.name : 'UnknownError'
    });
    return res.status(502).json({
      error: 'EMAIL_DELIVERY_FAILED',
      message:
        'The email provider could not be reached. Please try again later or email Archana directly at itsachu06@gmail.com.'
    });
  } finally {
    clearTimeout(timeoutId);
  }
});

// Development with Vite or production static serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Recruiter Portfolio Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Startup Error]:', err);
  process.exit(1);
});
