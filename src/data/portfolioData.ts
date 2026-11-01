export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedOverview: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  features: string[];
  image?: string;
  githubUrl: string | null;
  liveDemoUrl: string | null;
  status: 'Live' | 'In Progress' | 'Prototype' | 'Research Concept';
  category: 'AI & ML' | 'Full-Stack' | 'IoT & Hardware' | 'Data Science';
  metadata?: Record<string, string>;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: 'Proficient' | 'Intermediate' | 'Familiar'; highlight?: boolean }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  scoreType: string;
  details?: string[];
  location?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  category: 'Hackathon' | 'Community' | 'Competition' | 'National';
  description: string;
  badge?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: 'Certification' | 'Presentation' | 'Participation';
  type: string;
  highlight?: boolean;
}

export const PERSONAL_INFO = {
  name: 'Archana S.',
  role: 'Artificial Intelligence & Data Science Engineering Student',
  tagline: 'Building intelligent systems.',
  eyebrow: 'AI • DATA • SOFTWARE',
  shortBio:
    'I am an Artificial Intelligence and Data Science engineering student interested in Java, Spring Boot, SQL, generative AI, and full-stack development. I enjoy building practical applications and intelligent systems that address real-world problems.',
  email: 'itsachu06@gmail.com',
  github: 'https://github.com/ArchanaSenthilkumar06',
  linkedin: 'https://www.linkedin.com/in/archanas06/',
  portraitImage: '/images/archana-portfolio.png',
  fallbackImage: '/assets/aistudio/image_db929673.png',
  location: 'Tamil Nadu, India',
  educationSummary: 'B.Tech AI & Data Science (2024–2028), CGPA 7.9',
  stats: [
    { label: 'Current Degree', value: 'B.Tech AI & DS' },
    { label: 'Academic CGPA', value: '7.9 / 10' },
    { label: 'Core Projects', value: '7 Built' },
    { label: 'Hackathons & Honors', value: '5+ Recognitions' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'bhumi-net',
    title: 'BHUMI-NET',
    subtitle: 'Emergency Communication & Monitoring Network',
    description:
      'An IoT-based emergency communication and worker-monitoring system for communication-denied environments, using ESP32, MAX30102, SIM800L, real-time alerts, and dashboard-based monitoring.',
    detailedOverview:
      'BHUMI-NET addresses underground mines, collapsed structures, and disaster sites where cellular signals fail. The wearable/portable node monitors worker vital signs and environmental parameters, transmitting telemetry and emergency SOS triggers over independent RF mesh and cellular fallback gateways to a centralized command dashboard.',
    problemStatement:
      'In subterranean mines and industrial hazard zones, conventional telecommunication infrastructure frequently disconnects during accidents, leaving rescue workers and teams without vital sign data or immediate SOS signaling.',
    solution:
      'Constructed a low-power hardware prototype using ESP32 microcontrollers, MAX30102 optical biometric sensors for pulse rate/SpO2, and SIM800L GSM modules to route critical alerts and telemetry to a real-time web monitoring interface.',
    technologies: ['ESP32', 'IoT', 'Python', 'MAX30102', 'SIM800L', 'WebSockets', 'Telemetry Dashboard'],
    features: [
      'Real-time pulse and biometric monitoring via MAX30102 sensor',
      'SIM800L automated SMS/data emergency beaconing during signal loss',
      'ESP32 localized sensor data acquisition and telemetry packetizing',
      'Centralized web dashboard interface for supervisor monitoring',
      'Rapid panic button trigger with coordinates/node identification'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/BHUMI-SOFTWARE.git',
    liveDemoUrl: 'https://bhumi-software.vercel.app',
    status: 'Prototype',
    category: 'IoT & Hardware'
  },
  {
    id: 'career-craft-ai',
    title: 'Career Craft AI',
    subtitle: 'AI-Powered Career Guidance & Resume Analysis Platform',
    description:
      'A full-stack career-preparation application designed to help students compare resumes with job descriptions, identify relevant and missing keywords, discover potential skill gaps, and receive personalized resume improvement suggestions and career-learning guidance.',
    detailedOverview:
      'Career Craft AI provides an end-to-end evaluation pipeline for job seekers. Users upload candidate resumes and target job specifications; the system extracts semantic skill vectors, analyzes alignment, spotlights critical missing proficiencies, and suggests actionable learning roadmaps.',
    problemStatement:
      'Students and junior candidates often struggle to understand why their applications fail to match industry criteria or how to address concrete technical skill gaps before submitting resumes.',
    solution:
      'Engineered a comprehensive full-stack architecture with a React & TypeScript frontend, Express server, MongoDB persistence, and LLM-assisted resume evaluation pipeline for objective keyword matching and gap feedback.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    features: [
      'Interactive resume upload and parsing interface',
      'Job-description-based comparative evaluation',
      'Identified present vs missing technical skill keyword lists',
      'Targeted, constructive resume wording and section improvement tips',
      'Curated learning milestones to bridge identified competency gaps',
      'Persistent storage schema for resumes, user profiles, and analysis reports'
    ],
    metadata: {
      'Known Database': 'careercraft_ai',
      'Primary Collections': 'users, resumes, resumeanalyses, academicrecords, analysisreports, appstates'
    },
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/career-craft-ai.git', // User indicated: link will be added soon
    liveDemoUrl: null, // "career craft ai after i will give the link now its working"
    status: 'Prototype',
    category: 'Full-Stack'
  },
  {
    id: 'mind-mate-ai',
    title: 'Mind Mate AI',
    subtitle: 'Adaptive Student Learning Assistant & Study Strategist',
    description:
      'An AI-driven learning assistant designed to analyze student behavior patterns, such as planner, procrastinator, AI learner, and self-studier, and generate personalized study strategies, schedules, and performance insights.',
    detailedOverview:
      'Mind Mate AI models individual study behaviors to counter academic burnout and uneven study habits. By categorizing learner tendencies into actionable profiles, it customizes revision timetables and pacing benchmarks.',
    problemStatement:
      'Generic study planners fail because students have fundamentally distinct cognitive habits—ranging from chronic procrastinators requiring small bursts of momentum to self-guided deep learners requiring structured synthesis.',
    solution:
      'Designed an adaptive behavioral classification pipeline that generates customized revision pacing, schedule balancing, and study intervention strategies based on self-reported and trackable learning patterns.',
    technologies: ['Python', 'AI/ML', 'Behavioral Analytics', 'Adaptive Learning Algorithms', 'Flask/FastAPI'],
    features: [
      'Behavioral archetype clustering (Planner, Procrastinator, AI-assisted, Self-studier)',
      'Dynamic schedule generation aligned with peak focus intervals',
      'Adaptive milestone tracking to curb procrastination bottlenecks',
      'Personalized study recommendations and pacing retrospectives'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/Mind-Mate-AI.git',
    liveDemoUrl: null,
    status: 'Prototype',
    category: 'AI & ML'
  },
  {
    id: 'banking-simulation',
    title: 'Banking Simulation Management System',
    subtitle: 'Secure Multi-Tier Banking & Transaction Service',
    description:
      'A full-stack banking simulation application using Java, Spring Boot, and MySQL, featuring secure authentication with SHA-256 and OTP, transaction logging, and mini-statement generation.',
    detailedOverview:
      'Developed during the Infosys Springboard Java Full Stack Internship, this enterprise-style banking system adheres strictly to a clean three-tier architecture separating controllers, business services, and data access repositories.',
    problemStatement:
      'Financial applications require stringent transactional atomicity, protected user identity authentication, tamper-resistant transaction histories, and clean segregation of concerns.',
    solution:
      'Implemented a modular Spring Boot backend backed by MySQL with SHA-256 password hashing, one-time passcode verification simulation, ACID-compliant ledger transactions, and automated mini-statement generators.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'SHA-256', 'OTP Validation', 'REST APIs', 'Three-Tier Architecture'],
    features: [
      'Three-tier enterprise architecture (Controller -> Service -> Repository)',
      'Secure credential handling with SHA-256 hashing and OTP authorization',
      'Real-time account balance updates and atomic debit/credit operations',
      'Immutable transaction audit logging with timestamped records',
      'Automated mini-statement compilation with downloadable/tabular output'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/Banking-simulator1.git',
    liveDemoUrl: null,
    status: 'Prototype',
    category: 'Full-Stack'
  },
  {
    id: 'geoguard-ai',
    title: 'GeoGuard AI',
    subtitle: 'Rockfall Prediction & Open-Pit Mine Safety Alert System',
    description:
      'An AI-based early-warning concept for open-pit mines that analyzes monitoring data to identify potential rockfall risks and support preventive safety decisions.',
    detailedOverview:
      'Mine safety is vulnerable to slope instability, weathering, and seismic shifts. GeoGuard AI processes geotechnical sensors and structural indicators to assess rockfall probability and help safety officers evacuate hazardous benches proactively.',
    problemStatement:
      'Sudden slope failures in open-pit mining operations cause severe equipment damage and life loss without adequate early-warning lead times.',
    solution:
      'Constructed a predictive risk evaluation model analyzing slope gradients, environmental moisture indicators, and geological stress data to classify hazard alert tiers.',
    technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Risk Classification', 'Geotechnical Analytics'],
    features: [
      'Multi-factor hazard index calculation (slope angle, moisture, vibration)',
      'Stratified risk categorization (Safe, Advisory, High Alert, Evacuate)',
      'Automated warning dispatches for mine supervisors',
      'Historical slope event trend analytics'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/Mineguard-Rockfall-Prediction.git',
    liveDemoUrl: null,
    status: 'Prototype',
    category: 'AI & ML'
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction & Health Analytics',
    subtitle: 'Clinical Biomarker Classification & Cardiovascular Risk Evaluation',
    description:
      'A predictive machine learning model evaluating clinical biomarkers including cholesterol, resting ECG, blood pressure, and max heart rate to classify cardiovascular risk profiles.',
    detailedOverview:
      'Leveraging clinical cardiology datasets, this machine learning project employs rigorous feature preprocessing, missing data imputation, and ensemble classification algorithms to identify early markers of coronary heart disease.',
    problemStatement:
      'Cardiovascular diseases remain the leading cause of global mortality. Early identification through routine non-invasive clinical tests significantly improves preventive therapeutic outcomes.',
    solution:
      'Built and evaluated machine learning classifiers in Python with Scikit-learn, comparing performance metrics (accuracy, precision, recall, ROC-AUC) to provide interpretability for healthcare practitioners.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib & Seaborn', 'Data Analytics'],
    features: [
      'Comprehensive clinical biomarker feature engineering and correlation analysis',
      'Supervised classification comparing multiple algorithmic models',
      'Confusion matrix and ROC curve evaluation for diagnostic reliability',
      'Clean interactive Jupyter/Python pipeline with detailed documentation'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/HEART-DISEASE-PREDICTION.git',
    liveDemoUrl: null,
    status: 'Prototype',
    category: 'Data Science'
  },
  {
    id: 'emoji-usage-tweets',
    title: 'Emoji Usage in Festival Tweets',
    subtitle: 'Natural Language Processing & Cultural Sentiment Mining',
    description:
      'Natural language processing and sentiment analysis exploring emotional resonance, cultural celebration patterns, and emoji distributions across festival Twitter datasets.',
    detailedOverview:
      'Emojis communicate nuanced emotional undertones often missed by traditional text-only tokenizers. This project extracts, normalizes, and analyzes millions of emoji occurrences across seasonal festival social media streams.',
    problemStatement:
      'Standard NLP tokenizers often discard or fail to extract the semantic sentiment encoded in modern pictorial emojis during high-volume cultural events.',
    solution:
      'Engineered an NLP pipeline in Python for regex-based emoji extraction, unicode normalization, frequency distribution calculation, and comparative sentiment polarization across festival timelines.',
    technologies: ['Python', 'NLP', 'Tweepy / Social Data', 'Unicode Regex', 'Sentiment Analysis', 'Pandas'],
    features: [
      'High-throughput emoji extraction and UTF-8 glyph mapping',
      'Comparative frequency distributions across diverse festival timelines',
      'Sentiment polarity alignment between text tokens and accompanying emojis',
      'Visualization of emotional shifts during festival peaks'
    ],
    githubUrl: 'https://github.com/ArchanaSenthilkumar06/Emoji-usage-in-festival-tweets.git',
    liveDemoUrl: null,
    status: 'Prototype',
    category: 'Data Science'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages utilized for backend services, algorithms, and analytical pipelines.',
    skills: [
      { name: 'Python', level: 'Proficient', highlight: true },
      { name: 'Java', level: 'Intermediate', highlight: true }
    ]
  },
  {
    title: 'Frameworks & Architecture',
    description: 'Enterprise backend frameworks and multi-tier application structures.',
    skills: [
      { name: 'Spring Boot', level: 'Intermediate', highlight: true },
      { name: 'Three-Tier Architecture', level: 'Proficient' },
      { name: 'REST APIs', level: 'Intermediate' }
    ]
  },
  {
    title: 'Generative AI & Machine Learning',
    description: 'Applied machine learning, predictive modeling, and generative systems.',
    skills: [
      { name: 'Generative AI (GenAI)', level: 'Intermediate', highlight: true },
      { name: 'Scikit-learn', level: 'Intermediate' },
      { name: 'AI/ML Concept Modeling', level: 'Intermediate' },
      { name: 'NLP & Token Analysis', level: 'Intermediate' }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Relational data modeling, schema definition, and query performance.',
    skills: [
      { name: 'MySQL', level: 'Proficient', highlight: true },
      { name: 'Relational Schema Design', level: 'Proficient' },
      { name: 'ACID Transactions', level: 'Intermediate' }
    ]
  },
  {
    title: 'Developer Tools & Platforms',
    description: 'Daily developer toolchains, version control, and IDE workflows.',
    skills: [
      { name: 'Git', level: 'Proficient' },
      { name: 'GitHub', level: 'Proficient' },
      { name: 'VS Code', level: 'Proficient' },
      { name: 'IntelliJ IDEA', level: 'Proficient' }
    ]
  },
  {
    title: 'Areas of Interest',
    description: 'Specific technical domains where I actively build and research.',
    skills: [
      { name: 'AI / Machine Learning', level: 'Proficient', highlight: true },
      { name: 'Generative AI Applications', level: 'Intermediate', highlight: true },
      { name: 'Full-Stack Development', level: 'Intermediate', highlight: true },
      { name: 'IoT & Intelligent Systems', level: 'Intermediate', highlight: true },
      { name: 'Cloud Computing', level: 'Intermediate' },
      { name: 'Educational Technology', level: 'Intermediate' }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'M. Kumarasamy College of Engineering',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    period: '2024 – 2028',
    score: '7.9',
    scoreType: 'CGPA (Through 4th Semester)',
    location: 'Karur, Tamil Nadu',
    details: [
      'Focusing on artificial intelligence, algorithmic problem solving, database management, and intelligent system architectures.',
      'Active participant in technical hackathons, paper presentations, and institutional innovation forums.'
    ]
  },
  {
    institution: 'Bharani Park Matric Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2022 – 2024',
    score: '85.1%',
    scoreType: 'Final Percentage',
    location: 'Tamil Nadu',
    details: ['Comprehensive science and mathematics curriculum foundation.']
  },
  {
    institution: 'Vivekanandha Matric Higher Secondary School',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    period: '2022',
    score: '82.2%',
    scoreType: 'Final Percentage',
    location: 'Tamil Nadu',
    details: ['Strong foundational coursework in science, mathematics, and computing.']
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Java Full Stack Intern',
    organization: 'Infosys Springboard',
    period: 'October 2025 – December 2025',
    location: 'Remote Internship',
    type: 'Internship',
    description:
      'Engineered an enterprise Banking Management System employing Java, Spring Boot, and MySQL following strict three-tier architecture principles.',
    keyContributions: [
      'Architected a 3-tier structure separating presentation controllers, business services, and JPA/Hibernate repository persistence.',
      'Implemented secure user authentication with SHA-256 cryptographic password hashing and simulated OTP validation.',
      'Constructed atomic fund transfer logic preventing negative ledger balances and concurrent write race conditions.',
      'Designed automated transaction audit logging and transactional mini-statement generation.'
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'SHA-256', 'Three-Tier Architecture']
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ignitrix-winner',
    title: '1st Place — IGNITRIX Hackathon',
    organization: 'IGNITRIX Innovation Championship',
    category: 'Hackathon',
    description:
      'Clinched first prize for designing and pitching an end-to-end intelligent engineering prototype evaluated on innovation, technical execution, and feasibility.',
    badge: '1st Place'
  },
  {
    id: 'gdg-kochi-s14',
    title: 'Outstanding Performance — GDG Cloud Kochi',
    organization: 'Google Developer Group Cloud Kochi — Code Vipassana Season 14',
    category: 'Community',
    description:
      'Recognized for exceptional hands-on problem solving and applied cloud intelligence architectures during intensive developer workshops.',
    badge: 'Outstanding'
  },
  {
    id: 'gdg-kochi-s13',
    title: 'Exceptional Performance — GDG Cloud Kochi',
    organization: 'Google Developer Group Cloud Kochi — Code Vipassana Season 13',
    category: 'Community',
    description:
      'Commended for active implementation of modern developer frameworks and cloud technologies.',
    badge: 'Exceptional'
  },
  {
    id: 'codevita-rank',
    title: 'Global Rank 1933 — TCS CodeVita Season XIII',
    organization: 'Tata Consultancy Services',
    category: 'Competition',
    description:
      'Achieved competitive programming global rank 1933 among tens of thousands of engineering participants worldwide in algorithmic problem solving.',
    badge: 'Global Rank 1933'
  },
  {
    id: 'ncsc-winner',
    title: 'Winner — National Children’s Science Congress',
    organization: 'National Children’s Science Congress (NCSC)',
    category: 'National',
    description:
      'Selected and awarded for presenting an original research-driven science project addressing practical societal challenges.',
    badge: 'National Winner'
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Cryptography and Network Security',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    category: 'Certification',
    type: 'Academic Certification',
    highlight: true
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    category: 'Certification',
    type: 'Academic Certification',
    highlight: true
  },
  {
    title: 'Modern AI',
    issuer: 'Cisco',
    category: 'Certification',
    type: 'Industry Certification',
    highlight: true
  },
  {
    title: 'Cloud Computing',
    issuer: 'Microsoft',
    category: 'Certification',
    type: 'Industry Certification',
    highlight: true
  },
  {
    title: 'Java Foundation',
    issuer: 'Infosys Springboard',
    category: 'Certification',
    type: 'Industry Certification'
  },
  {
    title: 'Project Presentation — Mirai ’26',
    issuer: 'IETE Student Forum',
    category: 'Presentation',
    type: 'Technical Symposium'
  },
  {
    title: 'Paper Presentation',
    issuer: 'IEEE KPR',
    category: 'Presentation',
    type: 'Conference Presentation'
  },
  {
    title: 'Hackathon Participation & Performance',
    issuer: 'Unstop Club',
    category: 'Participation',
    type: 'Competitive Hackathon'
  }
];

export const AI_RECRUITER_KNOWLEDGE = {
  candidate: PERSONAL_INFO,
  skills: SKILL_CATEGORIES,
  projects: PROJECTS,
  education: EDUCATION_DATA,
  experience: EXPERIENCE_DATA,
  achievements: ACHIEVEMENTS_DATA,
  certifications: CERTIFICATIONS_DATA
};
