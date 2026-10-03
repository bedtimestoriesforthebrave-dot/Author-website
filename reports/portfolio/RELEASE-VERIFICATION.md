# Portfolio release: local verification and push checkpoint

Verified on 3 October 2026 (Europe/Helsinki). This records local release preparation; deployment and production results are reported separately after the push.

## Repository reconciliation

- Original branch: `main`, starting HEAD `137244071195b9d95c82be5fee03ba8c12fd4575`; original dirty worktree retained untouched.
- Merge-base: `7f1e2e98f4e21900e6970624d4113dddbe40bf6d`.
- Remote baseline: `c179185d110db51b7bd3aa809bf4a8d93aab0b41`.
- Release branch: `codex/portfolio-release`, a descendant of that remote baseline.
- Remote-only commits: 42, inspected by file changes. Remote author pages, APIs, book data, mail integration and hosting configuration are retained.
- The remote portfolio blob exactly matched the archived legacy portfolio (`55fb043e2a8b3befd0f9b3efbfe6e15468c88e8a`). Its replacement is the intended portfolio release, not conflicting remote work.
- Local-only commits: 11. Ten portfolio commits were selected; unrelated author-site setup `eed17dd` was excluded. No uncertain commits remain.

| Original commit | Classification | Change |
| --- | --- | --- |
| `eed17dd` | UNRELATED — excluded | Prepare author site for deploy |
| `afbc96b` | PORTFOLIO RELEASE | Add typed portfolio content and preserve original project evidence |
| `8bf9384` | PORTFOLIO RELEASE | Rebuild semantic static portfolio and case studies with browser checks |
| `561f0ac` | PORTFOLIO RELEASE | Define restrained visual system with verified demo media and responsive layouts |
| `d156ae9` | PORTFOLIO RELEASE | Add optional desktop spatial scroll with accessible static fallbacks |
| `0051533` | PORTFOLIO RELEASE | Polish responsive accessibility, SEO, CV access and local routing |
| `ee84c0b` | PORTFOLIO RELEASE | Record portfolio verification and remaining evidence |
| `72cb699` | PORTFOLIO RELEASE | Add shared English and Finnish portfolio content and navigation |
| `49a8ffe` | PORTFOLIO RELEASE | Expand bilingual A Chain of Pain case study from verified Hunter evidence |
| `0e17470` | PORTFOLIO RELEASE | Record Hunter case-study verification and remaining media evidence |
| `1372440` | PORTFOLIO RELEASE | Polish bilingual A Chain of Pain playable-slice presentation |

Chronological release commits before this verification commit:

```text
40413ba Add typed portfolio content and preserve original project evidence
86d8f32 Rebuild semantic static portfolio and case studies with browser checks
9cb7287 Define restrained visual system with verified demo media and responsive layouts
bee2938 Add optional desktop spatial scroll with accessible static fallbacks
afdf34a Polish responsive accessibility, SEO, CV access and local routing
ec831f8 Record portfolio verification and remaining evidence
d7900a5 Add shared English and Finnish portfolio content and navigation
6d8c6ea Expand bilingual A Chain of Pain case study from verified Hunter evidence
f1c7c0c Record Hunter case-study verification and remaining media evidence
a951878 Polish bilingual A Chain of Pain playable-slice presentation
adf4d59 Update Finnish developer CV
eee7002 Publish curated ReorderOps technical documentation
```

Conflicts resolved: `.gitignore` was restored with portfolio build/test exclusions; the add/add `portfolio.html` conflict replaced the known identical legacy page; package files combined portfolio tooling with remote Nodemailer and preserved its pinned package. Development-server changes merged without conflicts and retain all remote contact/mail code. The old CV already matched the remote at replay; its separate final replacement follows below. No unrelated files from the original worktree were staged.

Remote-only history inspected:

