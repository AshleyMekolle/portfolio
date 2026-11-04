// Project content. Every claim here was checked against the public repository
// (README, source, workflow exports, evaluation files) or the live deployment.
// Where something could not be verified it is stated as such, never filled in.

export type CategoryId = 'ai' | 'automation' | 'software' | 'ml' | 'archive'

export const categories: { id: CategoryId; title: string; blurb: string }[] = [
  { id: 'ai', title: 'AI & Intelligent Systems', blurb: 'Models and language models wired into working products.' },
  { id: 'automation', title: 'Automation & Integrations', blurb: 'Workflows that move data between services without anyone babysitting them.' },
  { id: 'software', title: 'Software Engineering', blurb: 'Applications built end to end, from state and storage to the interface.' },
  { id: 'ml', title: 'Machine Learning', blurb: 'Smaller applied-ML exercises, described exactly as implemented.' },
  { id: 'archive', title: 'Development Archive', blurb: 'Smaller projects worth keeping — no case studies.' },
]

export type Status = 'Prototype' | 'MVP' | 'In development' | 'Deployed' | 'Production-ready'

export type Evidence =
  | { type: 'image'; src: string; w: number; h: number; alt: string; caption: string; wide?: boolean }
  | { type: 'code'; title: string; lang: string; code: string; source: string }
  | { type: 'table'; title: string; headers: string[]; rows: string[][]; source: string }
  | { type: 'link'; label: string; href: string; note: string }
  | { type: 'missing'; text: string }

export type DiagramNode = {
  id: string
  label: string
  sub?: string
  col: number
  row: number
  kind?: 'source' | 'process' | 'ai' | 'store' | 'out' | 'ui' | 'aux'
}
export type DiagramEdge = { from: string; to: string; label?: string; dashed?: boolean }

export interface CaseStudy {
  slug: string
  num: string
  name: string
  category: CategoryId
  kind: string // short category label shown on cards
  tagline: string
  summary: string
  domain: string
  status: Status
  statusNote: string
  updated: string
  tech: string[]
  links: { repo?: string; demo?: string; extra?: { label: string; href: string }[] }
  hero: { kind: 'image'; src: string; w: number; h: number; alt: string; caption: string } | { kind: 'concept'; seed: number; chips: string[] }
  problem: string[]
  solution: { intro: string; implemented: string[]; planned: string[] }
  architecture: { nodes: DiagramNode[]; edges: DiagramEdge[]; caption: string }
  contribution: { area: string; text: string }[]
  decisions: { title: string; body: string }[]
  evidence: Evidence[]
  lessons: { challenges: string[]; learned: string[]; limitations: string[]; next: string[] }
}

const GH = 'https://github.com/AshleyMekolle'

