import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();

  if (!gmailUser || !gmailAppPassword || !recipient) {
    return res.status(503).json({
      error: 'EMAIL_NOT_CONFIGURED',
      message:
        'Email delivery is not configured yet. Please email Archana directly at itsachu06@gmail.com.'
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

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailAppPassword },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000
    });
    const info = await transporter.sendMail({
      from: gmailUser,
      to: recipient,
      replyTo: { name: senderName, address: senderEmail },
      subject: emailSubject,
      text: `From: ${senderName} <${senderEmail}>\n\n${emailMessage}`,
      html: `<p><strong>From:</strong> ${escapeHtml(senderName)} &lt;${escapeHtml(senderEmail)}&gt;</p><p>${escapeHtml(emailMessage).replace(/\n/g, '<br>')}</p>`
    });

    console.log(`[Contact Email] Message sent with ID ${info.messageId}`);
    return res.status(200).json({
      success: true,
      message: 'Your message was sent to Archana’s email inbox.'
    });
  } catch (error: unknown) {
    const mailErrorCode =
      typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string'
        ? error.code
        : undefined;
    const responseCode =
      typeof error === 'object' &&
      error !== null &&
      'responseCode' in error &&
      typeof error.responseCode === 'number'
        ? error.responseCode
        : undefined;
    console.error('[Contact Email] Gmail delivery failed', {
      code: mailErrorCode,
      responseCode
    });
    return res.status(502).json({
      error: 'EMAIL_DELIVERY_FAILED',
      message:
        'The email could not be sent right now. Please try again later or email Archana directly at itsachu06@gmail.com.'
    });
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