- `9ea40bc Add files via upload`
- `3661bbf Add files via upload`
- `08f0d8b Add files via upload`
- `d090abf Add files via upload`
- `51c9380 Add files via upload`
- `f1d7558 Add files via upload`
- `ca393b6 Add files via upload`
- `17851fd Add files via upload`
- `08c705b Add files via upload`
- `f8d941d Delete admin directory`
- `57bfbee Add files via upload`
- `b64cc1e Delete api directory`
- `f33fb36 Delete css directory`
- `26b38b9 Delete data directory`
- `7482a4c Delete js directory`
- `13f6dc1 Delete pictures directory`
- `33f09fc Delete about.html`
- `51e1416 Delete admin.html`
- `1191003 Delete books.html`
- `7a69b9f Delete contact.html`
- `a80a22b Delete dev-server.js`
- `93f19a9 Delete index.html`
- `ab1a6cc Delete package-lock.json`
- `dd70cc3 Delete package.json`
- `7d429e3 Delete robots.txt`
- `e307a82 Delete sitemap.xml`
- `283e1de Delete vercel.json`
- `da65624 Add files via upload`
- `ee5ce94 Add files via upload`
- `d0083be Add files via upload`
- `a9cfb5e Add files via upload`
- `d8a05fc Add files via upload`
- `ea23a9a Add files via upload`
- `0961405 Add files via upload`
- `2cc2ea4 Add files via upload`
- `88c01d8 Delete data directory`
- `26d8fa6 Add files via upload`
- `97a999b Add files via upload`
- `1fc7b2c Add files via upload`
- `2127975 Delete root/data/cv.pdf`
- `465244b Rename CV - Ville Lähteenmäki.pdf to cv.pdf`
- `c179185 Add files via upload`

## Authoritative CV

Source: the user-confirmed final `root/data/cv.pdf` in the original Author-website worktree. No Downloads CV was substituted. The original file was not changed.

The release copy has SHA-256 `816a9a649b9eb6c4c48f7deae6a5ada682383a51a9977415a1a283e90d441c16`. It is one readable Finnish page with Software & AI Developer positioning, the current stack, ReorderOps, A Chain of Pain and an embedded `https://reorder-ops.vercel.app/` link. PDF parsing, visual review and local HTTP byte checks passed. Both locales use `/data/cv.pdf`; local HTTP returns 200 with the exact approved bytes. The CV is Finnish-only intentionally.

## Curated ReorderOps documentation

Five English public editions derive from the actual project documentation:

| Public document | Original source | Public URL |
| --- | --- | --- |
| Reviewer Guide | reviewer-guide.md | https://vlnikolai.com/docs/reorderops/reviewer-guide |
| Architecture & AI Assistant | v5-assistant.md | https://vlnikolai.com/docs/reorderops/architecture |
| Planning Rules | planning-rules.md | https://vlnikolai.com/docs/reorderops/planning-rules |
| AI Evaluation | v5-live-evaluation-expanded.md | https://vlnikolai.com/docs/reorderops/ai-evaluation |
| Public Demo Controls | public-demo-controls.md | https://vlnikolai.com/docs/reorderops/public-demo |

Index: https://vlnikolai.com/docs/reorderops/ . This location avoids a directory collision with the clean `/portfolio` route. English and Finnish ReorderOps case studies link to the same catalog, from both the hero actions and a technical-documentation section. Finnish uses “Dokumentaatio · englanniksi”. No private GitHub source link is restored.

The public editions omit private deployment diaries, environment-loading details, temporary session identifiers and retained-artifact paths. Relative references to unpublished documents remain readable text without broken/private links. Historical V5/V6 versions and local-versus-hosted scope are explicitly identified; original failures, later reruns, semantic/language limitations and financial qualifications remain intact. Originals and ReorderOps application code are untouched. No provider calls or data mutations were made for this release.

## Material changes and implementation