/* ───────────────────────────── 01 · RepoPilot ───────────────────────────── */
const repopilot: CaseStudy = {
  slug: 'repopilot',
  num: '01',
  name: 'RepoPilot',
  category: 'ai',
  kind: 'AI + workflow automation',
  tagline: 'GitHub issue triage and CI alerts, driven by signed webhooks and an LLM.',
  summary:
    'An event-driven GitHub automation system built in n8n. It verifies signed GitHub webhooks, uses an LLM to classify new issues and apply labels, catches failed CI runs, and delivers every alert to Telegram — with tracked delivery, automatic retries and a central error workflow.',
  domain: 'Developer operations · repository maintenance',
  status: 'MVP',
  statusNote: 'Working end to end on n8n Cloud. Several hardening items are still open on the roadmap.',
  updated: 'October 2026',
  tech: ['n8n', 'Groq API', 'openai/gpt-oss-120b', 'GitHub Webhooks & REST API', 'Telegram Bot API', 'n8n Data Tables', 'Python (evaluation)'],
  links: { repo: `${GH}/RepoPilot`, extra: [{ label: 'Preceded by: n8n Academy Foundations', href: `${GH}/n8n-academy-foundations` }] },
  hero: {
    kind: 'image',
    src: '/work/repopilot/rp-02-issue-triage.png',
    w: 943,
    h: 445,
    alt: 'The RP-02 Issue Triage sub-workflow in the n8n editor, showing the Groq triage chain, structured output parser and GitHub label request.',
    caption: 'Screenshot — the RP-02 Issue Triage sub-workflow in n8n.',
  },
  problem: [
    'Maintainers of a repository have to read every new issue, decide what kind of issue it is and how urgent it is, label it, and separately notice when CI starts failing. That work is repetitive, easy to postpone, and easy to get wrong when a serious report is buried among minor ones.',
    'The people affected are anyone who watches a repository’s issues and CI. Automating the first-pass sorting and making failures visible in a channel they already use gets the right issues in front of them sooner.',
    'RepoPilot was built as a practical application of the webhook, sub-workflow, AI-chain, Data Table and error-handling skills from the n8n Academy Foundations program (also in my GitHub). It is a test system, not a deployment for a team: I have not claimed any users.',
  ],
  solution: {
    intro:
      'The system is split into one entry point, three handlers and one shared notification service, so each workflow has a single job and new event types can be added as a new route plus a new handler.',
    implemented: [
      'HMAC-SHA256 verification of every GitHub webhook on the raw request body, with a timing-safe comparison. Unsigned or tampered requests receive 401.',
      'Immediate 202 response to GitHub so processing continues inside GitHub’s 10-second delivery window.',
      'AI classification of opened, edited and reopened issues into a category (bug, feature, documentation, needs-review) and a priority (high, medium, low), with a one-sentence reason.',
      'Automatic labelling through the GitHub REST API, using the structured output from the model.',
      'Failed GitHub Actions runs are recorded in a Data Table, keyed on run ID so a redelivered webhook cannot create a duplicate.',
      'Telegram alerts for issue triage, CI failures and system errors, sent through one shared notification workflow.',
      'Tracked delivery: events stay pending until the Telegram send succeeds, and a scheduled workflow retries pending events every 15 minutes.',
      'A central error workflow set as the Error Workflow of all RepoPilot workflows; it reports failures to Telegram and avoids an infinite loop if the notifier itself fails.',
      'A 20-issue labelled evaluation set, an n8n evaluation workflow and an independent Python scorer.',
    ],
    planned: [
      'Fix the data-loss priority rule and re-run the evaluation.',
      'Post the AI’s triage reason as a comment on the issue.',
      'Cap retries and flag events that keep failing to deliver.',
      'Move the webhook secret into n8n Variables.',
    ],
  },
  architecture: {
    nodes: [
      { id: 'gh', label: 'GitHub', sub: 'signed webhook', col: 0, row: 1, kind: 'source' },
      { id: 'rp01', label: 'RP-01 Intake & Router', sub: 'verify HMAC · normalise · route', col: 1, row: 1, kind: 'process' },
      { id: 'rp02', label: 'RP-02 Issue Triage', sub: 'gpt-oss-120b on Groq', col: 2, row: 0, kind: 'ai' },
      { id: 'rp03', label: 'RP-03 CI Failure Handler', sub: 'upsert by run ID', col: 2, row: 2, kind: 'process' },
      { id: 'api', label: 'GitHub REST API', sub: 'apply labels', col: 3, row: 0, kind: 'out' },
      { id: 'rp05', label: 'RP-05 Notification Service', sub: 'format · send · mark status', col: 3, row: 1, kind: 'process' },
      { id: 'tg', label: 'Telegram', sub: 'alerts', col: 4, row: 1, kind: 'out' },
      { id: 'dt', label: 'RepoPilot_Events', sub: 'Data Table', col: 3, row: 3, kind: 'store' },
      { id: 'rp04', label: 'RP-04 Reconciliation', sub: 'every 15 min', col: 4, row: 3, kind: 'process' },
      { id: 'err', label: 'RP-ERR Error Handler', sub: 'error workflow for all', col: 2, row: 3, kind: 'aux' },
    ],
    edges: [
      { from: 'gh', to: 'rp01' },
      { from: 'rp01', to: 'rp02', label: 'issues' },
      { from: 'rp01', to: 'rp03', label: 'failed run' },
      { from: 'rp02', to: 'api', label: 'labels' },
      { from: 'rp02', to: 'rp05' },
      { from: 'rp03', to: 'dt', label: 'pending' },
      { from: 'rp03', to: 'rp05' },
      { from: 'rp05', to: 'tg' },
      { from: 'rp05', to: 'dt', label: 'sent / pending' },
      { from: 'rp04', to: 'dt', label: 'read pending' },
      { from: 'rp04', to: 'rp05', label: 're-send' },
      { from: 'err', to: 'rp05', dashed: true, label: 'failure alerts' },
    ],
    caption:
      'Redrawn from the README architecture and the workflow exports. Solid lines are data flow; the dashed line is the error path. RP-ERR is configured as the Error Workflow of RP-01 to RP-05.',
  },
  contribution: [
    { area: 'Automation logic', text: 'Designed and built all six n8n workflows: router, triage, CI handler, reconciliation, notifier and central error handler.' },
    { area: 'AI integration', text: 'Wrote the triage prompt (with explicit priority rules and a needs-review escape hatch), wired it to Groq and enforced structured JSON output.' },
    { area: 'API integration', text: 'GitHub webhook intake with raw-body signature verification, GitHub REST API calls for labels, Telegram Bot API for delivery.' },
    { area: 'Data processing', text: 'Payload normalisation into one consistent event shape; idempotent Data Table writes keyed by run ID.' },
    { area: 'Testing & evaluation', text: 'Built the 20-issue labelled dataset, the n8n evaluation workflow and a Python scorer, and wrote up the failure analysis.' },
    { area: 'Deployment', text: 'Runs on n8n Cloud; setup, credentials and import order are documented in the README. Backend/frontend code: none — this project is workflow-first.' },
  ],
  decisions: [
    { title: 'Verify the signature on the raw body', body: 'GitHub signs the exact bytes it sends. Re-serialising parsed JSON does not reproduce them, so the Code node computes HMAC-SHA256 over the raw body and compares it to X-Hub-Signature-256 with a timing-safe comparison.' },
    { title: 'Answer 202 first, process after', body: 'GitHub times out deliveries at 10 seconds. Valid requests get an immediate 202 so the AI call and API requests can finish without GitHub retrying.' },
    { title: 'One entry point, small handlers, one notifier', body: 'Routing lives in RP-01, each handler does one job, and every alert goes through RP-05. Message formatting and delivery are therefore in one place, and a new event type is a new route and handler.' },
    { title: 'Make delivery self-healing', body: 'The Telegram node uses an error output so a failed send becomes status pending instead of stopping the workflow. RP-04 re-sends pending events every 15 minutes. Run-ID upserts mean redelivered webhooks cannot create duplicates.' },
    { title: 'Structured output and a needs-review category', body: 'A Structured Output Parser guarantees valid JSON for later nodes. The prompt tells the model to choose needs-review instead of guessing, which is what the evaluation checks.' },
    { title: 'Stop error loops', body: 'If RP-ERR is triggered by a failure inside RP-05, the alert is skipped. Otherwise a broken notifier would try to report itself forever.' },
  ],
  evidence: [
    { type: 'image', src: '/work/repopilot/rp-01-event-intake-router.png', w: 840, h: 390, alt: 'RP-01 workflow in n8n', caption: 'RP-01 Event Intake & Router — signature check, 202/401 responses, normalisation and routing.' },
    { type: 'image', src: '/work/repopilot/rp-05-notification-service.png', w: 751, h: 430, alt: 'RP-05 workflow in n8n', caption: 'RP-05 Notification Service — one shared sender for every alert.' },
    { type: 'image', src: '/work/repopilot/telegram-alert.png', w: 819, h: 655, alt: 'A RepoPilot triage alert as shown in Telegram', caption: 'A triage alert as received in Telegram.' },
    {
      type: 'table',
      title: 'AI evaluation — 20 labelled issues, openai/gpt-oss-120b on Groq, temperature 0, run 17 Oct 2026',
      headers: ['Metric', 'Result'],
      rows: [
        ['Category accuracy', '100% (20 / 20)'],
        ['Priority accuracy', '95% (19 / 20)'],
        ['Category and priority both correct', '95% (19 / 20)'],
        ['High-priority accuracy', '80% (4 / 5) — the one miss'],
      ],
      source: 'RepoPilot/evaluations/README.md',
    },
    { type: 'image', src: '/work/repopilot/priority-accuracy.png', w: 1185, h: 753, alt: 'Bar chart of priority accuracy by class: high 80%, medium 100%, low 100%', caption: 'Priority accuracy by class. The single error was a data-loss bug rated medium instead of high.', wide: true },
    {
      type: 'code',
      title: 'Scoring — evaluations/evaluate.py (excerpt)',
      lang: 'python',
      code: `category_ok = (
    prediction.get("predicted_category")
    == issue["expected_category"]
)
priority_ok = (
    prediction.get("predicted_priority")
    == issue["expected_priority"]
)
category_correct += category_ok
priority_correct += priority_ok
both_correct += category_ok and priority_ok`,
      source: 'RepoPilot/evaluations/evaluate.py',
    },
  ],
  lessons: {
    challenges: [
      'Verifying signatures correctly: the check has to run on raw bytes, not parsed JSON.',
      'Keeping alert delivery reliable when an external service (Telegram) can fail, without duplicating alerts.',
    ],
    learned: [
      'Aggregate accuracy hides the failure that matters. Overall 95% looked strong; the per-class breakdown showed the only error was in the highest-stakes class.',
      'A prompt instruction that helps one decision (be conservative on category) can quietly bias another (priority).',
    ],
    limitations: [
      'Only 20 evaluation issues, 12 of them low priority and 5 high — each issue moves accuracy by 5 points.',
      'One labeller, so borderline priorities are partly subjective.',
      'Exact-match scoring: one priority level off counts as fully wrong.',
      'The webhook secret is currently set inside a Code node rather than n8n Variables.',
    ],
    next: [
      'Apply the data-loss rule fix and re-run the evaluation to confirm it and check for regressions.',
      'Grow the dataset to 50+ issues with more borderline cases and compare models and prompt versions.',
      'Cap retries and flag permanently failing deliveries.',
    ],
  },
}

