# Portfolio implementation

## Architecture and preservation decisions

The inspected application is a static HTML/CSS/JavaScript author site with Node.js serverless APIs and an Express local development server. It has no frontend framework, animation library, production build, tests or lint configuration. The original personal portfolio is `portfolio.html` and was untracked at the start of this task. Other substantial uncommitted author-site changes were already present.

- **Keep:** author pages and API behavior, public personal contact details, LinkedIn, the supplied CV, serverless configuration, original project evidence.
- **Rewrite:** the separate portfolio, its hierarchy, typography, skills, metadata and responsive behavior.
- **Remove from the main experience:** student-first identity, generic biography and equal cards for coursework.
- **Reuse:** verified StoryCodex / Author Website descriptions and education; the original portfolio is retained in `content/legacy-portfolio.html`.

The portfolio stays at `/portfolio.html`. The author landing page remains at `/`. This avoids displacing the live author site or changing hosting rules. Generated HTML is checked in so the existing static hosting model stays runnable. No deploy, push or external setting changes are part of this work.

## Content sources

`portfolio-src/content.ts` owns identity, navigation, public links, project prominence, summaries, architecture, testing evidence, case studies, workflow, skills and education. No CMS is introduced. Nullable links/media and explicit `placeholders` prevent invented project evidence.

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

The `portfolio-src` name avoids a static-server directory collision with `/portfolio`. The local Express server resolves HTML extensions and uses the generated 404 fallback, mirroring the existing clean-URL hosting behavior without modifying hosting configuration.

## Motion and fallbacks

GSAP / ScrollTrigger is a lazy desktop enhancement: at least 1100px wide and 650px tall, fine pointer, hover, no reduced-motion request, no save-data hint and no indicated low memory/CPU. The main entry remains small and does not fetch GSAP on mobile, reduced-motion or constrained contexts. Case studies are always static.

Each HTML panel travels from an upper-left perspective to neutral transforms, remains exactly neutral across 60% of its scroll range, then recedes toward the lower-right. There is no pinning, wheel interception or custom scroll controller. Background SVG transforms follow the same native scroll position; there is no continuous animation loop or WebGL.

Keyboard focus forces its panel front-facing. The optional motion toggle persists locally when storage is available. Preference/viewport changes revert the GSAP context and remove inline transforms. A failed chunk download leaves static content visible.

## Content and media still needed

- A Chain of Pain: gameplay footage/screenshots, architecture, role, status, public build/source link and testing evidence.
- StoryCodex: verified media, public release/source link and evaluation/testing evidence.
- ReorderOps: the source repository returned an unauthenticated public 404, so no broken source link is displayed. Its public demo screenshot is real synthetic-data UI, captured 3 October 2026. A walkthrough video is optional.
- Author Website: a dedicated application screenshot and a documented role could be added.

The earlier portfolio remains intact in `content/legacy-portfolio.html`. The existing CV PDF is reused without editing its personal details or asserting that it is current. `scripts/capture-evidence.mjs` is an explicit read-only capture/check helper and is never called during a normal build or test.
