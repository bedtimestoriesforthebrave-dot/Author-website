# Portfolio rebuild — final implementation report

Completed locally on 3 October 2026. Preview: http://localhost:3001/portfolio.html.
No push, deployment, external-service writes, DNS changes or hosting-setting changes were performed.

## 1. Repository architecture found

The application is a static HTML/CSS/JavaScript author site, with Node.js serverless API handlers, Express local development, JWT admin authentication and JSON book storage. There was no frontend framework, animation library, production build, test suite or lint configuration. The personal portfolio was a separate, untracked `root/portfolio.html`. Substantial author-site changes were already uncommitted.

The rebuilt portfolio retains that separate entry point. The author landing page remains at `/`; the portfolio is available at `/portfolio.html` and the clean `/portfolio` URL. Existing Vercel configuration was inspected and left untouched.

## 2. Files added

All paths below are relative to `root/`:

- `portfolio-src/content.ts`, `render.ts`, `main.ts`, `spatial.ts`: typed content, static rendering and optional browser enhancements.
- `css/portfolio.css`: an isolated portfolio design system.
- `case-studies/reorderops.html`, `a-chain-of-pain.html`, `storycodex.html`, `author-website.html`: generated project pages.
- `404.html`: generated recovery page.
- `content/legacy-portfolio.html`: the complete original portfolio.
- `assets/portfolio/`: favicon SVG, two DM Sans WOFF2 files and their license, a real ReorderOps WebP screenshot, social-preview SVG/PNG, a small browser entry and one generated animation chunk.
- `scripts/build.mjs`, `generate.ts`, `preview.mjs`, `capture-preview.mjs`, `capture-evidence.mjs`.
- `tests/portfolio.spec.ts`, `tests/motion.spec.ts`, `playwright.config.ts`, `tsconfig.json`, `eslint.config.mjs`.
- `PORTFOLIO.md` and this report.

The supplied `data/cv.pdf` was also added to version control so the existing CV link is reproducible. Its contents were not edited.

## 3. Files materially changed

`portfolio.html` was rebuilt. `package.json` / `package-lock.json` gained portfolio tooling and GSAP. `.gitignore` gained generated-build and browser-test output exclusions. `sitemap.xml` gained the portfolio and four case studies. The prior working-copy portfolio crawl exclusion was removed from `robots.txt`. `dev-server.js` gained HTML-extension resolution and a 404 fallback.

The portfolio uses its own stylesheet and browser entry; author pages, their stylesheet, API implementation and book content were preserved. Existing unrelated changes remain uncommitted. Task changes to shared package/server files were staged separately from the user's pre-existing mail integration changes.

## 4. Final information architecture

Hero → ReorderOps → A Chain of Pain → Selected Work → Development / AI Workflow → Skills / Technologies → Background / Education → Contact. All four projects have separate detail pages. Main actions expose projects, GitHub, LinkedIn, CV and contact immediately.

## 5. Content/data architecture

`portfolio-src/content.ts` owns identity, hero copy, navigation, public contact links, categories, prominence, project summaries, stack, role/status, highlights, architecture, challenges, verification, links, media, sources, placeholders, case-study sections, workflow, skills and education. Nullable links/media and explicit placeholders keep unsupported claims out of the interface.

TypeScript plus a small esbuild-backed generation step produces semantic static HTML. There is no CMS or new frontend framework. Generated pages/assets are committed, preserving the existing static hosting model. Regenerate them with `npm run build` after content changes.

## 6. Old content retained

The entire old portfolio remains in `content/legacy-portfolio.html`, including the original Finnish text, coursework, project descriptions and education. The author site, admin files, API handlers, books, existing pictures and CV remain available. Original source material was not deleted to simplify the presentation.

## 7. Old content removed from the main experience

The student-first headline, long generic introduction, old blue/white visual system and equal-sized coursework card no longer lead the portfolio. Education supports the Software & AI Developer identity. No unsupported graduation or professional-history claim was added.

## 8. Older coursework representation

A compact “Earlier work & additional experience” paragraph acknowledges C# / .NET MAUI, UiPath StudioX, Power BI / Power Pivot, Power Apps and Power Automate. Kotlin / Compose appears both there and in StoryCodex. Older projects have no competing full project cards and are not described negatively.