/* ───────────────────────── 02 · Mboko Knowledge Assistant ───────────────────────── */
const mboko: CaseStudy = {
  slug: 'mboko-knowledge-assistant',
  num: '02',
  name: 'Mboko Knowledge Assistant',
  category: 'ai',
  kind: 'Retrieval-augmented generation',
  tagline: 'An internal assistant that answers only from a curated knowledge base — and says so when it cannot.',
  summary:
    'A retrieval-augmented assistant for a fictional Cameroonian media company. Twenty interlinked policy documents are embedded into Supabase pgvector; a Next.js chat interface sends questions through n8n, which retrieves the five closest passages and has a Groq-hosted model answer from them alone.',
  domain: 'Internal knowledge management',
  status: 'MVP',
  statusNote: 'Live and working. Citations, published evaluation results, authentication and sustainable hosting are not done yet.',
  updated: 'October 2026',
  tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'n8n Cloud', 'Supabase (Postgres + pgvector)', 'Cohere embed-multilingual-v3.0', 'Groq openai/gpt-oss-20b', 'Vercel'],
  links: {
    repo: `${GH}/mboko-knowledge-assistant`,
    demo: 'https://mboko-knowledge-assistant.vercel.app',
  },
  hero: {
    kind: 'image',
    src: '/work/mboko/mboko-knowledge-assistant-1.png',
    w: 1812,
    h: 880,
    alt: 'The Mboko Knowledge Assistant chat interface with the headline “Your company’s knowledge, within reach.” and a question box.',
    caption: 'Screenshot — the deployed chat interface.',
  },
  problem: [
    'In any organisation, answers live in policies, handbooks and procedures that nobody wants to search: how many days of leave, who approves a video before publication, how to claim an expense. Finding the right document, then the right paragraph, is slow.',
    'The people who feel this are employees asking routine questions and the colleagues who get interrupted to answer them. A general-purpose chatbot is not a fix, because it will happily invent a plausible policy.',
    'The company, its people and its documents are entirely fictional — created so the system could be built and tested against a realistic, fully documented corpus. No real users or business results are claimed.',
  ],
  solution: {
    intro:
      'Two paths meet at one Supabase table. An ingestion path loads the documents, and a question path retrieves from them for each chat message. Both use the same embedding model, which is what makes document vectors and question vectors comparable.',
    implemented: [
      'A 20-document knowledge base across six departments, sharing one set of people, project codes and approval limits.',
      'A 47-question evaluation set with expected answers and supporting document IDs (including 9 deliberately unanswerable questions).',
      'n8n ingestion: lists documents in the GitHub repo, extracts text, embeds it with Cohere multilingual embeddings and inserts into Supabase pgvector (manual trigger).',
      'n8n retrieval and answer workflow: embeds the question, retrieves the top 5 passages, and generates a grounded answer on Groq.',
      'A fixed fallback — “I couldn’t find that information in the Mboko knowledge base.” — when the passages do not contain the answer.',
      'Next.js chat interface on Vercel with starter questions, Markdown rendering and a server-side proxy route that validates input and keeps the webhook URL out of the browser.',
      'Both n8n workflow exports committed to the repository.',
    ],
    planned: [
      'Source citations (chunks do not yet store file path or document ID).',
      'Running the evaluation and publishing scores — the 47-question set exists, but no results are published.',
      'Automatic, idempotent ingestion when documents change (today it is manual and insert-only).',
      'Conversation memory for follow-up questions (each question is answered independently).',
      'Webhook authentication and rate limiting.',
      'Migrating the workflows off the n8n Cloud trial.',
    ],
  },
  architecture: {
    nodes: [
      { id: 'docs', label: 'Knowledge base', sub: '20 Markdown docs · GitHub', col: 0, row: 0, kind: 'source' },
      { id: 'ing', label: 'n8n ingestion', sub: 'list · fetch · extract · chunk', col: 1, row: 0, kind: 'process' },
      { id: 'cohere', label: 'Cohere embeddings', sub: 'embed-multilingual-v3.0 · 1,024-d', col: 2, row: 0, kind: 'ai' },
      { id: 'pg', label: 'Supabase pgvector', sub: 'table: documents', col: 3, row: 1, kind: 'store' },
      { id: 'ui', label: 'Next.js chat UI', sub: 'Vercel', col: 0, row: 2, kind: 'ui' },
      { id: 'api', label: '/api/chat route', sub: 'validate · proxy · timeout', col: 1, row: 2, kind: 'process' },
      { id: 'chat', label: 'n8n chat workflow', sub: 'embed question · retrieve top 5', col: 2, row: 2, kind: 'process' },
      { id: 'llm', label: 'Groq LLM', sub: 'gpt-oss-20b · grounded prompt', col: 3, row: 2, kind: 'ai' },
    ],
    edges: [
      { from: 'docs', to: 'ing' },
      { from: 'ing', to: 'cohere', label: 'text' },
      { from: 'cohere', to: 'pg', label: 'vectors' },
      { from: 'ui', to: 'api', label: 'question' },
      { from: 'api', to: 'chat', label: 'webhook' },
      { from: 'chat', to: 'pg', label: 'top-5 search' },
      { from: 'chat', to: 'llm', label: 'question + passages' },
    ],
    caption:
      'Top lane: ingestion (manual run). Bottom lane: every chat message. The question is embedded with the same Cohere model before the similarity search; the answer returns to the browser along the same request path.',
  },
  contribution: [
    { area: 'AI / retrieval', text: 'Designed the retrieval pipeline end to end: chunking via n8n’s loader, multilingual embeddings, pgvector storage and top-5 similarity search.' },
    { area: 'Data', text: 'Authored the 20-document corpus and the 47-question evaluation set with expected answers and source IDs.' },
    { area: 'Automation logic', text: 'Built and exported both n8n workflows: GitHub-to-vector-store ingestion and the retrieval-and-answer chain with its grounding prompt.' },
    { area: 'Frontend', text: 'Built the Next.js 16 / React 19 / Tailwind chat interface, including message state, Markdown rendering and error states.' },
    { area: 'Backend / API', text: 'Wrote the /api/chat proxy route: input validation, 4,000-character cap, 55-second upstream timeout and normalised error responses.' },
    { area: 'Deployment', text: 'Deployed the frontend on Vercel; workflows run on an n8n Cloud trial; vectors live in Supabase.' },
    { area: 'Testing', text: 'Evaluation set written; automated tests and logging are not started.' },
  ],
  decisions: [
    { title: 'Multilingual embeddings', body: 'The company works in French and English, so ingestion and question embedding both use Cohere embed-multilingual-v3.0 (1,024 dimensions).' },
    { title: 'A fixed “not found” sentence', body: 'The system prompt instructs the model to answer only from retrieved context and otherwise reply with one exact sentence. A fixed sentence makes the 9 unanswerable evaluation questions easy to score automatically.' },
    { title: 'Server-side proxy to n8n', body: 'The browser never sees the webhook URL. The route validates session ID and message length, applies a timeout, and returns clean errors for timeout versus unreachable upstream.' },
    { title: 'Two-stage folder listing', body: 'Ingestion lists documents/ then each department folder, so a new department folder needs no workflow change.' },
    { title: 'Stack changed from the original plan', body: 'The first roadmap proposed Python, FastAPI and Docker. The shipped system uses n8n, Supabase, Cohere, Groq and Next.js; the README roadmap was rewritten to match what was actually built.' },
  ],
  evidence: [
    { type: 'image', src: '/work/mboko/mboko-knowledge-assistant-2.png', w: 1828, h: 861, alt: 'The Mboko Knowledge Assistant interface, second screen', caption: 'Screenshot — second view of the deployed interface.', wide: true },
    { type: 'image', src: '/work/mboko/workflow-ingestion.png', w: 1084, h: 292, alt: 'n8n ingestion workflow', caption: 'n8n workflow 1 — document ingestion.', wide: true },
    { type: 'image', src: '/work/mboko/workflow-retrieval.png', w: 1113, h: 388, alt: 'n8n retrieval and answer workflow', caption: 'n8n workflow 2 — retrieval and answer generation.', wide: true },
    {
      type: 'table',
      title: 'Evaluation set — 47 questions (written; not yet run)',
      headers: ['Category', 'Questions'],
      rows: [
        ['Policy and procedure', '12'], ['Direct fact', '10'], ['Multi-document', '7'],
        ['Register record', '6'], ['Approval threshold', '3'], ['Unanswerable', '9'],
      ],
      source: 'mboko-knowledge-assistant/README.md — no results are published for this set.',
    },
    {
      type: 'code',
      title: 'Input validation in the chat proxy — src/app/api/chat/route.ts (excerpt)',
      lang: 'typescript',
      code: `const { sessionId, message } = (body ?? {}) as Record<string, unknown>;
if (typeof sessionId !== "string" || !/^[\\w-]{8,100}$/.test(sessionId)) {
  return fail("A valid sessionId is required.", 400);
}
if (typeof message !== "string" || !message.trim()) return fail("Message is required.", 400);
if (message.length > MAX_MESSAGE_LENGTH) {
  return fail(\`Messages are limited to \${MAX_MESSAGE_LENGTH} characters.\`, 400);
}`,
      source: 'mboko-knowledge-assistant/src/app/api/chat/route.ts',
    },
    { type: 'link', label: 'Demo video (55 s) in the repository', href: `${GH}/mboko-knowledge-assistant/blob/main/motion-video/mboko-knowledge-assistant-showcase.mp4`, note: 'Hosted in the repo.' },
  ],
  lessons: {
    challenges: [
      'Keeping vectors and queries comparable: both paths must use the same embedding model and dimension (a mismatch produces dimension errors or empty results).',
      'Ingestion is insert-only, so re-running without clearing the table creates duplicates.',
    ],
    learned: [
      'Grounding is mostly an instruction-and-evaluation problem: a fixed fallback plus a deliberate set of unanswerable questions makes “does it make things up?” testable.',
      'Without chunk metadata, answers cannot cite sources — a design gap that is cheap to avoid at ingestion time and awkward to retrofit.',
    ],
    limitations: [
      'No citations, no conversation memory, no published evaluation results.',
      'The public chat webhook has no authentication or rate limiting.',
      'The workflows currently depend on an n8n Cloud trial; when it ends the site loads but cannot answer.',
      'The README’s phase checklist marks the evaluation phase as done while its status table says it has not been run; I treat it as not run.',
    ],
    next: [
      'Store file path and document ID as chunk metadata and return sources with every answer.',
      'Make ingestion idempotent and trigger it on pushes to documents/.',
      'Run the 47-question evaluation, then score retrieval separately (did the expected documents appear in the top 5?).',
      'Add webhook authentication, rate limiting and conversation memory; migrate off the trial.',
    ],
  },
}

