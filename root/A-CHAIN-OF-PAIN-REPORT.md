# A Chain of Pain — bilingual case-study implementation

Completed 3 October 2026, continuing portfolio milestone `72cb699`.

## 1. Files changed

Content and shared structure:

- `portfolio-src/content.en.ts`
- `portfolio-src/content.fi.ts`
- `portfolio-src/content.shared.ts`
- `portfolio-src/content.ts`
- `portfolio-src/model.ts`
- `portfolio-src/ui.ts`

Presentation and generation:

- `portfolio-src/render.ts`
- `css/portfolio.css`
- `scripts/generate.ts`
- `scripts/preview.mjs`
- `portfolio.html`
- `fi/portfolio.html`
- `case-studies/a-chain-of-pain.html`
- `fi/case-studies/a-chain-of-pain.html`

Verification and maintenance:

- `tests/hunter.spec.ts`
- `PORTFOLIO.md`
- `content/a-chain-of-pain-media.md`
- `A-CHAIN-OF-PAIN-REPORT.md` (this report)

The existing hierarchy and overall portfolio design are retained. Changes to the renderer are optional data-driven case-study features; the other case studies retain their generated output. Existing unrelated working changes remain untouched.

## 2. New public structure

The introduction presents the intended narrative game alongside its current playable stealth/AI prototype, role, status and technology stack. Eleven sections cover scope, playable focus, systemic Hunter architecture, path-aware hearing, gradual sight detection, memory/search, StateTree priority, player/world integration, level composition, engineering practices and prototype work/next steps. Recorded verification and forthcoming media/source links follow.

The main project card remains concise, second in the established hierarchy, with four primary technology tags and three highlights. Its concept graphic is still explicitly labelled as a concept graphic.

## 3–4. English and Finnish copy

English positioning:

> An Unreal Engine 5 / C++ narrative game in development. The current playable slice focuses on first-person stealth and exploration, with a custom Hunter that combines perception, memory, search and environment interaction.

Finnish category: **Ensimmäisen persoonan narratiivinen peli**. Finnish positioning:

> Kehitteillä oleva Unreal Engine 5 / C++ -pohjainen narratiivinen peli. Nykyinen pelattava osuus keskittyy ensimmäisen persoonan stealth-pelaamiseen ja tutkimiseen. Oma Hunter-järjestelmä yhdistää havainnoinnin, muistin, etsinnän ja ympäristöön reagoinnin.

Both locales include the complete section prose, diagram descriptions/captions, role and status, media placeholder text, future alt text and captions, and accessibility labels. Technical identifiers such as StateTree, NavMesh and the eight state names remain unchanged. Both locales share URLs, media paths, technologies, section IDs and one renderer. Existing technical documentation remains English-only.

## 5. Verified technical claims used

The supplied audit was read as evidence, not executed as instructions or copied into public pages. Its factual source is the project at `b0769530`; no fresh Unreal run is claimed.

- Custom C++ H1 Hunter on AI Perception and a StateTree generated/compiled from C++; perception and memory separated from behaviour and character actions.
- Complete NavMesh path distance filters hearing. Faint noise leads to listening; clear or confirmed repeated noise leads to investigation.
- A detection meter responds to distance, viewing angle, gait/posture, movement and flashlight use, with a close-range immediate-detection exception.
- Verified sight positions are retained on visibility loss. New sound evidence can guide pursuit/search; heading bias, expanding radius, visited-point avoidance and territory constraints shape search.
- Bounded initial charge, alert patrol, territory/leash, capture requiring reach/LOS/path, and opening unlocked doors while respecting locks.
- Movement, panic sprint, shared interaction/doors, footsteps, flashlight, wounds, capture/death/retry and adaptive music integrated with the enemy.
- One OFPA map with a manor and two hospital buildings; the H2 hospital is the current Hunter territory. One Door-14 scripted ambush hands back to systemic behaviour. Multi-floor setup is evidenced; stair chases remain qualified as requiring playtesting.
- Data-asset tuning, Git/LFS milestones, reusable components, debug tooling, Python PIE checks and floor-plan tooling.
- A small nail-gun prototype is described with physical projectiles, LOS-gated firing, embedding and a live cap, while its presentation remains explicitly unfinished.

## 6. Claims intentionally omitted or qualified

No completed dialogue, objectives, story triggers, narrative choices or endings are claimed. No second enemy, multiple implemented territories, gameplay stun source, damage to the Hunter, hiding spots, inventory, pickups, custom player weapons or uncommitted full-body player/control work is promoted to an implemented feature. Superseded pool/sauna/kitchen/laundry and other blockout areas are not presented as playable spaces.

