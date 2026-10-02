# Portfolio implementation

## Architecture and preservation decisions

The inspected application is a static HTML/CSS/JavaScript author site with Node.js serverless APIs and an Express local development server. It has no frontend framework, animation library, production build, tests or lint configuration. The original personal portfolio is `portfolio.html` and was untracked at the start of this task. Other substantial uncommitted author-site changes were already present.

- **Keep:** author pages and API behavior, public personal contact details, LinkedIn, the supplied CV, serverless configuration, original project evidence.
- **Rewrite:** the separate portfolio, its hierarchy, typography, skills, metadata and responsive behavior.
- **Remove from the main experience:** student-first identity, generic biography and equal cards for coursework.
- **Reuse:** verified StoryCodex / Author Website descriptions and education; the original portfolio is retained in `content/legacy-portfolio.html`.

The portfolio stays at `/portfolio.html`. The author landing page remains at `/`. This avoids displacing the live author site or changing hosting rules. Generated HTML is checked in so the existing static hosting model stays runnable. No deploy, push or external setting changes are part of this work.

## Content sources

`portfolio/content.ts` owns identity, navigation, public links, project prominence, summaries, architecture, testing evidence, case studies, workflow, skills and education. No CMS is introduced. Nullable links/media and explicit `placeholders` prevent invented project evidence.

ReorderOps was read from the local `Documents/ReorderOps` repository: README, reviewer guide and portfolio case study, with source links to evaluation/control documentation. Only curated conclusions are reproduced. Known prose/language and hosting verification limits are retained. No private datasets, runtime files or credentials are copied.

A Chain of Pain uses the user's confirmed Unreal Engine 5 / C++ narrative-game description. The user requested placeholders for supporting evidence. Specific gameplay features, role and testing are pending.

StoryCodex and education derive from the original portfolio. Author Website also derives from the inspected implementation. Education dates are retained without asserting graduation. The existing public email and LinkedIn are reused; no additional personal CV data is extracted for publication.

## Milestones

1. Structured TypeScript content and preservation record.
2. Generated, semantic, static portfolio and case studies; verification baseline.
3. Dark visual system and responsive layouts.
4. Optional GSAP / ScrollTrigger spatial travel on desktop.
5. Accessibility, responsive/reduced-motion checks and final polish.

## Commands

Run from `root`: `npm run build`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run dev:local`.
The build emits portfolio pages plus a small browser entry. Browser tests use a dedicated local static server and never exercise writes to the author API or external services.