/* ─────────────────────────────── 03 · Noura ─────────────────────────────── */
const noura: CaseStudy = {
  slug: 'noura',
  num: '03',
  name: 'Noura',
  category: 'ai',
  kind: 'Applied ML · full-stack',
  tagline: 'A maternal health platform that pairs an explainable risk model with a layered Django API.',
  summary:
    'The capstone for my degree: a maternal health companion for Cameroon. An XGBoost model trained on DHS Cameroon 2018 survey data returns a risk band with SHAP explanations through a FastAPI microservice; a Django REST backend, a React Native app and a React web dashboard sit around it. It is a technical project, not a clinically validated diagnostic tool.',
  domain: 'Maternal health · applied machine learning',
  status: 'In development',
  statusNote: 'Backend, ML service, mobile app and web dashboard all exist in the repository. Not clinically validated and not for real patients. The repository README is out of date and still lists the apps as “planned”.',
  updated: 'July 2026',
  tech: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Celery', 'React Native (Expo)', 'React + TypeScript', 'i18next'],
  links: {
    repo: `${GH}/noura`,
    demo: 'https://noura-ten.vercel.app',
  },
  hero: {
    kind: 'image',
    src: '/work/noura/system_architecture.png',
    w: 3228,
    h: 2228,
    alt: 'Noura system architecture diagram: mobile and web clients, Django REST API, FastAPI ML service, PostgreSQL, Redis and Celery workers.',
    caption: 'The system architecture diagram from the project repository (generated by the project’s own script).',
  },
  problem: [
    'Pregnancy can be isolating and risky, particularly where antenatal care is inconsistent and clinics are hard to find. A pregnant woman benefits from understanding her own risk factors, and a health worker benefits from seeing which patients to prioritise.',
    'Noura is a student engineering project exploring that idea: a short health form produces a Low / Medium / High reading, a plain-language explanation of what drove it, and nearby clinics when the reading is high. It makes no claim about patients or outcomes — no real-world deployment or clinical testing has taken place.',
    'Risk labels were engineered from survey indicators using WHO-based rules (see Technical decisions). They are not clinical outcomes, which is why the model must not be read as diagnostic.',
  ],
  solution: {
    intro:
      'Two services behind a role-based API. The Django backend owns identity, data, community and clinics, and asks the stateless FastAPI service for a prediction. If that service is unavailable, it falls back to a rule-based screener so the app keeps working.',
    implemented: [
      'XGBoost classifier on 14 features (DHS demographic, antenatal-care and delivery variables plus three engineered features), returning probabilities, a risk band, a confidence value and the top three SHAP factors.',
      'FastAPI ML microservice with /health and /predict endpoints, the model loaded once at startup.',
      'Django REST backend split into services: auth, risk assessment, community, messaging, knowledge-hub articles (French/English), notifications, clinic locator and an admin panel, with Swagger/Redoc API documentation.',
      'Anonymity by design: credentials and the alias/health profile are separate records that are not joined at the API layer.',
      'Rule-based fallback screener when the ML service is down (10-second timeout on the call).',
      'React Native (Expo) patient app with check-in form, result screen, symptoms, clinics, learning content and anonymous community; French and English strings.',
      'React + TypeScript web dashboard with health-worker pages (patients, walk-in check, patient profile) and admin pages (users, content, moderation, facilities, model, analytics).',
      'Six notebooks documenting data cleaning, label engineering, EDA, feature engineering, training and SHAP analysis.',
    ],
    planned: [
      'Clinical validation — none has been done.',
      'Improving recall on the Medium class (see evidence).',
      'Updating the repository README to reflect the apps that now exist.',
    ],
  },
  architecture: {
    nodes: [
      { id: 'mob', label: 'Mobile app', sub: 'React Native · patients', col: 0, row: 0, kind: 'ui' },
      { id: 'web', label: 'Web dashboard', sub: 'React + TS · health workers, admins', col: 0, row: 2, kind: 'ui' },
      { id: 'dj', label: 'Django REST API', sub: 'JWT · role-based access · services/repositories', col: 1, row: 1, kind: 'process' },
      { id: 'ml', label: 'ML service', sub: 'FastAPI · XGBoost + SHAP', col: 2, row: 0, kind: 'ai' },
      { id: 'fb', label: 'Rule-based fallback', sub: 'used if ML unavailable', col: 2, row: 1, kind: 'aux' },
      { id: 'pg', label: 'PostgreSQL', sub: 'users, assessments, community', col: 2, row: 2, kind: 'store' },
      { id: 'rd', label: 'Redis + Celery', sub: 'cache · broker · async tasks', col: 3, row: 2, kind: 'store' },
    ],
    edges: [
      { from: 'mob', to: 'dj', label: 'HTTPS · JWT' },
      { from: 'web', to: 'dj', label: 'HTTPS · JWT' },
      { from: 'dj', to: 'ml', label: 'POST /predict (10 s)' },
      { from: 'dj', to: 'fb', dashed: true, label: 'on failure' },
      { from: 'dj', to: 'pg' },
      { from: 'dj', to: 'rd' },
    ],
    caption:
      'Simplified from the project’s own architecture diagram (shown in full above). The ML service is stateless and reached over HTTP; the fallback uses the same WHO-based rules as label engineering.',
  },
  contribution: [
    { area: 'AI / ML', text: 'Ran the full pipeline in notebooks and scripts: cleaning DHS data, rule-based label engineering, feature engineering, XGBoost training with class weights and a tuned decision threshold, and SHAP explainer generation.' },
    { area: 'Backend', text: 'Built the Django REST API as separate apps (auth, risk, community, messaging, blog, notifications, clinic, admin panel) with views → services → repositories → models layering.' },
    { area: 'API integration', text: 'Django-to-FastAPI prediction call with timeout and fallback; JWT authentication with a custom credential class; Swagger/Redoc documentation.' },
    { area: 'Frontend', text: 'React Native patient app (Expo Router, i18next, auth/theme/toast contexts) and React + TypeScript dashboard for health workers and admins.' },
    { area: 'Data processing', text: 'Processed the DHS Cameroon 2018 Women’s Individual Recode data into a modelling dataset; engineered three derived features.' },
    { area: 'Testing', text: 'Test modules exist per Django app; I have not verified coverage or pass rates, so none are reported here.' },
    { area: 'Deployment', text: 'Procfiles for the backend and ML service; a web build is on Vercel and a mobile EAS config is present. Production readiness is not claimed.' },
  ],
  decisions: [
    { title: 'A separate ML microservice', body: 'The model is loaded once in a stateless FastAPI service and called over HTTP, so model code, dependencies and releases are independent of the Django backend. The response carries a model version for an audit trail.' },
    { title: 'Explain every prediction', body: 'The service returns the top three SHAP-driven factors with direction (increases / decreases) and the input value, so the app can show why a band was chosen rather than only the band.' },
    { title: 'Thresholded risk bands', body: 'Served logic: High if P(high) ≥ 0.65; Medium if P(medium) ≥ 0.40 or P(high) ≥ 0.35; otherwise Low. The thresholds live in the model config, not the interface.' },
    { title: 'Fail soft', body: 'If the ML service is unreachable the backend applies a rule-based screener built from the same WHO-based rules used for labelling, and records the model version as fallback-v1.' },
    { title: 'Four-layer backend', body: 'Views parse requests and call services; services hold business logic; repositories hold all database queries; models only define schema. Each layer can be tested independently.' },
    { title: 'Anonymity in the data model', body: 'Registration creates two unjoined records — credentials, and alias plus health data. The community only ever sees an alias.' },
    { title: 'Labels are rule-engineered', body: 'Risk labels come from a labelling function over survey indicators (for example no antenatal visits, prior pregnancy loss, age and parity combined with protective factors), not from clinical outcomes. This is why the project makes no diagnostic claim.' },
  ],
  evidence: [
    {
      type: 'table',
      title: 'Recorded model performance — xgb-v2.0, DHS Cameroon 2018 (held-out test set, n = 1,293; training n = 5,170)',
      headers: ['Metric', 'Value'],
      rows: [
        ['Overall accuracy', '62.6%'],
        ['Recall — Low', '87.6%'],
        ['Recall — Medium', '38.0%'],
        ['Recall — High', '81.2%'],
      ],
      source: 'noura/ml_service/models/model_config.json',
    },
    { type: 'image', src: '/work/noura/model_evaluation.png', w: 1931, h: 770, alt: 'Model evaluation plots from the Noura repository', caption: 'Model evaluation figure from the repository.', wide: true },
    { type: 'image', src: '/work/noura/shap_global_importance.png', w: 1473, h: 1030, alt: 'SHAP global feature importance chart', caption: 'SHAP — global feature importance.' },
    { type: 'image', src: '/work/noura/shap_beeswarm_high_risk.png', w: 1628, h: 1394, alt: 'SHAP beeswarm plot for the high-risk class', caption: 'SHAP — beeswarm plot for the high-risk class.' },
    {
      type: 'code',
      title: 'Risk banding and SHAP factors — ml_service/app/predictor.py (excerpt)',
      lang: 'python',
      code: `probs = self.model.predict_proba(row_df)[0]

if probs[2] >= 0.65:
    risk_level = 'High'
elif probs[1] >= 0.40 or probs[2] >= 0.35:
    risk_level = 'Medium'
else:
    risk_level = 'Low'

shap_vals = self.explainer.shap_values(row_df)
sv = shap_vals[:, :, risk_to_idx[risk_level]][0]
top_idx = np.argsort(np.abs(sv))[::-1][:3]   # top 3 factors`,
      source: 'noura/ml_service/app/predictor.py',
    },
    { type: 'link', label: 'Deployed web build', href: 'https://noura-ten.vercel.app', note: 'Responds (HTTP 200) with the page title “Noura”. Login-gated flows were not exercised.' },
  ],
  lessons: {
    challenges: [
      'Building labels from survey indicators — the model can only be as meaningful as the rules that defined “risk”.',
      'Class imbalance and the Medium band: tuning the decision threshold improved High recall at the cost of Medium.',
    ],
    learned: [
      'Explainability is a product requirement, not an add-on: it shaped the API response format.',
      'A layered backend and a stateless model service made it possible to change each independently.',
    ],
    limitations: [
      'Not clinically validated; labels are rule-engineered, so the model reproduces the rules rather than outcomes.',
      'Medium-class recall is 38%, and overall accuracy is 62.6% — good enough to demonstrate the pipeline, not to rely on.',
      'The repository README is stale (apps listed as planned) and the training script’s threshold constant differs from the served thresholds.',
      'Test coverage and pass rates are unverified.',
    ],
    next: [
      'Reconcile the README with the code and the training script with the served thresholds.',
      'Evaluate against clinically derived labels with expert input before any real-world use.',
      'Improve Medium-class recall and report calibration.',
    ],
  },
}

