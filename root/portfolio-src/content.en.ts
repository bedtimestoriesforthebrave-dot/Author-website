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
      "category": "First-Person Narrative Game",
      "description": "A Hunter that acts on what it perceives.",
      "summary": "An Unreal Engine 5 / C++ narrative game in development. The current playable slice focuses on first-person stealth and exploration, with a custom Hunter that combines perception, memory, search and environment interaction.",
      "role": "Solo-directed, AI-assisted development using licensed environment assets.",
      "status": "In development · playable stealth / AI prototype",
      "highlights": [
        "Path-aware hearing",
        "Memory-based search",
        "Integrated world interaction"
      ],
      "architecture": "AI Perception → knowledge / memory → C++-generated StateTree → movement, doors and gameplay events.",
      "challenges": [
        "Make perception and pursuit consistent without tracking hidden player positions.",
        "Keep navigation, door interaction and hearing aligned with the playable territory.",
        "Separate reproducible behaviour decisions from live tuning and presentation."
      ],
      "verification": [
        "Recorded development runs include a 12/12 scripted AI regression pass on 17 September 2026. This is saved project evidence, not a new Unreal test run during this portfolio update.",
        "Scripted PIE checks exercise perception, pursuit, memory and capture. Console commands, overlays and world markers support focused playtesting and diagnosis."
      ],
      "placeholders": [
        "Real gameplay and debug captures are planned; the concept graphic is not a gameplay screenshot.",
        "A public build or source link has not been supplied."
      ],
      "linkLabels": {
        "demo": "Live demo",
        "github": "Source code",
        "caseStudy": "Explore Hunter AI"
      },
      "mediaText": null,
      "study": [
        {
          "title": "A narrative game, a playable AI slice",
          "paragraphs": [
            "A Chain of Pain is a first-person narrative game in development. Its current playable work is a stealth and enemy-AI prototype in a hospital environment. Dialogue, objectives, story triggers, branching outcomes and endings are not implemented yet.",
            "The project brings game design, system design, architecture, integration, level composition and playtesting under one technical direction. Documented fairness rules and acceptance criteria guide what the Hunter should know and how it should respond."
          ]
        },
        {
          "title": "The current playable focus",
          "paragraphs": [
            "The slice connects first-person movement and stealth to a systemic enemy: sneak or crouch, manage a limited panic sprint, use the flashlight, open doors and try to escape a pursuit. Footsteps and doors give the Hunter information; breaking sight leads to search. Wounds, capture, death and retry close the pressure loop, while audio and music react to the action."
          ]
        },
        {
          "title": "Systemic enemy AI",
          "paragraphs": [
            "The H1 Hunter is a custom C++ enemy built on Unreal AI Perception and StateTree. The controller manages the brain, while the character handles movement and physical actions. A dedicated knowledge component processes perception, detection, memory and search information; behaviour tasks read that component rather than hidden live player state.",
            "Custom C++ tasks and conditions form a StateTree generated and compiled from code. This keeps the behaviour graph reproducible and separates information gathering from decisions and world interaction."
          ],
          "visual": {
            "kind": "layers",
            "label": "Hunter architecture",
            "caption": "Information passes through the knowledge layer before behaviour acts. Detection is a continuous perception process, not a separate behaviour state.",
            "items": [
              {
                "title": "Perception",
                "description": "Sight, sound and flashlight clues; sight is rechecked each frame."
              },
              {
                "title": "Knowledge / memory",
                "description": "Detection meter, verified positions, alert level and search evidence."
              },
              {
                "title": "State selection",
                "description": "StateTree picks the highest-priority eligible behaviour."
              },
              {
                "title": "Behaviour",
                "description": "Custom C++ tasks investigate, pursue, search and patrol."
              },
              {
                "title": "World interaction",
                "description": "Navigation, unlocked doors, capture and gameplay events."
              }
            ]
          }
        },
        {
          "title": "Hearing the route, not just the radius",
          "paragraphs": [
            "Sound is evaluated using the length of a complete, navigable NavMesh path. Loudness changes the accepted range. A nearby source across a wall or on another floor can therefore be quiet to the Hunter if the route is long. This is a gameplay hearing filter based on route geometry, rather than a physical acoustic simulation.",
            "A faint noise makes the Hunter stop, face the sound and listen. A clear noise—or a second faint noise that confirms the first within a short window—creates an investigation location. Player gait changes footstep loudness, and doors report their own noise."
          ]
        },
        {
          "title": "Gradual visual detection",
          "paragraphs": [
            "Detection accumulates in a meter instead of treating visibility as a simple on/off switch. Its fill rate responds to distance, view angle, gait or posture, movement and flashlight use. It decays out of sight, with immediate detection at very close range. Suspicion can start an investigation before a confirmed target triggers pursuit.",
            "The flashlight is a stealth trade-off: it affects sight range and detection, and a visible beam or illuminated spot can become a clue. The debug overlay exposes the sight factors so the response can be inspected and tuned."
          ]
        },
        {
          "title": "Memory without wall-hacking",
          "paragraphs": [
            "The enemy searches for what it last perceived rather than following the player’s hidden live position. When sight fails, the last verified position and movement direction are retained. Fresh sound can sustain a chase or replace older search evidence; losing the target starts search from the last perceived location.",
            "The initial search is biased toward the player’s recent heading. Its radius expands, visited locations are avoided, and candidate paths must stay within the territory. After search, AlertRoam patrols the loss area until alertness decays."
          ]
        },
        {
          "title": "Behaviour selected by priority",
          "paragraphs": [
            "The StateTree selects the first eligible state in this priority order. It reselects when knowledge changes or a task completes; these are competing behaviours, not sequential gameplay steps. Capture and stun also have event-driven overrides. Alert level is a separate knowledge value."
          ],
          "visual": {
            "kind": "priority",
            "label": "StateTree / highest eligible priority first",
            "caption": "There is no Detect state. A filled detection meter makes Chase eligible; a new sound can redirect Search into Investigate.",
            "items": [
              {
                "title": "Capture",
                "description": "Capture is active. It holds until the death flow reloads the level."
              },
              {
                "title": "Stunned",
                "description": "Stun is active; recovery starts a search.",
                "note": "Debug-triggered support only; no in-game stun source is established."
              },
              {
                "title": "Chase",
                "description": "A confirmed target exists; fresh perceived noise can guide pursuit out of sight."
              },
              {
                "title": "Investigate",
                "description": "A suspicious sight, clear or confirmed noise, or flashlight clue has a location."
              },
              {
                "title": "Search",
                "description": "The target was lost; search uses retained evidence."
              },
              {
                "title": "Listen",
                "description": "A faint sound has a location but is not yet confirmed."
              },
              {
                "title": "AlertRoam",
                "description": "The Hunter remains alerted without a target."
              },
              {
                "title": "Roam",
                "description": "Fallback patrol when no higher-priority condition is eligible."
              }
            ]
          }
        },
        {
          "title": "Player, world and Hunter",
          "paragraphs": [
            "The AI is integrated with the playable environment. A short, bounded charge on a new engagement has a cooldown. Capture requires reach, verified line of sight and a short navigable path; the territory and leash bound pursuit. The Hunter opens closed, unlocked doors on its route and respects locks."
          ],
          "visual": {
            "kind": "integration",
            "label": "Connected gameplay systems",
            "caption": "Player actions change the environment and perception evidence; Hunter behaviour feeds back into player pressure and audio.",
            "items": [
              {
                "title": "Player movement",
                "description": "Sneak, crouch and run affect visibility and noise. A limited panic sprint supports escape."
              },
              {
                "title": "Interaction / doors",
                "description": "A reusable look-at interface and shared door class serve the player, AI and encounters."
              },
              {
                "title": "Perception inputs",
                "description": "Surface- and gait-aware footsteps, door noise and the flashlight feed the Hunter."
              },
              {
                "title": "Wounds / retry",
                "description": "Wounds recover in stages, with a critical state. Capture and death lead to a retry flow."
              },
              {
                "title": "Reactive audio",
                "description": "Music changes between exploration, danger, chase and death in response to the Hunter."
              }
            ]
          }
        },
        {
          "title": "A world composed around the systems",
          "paragraphs": [
            "A large single One File Per Actor map contains a manor and two hospital buildings, composed from third-party modular environment kits. The current Hunter territory is the H2 hospital. Multi-floor navigation, barriers, locked routes and door assets converted to the project’s shared door class connect the space to the AI.",
            "One scripted Door-14 ambush temporarily directs the Hunter outside normal StateTree behaviour, then hands control back to the systemic chase. The surrounding world is broader than this tested slice: multi-floor navigation setup is evidenced, but stair chases still need dedicated playtesting."
          ]
        },
        {
          "title": "Engineering and iteration",
          "paragraphs": [
            "Milestone development uses Git, Git LFS and One File Per Actor. Reusable components separate perception, character actions, interaction, wounds and audio. AI tuning lives in a data asset read during play, making iteration possible without scattering constants through behaviour code."
          ],
          "bullets": [
            "Console test commands, visual markers and overlays expose detection, hearing decisions, remembered locations and search destinations.",
            "Python tooling supports scripted PIE regression checks and exports level geometry into scaled floor plans.",
            "Design rules, acceptance criteria and small milestones keep implementation and review focused."
          ]
        },
        {
          "title": "Prototype work and next steps",
          "paragraphs": [
            "A smaller Hunter nail-gun prototype uses physical projectiles, line-of-sight-gated firing, projectile embedding and a live projectile cap. Its aim presentation is placeholder-level, with audiovisual polish still incomplete.",
            "The current engineering evidence centres on one Hunter and its stealth loop. Narrative expansion remains future work. Real media will make the perception, search and environment integration easier to assess alongside the recorded development evidence."
          ]
        }
      ],
      "mediaSlots": {
        "hero": {
          "title": "The playable hospital slice",
          "description": "A real gameplay capture will show the hospital composition and Hunter in the same environment. The current concept graphic is not gameplay.",
          "alt": "First-person gameplay in the H2 hospital, showing the Hunter and an interactive door.",
          "caption": "Gameplay / H2 hospital. Environment composed from third-party modular assets."
        },
        "detection": {
          "title": "Visual detection, made inspectable",
          "description": "A planned debug capture will show the detection meter mid-fill with distance, view angle, gait and flashlight factors.",
          "alt": "Hunter debug overlay showing a partly filled detection meter and individual sight factors.",
          "caption": "PIE debug capture / Gradual visual detection and sight factors."
        },
        "hearing": {
          "title": "Sound across floors and routes",
          "description": "A planned debug capture will compare heard and muffled noise using the navigable path length and hearing limit.",
          "alt": "Hunter hearing debug output showing a noise decision, NavMesh path length and last-heard marker.",
          "caption": "PIE debug capture / Path-aware hearing across the hospital."
        },
        "search": {
          "title": "Search from remembered evidence",
          "description": "A planned capture will show the last-seen marker, expanding search area, heading bias and selected destination after sight is lost.",
          "alt": "Hunter search debug markers showing the last perceived position, search area, heading and destination.",
          "caption": "PIE debug capture / Memory-based, direction-biased search."
        },
        "loop": {
          "title": "A short stealth loop",
          "description": "A planned gameplay clip will connect noise, investigation, visual detection, pursuit, escape and search. It will show the actual prototype rather than a staged feature claim.",
          "alt": "Gameplay video of the player attracting the Hunter, escaping pursuit and watching it search the last perceived area.",
          "caption": "Gameplay / Integrated stealth loop. Environment art is third-party."
        }
      }
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
