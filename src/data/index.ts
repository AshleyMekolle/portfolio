export const projects = [
  {
    num: '01',
    featured: true,
    status: 'near' as const,
    statusLabel: 'Near Production',
    tags: ['fs', 'ai'],
    roles: [
      { label: 'Full-Stack', cls: 'role-fs' },
      { label: 'AI / ML',    cls: 'role-ai' },
    ],
    title: 'NOURA',
    desc: 'AI-powered early pregnancy risk prediction platform. XGBoost classification model with SHAP explainability, FastAPI ML microservice, Django backend, React + TypeScript frontend, and React Native mobile client. Built for interpretable, production-grade clinical predictions.',
    tech: ['XGBoost','SHAP','FastAPI','Django','React','TypeScript','React Native'],
    links: [{ label: 'GitHub →', href: 'https://github.com/AshleyMekolle' }],
  },
  {
    num: '02',
    featured: false,
    status: 'wip' as const,
    statusLabel: 'Active MVP',
    tags: ['fs', 'auto'],
    roles: [
      { label: 'Full-Stack',  cls: 'role-fs'  },
      { label: 'Automation',  cls: 'role-auto' },
    ],
    title: 'DISPATCH',
    desc: 'AI-powered business automation agent orchestrating Claude AI, Gmail outreach, and WhatsApp workflows for SMB operations at scale.',
    tech: ['Claude AI','FastAPI','React','TypeScript','Zapier'],
    links: [{ label: 'GitHub →', href: 'https://github.com/AshleyMekolle' }],
  },
  {
    num: '03',
    featured: false,
    status: 'live' as const,
    statusLabel: 'Live',
    tags: ['auto'],
    roles: [{ label: 'Automation', cls: 'role-auto' }],
    title: 'ORDER MGMT SYSTEM',
    desc: 'End-to-end business automation — order intake, stock alerts, confirmation emails, payment reminders, and loyalty triggers. Live Make scenario + Airtable dashboard.',
    tech: ['Make','Airtable','Jotform'],
    links: [{ label: 'Live Dashboard →', href: 'https://airtable.com/appxqNwa54nRskl01/pagDjSdKGVPwoZzXJ' }],
  },
  {
    num: '04',
    featured: false,
    status: 'live' as const,
    statusLabel: 'Live',
    tags: ['auto','ai'],
    roles: [
      { label: 'Automation', cls: 'role-auto' },
      { label: 'AI / ML',    cls: 'role-ai'   },
    ],
    title: 'CREATOR INTELLIGENCE',
    desc: 'Automated pipeline extracting and enriching creator profiles from YouTube and Twitter/X into a structured Airtable database with analytics dashboards.',
    tech: ['Make','Airtable','YouTube API','Twitter API'],
    links: [{ label: 'Live Dashboard →', href: 'https://airtable.com/appNVy0oVwZJ4F6RU/pagN3G1iNuJE98uZE' }],
  },
  {
    num: '05',
    featured: false,
    status: 'live' as const,
    statusLabel: 'Live',
    tags: ['ai'],
    roles: [{ label: 'AI / ML', cls: 'role-ai' }],
    title: 'ML APPLICATIONS',
    desc: 'Four business ML models: house price prediction (Random Forest, Neural Networks), sales forecasting (ARIMA, LSTM, Prophet), product pricing, and movie recommendation via collaborative filtering.',
    tech: ['Python','XGBoost','TensorFlow','Scikit-learn','Pandas'],
    links: [{ label: 'GitHub →', href: 'https://github.com/AshleyMekolle/Machine-Learning' }],
  },
  {
    num: '06',
    featured: false,
    status: 'done' as const,
    statusLabel: 'Deployed',
    tags: ['fs'],
    roles: [{ label: 'Full-Stack', cls: 'role-fs' }],
    title: 'WEATHERSPHERE',
    desc: 'Deployed full-stack web app for posting and searching real-time weather conditions. Live on Vercel with API integration and user-generated content.',
    tech: ['JavaScript','Weather API','Vercel'],
    links: [
      { label: 'Live →',   href: 'https://weather-sphere-theta.vercel.app' },
      { label: 'GitHub →', href: 'https://github.com/AshleyMekolle/WeatherSphere' },
    ],
  },
  {
    num: '07',
    featured: false,
    status: 'wip' as const,
    statusLabel: 'In Progress',
    tags: ['mob'],
    roles: [{ label: 'Mobile', cls: 'role-mob' }],
    title: 'SELAH',
    desc: 'Cross-platform React Native Bible learning app with Firebase authentication, interactive lesson modules, quiz system, and user progress tracking.',
    tech: ['React Native','Firebase','TypeScript'],
    links: [{ label: 'GitHub →', href: 'https://github.com/AshleyMekolle' }],
  },
  {
    num: '08',
    featured: false,
    status: 'done' as const,
    statusLabel: 'Complete',
    tags: ['fs'],
    roles: [{ label: 'Full-Stack', cls: 'role-fs' }],
    title: 'FILE SHARING APP',
    desc: 'Python socket-based local network file transfer system demonstrating low-level networking, data serialization, and peer-to-peer architecture.',
    tech: ['Python','Sockets','Networking'],
    links: [{ label: 'GitHub →', href: 'https://github.com/AshleyMekolle/file-sharing-app' }],
  },
]