/* ───────────────────── 04 · Automated Order Management ───────────────────── */
const orders: CaseStudy = {
  slug: 'automated-order-management',
  num: '04',
  name: 'Automated Order Management',
  category: 'automation',
  kind: 'Business-process automation',
  tagline: 'From an order form to stock alerts, confirmations and reminders — without manual handling.',
  summary:
    'An end-to-end order management and fulfilment automation: orders are collected in Jotform, organised in Airtable by Make scenarios, and drive automated emails — confirmations, low-stock alerts, payment reminders, admin follow-ups and loyalty messages — with an Airtable dashboard for visibility.',
  domain: 'Small-business order fulfilment',
  status: 'Deployed',
  statusNote: 'A live public Make scenario and Airtable dashboard. Built as a demonstration system; no clients, users or business results are claimed.',
  updated: '2025',
  tech: ['Make', 'Airtable', 'Jotform'],
  links: {
    demo: 'https://us2.make.com/public/shared-scenario/IZ5i0G4m43B/enhanced-optimized-automated-order-man',
    extra: [{ label: 'Airtable dashboard', href: 'https://airtable.com/appxqNwa54nRskl01/pagDjSdKGVPwoZzXJ' }],
  },
  hero: { kind: 'concept', seed: 4, chips: ['Jotform', 'Make', 'Airtable'] },
  problem: [
    'A small business taking orders by form usually has to copy each order into a spreadsheet, check stock by hand, and remember to confirm, chase payment and follow up with returning customers. Each manual step is a place for orders to slip.',
    'The people affected are the owner or admin handling orders and the customers waiting for a confirmation or a reminder.',
    'This project shows how those steps can be connected so that an order submission is enough to trigger the rest.',
  ],
  solution: {
    intro:
      'Jotform is the intake point, Make is the integration layer, and Airtable holds orders, customers and inventory. Make scenarios react to new and changed records and send the emails.',
    implemented: [
      'Customer orders collected and validated through a Jotform order form.',
      'Orders, customers and inventory data organised in Airtable by Make.',
      'Low-stock alert emails sent to administrators.',
      'Order confirmation emails sent to customers on submission.',
      'Payment reminder emails for pending orders.',
      'Order-processing and follow-up reminders sent to admins.',
      'Loyalty and retention emails triggered for returning customers.',
      'An Airtable dashboard showing orders, stock levels and revenue.',
    ],
    planned: ['Nothing planned is documented for this project.'],
  },
  architecture: {
    nodes: [
      { id: 'form', label: 'Jotform', sub: 'order intake + validation', col: 0, row: 1, kind: 'source' },
      { id: 'make', label: 'Make scenarios', sub: 'integration & logic', col: 1, row: 1, kind: 'process' },
      { id: 'at', label: 'Airtable', sub: 'orders · customers · inventory', col: 2, row: 1, kind: 'store' },
      { id: 'mail', label: 'Automated emails', sub: 'confirmation · low stock · payment reminder · admin follow-up · loyalty', col: 2, row: 0, kind: 'out' },
      { id: 'dash', label: 'Airtable dashboard', sub: 'orders · stock · revenue', col: 3, row: 1, kind: 'ui' },
    ],
    edges: [
      { from: 'form', to: 'make', label: 'new submission' },
      { from: 'make', to: 'at', label: 'create / update records' },
      { from: 'make', to: 'mail', label: 'triggers' },
      { from: 'at', to: 'dash' },
    ],
    caption:
      'Drawn from the project description. Module-level routing inside the Make scenario (which filter feeds which email) is not documented in text; see the live scenario link for the exact graph.',
  },
  contribution: [
    { area: 'Automation logic', text: 'Designed the Make scenarios covering intake, record creation, stock checks and the five email flows.' },
    { area: 'Data modelling', text: 'Structured orders, customers and inventory tables in Airtable and built the dashboard.' },
    { area: 'API integration', text: 'Connected Jotform, Make, Airtable and email delivery through native integrations. No custom backend or frontend code.' },
    { area: 'Testing / deployment', text: 'Published the scenario publicly and exposed the dashboard. No automated tests apply to this project.' },
  ],
  decisions: [
    { title: 'Airtable as the shared data layer', body: 'Orders, customers and stock sit in one relational base, so the dashboard and every automation read the same records.' },
    { title: 'Event-triggered rather than scheduled where possible', body: 'Confirmations and stock alerts react to the order and inventory records themselves, so customers and admins hear about changes immediately.' },
    { title: 'Low-code on purpose', body: 'The goal was to prove the integration design and process logic quickly, with an inspectable public scenario, rather than build a custom service.' },
  ],
  evidence: [
    { type: 'link', label: 'Live public Make scenario', href: 'https://us2.make.com/public/shared-scenario/IZ5i0G4m43B/enhanced-optimized-automated-order-man', note: 'Loads (HTTP 200). This is the authoritative view of the workflow.' },
    { type: 'link', label: 'Airtable order dashboard', href: 'https://airtable.com/appxqNwa54nRskl01/pagDjSdKGVPwoZzXJ', note: 'Loads (HTTP 200).' },
    { type: 'missing', text: 'Placeholder — add screenshots of the Make scenario canvas and the Airtable dashboard to /public/work/orders/. None are stored in my repositories, so none are shown here.' },
  ],
  lessons: {
    challenges: ['Keeping several emails independent so a change to one trigger does not affect the others.'],
    learned: ['Process mapping comes first: the clearest part of the project is the list of states an order can be in and what should happen in each.'],
    limitations: [
      'No documented error handling, retry or monitoring design for the scenario.',
      'Not code-based, so it is not versioned or tested like application code.',
      'Make, Airtable and Jotform plan limits apply.',
    ],
    next: ['Add error handling and run logging to the scenario, and document its module-level logic.'],
  },
}

