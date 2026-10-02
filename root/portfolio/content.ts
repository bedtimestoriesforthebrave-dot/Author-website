export interface Link { label: string; url: string }
export interface StudySection { title: string; paragraphs: string[]; bullets?: string[] }
export interface Project {
  slug: string;
  title: string;
  number: string;
  category: string;
  prominence: 'flagship' | 'featured' | 'selected';
  description: string;
  summary: string;
  role: string | null;
  status: string;
  technologies: string[];
  highlights: string[];
  architecture: string;
  challenges: string[];
  verification: string[];
  links: { demo: Link | null; github: Link | null; caseStudy: Link };
  media: { src: string; alt: string; width: number; height: number; caption: string } | null;
  placeholders: string[];
  sources: string[];
  study: StudySection[];
}

const github = 'https://github.com/bedtimestoriesforthebrave-dot';
export const site = {
  name: 'Ville Lähteenmäki',
  initials: 'VL',
  role: 'Software & AI Developer',
  location: 'Ulvila, Finland',
  email: 'wilzeu@gmail.com',
  title: 'Ville Lähteenmäki — Software & AI Developer',
  description: 'Software, evidence-grounded AI and real-time systems. Selected development work by Ville Lähteenmäki: ReorderOps, A Chain of Pain, StoryCodex and Author Website.',
  hero: {
    label: 'Independent portfolio / Selected work',
    lines: ['Software.', 'Intelligence.', 'Built with intent.'],
    summary: 'Building reliable software, AI-assisted workflows and practical automation. From procurement decisions to real-time game systems.',
  },
  navigation: [
    { label: 'Work', url: '#work' }, { label: 'Approach', url: '#approach' },
    { label: 'About', url: '#background' }, { label: 'Contact', url: '#contact' },
  ],
  social: [
    { label: 'GitHub', url: github },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ville-l%C3%A4hteenm%C3%A4ki-734698302' },
  ],
  cv: { label: 'CV · PDF', url: '/data/cv.pdf' },
  selection: 'A selection of recent and technically relevant work.',
  workflow: {
    title: 'Accelerate the work.\nVerify the result.',
    summary: 'AI assists implementation, analysis and iteration. Correctness comes from tests, inspection and validation. ReorderOps makes that distinction visible in both the development process and the product.',
    steps: [
      { title: 'Define the boundary', description: 'Break the problem into data contracts, deterministic rules and explicit action boundaries.' },
      { title: 'Build in small increments', description: 'Use coding agents with focused context for implementation, debugging and review. Keep changes inspectable in Git.' },
      { title: 'Challenge the result', description: 'Test failure cases, stale state, malformed inputs and adversarial prompts. Compare AI explanations with backend facts.' },
      { title: 'Validate before acting', description: 'Inspect behavior and evidence. Preserve known limitations and use deterministic fallbacks when AI cannot be trusted.' },
    ],
  },
  skills: [
    { title: 'Core languages', items: ['Python', 'TypeScript / JavaScript', 'C++', 'SQL'] },
    { title: 'Application development', items: ['React', 'FastAPI', 'Node.js / Express', 'Unreal Engine 5'] },
    { title: 'AI & engineering workflow', items: ['LLM APIs', 'Coding agents', 'AI evaluation', 'Prompt / context engineering', 'AI-assisted debugging & review'] },
    { title: 'Data & infrastructure', items: ['SQLite', 'REST APIs', 'Git / GitHub', 'Vercel', 'Railway'] },
  ],
  earlier: 'Additional experience includes Kotlin / Jetpack Compose, C# / .NET MAUI, UiPath StudioX, Power BI / Power Pivot, Power Apps and Power Automate, through mobile applications, automation and coursework.',
  background: {
    title: 'Practical systems.\nA broader perspective.',
    summary: 'My work spans business applications, mobile software and interactive environments. The common thread is making complex behavior understandable, inspectable and useful.',
    education: { institution: 'Savonia University of Applied Sciences', qualification: 'BBA studies in Business Information Technology', period: '2023–2026', note: 'Software development, data management, analytics, automation and project work. Graduation status is not asserted.' },
  },
  contact: { title: 'Let’s build\nsomething useful.', description: 'For software, AI workflows or technical product work, get in touch.' },
};

export const evidencePath = [
  'Data', 'Deterministic logic', 'Structured evidence', 'AI interpretation',
  'Human approval', 'Validated action', 'Audit',
];

