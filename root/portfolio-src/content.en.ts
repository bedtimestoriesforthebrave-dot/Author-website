import type { LocaleCopy } from './model';

export const english: LocaleCopy = {
  "site": {
    "role": "Software & AI Developer",
    "location": "Ulvila, Finland",
    "title": "Ville Lähteenmäki — Software & AI Developer",
    "description": "Software, evidence-grounded AI and real-time systems. Selected development work by Ville Lähteenmäki: ReorderOps, A Chain of Pain, StoryCodex and Author Website.",
    "hero": {
      "label": "Independent portfolio / Selected work",
      "lines": [
        "Software.",
        "Intelligence.",
        "Built with intent."
      ],
      "summary": "Building reliable software, AI-assisted workflows and practical automation. From procurement decisions to real-time game systems."
    },
    "selection": "A selection of recent and technically relevant work.",
    "workflow": {
      "title": "Accelerate the work.\nVerify the result.",
      "summary": "AI assists implementation, analysis and iteration. Correctness comes from tests, inspection and validation. ReorderOps makes that distinction visible in both the development process and the product.",
      "steps": [
        {
          "title": "Define the boundary",
          "description": "Break the problem into data contracts, deterministic rules and explicit action boundaries."
        },
        {
          "title": "Build in small increments",
          "description": "Use coding agents with focused context for implementation, debugging and review. Keep changes inspectable in Git."
        },
        {
          "title": "Challenge the result",
          "description": "Test failure cases, stale state, malformed inputs and adversarial prompts. Compare AI explanations with backend facts."
        },
        {
          "title": "Validate before acting",
          "description": "Inspect behavior and evidence. Preserve known limitations and use deterministic fallbacks when AI cannot be trusted."
        }
      ]
    },
    "earlier": "Additional experience includes Kotlin / Jetpack Compose, C# / .NET MAUI, UiPath StudioX, Power BI / Power Pivot, Power Apps and Power Automate, through mobile applications, automation and coursework.",
    "background": {
      "title": "Practical systems.\nA broader perspective.",
      "summary": "My work spans business applications, mobile software and interactive environments. The common thread is making complex behavior understandable, inspectable and useful.",
      "education": {
        "institution": "Savonia University of Applied Sciences",
        "qualification": "BBA studies in Business Information Technology",
        "note": "Software development, data management, analytics, automation and project work. Graduation status is not asserted."
      }
    },
    "contact": {
      "title": "Let’s build\nsomething useful.",
      "description": "For software, AI workflows or technical product work, get in touch."
    },
    "navigationLabels": {
      "work": "Work",
      "approach": "Approach",
      "background": "About",
      "contact": "Contact"
    },
    "cvLabel": "CV · PDF",
    "cvDownloadLabel": "Download CV",
    "skillLabels": {
      "core": "Core languages",
      "development": "Application development",
      "ai": "AI & engineering workflow",
      "infrastructure": "Data & infrastructure"
    },
    "skillTerms": {
      "llmApis": "LLM APIs",
      "codingAgents": "Coding agents",
      "aiEvaluation": "AI evaluation",
      "promptContext": "Prompt / context engineering",
      "aiDebugReview": "AI-assisted debugging & review",
      "restApis": "REST APIs"
    }
  },
  "evidencePath": [
    "Data",
    "Deterministic logic",
    "Structured evidence",
    "AI interpretation",
    "Human approval",
    "Validated action",
    "Audit"
  ],
  "projects": {
    "reorderops": {
      "category": "Inventory & procurement software",
      "description": "From inventory data to a purchasing decision you can inspect.",
      "summary": "Deterministic procurement planning, immutable evidence and an AI assistant that explains the result. A person reviews the decision; the backend revalidates it before creating an internal order draft.",
      "role": "Application design & implementation",
      "status": "Public portfolio demo",
      "highlights": [
        "Repeatable planning rules",
        "Revalidated human approval",
        "Evidence-grounded, read-only AI"
      ],
      "architecture": "React / TypeScript interface → FastAPI business rules → SQLite evidence and operational state. A bounded AI adapter reads detached evidence; approved actions revalidate current state inside a transaction.",
      "challenges": [
        "Separate historical observations from synthetic operational inputs.",
        "Keep saved evidence immutable while blocking stale approvals.",
        "Treat valid AI references and correct prose as different verification problems."
      ],
      "verification": [
        "Automated checks cover malformed inputs, replay, concurrency, rollback, stale approvals and visitor isolation.",
        "Multilingual, messy-input and adversarial AI evaluations retain observed semantic and language failures.",
        "The recorded planning-v1.4 milestone reports 303 backend tests passing on Python 3.11 and 3.12, plus Ruff, TypeScript and production-build checks. This is source evidence, not a test count for this portfolio."
      ],
      "placeholders": [
        "Public source link: the repository URL returned HTTP 404 without authentication during verification.",
        "A narrated walkthrough video may be added."
      ],
      "study": [
        {
          "title": "The problem",
          "paragraphs": [
            "An inventory planner needs to understand which products need attention, why they need attention, and what action is safe to review. Low stock alone is not an order instruction: incoming supply, lead times, demand changes and supplier constraints all matter.",
            "The first historical review used fixed coverage bands. Those bands were noisy on the source data. Product-relative percentiles improved context, but historically usual stock can still be insufficient for a supplier’s lead time. Procurement planning became a separate deterministic calculation."
          ]
        },
        {
          "title": "Planning that can be replayed",
          "paragraphs": [
            "Pure business rules project stock and calculate replenishment using supplier lead times, safety stock, minimum orders and pack sizes. Saved runs preserve the inputs, engine version and business-input fingerprint, rather than silently recalculating old evidence."
          ],
          "bullets": [
            "FILTER-420: 210 units recommended, with expediting review for the earlier shortage.",
            "VALVE-88: a raw requirement of 75 becomes 120 under the supplier minimum.",
            "BELT-210: timely inbound prevents a duplicate order.",
            "BEARING-51: a demand anomaly holds the recommendation for review."
          ]
        },
        {
          "title": "A human decision, validated again",
          "paragraphs": [
            "Approval rereads current stock, inbound, demand and supplier terms inside a short SQLite write transaction. Changed evidence blocks the action. Exact retries return the original result; uniqueness constraints prevent a second active draft for the same product.",
            "Internal purchase-order drafts send nothing to a supplier and do not become confirmed inbound. Successful and blocked actions enter an append-only audit trail. Direct file or schema access can still tamper with SQLite; this is not a claim of tamper-proof storage."
          ]
        },
        {
          "title": "AI interpretation with a narrow boundary",
          "paragraphs": [
            "The GPT-6 Luna integration uses controlled read-only tools to retrieve detached evidence and link verified cards to the application. Authoritative quantities belong to the backend. The assistant cannot approve, create drafts, edit stock or submit orders.",
            "Evaluations include multilingual questions, messy input and prompt-injection attempts. They exposed a useful limitation: correct evidence references do not guarantee sound prose or the requested language. Deterministic fallback preserves useful evidence when the provider fails or reaches a quota. AI explanations still require review."
          ]
        },
        {
          "title": "A public demo with isolated actions",
          "paragraphs": [
            "The Vercel frontend and Railway backend present generated history, rather than the private CSV whose provenance and license remain unverified. Visitors receive separate temporary database copies so their drafts and audit events remain isolated.",
            "A persistent control ledger reserves estimated AI spending before a provider call and applies usage limits. Uncertainty retains the reservation. These are cost controls, not a claim of measured operating savings."
          ]
        },
        {
          "title": "Verification and honest limits",
          "paragraphs": [
            "Tests cover missing and malformed data, calculation boundaries, saved-run replay, stale approvals, transaction rollback, concurrency, visitor isolation and recovery. The documented v1.4 milestone reports 303 backend tests passing across Python 3.11 and 3.12, with Ruff and frontend checks.",
            "Recorded hosted checks cover purchasing and bounded AI behavior. Language reliability, provider-usage reconciliation, full production recovery and cold-start timing remain qualified. The project has no live ERP integration, supplier submission, receipt workflow, anomaly override or real-account authentication. It demonstrates engineering decisions, not measured forecasting accuracy or retail savings."
          ]
        }
      ],
      "linkLabels": {
        "demo": "Live demo",
        "github": "Source code",
        "caseStudy": "Read case study"
      },
      "mediaText": {
        "alt": "ReorderOps public inventory review: historical planning date, synthetic-data notice, inventory metrics and product table.",
        "caption": "Public demo / Inventory review. Captured 3 October 2026. All displayed operational data is synthetic."
      }
    },
    "a-chain-of-pain": {
      "category": "First-person narrative game",
      "description": "A different kind of system. A world experienced in first person.",
      "summary": "A first-person narrative game built in Unreal Engine 5 / C++. A real-time counterpart to the business applications in this selection.",
      "role": null,
      "status": "Project documentation forthcoming",
      "highlights": [
        "First-person narrative",
        "Real-time development",
        "Unreal Engine 5 / C++"
      ],
      "architecture": "Unreal Engine 5 / C++. Detailed gameplay architecture awaits project evidence.",
      "challenges": [],
      "verification": [],
      "placeholders": [
        "Gameplay screenshots / video",
        "Development role and current build status",
        "Verified gameplay architecture and systems",
        "Enemy perception, investigation, chase and search evidence, if implemented",
        "Testing notes and public source / build links"
      ],
      "study": [
        {
          "title": "Confirmed project scope",
          "paragraphs": [
            "A Chain of Pain is a first-person narrative game built in Unreal Engine 5 / C++. It adds real-time and C++ development to a portfolio otherwise centered on applications and AI-assisted workflows."
          ]
        },
        {
          "title": "Evidence to add",
          "paragraphs": [
            "Gameplay footage and technical documentation are not yet supplied. This page leaves a deliberate space for them. Specific enemy behavior, branching outcomes, reusable systems and development ownership will be described only when supported by project material."
          ]
        }
      ],
      "linkLabels": {
        "demo": "Live demo",
        "github": "Source code",
        "caseStudy": "Project notes"
      },
      "mediaText": null
    },
    "storycodex": {
      "category": "Android / AI storytelling",
      "description": "A small interface for a bigger imagination.",
      "summary": "An Android story app where children choose characters, a setting and a plot. An LLM generates a Finnish story, Android TTS reads it aloud, and cached stories remain available offline.",
      "role": null,
      "status": "Portfolio project",
      "highlights": [
        "Button-based story creation",
        "Finnish generation and narration",
        "Offline access to cached stories"
      ],
      "architecture": "Jetpack Compose Android client, backend API and LLM integration, with Android TTS and cached stories.",
      "challenges": [
        "Safety-focused interaction design and controlled prompting for children."
      ],
      "verification": [],
      "placeholders": [
        "Verified screenshots",
        "Public source or release link",
        "Formal evaluation / testing evidence"
      ],
      "study": [
        {
          "title": "An accessible story-making flow",
          "paragraphs": [
            "Children choose characters, a setting and a plot through buttons. The app sends a controlled prompt through its backend API and generates a child-oriented Finnish story. Android text-to-speech provides narration."
          ]
        },
        {
          "title": "Useful without a connection",
          "paragraphs": [
            "Offline support uses previously cached stories. It does not imply local LLM generation. The original portfolio records Kotlin, Jetpack Compose, Android TTS, an OpenAI LLM API and a backend API."
          ]
        },
        {
          "title": "Design considerations",
          "paragraphs": [
            "The existing project description emphasizes safety-focused application design and controlled prompting. Formal child-safety evaluation results and release links are not supplied, so no validated safety claim is made."
          ]
        }
      ],
      "linkLabels": {
        "demo": "Live demo",
        "github": "Source code",
        "caseStudy": "Project details"
      },
      "mediaText": null
    },
    "author-website": {
      "category": "Full-stack / serverless web",
      "description": "A publishing site, with the tools behind it.",
      "summary": "A bilingual author website with book management, JWT-based admin authentication and a contact API. Static pages meet a Node.js backend, with an Express server for local development.",
      "role": null,
      "status": "Existing website",
      "highlights": [
        "Bilingual static frontend",
        "Authenticated book CRUD",
        "Local Express / serverless APIs"
      ],
      "architecture": "HTML / CSS / JavaScript frontend, Node.js serverless APIs, JWT admin authentication and JSON book storage. Express mirrors the API locally.",
      "challenges": [
        "Keep local development and serverless behavior aligned.",
        "Separate public book data from authenticated management."
      ],
      "verification": [],
      "placeholders": [
        "Dedicated application screenshot"
      ],
      "study": [
        {
          "title": "A public site and an admin workflow",
          "paragraphs": [
            "The author site serves static bilingual pages and book content. An admin interface authenticates with JWT and supports creating, reading, updating and deleting book entries through Node.js APIs. A contact endpoint forwards messages through the configured mail provider."
          ]
        },
        {
          "title": "Two environments, one workflow",
          "paragraphs": [
            "Vercel serverless endpoints serve the public deployment. An Express development server mirrors book and contact APIs locally. Book data uses JSON file storage; the repository documentation identifies a proper database as a future option for concurrent production writes."
          ]
        },
        {
          "title": "Preserved alongside this portfolio",
          "paragraphs": [
            "The portfolio rebuild keeps the author pages, API handlers, book content and admin interface. Its TypeScript authoring step generates a static portfolio without requiring a new application framework or changing hosting configuration."
          ]
        }
      ],
      "linkLabels": {
        "demo": "Visit website",
        "github": "Source code",
        "caseStudy": "Project details"
      },
      "mediaText": null
    }
  }
};
