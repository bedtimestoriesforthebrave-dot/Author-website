# Portfolio implementation

## Architecture and preservation decisions

The inspected application is a static HTML/CSS/JavaScript author site with Node.js serverless APIs and an Express local development server. It has no frontend framework, animation library, production build, tests or lint configuration. The original personal portfolio is `portfolio.html` and was untracked at the start of this task. Other substantial uncommitted author-site changes were already present.

- **Keep:** author pages and API behavior, public personal contact details, LinkedIn, the supplied CV, serverless configuration, original project evidence.
- **Rewrite:** the separate portfolio, its hierarchy, typography, skills, metadata and responsive behavior.
- **Remove from the main experience:** student-first identity, generic biography and equal cards for coursework.
- **Reuse:** verified StoryCodex / Author Website descriptions and education; the original portfolio is retained outside the deployed site in `../reports/portfolio/legacy-portfolio.html`.

The English portfolio stays at `/portfolio.html` (clean URL `/portfolio`) and is the default. Finnish uses `/fi/portfolio.html` (`/fi/portfolio`). The author landing page remains at `/`. Generated HTML is checked in so the existing static hosting model stays runnable. The release uses the existing Git-triggered deployment without changing hosting configuration.

## Content sources

`portfolio-src/content.ts` assembles each locale from a single shared content architecture. No CMS is introduced. Nullable links, roles and media prevent invented project evidence: absent optional content renders nothing.

- `model.ts` defines the shared metadata and required locale presentation fields.
- `content.shared.ts` owns identity, project order, stable slugs/section IDs, technologies, URLs, media paths, source references and education dates.
- `content.en.ts` and `content.fi.ts` own portfolio presentation: hero, project summaries and case studies, workflow, skills wording, education and contact.
- `ui.ts` owns translated buttons, navigation helpers, labels and accessibility text.
- `render.ts` renders both languages using the same templates; the generator emits both sets of static pages and social previews.

Edit the source files and run `npm run build`; do not maintain the generated HTML separately. New case-study sections need a shared stable ID and a presentation entry in each locale. Product and technology names remain unchanged.

The EN / FI links work without JavaScript and retain the project page. The small browser entry adds the currently visible section's shared ID when switching, preserving reading position where practical. English is never automatically redirected based on browser settings or a stored language. Both versions include locale-specific canonical URLs, reciprocal `hreflang` links and an English `x-default`.

Underlying technical documentation remains English-only. Both portfolio languages use the same technical files and destinations; source sections label them “Documentation · English” / “Dokumentaatio · englanniksi”. There are no Finnish copies of the Reviewer Guide, architecture, planning rules, AI evaluations, demo controls or engineering/deployment documentation.

ReorderOps presentation and technical documents derive from its actual project documentation. Five reviewed public editions are kept in `content/reorderops/`; `documentation.ts` owns their shared catalog and semantic Markdown rendering. The generator emits `/docs/reorderops/` and five English document pages. Both case-study locales link to this same catalog. The `/docs/reorderops/` path avoids creating a directory that would shadow `/portfolio`. Private deployment diaries, environment-loading instructions, session identifiers and retained-artifact paths are omitted; historical versions, failed evaluations and limitations remain qualified. Unpublished source references render as readable text, never private repository links. Originals remain untouched.

A Chain of Pain uses the supplied 3 October 2026 read-only project evidence audit. Its curated case study focuses on the H1 Hunter's perception, memory, StateTree, navigation and gameplay integration. The intended narrative game is distinguished from the playable stealth/AI prototype. Recorded PIE results are historical development evidence, not tests rerun by this website build. Raw audit documents, internal paths and logs are not published. See `content/a-chain-of-pain-media.md` for the five planned capture slots and how to activate real assets.

StoryCodex and education derive from the original portfolio. Author Website also derives from the inspected implementation. Education dates are retained without asserting graduation. The existing public email and LinkedIn are reused; no additional personal CV data is extracted for publication.

## Milestones

1. Structured TypeScript content and preservation record.
2. Generated, semantic, static portfolio and case studies; verification baseline.
3. Dark visual system and responsive layouts.
4. Optional GSAP / ScrollTrigger spatial travel on desktop.
5. Accessibility, responsive/reduced-motion checks and final polish.

## Commands

Run from `root`: `npm run build`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run dev:local`.
The build emits portfolio pages plus a small browser entry, then stages all deployable author pages, portfolio pages and static assets in `public/`, matching the existing Vercel output directory. Only public file types and the explicit CV/book data files are copied; API handlers remain in `api/` for Vercel function discovery. Source content, tooling, reports and local environment files stay outside the static output. Browser tests serve `public/` through a dedicated local static server and never exercise writes to the author API or external services. Run the build before the tests.

The `portfolio-src` name avoids a static-server directory collision with `/portfolio`. The local Express server resolves HTML extensions and uses the generated English or Finnish 404 fallback according to the URL, mirroring the existing clean-URL hosting behavior without modifying hosting configuration.

## Motion and fallbacks

GSAP / ScrollTrigger is a lazy desktop enhancement: at least 1100px wide and 650px tall, fine pointer, hover, no reduced-motion request, no save-data hint and no indicated low memory/CPU. The main entry remains small and does not fetch GSAP on mobile, reduced-motion or constrained contexts. Case studies are always static.

Each HTML panel travels from an upper-left perspective to neutral transforms, remains exactly neutral across 60% of its scroll range, then recedes toward the lower-right. There is no pinning, wheel interception or custom scroll controller. Background SVG transforms follow the same native scroll position; there is no continuous animation loop or WebGL.

Keyboard focus forces its panel front-facing. The optional motion toggle persists locally when storage is available. Preference/viewport changes revert the GSAP context and remove inline transforms. A failed chunk download leaves static content visible.

## Content and media still needed

- A Chain of Pain: real gameplay/debug captures and video, a public build/source link, and further runtime evidence where noted. Architecture, role, prototype status and recorded testing are now curated from the audit.
- StoryCodex: verified media, public release/source link and evaluation/testing evidence.
- ReorderOps: the source repository returned an unauthenticated public 404, so no broken source link is displayed. Its public demo screenshot is real synthetic-data UI, captured 3 October 2026. A walkthrough video is optional.
- Author Website: a dedicated application screenshot and a documented role could be added.

The earlier portfolio and implementation reports remain in `../reports/portfolio/`, outside the deployed `root` directory. The user-confirmed final one-page Finnish CV remains unmodified at `/data/cv.pdf`; release checks require its SHA-256 to match `8024b2f3e44b61c0899d9c638377e98efa12a371c77009a435ee551e70ea03fa`. `scripts/capture-evidence.mjs` is an explicit read-only capture/check helper and is never called during a normal build or test.
