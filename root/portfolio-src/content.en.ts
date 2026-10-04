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
      "title": "Get in touch.",
      "description": "Software development, AI, technical projects or opportunities."
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
      "category": "Story-driven first-person horror game",
      "description": "A solo-directed Unreal Engine 5 / C++ game combining story, systemic gameplay and atmosphere.",
      "summary": "A story-driven first-person horror game in Unreal Engine 5 / C++, built on an established story and lore. The current playable build leads from a manor into the hospital behind it, where stealth, the flashlight, sound and a custom Hunter AI create the tension.",
      "role": "Solo-directed, AI-assisted development. Original soundtrack; licensed environment assets.",
      "status": "In development · playable build",
      "highlights": [
        "Story & worldbuilding",
        "Gameplay & enemy systems",
        "Level design & original audio"
      ],
      "architecture": "Unreal Engine 5 / C++ connects player movement and interaction, systemic enemy AI, world design and reactive audio.",
      "challenges": [
        "Make darkness, sound and the flashlight meaningful choices rather than decoration.",
        "Keep the Hunter's perception and pursuit consistent without tracking hidden player positions.",
        "Keep navigation, doors, hearing and music aligned with the playable space."
      ],
      "verification": [
        "The gameplay showcase and screenshots are captures from the current playable build.",
        "Recorded development runs include a 12/12 scripted AI regression pass on 17 September 2026. This is saved project evidence, not a new Unreal test run during this portfolio update.",
        "Scripted PIE checks exercise perception, pursuit, memory and capture. Console commands, overlays and world markers support focused playtesting and diagnosis."
      ],
      "linkLabels": {
        "demo": "Live demo",
        "github": "Source code",
        "caseStudy": "Explore project"
      },
      "mediaText": {
        "alt": "First-person gameplay view from the manor's upper landing: a white-railed staircase curves down into a dim entrance hall with a single pool of light.",
        "caption": "Gameplay capture / The manor staircase."
      },
      "study": [
        {
          "title": "The game",
          "paragraphs": [
            "A Chain of Pain is a story-driven first-person horror game in development in Unreal Engine 5 and C++. The player explores a manor and the hospital behind it, mostly in darkness and with a flashlight, while a Hunter moves through the building and reacts to what it sees and hears.",
            "The current playable build connects exploration, stealth, environmental interaction, enemy AI, positional audio, an adaptive original soundtrack, pursuit and capture into one continuous loop. The systems feed each other: how the player moves, where the light points and which doors open change what the Hunter knows, and the Hunter's state changes the music."
          ]
        },
        {
          "title": "Gameplay showcase",
          "paragraphs": [
            "A continuous sequence from the current playable build demonstrating exploration, environmental interaction, stealth, positional audio, flashlight-driven enemy response, adaptive music, pursuit and capture.",
            "The sound is part of the evidence: the wind outside, the player's and the Hunter's footsteps and the soundtrack's shift into the chase are all in the recording. Headphones are recommended."
          ]
        },
        {
          "title": "Story and lore",
          "paragraphs": [
            "The narrative foundation and wider lore of A Chain of Pain are already substantially developed, and the game's environments and encounters are built within that world.",
            "The public portfolio intentionally remains spoiler-free: it shows how the game plays and how it is built, not what the story reveals."
          ]
        },
        {
          "title": "Why the gameplay came first",
          "paragraphs": [
            "Before layering the full narrative presentation on top, development set out to answer one question early: is the game actually frightening, responsive and enjoyable to play?",
            "The current playable build therefore concentrates on the systems that create tension and make the experience convincing: movement, stealth, enemy behaviour and perception, darkness and the flashlight, player vulnerability, environmental interaction, sound, reactive music, encounters, pursuit and capture. The story sets the direction; the playable build is where the horror is tested and tuned."
          ]
        },
        {
          "title": "Gameplay systems",
          "paragraphs": [
            "The player moves in first person with distinct stealth gaits: sneaking, crouching, walking and running. Each changes how loud the footsteps are and how quickly the Hunter can see the player. A limited panic sprint gives a short burst for escape and recharges according to posture.",
            "Darkness is a gameplay resource. The flashlight is often the only way to read a room, but its beam widens the Hunter's sight and speeds up detection, and a beam in the Hunter's face, or a lit spot it notices, gives it a location to investigate.",
            "A look-at interaction system drives the doors. Hinged doors are opened by the player, automatic sliding doors operate on their own, and locked doors show a lock prompt, so blocked routes are communicated in the world. The same door class serves the player, the Hunter and scripted encounters.",
            "Being caught has consequences. Hunter attacks cause wounds that recover in stages, with a critical state when they stack up. Capture locks input, turns the camera toward the Hunter and fades to a death screen before the level restarts for another attempt."
          ],
          "visual": {
            "kind": "integration",
            "label": "Connected gameplay systems",
            "caption": "Player actions change what the Hunter can perceive; the Hunter's behaviour feeds back into player pressure and the music.",
            "items": [
              {
                "title": "Movement",
                "description": "Sneak, crouch, walk and run set footstep loudness and visibility. A limited panic sprint supports escape."
              },
              {
                "title": "Flashlight",
                "description": "Reveals the space but widens the Hunter's sight, speeds up detection and can create a clue."
              },
              {
                "title": "Interaction / doors",
                "description": "A reusable look-at interface; one door class for hinged, sliding and locked doors, the player, the AI and encounters."
              },
              {
                "title": "Wounds / capture",
                "description": "Wounds recover in stages, with a critical state. Capture leads to a death screen and retry."
              },
              {
                "title": "Reactive audio",
                "description": "Footsteps and doors report noise to the Hunter; music follows its distance and behaviour."
              }
            ]
          }
        },
        {
          "title": "World and level design",
          "paragraphs": [
            "The playable world is one large map containing a manor and two hospital buildings, composed from licensed environment kits. I compose the layout, traversal routes, lighting and encounter spaces using licensed third-party modular environment assets; the source assets are not my original modelling work. World history and environmental storytelling guide the design of the spaces. Lighting keeps most spaces dark enough that the flashlight decides what the player can read.",
            "The manor was extended from a licensed building into a three-wing structure: seams removed, wings joined by new doorways, roofs and floors unified. The route leads from the grounds through the manor into the hospital, so the space changes from a house to an institution as the player goes deeper.",
            "The hospital is the Hunter's territory: a multi-floor building with NavMesh navigation, patrol and search points, barriers that shape the playable routes, locked doors, and pack doors converted to the project's interactive door class. A scripted encounter can hand control back to the normal systemic Hunter behaviour."
          ]
        },
        {
          "title": "The Hunter",
          "paragraphs": [
            "The Hunter is a custom C++ enemy that patrols the hospital and acts only on what it has actually perceived. It hears footsteps and doors, notices the flashlight and becomes suspicious before it is certain.",
            "A faint sound makes it stop and listen; a clear one sends it to investigate. Once it confirms the player, it charges briefly and gives chase, following fresh noise when line of sight breaks. When it loses the player, it searches from where it last perceived them, not from where they really are, and stays alert before returning to patrol. It opens unlocked doors on its way, respects locked ones and does not pursue beyond its territory.",
            "For the player, the rules are readable: stay quiet and out of the light, and the Hunter has to work with incomplete information. The technical sections below show how this is built."
          ]
        },
        {
          "title": "Audio and original soundtrack",
          "paragraphs": [
            "Audio is part of the stealth loop. Player footsteps vary by surface and gait and report noise to the Hunter's hearing. The Hunter's footsteps are triggered by its foot plants, so the player can follow its position by ear, and doors make sound as they move. Environmental ambience establishes each space, including the wind outside the manor.",
            "A music system follows the gameplay state: exploration, danger when the Hunter is near, chase while it pursues or captures the player, and death, with crossfades between them.",
            "I composed the game’s original soundtrack. Sound effects use licensed sound libraries."
          ],
          "visual": {
            "kind": "integration",
            "label": "Audio system design / original composition",
            "caption": "Player and Hunter footsteps provide positional information during stealth, environmental ambience establishes the space, and the original soundtrack changes with gameplay state.",
            "items": [
              {
                "title": "Audio system design",
                "description": "Surface- and gait-aware footsteps, Hunter foot-plant footsteps, door sounds and ambience, connected to the Hunter's hearing."
              },
              {
                "title": "Adaptive music",
                "description": "Exploration, danger, chase and death states driven by the Hunter's distance and behaviour, with crossfades."
              },
              {
                "title": "Original soundtrack",
                "description": "Original music I composed for the game."
              }
            ]
          }
        },
        {
          "title": "Characters and implementation",
          "paragraphs": [
            "The player character extends Unreal's first-person template with stealth movement, Enhanced Input actions, the panic sprint, wounds, the flashlight and the capture sequence. The flashlight component started from a public tutorial and was extended to feed the Hunter's perception.",
            "AI-assisted character prototyping and development for Hunter 1. The Hunter is split into brain and body: an AI controller owns perception and decisions; the character handles movement styles, facing, the charge, capture and its visible body, which is driven through animation retargeting. The character is a work in progress.",
            "Ownership: I direct the game design, architecture and implementation decisions, level composition, lighting, gameplay and AI design, integration, playtesting and acceptance, and I composed the soundtrack. Coding agents assist with implementation and review under that direction. Environment art, character meshes, animations and sound effects come from licensed or engine-provided assets and are not presented as original art."
          ]
        },
        {
          "title": "Inside the Hunter",
          "paragraphs": [
            "The Hunter is built on Unreal AI Perception and StateTree. A dedicated knowledge component processes perception, detection, memory and search information; behaviour tasks read that component rather than hidden live player state.",
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
            "A faint noise makes the Hunter stop, face the sound and listen. A clear noise, or a second faint noise that confirms the first within a short window, creates an investigation location. Player gait changes footstep loudness, and doors report their own noise."
          ]
        },
        {
          "title": "Gradual visual detection",
          "paragraphs": [
            "Detection accumulates in a meter instead of treating visibility as a simple on/off switch. Its fill rate responds to distance, view angle, gait or posture, movement and flashlight use. It decays out of sight, with immediate detection at very close range. Suspicion can start an investigation before a confirmed target triggers pursuit.",
            "The flashlight affects sight range and detection, and a visible beam or illuminated spot can become a clue. The debug overlay exposes the sight factors so the response can be inspected and tuned."
          ]
        },
        {
          "title": "Memory without wall-hacking",
          "paragraphs": [
            "When sight fails, the last verified position and movement direction are retained. Fresh sound can sustain a chase or replace older search evidence; losing the target starts search from the last perceived location.",
            "The initial search is biased toward the player's recent heading. Its radius expands, visited locations are avoided, and candidate paths must stay within the territory. After search, AlertRoam patrols the loss area until alertness decays. A short, bounded charge on a new engagement has a cooldown, and capture requires reach, verified line of sight and a short navigable path."
          ]
        },
        {
          "title": "Behaviour selected by priority",
          "paragraphs": [
            "The StateTree selects the first eligible state in this priority order. It reselects when knowledge changes or a task completes; these are competing behaviours, not sequential gameplay steps. Capture also has an event-driven override. Alert level is a separate knowledge value."
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
          "title": "Engineering and iteration",
          "paragraphs": [
            "Milestone development uses Git, Git LFS and One File Per Actor. Reusable components separate perception, character actions, interaction, wounds and audio. AI tuning lives in a data asset read during play, so values can be adjusted without scattering constants through behaviour code."
          ],
          "bullets": [
            "Console test commands, visual markers and overlays expose detection, hearing decisions, remembered locations and search destinations.",
            "Python tooling supports scripted PIE regression checks and exports level geometry into scaled floor plans.",
            "Documented fairness rules, acceptance criteria and small milestones define what the Hunter may know and keep implementation and review focused."
          ],
          "note": "Gameplay, AI debug views and deeper technical implementation details are available on request."
        }
      ],
      "mediaSlots": {
        "showcase": {
          "title": "Gameplay showcase",
          "description": "Continuous sequence from the current build: exploration, doors, stealth, positional audio, flashlight provocation, chase, adaptive music and capture.",
          "alt": "Gameplay video: the player walks from the manor grounds into the hospital, hides from the Hunter with the flashlight off, draws its attention with the light, is chased into a dead end and captured.",
          "caption": "Gameplay showcase / Current playable build · 1 min 41 s · with sound. Environment art from licensed asset kits.",
          "sequence": [
            "Approaching the manor outside, with wind ambience.",
            "Entering the manor and moving through it toward the hospital.",
            "Automatic sliding doors and manually opened doors.",
            "Exploring the hospital by flashlight; player and Hunter footsteps.",
            "Hearing something nearby and responding to it.",
            "Switching the flashlight off and waiting out of sight behind a doorway.",
            "Deliberately provoking the Hunter with the flashlight.",
            "Detection, chase and the soundtrack's change into pursuit.",
            "An escape attempt that ends in a dead end, and capture."
          ]
        },
        "flashlight": {
          "title": "Flashlight off and on",
          "description": "The same hospital laboratory doorway with the flashlight off and on.",
          "alt": "A hospital laboratory doorway in near-darkness; only faint shapes of the room and the wall posters are visible.",
          "compareAlt": "The same laboratory doorway lit by the flashlight held in the player's hand; the room, cabinets and wall posters are clearly visible.",
          "labels": ["Flashlight off", "Flashlight on"],
          "caption": "Gameplay / The same hospital laboratory with the flashlight off and on. The light reveals the room, and it also makes the player easier for the Hunter to detect."
        },
        "locked-door": {
          "title": "Locked-route feedback",
          "description": "A locked door with its lock prompt under the flashlight.",
          "alt": "A hospital door with a broken window, lit by the player's flashlight, with a padlock icon and the label Locked.",
          "caption": "Gameplay / A locked door shows its state in the world when the player looks at it."
        },
        "manor-staircase": {
          "title": "Manor staircase",
          "description": "The manor's main staircase and entrance hall.",
          "alt": "First-person gameplay view from the manor's upper landing: a white-railed staircase curves down into a dim entrance hall with a single pool of light.",
          "caption": "Gameplay / The manor's main staircase. Composition and lighting in a licensed building extended into three wings."
        },
        "hospital-lobby": {
          "title": "Hospital lobby",
          "description": "The hospital's main lobby under the flashlight.",
          "alt": "A derelict hospital lobby with blue waiting-room chairs, debris on the floor and glass doors, lit by the player's flashlight.",
          "caption": "Gameplay / The hospital's main lobby. Composition, lighting and setup in a licensed hospital environment kit."
        },
        "reception": {
          "title": "Reception",
          "description": "A dark reception area with a single light source.",
          "alt": "A dark hospital reception area: a counter and trolley in a faint pool of light, with a closed door and shadowed seating.",
          "caption": "Gameplay / The reception area. Most spaces stay dark enough that light decides what the player can read."
        },
        "hunter-unaware": {
          "title": "The Hunter on patrol",
          "description": "The Hunter as a distant silhouette, unaware of the player.",
          "alt": "A dark hospital corridor seen from a doorway; the Hunter's silhouette stands far away at the lit end of the corridor.",
          "caption": "Gameplay / The Hunter on patrol at the far end of a corridor, not yet aware of the player."
        },
        "hunter-suspicious": {
          "title": "Suspicion from the flashlight",
          "description": "Debug text shows the Hunter investigating after light hit its face.",
          "alt": "A waiting area lit by the flashlight, with the Hunter at the end of the corridor. Debug text reads that light hit the Hunter's face and that it is suspicious and investigating.",
          "caption": "Gameplay with AI debug text / The flashlight caught the Hunter's face: it becomes suspicious and moves in to investigate."
        },
        "chase": {
          "title": "Pursuit",
          "description": "Debug text shows confirmed detection and the Chase state.",
          "alt": "The Hunter, blurred by motion, running in a bright flashlight-lit hospital corridor. Debug text reports detection and the Chase state.",
          "caption": "Gameplay with AI debug text / Detection confirmed and the Hunter in its Chase state."
        }
      }
    },
    "storycodex": {
      "category": "Android / AI storytelling",
      "description": "A small interface for a bigger imagination.",
      "summary": "An Android story app where children choose characters, a setting and a plot. GPT-6 Luna generates stories in Finnish or English, Android TTS reads them aloud, and cached stories remain available offline.",
      "role": null,
      "status": "Portfolio project",
      "highlights": [
        "Button-based story creation",
        "Finnish and English generation and narration",
        "Offline access to cached stories"
      ],
      "architecture": "Jetpack Compose Android client, backend API and LLM integration, with Android TTS and cached stories.",
      "challenges": [
        "Safety-focused interaction design and controlled prompting for children."
      ],
      "verification": [],
      "study": [
        {
          "title": "An accessible story-making flow",
          "paragraphs": [
            "Children choose characters, a setting and a plot through buttons. The app sends a controlled prompt through its backend API to GPT-6 Luna and generates a child-oriented story in Finnish or English. Android text-to-speech provides narration."
          ]
        },
        {
          "title": "Useful without a connection",
          "paragraphs": [
            "Offline support uses previously cached stories. It does not imply local LLM generation. The original portfolio records Kotlin, Jetpack Compose, Android TTS, an OpenAI LLM API and a backend API."
          ]
        },
        {
          "title": "Safety design and evaluation",
          "paragraphs": [
            "The service combines controlled prompts for ages 3–8 with output moderation and a template fallback if generation or moderation fails. A manual before-and-after review used the same 30 selections: 15 English stories and 15 Finnish stories. All 30 re-test stories passed moderation without fallbacks, and neither run contained unsafe or frightening content. Switching to GPT-6 Luna and refining the prompts reduced mild peril scenes from three to zero and examples framing talking to strangers as brave from one to zero. Finnish stories with language errors fell from 13 of 15 to 2 of 15. This small sample informs development; it does not guarantee the safety or language quality of future stories."
          ],
          "note": "I can show the app in action on request."
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
      "role": "Website and backend design and implementation",
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