/* ───────────────────── 05 · Creator Intelligence ───────────────────── */
const creators: CaseStudy = {
  slug: 'creator-intelligence-system',
  num: '05',
  name: 'User Extraction & Content Creator Intelligence System',
  category: 'automation',
  kind: 'Automation & data intelligence',
  tagline: 'A pipeline that turns scattered creator profiles into a structured, analysable database.',
  summary:
    'Make scenarios extract creator data from YouTube and X (Twitter), enrich and normalise it, and load it into a centralised Airtable database. Airtable dashboards analyse engagement, niches and growth indicators to evaluate creators for campaigns, partnerships or creator programmes.',
  domain: 'Data extraction · creator analytics',
  status: 'Deployed',
  statusNote: 'Public Make scenarios and a live Airtable dashboard exist. Built as a demonstration; no campaign results or users are claimed.',
  updated: '2025',
  tech: ['Make', 'Airtable', 'YouTube data extraction', 'X (Twitter) data extraction'],
  links: {
    demo: 'https://airtable.com/appNVy0oVwZJ4F6RU/pagN3G1iNuJE98uZE',
    extra: [
      { label: 'Make scenario — YouTube extraction', href: 'https://us2.make.com/public/shared-scenario/qMMGAvBIiBW/extract-you-tube' },
      { label: 'Make scenario — X extraction', href: 'https://us2.make.com/public/shared-scenario/wIgzGiCJumb/extract-x-formerly-twitter' },
    ],
  },
  hero: { kind: 'concept', seed: 9, chips: ['YouTube', 'X', 'Airtable'] },
  problem: [
    'Finding good creators for a campaign means looking across platforms, copying profile details by hand and judging them inconsistently. Data from different platforms arrives in different shapes, so it cannot be compared directly.',
    'The people affected are marketing or partnership teams evaluating creators. Pulling the data into one structured place makes comparison possible.',
  ],
  solution: {
    intro:
      'Platform-specific Make scenarios extract the data. Enrichment and normalisation bring the two sources into one shape, and Airtable stores it as a central creator database with dashboards on top.',
    implemented: [
      'A Make scenario that extracts creator data from YouTube.',
      'A Make scenario that extracts creator data from X (Twitter).',
      'Data enrichment and normalisation so profiles from both platforms share one structure.',
      'A centralised creator database in Airtable.',
      'Dashboards analysing engagement, niches and growth indicators.',
    ],
    planned: ['Nothing planned is documented for this project.'],
  },
  architecture: {
    nodes: [
      { id: 'yt', label: 'YouTube', sub: 'creator data', col: 0, row: 0, kind: 'source' },
      { id: 'x', label: 'X (Twitter)', sub: 'creator data', col: 0, row: 2, kind: 'source' },
      { id: 'm1', label: 'Make: YouTube scenario', sub: 'extract · enrich · normalise', col: 1, row: 0, kind: 'process' },
      { id: 'm2', label: 'Make: X scenario', sub: 'extract · enrich · normalise', col: 1, row: 2, kind: 'process' },
      { id: 'db', label: 'Airtable creator database', sub: 'one structure for both sources', col: 2, row: 1, kind: 'store' },
      { id: 'dash', label: 'Analytics dashboard', sub: 'engagement · niches · growth', col: 3, row: 1, kind: 'ui' },
    ],
    edges: [
      { from: 'yt', to: 'm1' },
      { from: 'x', to: 'm2' },
      { from: 'm1', to: 'db', label: 'records' },
      { from: 'm2', to: 'db', label: 'records' },
      { from: 'db', to: 'dash' },
    ],
    caption:
      'Drawn from the GitHub profile README, which lists one Make scenario per platform feeding one Airtable database. The data model (fields, tables) is not documented in text; see the dashboard for what is tracked.',
  },
  contribution: [
    { area: 'Automation logic', text: 'Built the two extraction scenarios and the enrichment/normalisation steps in Make.' },
    { area: 'Data modelling', text: 'Designed the Airtable structure for a single, centralised creator database.' },
    { area: 'Data processing', text: 'Normalised platform-specific payloads into one record shape.' },
    { area: 'Analytics', text: 'Built Airtable dashboards for engagement, niche and growth analysis.' },
  ],
  decisions: [
    { title: 'One scenario per platform', body: 'Each platform’s API shape and quirks stay isolated in its own scenario; they converge only at the normalised Airtable record.' },
    { title: 'Normalise before storing', body: 'Doing enrichment and normalisation in the pipeline means the dashboard compares like with like.' },
  ],
  evidence: [
    { type: 'link', label: 'Creator analytics dashboard', href: 'https://airtable.com/appNVy0oVwZJ4F6RU/pagN3G1iNuJE98uZE', note: 'Loads (HTTP 200).' },
    { type: 'link', label: 'Make scenario — YouTube extraction', href: 'https://us2.make.com/public/shared-scenario/qMMGAvBIiBW/extract-you-tube', note: 'Loads (HTTP 200).' },
    { type: 'link', label: 'Make scenario — X extraction', href: 'https://us2.make.com/public/shared-scenario/wIgzGiCJumb/extract-x-formerly-twitter', note: 'Loads (HTTP 200).' },
    { type: 'missing', text: 'Placeholder — add screenshots of the dashboard and the Airtable field schema to /public/work/creators/. Only link-level evidence is verifiable from my repositories.' },
  ],
  lessons: {
    challenges: ['Reconciling two platforms’ different data shapes into one record structure.'],
    learned: ['Normalisation decisions made early determine which comparisons the dashboard can honestly make.'],
    limitations: [
      'Depends on third-party platform access and Make operation limits.',
      'Data-source terms and rate limits for X and YouTube apply and are not documented in the project.',
      'Not documented: error handling, scheduling frequency, field-level schema.',
    ],
    next: ['Document the schema and run frequency, and add error handling and logging.'],
  },
}

