# A Chain of Pain — portfolio media slots

This is a maintenance guide, not a public case-study page. The public English and Finnish pages share five slots from `portfolio-src/content.shared.ts`. Titles, internal capture descriptions, alt text and captions live in `content.en.ts` / `content.fi.ts`. Slots with `available: false` render nothing publicly: no placeholder card, empty image frame, broken request or fake gameplay image.

## Expected files

All paths below are relative to the `root` application directory. Image/video metadata currently expects 1920 × 1080; update the dimensions if the actual capture differs.

| Slot | Exact expected file | What the capture should demonstrate |
| --- | --- | --- |
| Hero | `assets/portfolio/a-chain-of-pain/hero-gameplay.webp` | Real first-person H2 hospital gameplay with the Hunter and an interactive door; credit third-party environment composition. |
| Detection | `assets/portfolio/a-chain-of-pain/detection-debug.webp` | A partly filled detection meter and its distance, angle, gait/movement and flashlight factors in PIE. |
| Hearing | `assets/portfolio/a-chain-of-pain/path-aware-hearing.webp` | Heard/muffled decisions, navigable path length and hearing limit. A comparison image may contain two genuine captures. |
| Search | `assets/portfolio/a-chain-of-pain/search-debug.webp` | Last-perceived position, widening search area, heading bias and selected destination after sight is lost. |
| Stealth loop | `assets/portfolio/a-chain-of-pain/stealth-loop.mp4` | Approximately 45–75 seconds connecting noise, investigation, detection, pursuit, escape and search in the actual prototype. |

The video slot also expects:

- `assets/portfolio/a-chain-of-pain/stealth-loop.en.vtt`
- `assets/portfolio/a-chain-of-pain/stealth-loop.fi.vtt`

These caption tracks describe meaningful dialogue, notices and audio cues in the supplied recording. The same video serves both portfolio languages; the appropriate caption track is selected by default. No caption or media files have been fabricated. An optional real video poster can be set through the slot's `poster` field.

## Adding real captures

1. Capture manually in the Unreal project. This portfolio task does not operate or modify Unreal. Use the supplied media capture plan as evidence guidance, not as public copy.
2. Select captures that demonstrate the claimed system and have suitable asset credits/rights. The source audit did not establish every third-party asset's provenance; check the material selected for the capture.
3. Add the actual files at the paths above. Review both localized captions and alt text against what the files really show. Keep environment composition distinct from original modelling. A staged/frozen pose should be described accordingly.
4. Set that slot's `available` flag to `true` in the shared metadata. Add any real poster URL and update dimensions. The generator verifies that enabled assets and referenced caption tracks exist before emitting pages.
5. Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm test`. Update the missing-media assertions in `tests/hunter.spec.ts` to verify the newly available capture, preserving the factual and accessibility checks. Inspect both languages on desktop and mobile.

Images become semantic figures with localized alt text/captions and a full-size link. Video uses native controls, `preload="none"`, caption tracks and a download fallback. No autoplay or new player dependency is introduced.

The current main-card graphic remains explicitly labelled as a concept graphic. Do not relabel it as gameplay. No second enemy, narrative ending, player weapon or superseded blockout area should be staged or captioned as implemented work.
