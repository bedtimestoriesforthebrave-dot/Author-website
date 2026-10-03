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
      "caseStudy": "/case-studies/reorderops.html"
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
    "media": null,
    "sources": [
      "@sourceGame"
    ],
    "studyIds": [
      "confirmed-project-scope",
      "current-playable-focus",
      "systemic-enemy-ai",
      "path-aware-hearing",
      "gradual-visual-detection",
      "memory-and-search",
      "behaviour-selection",
      "player-and-world",
      "level-composition",
      "engineering-practices",
      "evidence-to-add"
    ],
    "mediaSlots": [
      {
        "id": "hero",
        "sectionId": "hero",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/hero-gameplay.webp",
        "available": false,
        "width": 1920,
        "height": 1080
      },
      {
        "id": "detection",
        "sectionId": "gradual-visual-detection",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/detection-debug.webp",
        "available": false,
        "width": 1920,
        "height": 1080
      },
      {
        "id": "hearing",
        "sectionId": "path-aware-hearing",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/path-aware-hearing.webp",
        "available": false,
        "width": 1920,
        "height": 1080
      },
      {
        "id": "search",
        "sectionId": "memory-and-search",
        "kind": "image",
        "assetPath": "/assets/portfolio/a-chain-of-pain/search-debug.webp",
        "available": false,
        "width": 1920,
        "height": 1080
      },
      {
        "id": "loop",
        "sectionId": "current-playable-focus",
        "kind": "video",
        "assetPath": "/assets/portfolio/a-chain-of-pain/stealth-loop.mp4",
        "available": false,
        "width": 1920,
        "height": 1080,
        "captions": {
          "en": "/assets/portfolio/a-chain-of-pain/stealth-loop.en.vtt",
          "fi": "/assets/portfolio/a-chain-of-pain/stealth-loop.fi.vtt"
        }
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
    "sources": [
      "@sourceLegacy"
    ],
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
      "@sourceRepository",
      "@sourceOriginal"
    ],
    "studyIds": [
      "a-public-site-and-an-admin-workflow",
      "two-environments-one-workflow",
      "preserved-alongside-this-portfolio"
    ]
  }
];