/* ─────────────────────────────── 06 · MEMO ─────────────────────────────── */
const memo: CaseStudy = {
  slug: 'memo-file-sharing',
  num: '06',
  name: 'MEMO — Local Network File Sharing',
  category: 'software',
  kind: 'Desktop application · networking',
  tagline: 'A Tkinter desktop app that shares files between machines on the same network over raw TCP.',
  summary:
    'MEMO is a Python desktop application for sharing files across a local network. Each instance runs a TCP file server in a background thread, scans its subnet for peers, lists and downloads their shared items, and keeps shared folders, a private device list and a sharing history in the interface.',
  domain: 'Local-network file transfer',
  status: 'Prototype',
  statusNote: 'Works as a desktop prototype, from a single commit. The deployed Vercel link in the repository returns 404, so it is not presented as a demo.',
  updated: 'January 2025',
  tech: ['Python', 'Tkinter', 'sv_ttk', 'Pillow', 'socket', 'threading', 'zipfile'],
  links: { repo: `${GH}/file-sharing-app` },
  hero: { kind: 'concept', seed: 14, chips: ['TCP', 'Peers', 'Folders'] },
  problem: [
    'Moving a file between two computers on the same Wi-Fi usually means a cable, a USB drive or an upload to a cloud service and back — slow and, for large files, wasteful when both machines are a few metres apart.',
    'MEMO explores a direct approach: each machine shares a folder and serves it to peers on the local network, with a simple public / private mode.',
  ],
  solution: {
    intro:
      'The application is a single-file Tkinter program. The interface drives local file operations and a small custom protocol; a background thread serves requests from other instances.',
    implemented: [
      'Public and private sharing modes with an animated toggle.',
      'Share files into a shared directory; create folders, add files to them and toggle folder visibility.',
      'Folder transfers are zipped on the fly, streamed and the temporary archive removed.',
      'Subnet scan: probes addresses 1–254 on the local subnet concurrently for a listening peer.',
      'Browse a peer’s shared list and download files or folders.',
      'A private device list, manual device entry and a connection test.',
      'A sharing history tab and logging.',
      'sv_ttk theme and Pillow-based assets.',
    ],
    planned: ['Server-side enforcement of the private device list and stronger security (see limitations).'],
  },
  architecture: {
    nodes: [
      { id: 'ui', label: 'Tkinter UI', sub: 'Files · Devices · Private · History', col: 0, row: 1, kind: 'ui' },
      { id: 'dir', label: 'Shared directory', sub: 'shutil · folders · visibility', col: 1, row: 0, kind: 'store' },
      { id: 'srv', label: 'TCP file server', sub: 'background thread', col: 1, row: 1, kind: 'process' },
      { id: 'scan', label: 'Network scanner', sub: 'subnet probe · 1–254', col: 1, row: 2, kind: 'process' },
      { id: 'peer', label: 'Peer instance', sub: 'another MEMO on the LAN', col: 2, row: 1, kind: 'source' },
    ],
    edges: [
      { from: 'ui', to: 'dir', label: 'share / organise' },
      { from: 'ui', to: 'srv', label: 'starts' },
      { from: 'ui', to: 'scan', label: 'scan' },
      { from: 'srv', to: 'dir', label: 'reads' },
      { from: 'srv', to: 'peer', label: 'file list · download' },
      { from: 'scan', to: 'peer', label: 'TCP probe' },
    ],
    caption: 'Derived from main.py. Requests: REQUEST_FILE_LIST, DOWNLOAD:<name> and TEST_CONNECTION.',
  },
  contribution: [
    { area: 'Application development', text: 'Designed and wrote the whole application: UI layout, tabs, theming and animations.' },
    { area: 'Networking', text: 'Designed the small request protocol and implemented the server thread, scanner and download client.' },
    { area: 'State & file operations', text: 'Folder tracking and visibility, copy/delete operations, history log and private device list.' },
    { area: 'Packaging', text: 'setup.py and a shortcut script for installation.' },
    { area: 'Testing / deployment', text: 'No automated tests. Distributed as source via GitHub.' },
  ],
  decisions: [
    { title: 'Raw sockets instead of HTTP', body: 'A tiny request set over TCP keeps the program dependency-free for networking and exposes the mechanics of framing, streaming and threads.' },
    { title: 'Length-prefixed streaming', body: 'A download sends an 8-byte big-endian size (struct "!Q") and then 4 KB chunks, so the receiver knows how much to read and large files never load fully into memory.' },
    { title: 'Zip folders on demand', body: 'Directories are zipped to a temporary archive, streamed with the same protocol, then deleted.' },
    { title: 'One thread per probe, with a short timeout', body: 'The scan starts a thread per host with a 100 ms connect timeout so the subnet is checked in roughly one timeout period.' },
  ],
  evidence: [
    {
      type: 'code',
      title: 'Request handling in the server thread — main.py (excerpt)',
      lang: 'python',
      code: `data = conn.recv(1024)
if data == b"REQUEST_FILE_LIST":
    file_list = self.share_file_list()
    conn.sendall(file_list.encode())
elif data.startswith(b"DOWNLOAD:"):
    item_name = data[9:].decode()
    self.handle_download(conn, item_name)
elif data == b"TEST_CONNECTION":
    conn.sendall(b"CONNECTION_OK")`,
      source: 'file-sharing-app/main.py',
    },
    {
      type: 'code',
      title: 'Length-prefixed streaming — main.py (excerpt)',
      lang: 'python',
      code: `file_size = os.path.getsize(item_path)
conn.sendall(struct.pack("!Q", file_size))

with open(item_path, "rb") as f:
    while True:
        chunk = f.read(4096)
        if not chunk:
            break
        conn.sendall(chunk)`,
      source: 'file-sharing-app/main.py',
    },
    { type: 'missing', text: 'Placeholder — add desktop screenshots of the Files, Devices and History tabs to /public/work/memo/. None are stored in the repository.' },
  ],
  lessons: {
    challenges: ['Doing network I/O and the scan off the UI thread so the interface stays responsive.', 'Designing a protocol with just enough framing to stream large files.'],
    learned: ['How quickly security gaps appear once a program listens on a port — see limitations.'],
    limitations: [
      'Private mode is enforced in the interface only: the access check compares the local machine’s own address, not the connecting peer’s, and the server does not consult the device list.',
      'The requested item name is joined to the shared directory without normalisation, so path handling needs hardening.',
      'No encryption or authentication; it should only be used on a trusted network.',
      'The deployed Vercel link returns 404 and is unrelated to a desktop app, so it is not linked as a demo.',
      'Committed __pycache__ and .idea files; single commit.',
    ],
    next: ['Enforce the private list server-side by peer address, validate paths, and add transport encryption and device authentication.'],
  },
}

/* ───────────────────────────── 07 · WeatherSphere ───────────────────────────── */
const weather: CaseStudy = {
  slug: 'weathersphere',
  num: '07',
  name: 'WeatherSphere',
  category: 'software',
  kind: 'Full-stack web application',
  tagline: 'A weather blog: a real-time feed of reports from different places, plus live weather search.',
  summary:
    'A React single-page application where visitors post weather conditions for their area into a live feed and search for current weather in any city. Posts are stored in Firebase Firestore and streamed to the page in real time; city search calls the OpenWeatherMap API.',
  domain: 'Community weather reports',
  status: 'Deployed',
  statusNote: 'Live on Vercel (loads, HTTP 200). A small project; authentication was removed in the latest redesign.',
  updated: 'May 2026',
  tech: ['React 18', 'Vite', 'React Router', 'Firebase Firestore', 'OpenWeatherMap API', 'Vercel', 'JavaScript'],
  links: { repo: `${GH}/WeatherSphere`, demo: 'https://weather-sphere-theta.vercel.app' },
  hero: { kind: 'concept', seed: 21, chips: ['Reports', 'Search', 'Firestore'] },
  problem: [
    'Official forecasts describe regions; they say little about what it is like on a particular street right now. A shared feed of short, human reports can fill that gap, alongside a quick way to look up measured conditions for a city.',
    'WeatherSphere is a small full-stack exercise in exactly that: user-generated content with a real-time database and a third-party data API.',
  ],
  solution: {
    intro:
      'Three routes — home feed, weather search and about — in a React Router single-page app. The feed reads and writes Firestore; search calls OpenWeatherMap.',
    implemented: [
      'Home feed of weather reports ordered by creation time, updating live through a Firestore snapshot listener.',
      'A report form (name, location, condition, temperature with °C/°F unit, description) that writes to Firestore.',
      'Filtering and searching the feed.',
      'City weather search against the OpenWeatherMap current-weather endpoint, with distinct “city not found” and “service unreachable” error states.',
      'About page and a 404 page.',
    ],
    planned: [
      'Authentication: sign-in and sign-up pages and an account-based posts page exist in the source, but the latest commit removed authentication and they are not routed. They are treated as not implemented.',
    ],
  },
  architecture: {
    nodes: [
      { id: 'spa', label: 'React SPA', sub: 'Vite · React Router', col: 0, row: 1, kind: 'ui' },
      { id: 'fs', label: 'Firestore', sub: 'reports collection', col: 1, row: 0, kind: 'store' },
      { id: 'owm', label: 'OpenWeatherMap', sub: 'current weather by city', col: 1, row: 2, kind: 'out' },
    ],
    edges: [
      { from: 'spa', to: 'fs', label: 'add report' },
      { from: 'fs', to: 'spa', label: 'live snapshot', dashed: true },
      { from: 'spa', to: 'owm', label: 'city query' },
    ],
    caption: 'Derived from the source. The browser talks directly to both services; there is no custom backend.',
  },
  contribution: [
    { area: 'Frontend', text: 'Built the full React interface: feed, report form, filters, search page and styling.' },
    { area: 'Data handling', text: 'Modelled report documents and subscribed the UI to live Firestore updates.' },
    { area: 'API integration', text: 'Integrated OpenWeatherMap with explicit error handling for unknown cities and unreachable service.' },
    { area: 'Deployment', text: 'Deployed on Vercel with a Vite build.' },
    { area: 'Backend', text: 'No custom backend; Firebase is used as a managed backend.' },
    { area: 'Testing', text: 'Only the default test scaffold is present.' },
  ],
  decisions: [
    { title: 'Firestore for the feed', body: 'A snapshot listener means new reports appear without polling or a custom server, which fits a small real-time feed.' },
    { title: 'Remove authentication in the redesign', body: 'The latest commit (“redesign weather app and remove authentication”) lowers the barrier to posting. The trade-off is that posts are unauthenticated.' },
    { title: 'Explicit error states', body: 'Search separates “City not found” from “Could not reach the weather service”, so users know whether to retype or retry.' },
  ],
  evidence: [
    {
      type: 'code',
      title: 'Live feed subscription — Home.jsx (excerpt)',
      lang: 'javascript',
      code: `const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));`,
      source: 'WeatherSphere/user-blog/src/pages/Home.jsx',
    },
    {
      type: 'code',
      title: 'Weather search error handling — Weatherapp.jsx (excerpt)',
      lang: 'javascript',
      code: `const data = await res.json();
if (data.cod !== 200) {
  setError('City not found. Check the name and try again.');
  setWeather(null);
} else {
  setWeather(data);
}
} catch {
  setError('Could not reach the weather service.');
}`,
      source: 'WeatherSphere/user-blog/src/pages/Weatherapp.jsx',
    },
    { type: 'link', label: 'Live application', href: 'https://weather-sphere-theta.vercel.app', note: 'Loads (HTTP 200).' },
    { type: 'missing', text: 'Placeholder — add screenshots of the feed and search page to /public/work/weathersphere/.' },
  ],
  lessons: {
    challenges: ['Keeping a live feed consistent with the posting form and filters.'],
    learned: ['A managed backend removes server work but moves security entirely into database rules and key handling.'],
    limitations: [
      'The OpenWeatherMap key and Firebase config are in the client source of a public repository. Firebase web config is designed to be public if security rules are right (not verified here); the OpenWeatherMap key should be rotated and proxied.',
      'No authentication on posting; no moderation.',
      'No tests beyond the default scaffold; unused authentication code remains in the repository.',
    ],
    next: ['Proxy the weather API behind a server function, restore optional authentication with Firestore security rules, and add moderation.'],
  },
}

