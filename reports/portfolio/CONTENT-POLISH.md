# Bilingual portfolio content polish

Starting release HEAD: `16aeaed64e05896320532a7c1b1994877b1b859f`, branch `codex/portfolio-release`. Work was completed in the existing clean release worktree; the original dirty main checkout and its unrelated changes remain untouched.

The user initially requested one local commit, then explicitly authorized publishing once the new CV was supplied and all checks passed. No site redesign, CSS changes, dependencies, Unreal changes or ReorderOps application changes were made.

## Presentation

- Main A Chain of Pain card: “Story-driven First-Person Narrative Game” / “Tarinavetoinen ensimmäisen persoonan narratiivinen peli”, a compact solo-directed UE5/C++ introduction, a broader summary and project-level highlights. CTA: “Explore project” / “Tutustu projektiin”.
- Case study: story/worldbuilding, player gameplay, world/level design, modest character development and original music appear before the retained deep Hunter engineering content. Stable existing section IDs remain; two shared IDs were added for character and audio.
- Story: evolving lore, world history and environmental storytelling are presented as design intent. The current playable slice supplies gameplay and technical foundations. Dialogue, player choices, objectives, story triggers, branching endings and full narrative progression are explicitly unfinished.
- Gameplay: first-person exploration, sneak/crouch/run, panic sprint, reusable interaction, shared doors, flashlight, wounds/critical state and capture/death/retry have more visible weight.
- World: manor and hospital composition, traversal, encounters, NavMesh and AI territory integration are attributed to custom layout work using licensed modular third-party assets.
- Character: “AI-assisted character prototyping and development for Hunter 1.” / “Hunter 1 -hahmon AI-avusteinen prototypointi ja kehitys.” The character is marked work in progress.
- Soundtrack: “I composed the game’s original soundtrack.” / “Sävelsin pelin alkuperäisen soundtrackin.” Composition is credited separately from the retained description of reactive audio responding to enemy state and gameplay.
- Detailed Hunter perception, StateTree, hearing, detection, memory/search, priority, territory/doors, tuning/debug and regression evidence remain. The available-on-request note is unchanged and remains in the case study.
- Contact: “Get in touch.” / “Ota yhteyttä.” with the requested direct opportunity description, existing email and GitHub/LinkedIn/CV links. The marketing eyebrow was removed; the existing layout is retained.

## Updated CV

The authoritative new PDF was read only from the original repository's `root/data/cv.pdf`, after the user confirmed it was in place. It was visually inspected, confirmed one page with the developer positioning and updated broader game description, and copied unchanged to the release worktree. The portfolio and ReorderOps demo hyperlinks are present.

New SHA-256: `8024b2f3e44b61c0899d9c638377e98efa12a371c77009a435ee551e70ea03fa`.

Exact-byte test expectations and the current developer guide were updated for the supplied PDF. Historical release reports retain the hashes of their own verified releases.

## Files and verification

- Source: `root/portfolio-src/content.en.ts`, `content.fi.ts`, `content.shared.ts`, `render.ts`, `ui.ts`.
- Generated: EN/FI `portfolio.html` and EN/FI `case-studies/a-chain-of-pain.html`.
- CV, current guide and checks: `root/data/cv.pdf`, `root/PORTFOLIO.md`, `root/scripts/public-output.test.mjs`, `root/tests/hunter.spec.ts`, `root/tests/release.spec.ts`.
- Report: this file, outside the public output.

Typecheck, lint and build passed. **47 tests passed**, including all 45 Playwright tests and two deployment-output tests; the browser suite took 52.6 seconds. Assertions were retained and expanded for narrative boundaries, character/music attribution, project CTA and direct contact copy. All requested content was verified in EN/FI at desktop, tablet and mobile widths (1440, 820, 390 and 320), including keyboard/skip navigation, reduced motion, no-JavaScript navigation, language switching, stable section IDs, accessible headings, links and missing-media boundaries. Axe checks reported no violations. No horizontal overflow or console/page errors were detected. Extra card/contact screenshots were reviewed at desktop and narrow mobile widths.

Build output serves the new CV's exact bytes. A scan of `public/` found no local paths, localhost, environment/runtime references, raw audit filenames or common credential signatures. ReorderOps content and documentation remain unchanged.

Push will be a normal fast-forward to the existing `bedtimestoriesforthebrave-dot/Author-website` remote main only after the final fetch confirms the baseline has not moved. Deployment and production verification are reported separately after publishing.
