import type { ProjectMetadata } from './model';

export const sharedSite = {
  "name": "Ville Lähteenmäki",
  "initials": "VL",
  "email": "wilzeu@gmail.com",
  "social": [
    {
      "label": "GitHub",
      "url": "https://github.com/bedtimestoriesforthebrave-dot"
    },
    {
      "label": "LinkedIn",
      "url": "https://www.linkedin.com/in/ville-l%C3%A4hteenm%C3%A4ki-734698302"
    }
  ],
  "cv": {
    "url": "/data/cv.pdf"
  },
  "cvDownload": {
    "url": "/data/cv.pdf",
    "download": "Ville-Lahteenmaki-CV.pdf"
  },
  "educationPeriod": "2023–2026",
  "navigationIds": [
    "work",
    "approach",
    "background",
    "contact"
  ],
  "skills": [
    {
      "id": "core",
      "items": [
        "Python",
        "TypeScript / JavaScript",
        "C++",
        "SQL"
      ]
    },
    {
      "id": "development",
      "items": [
        "React",
        "FastAPI",
        "Node.js / Express",
        "Unreal Engine 5"
      ]
    },
    {
      "id": "ai",
      "items": [
        "@llmApis",
        "@codingAgents",
        "@aiEvaluation",
        "@promptContext",
        "@aiDebugReview"
      ]
    },
    {
      "id": "infrastructure",
      "items": [
        "SQLite",
        "@restApis",
        "Git / GitHub",
        "Vercel",
        "Railway"
      ]
    }
  ]
} as const;

export const projectMetadata: ProjectMetadata[] = [
  {
    "slug": "reorderops",
    "title": "ReorderOps",
    "number": "01",
    "prominence": "flagship",
    "technologies": [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "SQLite"
    ],
    "links": {
      "demo": "https://reorder-ops.vercel.app",
      "github": null,
      "caseStudy": "/case-studies/reorderops.html",
      "documentation": "/docs/reorderops/"
    },
    "media": {
      "src": "/assets/portfolio/reorderops-demo.webp",
      "width": 1440,
      "height": 1000
    },
    "sources": [
      "ReorderOps README.md",
      "docs/portfolio-case-study.md",
      "docs/reviewer-guide.md",
      "docs/v5-live-evaluation-expanded.md",
      "docs/v6-hosted-ai-evaluation.md",
      "docs/public-demo-controls.md"
    ],
    "studyIds": [
      "the-problem",
      "planning-that-can-be-replayed",
      "a-human-decision-validated-again",
      "ai-interpretation-with-a-narrow-boundary",
      "a-public-demo-with-isolated-actions",
      "verification-and-honest-limits"
    ]
  },
  {
    "slug": "a-chain-of-pain",
    "title": "A Chain of Pain",
    "number": "02",
    "prominence": "featured",
    "technologies": [
      "Unreal Engine 5",
      "C++",
      "AI Perception",
      "StateTree"
    ],
    "additionalTechnologies": [
      "NavMesh",
      "Enhanced Input",
      "UMG",
      "Git / Git LFS"
    ],
    "links": {
      "demo": null,
      "github": null,
      "caseStudy": "/case-studies/a-chain-of-pain.html"
    },
    "media": {
      "src": "/assets/portfolio/a-chain-of-pain/manor-staircase-1600.webp",
      "small": "/assets/portfolio/a-chain-of-pain/manor-staircase-960.webp",
      "width": 1600,
      "height": 870
    },
    "sources": [
      "@sourceGame"
    ],
    "studyIds": [
      "the-game",
      "gameplay-showcase",
      "confirmed-project-scope",
      "gameplay-first",
      "current-playable-focus",
      "level-composition",
      "the-hunter",
      "audio-and-original-soundtrack",
      "character-development",
      "systemic-enemy-ai",
      "path-aware-hearing",
      "gradual-visual-detection",
      "memory-and-search",
      "behaviour-selection",
      "engineering-practices"
    ],
    "mediaSlots": [
      {
        "id": "hospital-lobby",
        "sectionId": "hero",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/hospital-main-lobby-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/hospital-main-lobby-960.webp",
        "available": true,
        "width": 1600,
        "height": 868
      },
      {
        "id": "showcase",
        "sectionId": "gameplay-showcase",
        "kind": "video",
        "assetPath": "/assets/portfolio/a-chain-of-pain/gameplay-showcase.mp4",
        "available": true,
        "width": 1280,
        "height": 720,
        "poster": "/assets/portfolio/a-chain-of-pain/gameplay-showcase-poster.webp"
      },
      {
        "id": "flashlight",
        "sectionId": "current-playable-focus",
        "kind": "comparison",
        "assetPath": "/assets/portfolio/a-chain-of-pain/hospital-lab-flash-off-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/hospital-lab-flash-off-960.webp",
        "compare": {
          "assetPath": "/assets/portfolio/a-chain-of-pain/hospital-lab-flash-on-1600.webp",
          "small": "/assets/portfolio/a-chain-of-pain/hospital-lab-flash-on-960.webp"
        },
        "available": true,
        "width": 1600,
        "height": 870
      },
      {
        "id": "locked-door",
        "sectionId": "current-playable-focus",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/locked-door-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/locked-door-960.webp",
        "available": true,
        "width": 1600,
        "height": 868
      },
      {
        "id": "manor-staircase",
        "sectionId": "level-composition",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/manor-staircase-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/manor-staircase-960.webp",
        "available": true,
        "width": 1600,
        "height": 870
      },
      {
        "id": "reception",
        "sectionId": "level-composition",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/reception-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/reception-960.webp",
        "available": true,
        "width": 1600,
        "height": 868
      },
      {
        "id": "hunter-unaware",
        "sectionId": "the-hunter",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/hunter-unsuspicious-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/hunter-unsuspicious-960.webp",
        "available": true,
        "width": 1600,
        "height": 867
      },
      {
        "id": "hunter-suspicious",
        "sectionId": "the-hunter",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/hunter-suspicious-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/hunter-suspicious-960.webp",
        "available": true,
        "width": 1600,
        "height": 868
      },
      {
        "id": "chase",
        "sectionId": "the-hunter",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/chase-1600.webp",
        "small": "/assets/portfolio/a-chain-of-pain/chase-960.webp",
        "available": true,
        "width": 1600,
        "height": 868
      }
    ]
  },
  {
    "slug": "storycodex",
    "title": "StoryCodex",
    "number": "03",
    "prominence": "selected",
    "technologies": [
      "Kotlin",
      "Jetpack Compose",
      "LLM API",
      "Android TTS"
    ],
    "links": {
      "demo": null,
      "github": null,
      "caseStudy": "/case-studies/storycodex.html"
    },
    "media": null,
    "sources": [],
    "studyIds": [
      "an-accessible-story-making-flow",
      "useful-without-a-connection",
      "design-considerations"
    ]
  },
  {
    "slug": "author-website",
    "title": "Author Website",
    "number": "04",
    "prominence": "selected",
    "technologies": [
      "JavaScript",
      "Node.js",
      "Express",
      "JWT",
      "Vercel"
    ],
    "links": {
      "demo": "https://vlnikolai.com",
      "github": "https://github.com/bedtimestoriesforthebrave-dot/Author-website",
      "caseStudy": "/case-studies/author-website.html"
    },
    "media": null,
    "sources": [
      "@sourceRepository"
    ],
    "studyIds": [
      "a-public-site-and-an-admin-workflow",
      "two-environments-one-workflow",
      "preserved-alongside-this-portfolio"
    ]
  }
];
