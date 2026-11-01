# Archana S. — Personal Developer Portfolio with AI Recruiter

A modern, responsive personal developer portfolio website for **Archana S.**, an Artificial Intelligence and Data Science engineering student at M. Kumarasamy College of Engineering (B.Tech 2024–2028, CGPA 7.9).

Featuring a futuristic dark burgundy & crimson aesthetic, verified project showcase, and a real AI Recruiter powered by Node.js, Express, and the official OpenAI SDK.

---

## 🚀 Key Features

- **Futuristic Visual Design**: Custom theme with near-black (`#090609`), deep burgundy (`#6D102D`), and vivid crimson (`#E11D48`) glows, typography in *Plus Jakarta Sans* and *JetBrains Mono*.
- **Authentic Hero Section**: Integrates Archana's verified professional portrait with subtle crimson rim-lighting, live status badges, and an independent AI mascot companion.
- **Project Showcase**:
  - **BHUMI-NET**: Emergency communication & worker monitoring network for communication-denied environments (ESP32, MAX30102, SIM800L). Live demo: [bhumi-software.vercel.app](https://bhumi-software.vercel.app)
  - **Career Craft AI**: AI-powered resume and job-description analysis platform (React, TypeScript, Node.js, Express, MongoDB database `careercraft_ai`, Gemini API).
  - **Mind Mate AI**: Adaptive student learning assistant analyzing learner patterns (planner, procrastinator, AI learner, self-studier). [GitHub Repository](https://github.com/ArchanaSenthilkumar06/Mind-Mate-AI.git)
  - **Banking Simulation Management System**: Infosys Springboard internship project utilizing Java, Spring Boot, and MySQL with 3-tier architecture, SHA-256 and OTP authentication. [GitHub Repository](https://github.com/ArchanaSenthilkumar06/Banking-simulator1.git)
  - **GeoGuard AI**: Rockfall prediction and open-pit mine alert system concept. [GitHub Repository](https://github.com/ArchanaSenthilkumar06/Mineguard-Rockfall-Prediction.git)
  - **Heart Disease Prediction**: Machine learning classification on clinical biomarkers with Scikit-learn. [GitHub Repository](https://github.com/ArchanaSenthilkumar06/HEART-DISEASE-PREDICTION.git)
  - **Emoji Usage in Festival Tweets**: NLP and emotional polarity analysis across festival tweets. [GitHub Repository](https://github.com/ArchanaSenthilkumar06/Emoji-usage-in-festival-tweets.git)
- **Zero Invented Links**: Links are strictly verified. When a project's repository or live demo is pending public release, a clean "Coming Soon" badge is displayed.
- **AI Recruiter Assistant**:
  - Real backend endpoint at `POST /api/ai-recruiter/chat` and `GET /api/ai-recruiter/status`.
  - Built with Node.js, Express, and the official OpenAI JavaScript SDK.
  - Sourced strictly from verified facts in `server/data/portfolio.json`.
  - Honest error handling: If `OPENAI_API_KEY` is not configured, provides explicit configuration instructions and verified fallback facts without fabricating answers.
  - Sliding-window rate limiting, input validation, conversation history pruning, and timeout handling.
- **Contact Form Email Delivery**:
  - Sends contact form submissions to `CONTACT_TO_EMAIL` using Gmail SMTP.
  - Requires a Gmail App Password stored in server-side environment variables; never expose it in frontend code or commit it.
- **Verified Credentials**:
  - Education: M. Kumarasamy College of Engineering (B.Tech AI & DS, 2024–2028, CGPA 7.9 through 4th semester), Bharani Park Matric (HSC 85.1%), Vivekanandha Matric (SSLC 82.2%).
  - Internship: Java Full Stack Intern at Infosys Springboard (Oct–Dec 2025).
  - Achievements: 1st Place IGNITRIX Hackathon, Outstanding Performance GDG Cloud Kochi Code Vipassana 14 & 13, TCS CodeVita Season XIII Global Rank 1933, Winner National Children's Science Congress.
  - Certifications: NPTEL Cryptography & Network Security, NPTEL Cloud Computing, Cisco Modern AI, Microsoft Cloud Computing, Infosys Springboard Java Foundation.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React icons, Motion.
- **Backend**: Node.js, Express, OpenAI SDK (`openai`), Nodemailer/Gmail SMTP, tsx, dotenv.
- **Storage / Knowledge**: `server/data/portfolio.json` & `src/data/portfolioData.ts`.

---

## 📂 Project Structure

```text
├── .env.example              # Environment variables template
├── index.html                # Entry point with Google Fonts and meta tags
├── metadata.json             # App metadata & capabilities
├── package.json              # Unified dependencies and scripts
├── server.ts                 # Express server with AI, Gmail contact email, and Vite middleware
├── server/
│   └── data/
│       └── portfolio.json    # Server-side verified knowledge base for AI Recruiter
├── public/
│   ├── images/
│   │   └── archana_portrait.png  # Archana's verified professional portrait
│   └── assets/
└── src/
    ├── data/
    │   └── portfolioData.ts  # Centralized editable portfolio configuration
    ├── components/
    │   ├── Navbar.tsx        # Navigation with mobile drawer and quick launcher
    │   ├── Hero.tsx          # Two-column layout with portrait and bio
    │   ├── About.tsx         # Resume narrative, stats, and engineering pillars
    │   ├── Skills.tsx        # Categorized competencies with proficiency tags
    │   ├── Projects.tsx      # Filterable project showcase
    │   ├── ProjectCard.tsx   # Project cards with verified link guards
    │   ├── ProjectDetailModal.tsx # Accessible project details modal
    │   ├── Experience.tsx    # Infosys Springboard internship & 3-tier architecture
    │   ├── Education.tsx     # College and schooling milestones
    │   ├── Achievements.tsx  # Hackathon wins and competitive programming rank
    │   ├── Certifications.tsx# Industry and academic certifications & papers
    │   ├── AiRecruiterSection.tsx # AI Recruiter interactive chat interface
    │   ├── Contact.tsx       # Verified direct contact and mail dispatcher
    │   └── Footer.tsx        # Footer with back-to-top button
    ├── App.tsx               # Main application container
    ├── index.css             # Tailwind base styles and custom glass effects
    └── main.tsx              # React DOM mounting
```

---

## ⚡ Quick Start (VS Code / Local Machine)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure:
```env
# Optional: Set your OpenAI API Key for dynamic AI Recruiter responses
OPENAI_API_KEY="sk-..."

# Configurable OpenAI model (default: gpt-4o-mini)
OPENAI_MODEL="gpt-4o-mini"

# Server Port (default: 3000)
PORT=3000

# Contact form Gmail delivery (use a Google App Password, not your Gmail password)
GMAIL_USER="your-gmail-address@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"
CONTACT_TO_EMAIL="itsachu06@gmail.com"
```
> **Note**: The portfolio frontend runs completely and beautifully without an API key! If `OPENAI_API_KEY` is omitted, the AI Recruiter will display a clear setup helper alongside verified facts, ensuring zero fabricated responses.

To enable contact form email delivery, enable 2-Step Verification on the Gmail account used for `GMAIL_USER`, create an App Password in your Google Account security settings, and put that app password in `GMAIL_APP_PASSWORD`. Set `CONTACT_TO_EMAIL` to the inbox that should receive messages. Do not use your regular Gmail password. Restart the server after changing `.env`; submissions will report an error rather than appear successful until mail is configured.

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🧪 Testing Performed

1. **Compilation & Type Checking**: Verified TypeScript clean build without errors via `tsc --noEmit`.
2. **Server API Validation**:
   - `GET /api/ai-recruiter/status` responds with server health and provider metadata.
   - `POST /api/ai-recruiter/chat` validates input lengths, handles empty queries, rate-limits requests, and returns verified facts safely.
3. **Responsive UI Verification**: Verified on mobile, tablet, and desktop breakpoints without horizontal overflow or overlapping text.
4. **Link Integrity**: Confirmed that only real repositories and demos have clickable external links; missing URLs display "Coming Soon" states.
5. **Asset Integration**: Verified that Archana's uploaded professional portrait is displayed cleanly with proper aspect ratio and fallback handling.

---

## 📬 Contact Archana S.

- **Email**: [itsachu06@gmail.com](mailto:itsachu06@gmail.com)
- **GitHub**: [github.com/ArchanaSenthilkumar06](https://github.com/ArchanaSenthilkumar06)
- **LinkedIn**: [linkedin.com/in/archanas06](https://www.linkedin.com/in/archanas06/)