export const projects: Project[] = [
  {
    slug: 'reorderops', title: 'ReorderOps', number: '01', category: 'Inventory & procurement software', prominence: 'flagship',
    description: 'From inventory data to a purchasing decision you can inspect.',
    summary: 'Deterministic procurement planning, immutable evidence and an AI assistant that explains the result. A person reviews the decision; the backend revalidates it before creating an internal order draft.',
    role: 'Application design & implementation', status: 'Public portfolio demo',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'SQLite'],
    highlights: ['Repeatable planning rules', 'Revalidated human approval', 'Evidence-grounded, read-only AI'],
    architecture: 'React / TypeScript interface → FastAPI business rules → SQLite evidence and operational state. A bounded AI adapter reads detached evidence; approved actions revalidate current state inside a transaction.',
    challenges: ['Separate historical observations from synthetic operational inputs.', 'Keep saved evidence immutable while blocking stale approvals.', 'Treat valid AI references and correct prose as different verification problems.'],
    verification: ['Automated checks cover malformed inputs, replay, concurrency, rollback, stale approvals and visitor isolation.', 'Multilingual, messy-input and adversarial AI evaluations retain observed semantic and language failures.', 'The recorded planning-v1.4 milestone reports 303 backend tests passing on Python 3.11 and 3.12, plus Ruff, TypeScript and production-build checks. This is source evidence, not a test count for this portfolio.'],
    links: { demo: { label: 'Live demo', url: 'https://reorder-ops.vercel.app' }, github: null, caseStudy: { label: 'Read case study', url: '/case-studies/reorderops.html' } },
    media: { src: '/assets/portfolio/reorderops-demo.webp', alt: 'ReorderOps public inventory review: historical planning date, synthetic-data notice, inventory metrics and product table.', width: 1440, height: 1000, caption: 'Public demo / Inventory review. Captured 3 October 2026. All displayed operational data is synthetic.' },
    placeholders: ['Public source link: the repository URL returned HTTP 404 without authentication during verification.', 'A narrated walkthrough video may be added.'],
    sources: ['ReorderOps README.md', 'docs/portfolio-case-study.md', 'docs/reviewer-guide.md', 'docs/v5-live-evaluation-expanded.md', 'docs/v6-hosted-ai-evaluation.md', 'docs/public-demo-controls.md'],
    study: [
      { title: 'The problem', paragraphs: ['An inventory planner needs to understand which products need attention, why they need attention, and what action is safe to review. Low stock alone is not an order instruction: incoming supply, lead times, demand changes and supplier constraints all matter.', 'The first historical review used fixed coverage bands. Those bands were noisy on the source data. Product-relative percentiles improved context, but historically usual stock can still be insufficient for a supplier’s lead time. Procurement planning became a separate deterministic calculation.'] },
      { title: 'Planning that can be replayed', paragraphs: ['Pure business rules project stock and calculate replenishment using supplier lead times, safety stock, minimum orders and pack sizes. Saved runs preserve the inputs, engine version and business-input fingerprint, rather than silently recalculating old evidence.'], bullets: ['FILTER-420: 210 units recommended, with expediting review for the earlier shortage.', 'VALVE-88: a raw requirement of 75 becomes 120 under the supplier minimum.', 'BELT-210: timely inbound prevents a duplicate order.', 'BEARING-51: a demand anomaly holds the recommendation for review.'] },
      { title: 'A human decision, validated again', paragraphs: ['Approval rereads current stock, inbound, demand and supplier terms inside a short SQLite write transaction. Changed evidence blocks the action. Exact retries return the original result; uniqueness constraints prevent a second active draft for the same product.', 'Internal purchase-order drafts send nothing to a supplier and do not become confirmed inbound. Successful and blocked actions enter an append-only audit trail. Direct file or schema access can still tamper with SQLite; this is not a claim of tamper-proof storage.'] },
      { title: 'AI interpretation with a narrow boundary', paragraphs: ['The GPT-6 Luna integration uses controlled read-only tools to retrieve detached evidence and link verified cards to the application. Authoritative quantities belong to the backend. The assistant cannot approve, create drafts, edit stock or submit orders.', 'Evaluations include multilingual questions, messy input and prompt-injection attempts. They exposed a useful limitation: correct evidence references do not guarantee sound prose or the requested language. Deterministic fallback preserves useful evidence when the provider fails or reaches a quota. AI explanations still require review.'] },
      { title: 'A public demo with isolated actions', paragraphs: ['The Vercel frontend and Railway backend present generated history, rather than the private CSV whose provenance and license remain unverified. Visitors receive separate temporary database copies so their drafts and audit events remain isolated.', 'A persistent control ledger reserves estimated AI spending before a provider call and applies usage limits. Uncertainty retains the reservation. These are cost controls, not a claim of measured operating savings.'] },
      { title: 'Verification and honest limits', paragraphs: ['Tests cover missing and malformed data, calculation boundaries, saved-run replay, stale approvals, transaction rollback, concurrency, visitor isolation and recovery. The documented v1.4 milestone reports 303 backend tests passing across Python 3.11 and 3.12, with Ruff and frontend checks.', 'Recorded hosted checks cover purchasing and bounded AI behavior. Language reliability, provider-usage reconciliation, full production recovery and cold-start timing remain qualified. The project has no live ERP integration, supplier submission, receipt workflow, anomaly override or real-account authentication. It demonstrates engineering decisions, not measured forecasting accuracy or retail savings.'] },
    ],
  },
  {
    slug: 'a-chain-of-pain', title: 'A Chain of Pain', number: '02', category: 'First-person narrative game', prominence: 'featured',
    description: 'A different kind of system. A world experienced in first person.',
    summary: 'A first-person narrative game built in Unreal Engine 5 / C++. A real-time counterpart to the business applications in this selection.',
    role: null, status: 'Project documentation forthcoming', technologies: ['Unreal Engine 5', 'C++'],
    highlights: ['First-person narrative', 'Real-time development', 'Unreal Engine 5 / C++'],
    architecture: 'Unreal Engine 5 / C++. Detailed gameplay architecture awaits project evidence.',
    challenges: [], verification: [],
    links: { demo: null, github: null, caseStudy: { label: 'Project notes', url: '/case-studies/a-chain-of-pain.html' } }, media: null,
    placeholders: ['Gameplay screenshots / video', 'Development role and current build status', 'Verified gameplay architecture and systems', 'Enemy perception, investigation, chase and search evidence, if implemented', 'Testing notes and public source / build links'],
    sources: ['User-provided portfolio brief; evidence placeholders explicitly requested'],
    study: [{ title: 'Confirmed project scope', paragraphs: ['A Chain of Pain is a first-person narrative game built in Unreal Engine 5 / C++. It adds real-time and C++ development to a portfolio otherwise centered on applications and AI-assisted workflows.'] }, { title: 'Evidence to add', paragraphs: ['Gameplay footage and technical documentation are not yet supplied. This page leaves a deliberate space for them. Specific enemy behavior, branching outcomes, reusable systems and development ownership will be described only when supported by project material.'] }],
  },
  {
    slug: 'storycodex', title: 'StoryCodex', number: '03', category: 'Android / AI storytelling', prominence: 'selected',
    description: 'A small interface for a bigger imagination.',
    summary: 'An Android story app where children choose characters, a setting and a plot. An LLM generates a Finnish story, Android TTS reads it aloud, and cached stories remain available offline.',
    role: null, status: 'Portfolio project', technologies: ['Kotlin', 'Jetpack Compose', 'LLM API', 'Android TTS'],
    highlights: ['Button-based story creation', 'Finnish generation and narration', 'Offline access to cached stories'],
    architecture: 'Jetpack Compose Android client, backend API and LLM integration, with Android TTS and cached stories.',
    challenges: ['Safety-focused interaction design and controlled prompting for children.'], verification: [],
    links: { demo: null, github: null, caseStudy: { label: 'Project details', url: '/case-studies/storycodex.html' } }, media: null,
    placeholders: ['Verified screenshots', 'Public source or release link', 'Formal evaluation / testing evidence'], sources: ['Original root/portfolio.html, retained in content/legacy-portfolio.html'],
    study: [{ title: 'An accessible story-making flow', paragraphs: ['Children choose characters, a setting and a plot through buttons. The app sends a controlled prompt through its backend API and generates a child-oriented Finnish story. Android text-to-speech provides narration.'] }, { title: 'Useful without a connection', paragraphs: ['Offline support uses previously cached stories. It does not imply local LLM generation. The original portfolio records Kotlin, Jetpack Compose, Android TTS, an OpenAI LLM API and a backend API.'] }, { title: 'Design considerations', paragraphs: ['The existing project description emphasizes safety-focused application design and controlled prompting. Formal child-safety evaluation results and release links are not supplied, so no validated safety claim is made.'] }],
  },
  {
    slug: 'author-website', title: 'Author Website', number: '04', category: 'Full-stack / serverless web', prominence: 'selected',
    description: 'A publishing site, with the tools behind it.',
    summary: 'A bilingual author website with book management, JWT-based admin authentication and a contact API. Static pages meet a Node.js backend, with an Express server for local development.',
    role: null, status: 'Existing website', technologies: ['JavaScript', 'Node.js', 'Express', 'JWT', 'Vercel'],
    highlights: ['Bilingual static frontend', 'Authenticated book CRUD', 'Local Express / serverless APIs'],
    architecture: 'HTML / CSS / JavaScript frontend, Node.js serverless APIs, JWT admin authentication and JSON book storage. Express mirrors the API locally.',
    challenges: ['Keep local development and serverless behavior aligned.', 'Separate public book data from authenticated management.'], verification: [],
    links: { demo: { label: 'Visit website', url: 'https://vlnikolai.com' }, github: { label: 'Source code', url: `${github}/Author-website` }, caseStudy: { label: 'Project details', url: '/case-studies/author-website.html' } }, media: null,
    placeholders: ['Dedicated application screenshot'], sources: ['Existing repository README.md, api/, js/admin.js and dev-server.js', 'Original portfolio content'],
    study: [{ title: 'A public site and an admin workflow', paragraphs: ['The author site serves static bilingual pages and book content. An admin interface authenticates with JWT and supports creating, reading, updating and deleting book entries through Node.js APIs. A contact endpoint forwards messages through the configured mail provider.'] }, { title: 'Two environments, one workflow', paragraphs: ['Vercel serverless endpoints serve the public deployment. An Express development server mirrors book and contact APIs locally. Book data uses JSON file storage; the repository documentation identifies a proper database as a future option for concurrent production writes.'] }, { title: 'Preserved alongside this portfolio', paragraphs: ['The portfolio rebuild keeps the author pages, API handlers, book content and admin interface. Its TypeScript authoring step generates a static portfolio without requiring a new application framework or changing hosting configuration.'] }],
  },
];