- CV PDF: separate replacement commit `adf4d59`.
- Documentation commit `eee7002`: five reviewed Markdown copies, six generated HTML pages, one small Marked-based renderer/catalog, shared link metadata, EN/FI labels and case-study links, semantic document styling, static-generator integration and preview routing.
- Portfolio tooling adds pinned build-time `marked@18.0.14`; it is not shipped in the browser entry. Code and tables remain selectable/semantic; raw HTML and unsafe URL schemes are rejected.
- Tests: release coverage plus a scoped documentation-label locator in the existing Finnish test (the label now occurs in multiple legitimate places). Assertions and accessibility standards are retained.
- Original portfolio and historical reports are preserved under `reports/portfolio/`, outside the deployed `root` directory. Developer guide updated.
- Main hierarchy, bilingual shared structure, English default and Hunter evidence/media boundaries remain intact. No gameplay media was enabled or fabricated.
- Existing `vercel.json`, DNS, environment variables, hosting accounts/settings, author APIs, Unreal project and ReorderOps code remain unchanged.

## Local gates

- Typecheck: passed.
- Lint: passed.
- Build: passed.
- Playwright: **45 passed**, 38 existing plus seven release tests; final full run 41.0 seconds.
- Viewports: 1440, 820, 390 and 320 pixels, both portfolio locales, both flagship case-study locales, documentation index and all five documents.
- Axe WCAG 2 A/AA and WCAG 2.1 AA: no violations on checked pages. Keyboard focus/skip links, reduced motion, JavaScript-disabled navigation, language switching and section/project preservation passed.
- No horizontal page overflow, console/page errors, missing assets or broken internal links were detected. Desktop/mobile document screenshots were visually inspected.
- Existing Express static-route behavior independently returned 200 for `/portfolio`, `/fi/portfolio`, `/docs/reorderops/` and clean planning-rules route.
- Public generated pages/assets and curated Markdown were scanned for local paths, localhost, environment/runtime references, raw audit filenames and common credential signatures: no matches.
- External checks: ReorderOps demo, Author Website, portfolio, intended GitHub profile/repository returned HTTP 200. LinkedIn returned HTTP 999 (unauthenticated automation blocked); the existing intentionally exposed URL is retained.
- npm audit reports five existing author-server dependency advisories (three moderate, two high, in the Express dependency chain and Nodemailer). No automatic or breaking dependency upgrades were made; Marked has no listed advisory. This remains a separate author-server maintenance item.

## Push and deployment plan

Immediately before push, fetch and require the remote baseline to remain `c179185d110db51b7bd3aa809bf4a8d93aab0b41`. Require a clean release worktree and `git merge-base --is-ancestor origin/main HEAD` success. Push only `codex/portfolio-release:main` using normal fast-forward semantics; never force. Stop if remote main moved or rejects the push. Observe the existing Vercel Git deployment through GitHub status/deployment records. Do not change hosting settings. After success, verify the public EN/FI pages, every document, the exact CV hash, internal assets/links, Hunter note and privacy scan.

Known remaining nice-to-haves: actual device/screen-reader checks beyond automated accessibility, optional real gameplay captures and walkthrough videos, existing ReorderOps language/financial/recovery qualifications, and the separate author-server dependency maintenance noted above.

## Deployment-output repair, 3 October 2026

The original release was pushed normally to the intended `bedtimestoriesforthebrave-dot/Author-website` repository at `e7fcd4f`. After the user connected Git in Vercel, an empty retry commit `17ab61a` triggered a production deployment. Vercel marked that attempt failed; the user supplied the error that no output directory named `public` was found.

The build previously generated files in the application root. It now stages public pages, browser assets, the approved CV and existing public book data into an ignored `public/` directory. The author landing page and author pages are included; APIs remain in their original `api/` directory. Source content, tooling, private/local files and reports are excluded. Rebuilding clears only the generated output directory and rejects symbolic links. No Vercel configuration, dashboard settings, DNS or environment variables were changed.

The browser preview now serves the deployment output. Typecheck, lint and build passed; **47 tests passed** (two output-contract tests plus all 45 browser tests, 43.9 seconds for the browser suite). The output-contract tests verify retained author/portfolio/document assets, the exact approved CV bytes, private-file exclusion and stale-output cleanup. A privacy scan of all 46 staged files returned no local-path, localhost, environment/runtime, raw-audit or common credential-signature matches. Deployment and production verification remain pending this repair's push.
