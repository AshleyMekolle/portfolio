// Site-wide content. Everything here is sourced from the existing portfolio,
// the CV (Mekolle-Ashley-AI-Automation-Resume.pdf) and the GitHub profile README.

export const site = {
  name: 'Mekolle Ashley',
  url: 'https://portfolio-zeta-nine-4lg1fq4hy0.vercel.app',
  email: 'mekolleashleyam@gmail.com',
  github: 'https://github.com/AshleyMekolle',
  linkedin: 'https://www.linkedin.com/in/ashley-mekolle-66136b256/',
  cv: '/resumes/Mekolle-Ashley-AI-Automation-Resume.pdf',
}

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

// Role-specific CVs that already exist in /public/resumes.
export const cvs = [
  { label: 'AI & Automation', note: 'Primary CV', href: '/resumes/Mekolle-Ashley-AI-Automation-Resume.pdf' },
  { label: 'AI / ML', note: 'Machine learning focus', href: '/resumes/AshleyMekolle_AIML_Resume.pdf' },
  { label: 'Full-stack', note: 'Web & backend focus', href: '/resumes/AshleyMekolle_FullStack_Resume.pdf' },
  { label: 'Mobile', note: 'Flutter & React Native focus', href: '/resumes/AshleyMekolle_Mobile_Resume.pdf' },
]

export const experience = [
  {
    company: 'Teksynapse.AI',
    role: 'Software Engineering Intern',
    period: 'Sep 2025 — Mar 2026',
    stack: ['Laravel', 'PHP', 'REST APIs', 'MVC'],
    points: [
      'Built backend features in Laravel and PHP, following MVC architecture.',
      'Developed REST APIs consumed by frontend clients, keeping backend logic and presentation separate.',
      'Worked on API integrations and data processing across backend and frontend.',
    ],
  },
  {
    company: 'Nexora Dynamics',
    role: 'Software Developer',
    period: 'Dec 2025 — Jul 2026',
    stack: ['Flutter', 'FlutterFlow', 'REST APIs'],
    points: [
      'Built cross-platform mobile features in Flutter and FlutterFlow.',
      'Integrated backend REST APIs into the mobile apps and kept data in sync between them.',
      'Implemented responsive mobile layouts.',
    ],
  },
  {
    company: 'HNG Tech',
    role: 'No-Code Automation Engineer',
    period: 'Oct 2025 — Dec 2025',
    stack: ['n8n', 'Make', 'Zapier', 'Airtable', 'Jotform'],
    points: [
      'Designed and deployed multi-step workflows in n8n, Zapier and Make.',
      'Built Airtable and Jotform integrations that automate data collection and routing.',
      'Replaced manual, repetitive processes with automated workflows.',
    ],
  },
  {
    company: 'Camsol Technologies',
    role: 'Frontend Development Intern',
    period: 'Aug 2025 — Sep 2025',
    stack: ['Next.js', 'TypeScript'],
    points: [
      'Built responsive, accessible UI components with Next.js and TypeScript.',
      'Implemented reusable components that follow a design system.',
    ],
  },
]

// Skills grouped by discipline. `core` = demonstrated in featured work above;
// `working` = used in internships / smaller projects. No expert claims.
export const expertise = [
  {
    title: 'AI & Applied Intelligence',
    blurb: 'Putting models to work inside real systems — and measuring whether they behave.',
    core: ['LLM API integration (Groq)', 'Retrieval-augmented generation', 'XGBoost + SHAP explainability'],
    working: ['Embeddings (Cohere)', 'scikit-learn', 'Model evaluation'],
    proof: ['RepoPilot', 'Mboko Knowledge Assistant', 'Noura'],
  },
  {
    title: 'Automation & Integrations',
    blurb: 'Connecting systems so repetitive processes run themselves.',
    core: ['n8n', 'Make', 'Webhooks', 'API orchestration'],
    working: ['Zapier', 'Airtable', 'Jotform'],
    proof: ['RepoPilot', 'Order Management', 'Creator Intelligence'],
  },
  {
    title: 'Backend Engineering',
    blurb: 'Services with clear layers, validation and sensible failure behaviour.',
    core: ['Python', 'Django REST', 'FastAPI', 'PostgreSQL', 'REST design'],
    working: ['Laravel', 'PHP', 'Node.js', 'MySQL', 'Firebase', 'Prisma'],
    proof: ['Noura', 'Teksynapse.AI'],
  },
  {
    title: 'Frontend & Application Development',
    blurb: 'Interfaces for the systems above — web, mobile and desktop.',
    core: ['React', 'TypeScript', 'Next.js'],
    working: ['JavaScript', 'React Native', 'Flutter', 'FlutterFlow', 'Tkinter'],
    proof: ['Mboko Knowledge Assistant', 'Noura', 'MEMO', 'WeatherSphere'],
  },
  {
    title: 'Developer Tools',
    blurb: '',
    core: ['Git', 'GitHub (webhooks, REST API, Actions)'],
    working: ['API testing tools', 'Vercel', 'Swagger / OpenAPI docs'],
    proof: [],
  },
]

export const education = {
  school: 'University of Buea',
  degree: 'Computer Engineering — Software Engineering specialisation',
  period: '2022 — expected December 2026',
  awards: [
    { name: 'Kate Kanyi-Tometi Scholarship Fund', detail: 'Two-time awardee' },
    { name: 'Presidential Excellency Award', detail: 'Two-time awardee' },
  ],
  // Source: CV. The CV lists the award counts but not the years.
}
