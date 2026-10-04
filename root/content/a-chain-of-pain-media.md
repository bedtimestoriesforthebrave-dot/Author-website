# A Chain of Pain — portfolio media

This is a maintenance guide, not a public case-study page. Media metadata (paths, dimensions, section placement) lives in `portfolio-src/content.shared.ts`; alt text, captions, comparison labels and the video outline live in `content.en.ts` / `content.fi.ts`.

## Raw sources vs published files

Raw captures go in `media-inbox/` (PNG screenshots and the original showcase MP4). That folder is listed in `.gitignore` and `.vercelignore`, is not one of the directories `scripts/public-output.mjs` stages into `public/`, is not served by the local preview, and must never be referenced by a page. Tests assert this, including that `public/` carries byte-identical copies of the derivatives.

Web derivatives are generated into `assets/portfolio/a-chain-of-pain/` by an explicit script that is not part of `npm run build`:

```
FFMPEG=/path/to/ffmpeg node scripts/prepare-game-media.mjs
```

- Screenshots → WebP at 1600 px (full size / link target) and 960 px (`srcset`), quality 86 with full-resolution chroma to keep shadow detail in dark scenes.
- Video → `gameplay-showcase.mp4`: 1280×720 H.264 High, CRF 22 capped at 2.6 Mbps, `aq-mode=3` for dark flat areas, AAC 160 kbps stereo, `+faststart`. About 28 MB from a ~228 MB source.
- Poster → `gameplay-showcase-poster.webp`, taken from the manor entrance at 12 s rather than the capture at the end.

## Current selection

| Slot | Files | Section |
| --- | --- | --- |
| Main card | `manor-staircase-{960,1600}.webp` | portfolio card |
| Case-study header | `hospital-main-lobby-{960,1600}.webp` | study header (a different environment from the card) |
| Gameplay showcase | `gameplay-showcase.mp4`, `gameplay-showcase-poster.webp` | Gameplay showcase |
| Flashlight comparison | `hospital-lab-flash-{off,on}-{960,1600}.webp` | Gameplay systems |
| Locked door | `locked-door-*` | Gameplay systems |
| Manor staircase, reception | `manor-staircase-*`, `reception-*` | World and level design |
| Hunter unaware, suspicious, chase | `hunter-unsuspicious-*`, `hunter-suspicious-*`, `chase-*` | The Hunter |

Not used: `hospital-entrance.png` (too dark to read at web size) and `manor-upstairs.png` (duplicates the staircase's role).

## Adding or replacing media

1. Put the raw file in `media-inbox/`, add it to the script's list and rerun the script.
2. Add or update the slot in `content.shared.ts` (dimensions of the 1600 px file) and its copy in both locale files. Describe only what the capture really shows; environment art is licensed and must not be captioned as original modelling.
3. Run `npm run typecheck`, `npm run lint`, `npm run build` and `npm test`. The generator rejects missing files; the tests check declared dimensions, file sizes, lazy loading, that the video is never fetched before playback, and that nothing from `media-inbox/` is published.

The video uses native controls, `preload="none"`, a poster and no autoplay. A text outline of the sequence follows it; there are no caption tracks because the recording has no dialogue.