## 9. ReorderOps presentation

The flagship receives the first and deepest presentation: a concise product explanation, architecture diagram, selected technical highlights and the full decision path from data to audit. A dedicated case study explains deterministic planning, immutable evidence, stale-state revalidation, internal drafts, read-only AI tools, visitor isolation and persistent usage controls.

The content was checked against the local ReorderOps README, reviewer guide and portfolio case study. It retains documented semantic/language and hosting-verification limits. The cited 303-test milestone is historical ReorderOps source evidence, not a new test run or a count for this website. No business savings, forecasting accuracy or operational integration were invented.

The public live demo returned HTTP 200 and rendered inventory data. Its real, synthetic-data screenshot appears in the case study. The unauthenticated repository URL returned HTTP 404, so the landing page omits that broken source link.

## 10. A Chain of Pain presentation

The second featured project is explicitly a **first-person narrative game built in Unreal Engine 5 / C++**. A clearly captioned concept graphic provides a visual placeholder; it is not represented as gameplay footage. Project notes identify the missing evidence. Enemy perception, chase/search, branching outcomes, reusable systems and solo ownership are not asserted without documentation.

## 11. StoryCodex presentation

A concise Selected Work card and detail page retain the original Android story-making flow: button-based choices, Finnish LLM generation, Android TTS narration and offline access to cached stories. Offline access is distinguished from local model generation. Safety-focused design is described without claiming a formal child-safety validation.

## 12. Author Website presentation

A concise Selected Work card and detail page describe the verified bilingual static frontend, Node.js / Express integration, serverless APIs, JWT admin authentication and book CRUD. Public website and repository links returned HTTP 200. The limitations of JSON storage remain explicit in the deeper explanation.

## 13. Skills presentation

Four categories organize demonstrated capabilities: core languages, application development, AI / engineering workflow, and data / infrastructure. Python, TypeScript / JavaScript, C++, SQL, React, FastAPI, Express, Unreal Engine, SQLite and relevant tools are connected to the selected work. Additional experience receives lower prominence; there is no logo wall or invented proficiency score.

## 14. AI/development workflow presentation

Four steps explain architecture boundaries, focused agent-assisted increments, adversarial/failure-case review and validation before action. The central claim is that AI accelerates implementation and analysis while tests, inspection and validation establish correctness. ReorderOps links the workflow to concrete evidence and observed failures.

## 15. Desktop animation architecture

GSAP / ScrollTrigger and CSS perspective animate semantic HTML panels along an implied spatial path. They approach from the upper-left, settle to exactly neutral transforms across 60% of their scroll range, and recede toward the lower-right. Scrolling upward reverses the same timeline.

There is no pinning, wheel interception, carousel or scroll controller. A small SVG background moves with scroll; no WebGL, physics, post-processing or continuously running decorative animation was added. Case-study text remains in ordinary static document flow.

## 16. Mobile behavior

Mobile and tablet retain normal vertical document flow, the same typography and project hierarchy, visible navigation and accessible actions. No desktop animation dependency is fetched. Layout checks covered 320px, 390px and 820px widths, with no horizontal overflow. Screenshots fit the page and can be opened full-size.

## 17. Reduced-motion behavior

Reduced motion disables spatial travel and the background. Preference changes at runtime revert the animation context and remove inline transforms. A user motion toggle also persists an opt-out when local storage is available. Low-memory/CPU and save-data hints prevent the enhancement, and a failed animation download leaves static content usable.

## 18. Accessibility checks

The generated pages use landmarks, a single H1, logical heading levels, section labels, a skip link, useful link names, visible keyboard focus and screenshot alt text. External links announce new-tab behavior and use safe rel attributes. Keyboard focus forces its panel into a front-facing state.

Automated axe checks found no WCAG 2 A/AA or 2.1 AA violations in tested static desktop/tablet/mobile pages, all case studies and the 404 page. Keyboard focus, skip navigation, motion controls and JavaScript-disabled navigation passed. These checks do not replace a full manual assistive-technology audit.