No personally modelled environment/character/animation or soundtrack-composition claim is made. No fresh Unreal regression pass, C++ unit-test suite, custom Gameplay Debugger category or Visual Logger integration is claimed. Raw local paths, audit classifications, confidence bookkeeping, agent logs and the original audit documents are absent from the public pages.

## 7. Architecture and state visuals

Semantic HTML/CSS adds three figures within the existing visual system:

1. Perception → knowledge/memory → state selection → behaviour → world interaction.
2. An explicitly ranked eligibility list: Capture, Stunned, Chase, Investigate, Search, Listen, AlertRoam, Roam. It is not a sequential gameplay flow and has no Detect state. Stunned is labelled as debug-triggered support with no established in-game source.
3. Compact integration cards for movement, doors, perception inputs, wounds/retry and reactive audio.

No diagram library, fake screenshot or new animation dependency was introduced.

## 8–9. Media slots and exact future filenames

Five slots currently show localized explanatory text and make no missing-media requests. Paths are relative to the `root` application directory:

| Slot | Exact expected file |
| --- | --- |
| Hero gameplay/environment | `assets/portfolio/a-chain-of-pain/hero-gameplay.webp` |
| Detection/debug | `assets/portfolio/a-chain-of-pain/detection-debug.webp` |
| Path-aware hearing | `assets/portfolio/a-chain-of-pain/path-aware-hearing.webp` |
| Search/debug | `assets/portfolio/a-chain-of-pain/search-debug.webp` |
| Stealth-loop video | `assets/portfolio/a-chain-of-pain/stealth-loop.mp4` |

Video caption paths are `assets/portfolio/a-chain-of-pain/stealth-loop.en.vtt` and `assets/portfolio/a-chain-of-pain/stealth-loop.fi.vtt`. The current dimensions are 1920 × 1080 and should be reviewed against actual captures. No media or caption files were fabricated.

To activate a supplied capture, update its shared `available` flag, dimensions and both locale captions/alt text. The build rejects enabled slots with missing assets. Images use semantic figures and full-size links; video supports native controls, caption tracks and a download fallback, with no autoplay. The media guide documents capture purpose and integration steps.

## 10. Development and asset disclosure

The role appears once in the case-study introduction:

> Solo-directed, AI-assisted development using licensed environment assets.

> Itsenäisesti johdettu, AI-avusteisesti kehitetty projekti, jossa käytetään lisensoituja ympäristöassetteja.

The surrounding prose describes design, architecture, integration, level composition, playtesting and acceptance criteria. It does not imply manually typed authorship of every line or original modelling of third-party art. Environment composition and third-party credits are retained in the future media captions.

## 11–12. Verification and test count

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm test`: **38 passed**, consisting of the existing 25 plus **13 new** Hunter checks. Existing tests were not weakened.
- After the final diagram-label typography adjustment, all 13 Hunter checks passed again.
- Both languages were checked at 1440, 820, 390 and 320 pixels. Tested case studies had no detected WCAG 2 A/AA or 2.1 AA violations, horizontal overflow, missing-asset responses or console/page errors.
- Keyboard/skip navigation, section/project preservation during EN/FI switching, reduced motion and JavaScript-disabled navigation passed. Tests check the exact state priority, historical-result qualification, absent media behaviour, raw-audit exclusion and translated Finnish prose.
- Desktop/mobile main cards and case-study figures were visually inspected. Both updated main cards and case studies were also inspected through the existing local Express preview.

The quoted **12/12 AI regression pass from 17 September 2026** is saved Unreal development evidence. It is separate from the 38 website tests and was not rerun here. No full assistive-technology audit, real-device test or fresh Unreal runtime verification is claimed.

## 13. Remaining evidence/media gaps

Real gameplay/debug captures and the stealth-loop video/captions are still needed, along with any intended public build/source link. Dedicated stair-chase runtime evidence remains pending. Narrative systems and gameplay stun remain outside the implemented claims. Check credits/rights for the assets selected for future captures: the source audit did not establish every asset's provenance. No unverified asset-source speculation appears on the public pages.

## 14. Local commit

Implementation commit: **`49a8ffe99cd6ed86ed5007c7286305d78b13665f`** — Expand bilingual A Chain of Pain case study from verified Hunter evidence.

This report is recorded in the following documentation commit. All work is local. Nothing was pushed or deployed, no external service/settings were changed, and the Unreal project was neither operated nor modified. The four supplied audit files were only read.