export const caseStudies: CaseStudy[] = [repopilot, mboko, noura, orders, creators, memo, weather]
export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug)

/* ─────────── Compact entries (no case study) ─────────── */

export interface Compact {
  name: string
  category: CategoryId
  blurb: string
  status: string
  tech: string[]
  repo?: string
  demo?: string
  note?: string
}

export const mlProjects: Compact[] = [
  {
    name: 'House (rental) price prediction',
    category: 'ml',
    blurb:
      'A Python script trains a scikit-learn RandomForestRegressor (100 trees, depth 15) on a rental listings CSV with 7 features (BHK, size, floor, bathrooms, furnishing, area type, city). A Next.js interface calls a Python prediction script. Only training-set RMSE and R² are computed in code; no held-out evaluation is recorded, so no performance figure is claimed.',
    status: 'Prototype — runnable locally',
    tech: ['Python', 'scikit-learn', 'Random Forest', 'Next.js'],
    repo: `${GH}/Machine-Learning/tree/master/house-prediction`,
    note: 'Predicts rental prices despite the name; the training script has a hard-coded local file path.',
  },
  {
    name: 'Sales forecasting',
    category: 'ml',
    blurb:
      'A Next.js app that accepts a sales CSV, trains a one-neuron linear regression in the browser with TensorFlow.js, and plots the forecast with generated insights. Sample CSVs (steady, seasonal, fluctuating, volatile) are included. ARIMA, LSTM and Prophet, listed in the repository README, are not implemented in the code.',
    status: 'Prototype',
    tech: ['TypeScript', 'Next.js', 'TensorFlow.js', 'Linear regression'],
    repo: `${GH}/Machine-Learning/tree/master/sales-forecast`,
  },
  {
    name: 'Product price prediction',
    category: 'ml',
    blurb:
      'A Next.js dashboard with prediction charts and tables. The prediction call is simulated with a timeout, and the displayed accuracy figures are hard-coded UI data. No trained model exists in this folder, so it is a front-end prototype, not an ML implementation.',
    status: 'UI prototype only',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    repo: `${GH}/Machine-Learning/tree/master/price-prediction`,
  },
  {
    name: 'Movie recommendation',
    category: 'ml',
    blurb:
      'The folder contains the unmodified create-next-app starter page plus a header/footer and a preferences route. No collaborative or content-based filtering is implemented, despite the repository README.',
    status: 'Not implemented — scaffold only',
    tech: ['Next.js'],
    repo: `${GH}/Machine-Learning/tree/master/movie-recommendation`,
    note: 'Shown for transparency; consider removing or building out.',
  },
]

export const archive: Compact[] = [
  {
    name: 'n8n Academy Foundations',
    category: 'archive',
    blurb: 'All three official n8n Academy Foundations courses (N8N101–103) completed, with 12 workflow exports across APIs, webhooks, sub-workflows, AI chains, AI agents and error handling. Certificates and verifiable badges are in the repository.',
    status: 'Complete',
    tech: ['n8n'],
    repo: `${GH}/n8n-academy-foundations`,
  },
  {
    name: 'Working with APIs',
    category: 'archive',
    blurb: 'Four small apps that practise fetching and handling API data: a quiz (Open Trivia DB, React + TypeScript), a recipe browser (TheMealDB), and two weather apps (OpenWeatherMap).',
    status: 'Exercises',
    tech: ['React', 'TypeScript', 'Vite', 'REST APIs'],
    repo: `${GH}/Working-with-APIs`,
    demo: 'https://working-with-apis.vercel.app',
  },
  {
    name: 'React Projects',
    category: 'archive',
    blurb: 'Calculator (with context-based state), tic-tac-toe and a to-do list.',
    status: 'Exercises',
    tech: ['React', 'Vite'],
    repo: `${GH}/React-Projects`,
  },
  {
    name: 'Task Management App',
    category: 'archive',
    blurb: 'Laravel 10 REST API with Vue frontend: task CRUD, status toggle, status filtering, pagination and form-request validation.',
    status: 'Complete (small)',
    tech: ['Laravel', 'PHP', 'Vue', 'MySQL'],
    repo: `${GH}/Task-Management-App`,
    demo: 'https://task-manager-laravel.netlify.app/',
  },
  {
    name: 'Solace',
    category: 'archive',
    blurb: 'A minimalist productivity app combining project tracking, a goal tracker and a focus timer, with global state in dedicated stores.',
    status: 'Deployed',
    tech: ['React', 'TypeScript', 'Vite'],
    repo: `${GH}/Solace`,
    demo: 'https://solaceflow.netlify.app/',
  },
  {
    name: 'Inventory',
    category: 'archive',
    blurb: 'Early-stage inventory and sales app for factories: Express + Prisma + PostgreSQL backend with auth, product, category and sales routes, and a React frontend. A single commit from November 2024.',
    status: 'Early build',
    tech: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'React'],
    repo: `${GH}/Inventory`,
  },
  {
    name: 'Selah',
    category: 'archive',
    blurb: 'A Bible-reading habit app: Expo / React Native client with XP, reading-plan and reflection components, and a FastAPI service for scripture and reading plans. The README describes most features as planned.',
    status: 'In development',
    tech: ['React Native', 'TypeScript', 'FastAPI'],
    repo: `${GH}/selah-bible-learning-app`,
  },
]

// Repositories reviewed and deliberately left out of the portfolio.
export const excluded = [
  'Dispatch-AI (not featured, as requested)',
  'CEF440_2025_GROUP12, CEF444 (forks)',
  'Quiz-game-python, Snake-game-python, Turtle-Crossing-Game-Python, Software_Testing (tutorial / exercise projects)',
  'HNG12 Stage 0–1, HNG-Stage2, HNG-Stage3 (internship stage tasks)',
  'Algorithm-and-DS, Data-Projects, Data-Science-Projects (notebooks / exercises)',
  'TravelEase (UI project; not inspected in depth)',
  'portfolio, AshleyMekolle (this site and the profile README)',
]