## 19. Performance work

Measured artifacts: initial JavaScript **1,713 bytes / 879 bytes gzip**; optional desktop animation **116,247 bytes / 45,811 bytes gzip**; portfolio CSS **27,563 bytes / 5,906 bytes gzip**. These are local compression measurements, not hosting-transfer or real-device performance measurements.

Two self-hosted WOFF2 files total about 28.5 KB and use font-display swap. The real screenshot is a 64.8 KB WebP, with explicit dimensions, async decoding and lazy loading. No React runtime, scroll-driven rerendering or WebGL was introduced. Only transform/opacity are animated, and obsolete generated chunks are removed after successful builds.

## 20. Dependencies added/removed

Added runtime dependency: **GSAP**, including ScrollTrigger, loaded conditionally for desktop.

Added development dependencies: **TypeScript**, **esbuild**, **ESLint**, **@eslint/js**, **typescript-eslint**, **@types/node**, **@playwright/test**, **@axe-core/playwright**, and **sharp**. They provide type checks, generation/bundling, linting, browser/accessibility tests and PNG social-preview generation. The font files were reused with their SIL Open Font License.

No existing runtime dependency was removed or upgraded to address unrelated server concerns. The pre-existing Nodemailer addition remains in the user's working changes.

## 21. Build/test results

- `npm run typecheck`: passed.
- `npm run lint`: passed for new TypeScript authoring and tests.
- `npm run build`: passed; generated portfolio, four case studies, 404 and browser assets.
- `npm test`: **15 passed**, latest run 9.4 seconds.
- Express runtime: portfolio HTML/clean URL, all case-study pages, existing author pages and CV returned HTTP 200; an unknown route returned the branded HTTP 404.
- Actual local runtime: desktop, 1100px edge viewport and mobile checks passed, with no detected portfolio JavaScript errors or horizontal overflow.
- Browser checks: keyboard access, no-JavaScript mode, reduced motion, live viewport/preference changes, reversible travel, stable reading interval, failed animation loading, local links, case-study return anchors, image loading, CV download and metadata assets passed.
- Public checks: ReorderOps demo, Author Website, Author Website GitHub and profile returned HTTP 200. ReorderOps source returned public HTTP 404 and is not linked. LinkedIn retains the original verified personal URL; authenticated LinkedIn content was not independently tested.

There was no pre-existing automated suite to weaken. Tests never submit contact messages, mutate project data, start visitor sessions or call paid AI.

## 22. Remaining content/media placeholders

A Chain of Pain needs gameplay media, architecture, role/status, public source/build links and testing evidence. StoryCodex needs verified media, source/release links, role and formal evaluation evidence. Author Website could use a dedicated screenshot and role record. ReorderOps needs an accessible public source URL if code is to be linked; a narrated video is optional. The supplied CV was not assessed for freshness or rewritten.

## 23. Remaining issues and boundaries

`npm audit` reports **five existing server-dependency advisories: three moderate and two high**, involving the Express dependency chain and Nodemailer. They are outside this portfolio redesign and were not silently resolved with unrelated server upgrades.

The portfolio is complete with documented evidence placeholders. ReorderOps' known AI language/semantic and hosting/recovery limitations belong to that project and are preserved in its case study. No hosted portfolio behavior, real-device GPU measurement, Firefox/Safari rendering or full screen-reader audit is claimed. Existing unrelated work remains dirty in Git by design.

## 24. Local commit history created

1. `afbc96b` — Add typed portfolio content and preserve original project evidence.
2. `8bf9384` — Rebuild semantic static portfolio and case studies with browser checks.
3. `561f0ac` — Define restrained visual system with verified demo media and responsive layouts.
4. `d156ae9` — Add optional desktop spatial scroll with accessible static fallbacks.
5. `0051533` — Polish responsive accessibility, SEO, CV access and local routing.
6. Final documentation commit — Record portfolio verification and remaining evidence; contains this report. Resolve its hash with `git log -1 --oneline`.

The content/static baseline was completed and checked before the visual system; the visual system was checked before advanced motion. All commits are local. Work stops after this report; nothing is pushed or deployed.