export const skills = [
  {
    group: 'Frontend',
    items: ['React / Next.js','TypeScript','JavaScript','HTML / CSS','Responsive UI'],
  },
  {
    group: 'Backend',
    items: ['Laravel + PHP','FastAPI','Django','Node.js','REST APIs','MySQL / PostgreSQL'],
  },
  {
    group: 'Mobile',
    items: ['React Native','Flutter','FlutterFlow','Firebase','Cross-Platform'],
  },
  {
    group: 'AI / ML',
    items: ['Python','XGBoost','SHAP (XAI)','Scikit-learn','TensorFlow','Pandas / NumPy'],
  },
  {
    group: 'Automation',
    items: ['n8n / Zapier','Make (Integromat)','Airtable','Jotform','Claude AI API','Workflow Design'],
  },
]

export const experience = [
  {
    period: 'Sept 2025 — Mar 2026',
    role: 'Software Engineering Intern',
    company: 'Teksynapse.AI',
    bullets: [
      'Engineered backend features using Laravel and PHP following MVC architecture',
      'Developed RESTful APIs consumed by frontend clients, ensuring clean separation of concerns',
      'Delivered full-stack features across backend logic and frontend integration',
    ],
  },
  {
    period: 'Dec 2025 — Jul 2026',
    role: 'Software Developer',
    company: 'Nexora Dynamics',
    bullets: [
      'Delivered cross-platform mobile features using Flutter and FlutterFlow for iOS and Android',
      'Integrated backend REST APIs into mobile surfaces ensuring data consistency',
      'Implemented responsive mobile UI layouts for production applications',
    ],
  },
  {
    period: 'Oct 2025 — Dec 2025',
    role: 'No-Code Automation Engineer',
    company: 'HNG Tech',
    bullets: [
      'Designed and deployed multi-step automation workflows using n8n, Zapier, and Make',
      'Built Airtable and Jotform integrations automating data collection and routing pipelines',
      'Replaced manual business processes with scalable no-code automation systems',
    ],
  },
  {
    period: 'Aug 2025 — Sept 2025',
    role: 'Frontend Development Intern',
    company: 'Camsol Technologies',
    bullets: [
      'Built responsive, accessible UI components using Next.js and TypeScript',
      'Implemented reusable component libraries aligned with design system guidelines',
    ],
  },
]

export const resumes = [
  {
    track: 'Track 01',
    title: 'FULL-STACK DEVELOPER',
    tags: ['React','Laravel','TypeScript','APIs'],
    href: '/resumes/AshleyMekolle_FullStack_Resume.pdf',
  },
  {
    track: 'Track 02',
    title: 'MOBILE DEVELOPER',
    tags: ['Flutter','React Native','Firebase'],
    href: '/resumes/AshleyMekolle_Mobile_Resume.pdf',
  },
  {
    track: 'Track 03',
    title: 'AI AUTOMATION ENGINEER',
    tags: ['n8n','Zapier','Make','Claude AI'],
    href: '/resumes/Mekolle-Ashley-AI-Automation-Resume.pdf',
  },
  {
    track: 'Track 04',
    title: 'JUNIOR AI / ML DEV',
    tags: ['Python','XGBoost','SHAP','FastAPI'],
    href: '/resumes/AshleyMekolle_AIML_Resume.pdf',
  },
]
