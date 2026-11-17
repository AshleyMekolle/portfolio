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
  { label: 'Archive', href: '/archive' },
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
    line: 'Laravel and PHP backend features and REST APIs behind frontend clients; API integrations and data processing.',
    stack: 'Laravel · PHP · REST APIs',
  },
  {
    company: 'Nexora Dynamics',
    role: 'Software Developer',
    period: 'Dec 2025 — Jul 2026',
    line: 'Cross-platform mobile features in Flutter and FlutterFlow, integrated with backend REST APIs.',
    stack: 'Flutter · FlutterFlow · REST APIs',
  },
  {
    company: 'HNG Tech',
    role: 'No-Code Automation Engineer',
    period: 'Oct 2025 — Dec 2025',
    line: 'Multi-step workflows in n8n, Make and Zapier, with Airtable and Jotform integrations that automate data collection and routing.',
    stack: 'n8n · Make · Zapier · Airtable · Jotform',
  },
  {
    company: 'Camsol Technologies',
    role: 'Frontend Development Intern',
    period: 'Aug 2025 — Sep 2025',
    line: 'Responsive, accessible and reusable UI components in Next.js and TypeScript.',
    stack: 'Next.js · TypeScript',
  },
]

// Four disciplines. `core` = demonstrated in the featured work; `also` = used in
// internships or smaller projects. No expert-level claims.
export const expertise = [
  {
    title: 'Applied AI & Machine Learning',
    line: 'Putting language models and ML models inside real systems, and measuring how they behave.',
    core: ['LLM API integration', 'Retrieval-augmented generation', 'XGBoost', 'SHAP explainability'],
    also: ['Embeddings', 'scikit-learn'],
    cases: [
      { label: 'RepoPilot', slug: 'repopilot' },
      { label: 'Mboko', slug: 'mboko-knowledge-assistant' },
      { label: 'Noura', slug: 'noura' },
    ],
  },
  {
    title: 'Automation & Integrations',
    line: 'Connecting services so repetitive processes run themselves — and recover when they fail.',
    core: ['n8n', 'Make', 'Webhooks', 'API orchestration'],
    also: ['Zapier', 'Airtable', 'Jotform'],
    cases: [
      { label: 'RepoPilot', slug: 'repopilot' },
      { label: 'Order Management', slug: 'automated-order-management' },
    ],
  },
  {
    title: 'Backend Engineering',
    line: 'Layered services with validation, clear contracts and sensible failure behaviour.',
    core: ['Python', 'Django REST', 'FastAPI', 'PostgreSQL', 'REST API design'],
    also: ['Laravel', 'PHP', 'Node.js', 'MySQL', 'Firebase'],
    cases: [{ label: 'Noura', slug: 'noura' }],
  },
  {
    title: 'Frontend & Application Development',
    line: 'The interfaces for those systems — web, mobile and desktop.',
    core: ['React', 'Next.js', 'TypeScript'],
    also: ['JavaScript', 'React Native', 'Flutter', 'FlutterFlow', 'Tkinter'],
    cases: [
      { label: 'Mboko', slug: 'mboko-knowledge-assistant' },
      { label: 'Noura', slug: 'noura' },
    ],
  },
]
export const tools = 'Git · GitHub (webhooks, REST API, Actions) · API testing tools · Vercel'

export const education = {
  school: 'University of Buea',
  degree: 'Computer Engineering — Software Engineering specialisation',
  period: '2022 — expected December 2026',
  awards: [
    'Two-time awardee, Kate Kanyi-Tometi Scholarship Fund',
    'Two-time awardee, Presidential Excellency Award',
  ],
  // Source: CV. The CV lists the award counts but not the years.
}
