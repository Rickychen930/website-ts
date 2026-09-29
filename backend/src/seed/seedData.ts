/**
 * Seed Data - Ricky Chen Profile
 * Improved and normalized structure matching the backend schema
 */

export const seedProfileData = {
  name: "Ricky Chen",
  title: "Software Engineer · AI & Full-Stack Developer",
  location: "Sydney, Australia",
  bio: "Software engineer in Sydney and Master of AI candidate at UTS, with production experience from Samsung R&D. I build AI applications and full-stack platforms end to end — from requirements and architecture to testing and release.\n\nCore stack: Python, TypeScript, React, Node.js, SQL and MongoDB.",
  heroTagline:
    "I build AI products and full-stack platforms — from LLM chatbots to production web apps.",
  openToOpportunities: true,
  avatarUrl: "/images/ricky-chen-portrait.png",

  academics: [
    {
      institution: "University of Technology Sydney (UTS)",
      degree: "Master of Artificial Intelligence",
      field: "Artificial Intelligence",
      startDate: "2025-07-01",
      endDate: "2027-06-30",
      description:
        "Current GPA: 6.63/7.00. Machine learning, deep learning and AI ethics.",
    },
    {
      institution: "BINUS University",
      degree: "Bachelor of Computer Science",
      field: "Computer Science (Internet of Things)",
      startDate: "2019-09-01",
      endDate: "2023-05-31",
      description: "GPA: 3.83/4.00. Specialisation in Internet of Things.",
    },
  ],

  certifications: [
    {
      name: "iOS & Swift Development",
      issuer: "Udemy",
      issueDate: "2023-02-01",
      credentialId: "UDEMY-IOS-SWIFT-2023",
      credentialUrl: "https://www.udemy.com",
    },
    {
      name: "Databases for Developers",
      issuer: "Oracle",
      issueDate: "2021-04-01",
      credentialId: "ORACLE-DB-DEV-2021",
      credentialUrl: "https://www.oracle.com",
    },
  ],

  contacts: [
    {
      type: "email" as const,
      value: "rickychen930@gmail.com",
      label: "Email",
      isPrimary: true,
    },
    {
      type: "phone" as const,
      value: "+61415185326",
      label: "Phone",
      isPrimary: false,
    },
    {
      type: "linkedin" as const,
      value: "https://www.linkedin.com/in/rickychen930",
      label: "LinkedIn",
      isPrimary: false,
    },
    {
      type: "github" as const,
      value: "https://github.com/Rickychen930",
      label: "GitHub",
      isPrimary: false,
    },
    {
      type: "website" as const,
      value: "https://rickychen930.cloud",
      label: "Website",
      isPrimary: false,
    },
  ],

  experiences: [
    {
      company: "Decode Capital",
      position: "Software Engineer / AI Developer",
      location: "Sydney, Australia",
      startDate: "2026-05-01",
      isCurrent: true,
      description:
        "Build production web apps and AI features — LLM chat, summarisation and intelligent workflows.",
      achievements: [
        "Voice AI integration with ElevenLabs — system-prompt tuning lifted accuracy by 20%",
        "Automation pipeline powered by Claude and n8n, integrated into the company website",
        "Production web apps and internal platforms: REST APIs, auth and third-party services",
        "Structured prompting and output validation for reliable, secure AI",
      ],
      technologies: [
        "Python",
        "TypeScript",
        "React",
        "Node.js",
        "Claude",
        "n8n",
        "ElevenLabs",
        "WordPress",
      ],
      skillIds: ["Python", "JavaScript", "Machine Learning"],
    },
    {
      company: "JB IT Services",
      position: "Software Engineer / Digital Solutions Developer",
      location: "Sydney, Australia",
      startDate: "2025-07-01",
      isCurrent: true,
      description:
        "Build responsive, conversion-focused digital solutions for an Australian IT services business.",
      achievements: [
        "Designed and built an internal CRM to streamline workflows and data management",
        "Service pages and enquiry flows tuned for performance, accessibility and local SEO",
        "IT policies, secure environments, deployment and troubleshooting",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SEO",
      ],
      skillIds: ["React", "TypeScript", "Node.js"],
    },
    {
      company: "Web Architech",
      position: "Founder & Full-Stack Engineer",
      location: "Sydney, Australia",
      startDate: "2025-01-01",
      isCurrent: true,
      description:
        "Design and ship full-stack platforms for Australian service and hospitality clients.",
      achievements: [
        "React, TypeScript, Node.js and MongoDB apps with REST APIs and reusable UI",
        "Better local SEO, accessibility, performance and enquiry conversion",
        "Review AI-assisted code for architecture, security and correctness",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Git",
      ],
      skillIds: ["TypeScript", "Node.js", "React", "MongoDB"],
    },
    {
      company: "Samsung R&D Institute Indonesia",
      position: "Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isCurrent: false,
      description:
        "Built SmartThings TV plugin features and reliable device-to-TV communication in production.",
      achievements: [
        "300+ production commits in 2024",
        "Promoted to Pro Level within the first year",
        "Integration flows, UI improvements and defect fixes with QA and code review",
      ],
      technologies: [
        "TypeScript",
        "JavaScript",
        "SmartThings SDK",
        "REST APIs",
        "Git",
        "Agile",
      ],
      skillIds: ["TypeScript", "JavaScript", "Git"],
    },
    {
      company: "Apple Developer Academy @ BINUS",
      position: "iOS Developer",
      location: "Jakarta, Indonesia",
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      isCurrent: false,
      description: "Designed and built iOS apps with Swift, SwiftUI and UIKit.",
      achievements: [
        "Shipped Phowto, Reguards and Bottani from research to tested prototypes",
        "Agile teamwork from ideation to usability testing",
      ],
      technologies: ["Swift", "SwiftUI", "UIKit", "Xcode", "Git"],
      skillIds: ["Swift", "SwiftUI", "UIKit", "iOS Development"],
    },
  ],

  honors: [
    {
      title:
        "Kabisa App: iOS-Based Application for Learning Sundanese Script with Game-Based Learning",
      issuer: "Research publication",
      date: "",
      description:
        "Published research on a game-based iOS app for learning Sundanese script.",
    },
    {
      title: "3rd Place – Competitive Programming",
      issuer: "Widyatama International Coding Competition",
      date: "2021-01-15",
      description:
        "Top 3 in a Southeast Asia-wide team contest (C++, Python, Java).",
    },
    {
      title: "Competitive Programming",
      issuer: "LeetCode · Kattis · Codeforces",
      date: "2024-01-01",
      description:
        "Codeforces Specialist (1450) · 500+ Kattis problems · 84+ on LeetCode.",
      url: "https://codeforces.com/profile/rickychen930",
    },
    {
      title: "Freshmen Leader & Partner",
      issuer: "BINUS University",
      date: "2020-09-01",
      description: "Mentored 8 first-year students through their first year.",
    },
  ],

  languages: [
    {
      name: "Bahasa Indonesia",
      proficiency: "native" as const,
    },
    {
      name: "English",
      proficiency: "professional" as const,
    },
  ],

  projects: [
    {
      title: "Kobi — AI portfolio assistant",
      description:
        "This portfolio and its AI chatbot — answers recruiter questions about my work, skills and availability from live profile data.",
      longDescription:
        "Full-stack portfolio (React 19, TypeScript, Express 5, MongoDB) with Kobi, an embedded assistant. Questions run through a pipeline: input validation, per-IP sliding-window rate limits, a prompt-injection guard, intent matching against the live profile, then an LLM fallback with a daily budget and a safe canned reply if the model is unavailable.",
      technologies: [
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "LLM APIs",
        "Prompt engineering",
      ],
      category: "ai" as const,
      startDate: "2026-01-31",
      isActive: true,
      liveUrl: "https://rickychen930.cloud",
      achievements: [
        "Answers grounded in live profile data — FAQ intents first, LLM only as fallback",
        "Guardrails: validation, rate limiting, prompt-injection filter and a daily AI budget",
        "Token-driven design system with WCAG AA contrast and reduced-motion support",
        "Clean MVC architecture shared across React front end and Express API",
      ],
      architecture:
        "React SPA → Express API (/api/chat) → ChatbotService: validate → rate limit → guard → profile-derived intents → OpenAI-compatible completion → canned fallback.",
    },
    {
      title: "Samsung SmartThings TV Plugin",
      description:
        "Developed a TV control plugin for Samsung SmartThings app enabling device discovery, remote control, and status monitoring.",
      longDescription:
        "Production work on the SmartThings TV plugin at Samsung R&D Institute Indonesia — device discovery, remote control and status monitoring for smart TVs, shipped to SmartThings users through Samsung's review and release process.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
      ],
      category: "backend" as const,
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isActive: false,
      imageUrl:
        "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "SmartThings TV plugin features: device discovery, remote commands and live status",
        "Reliable device-to-TV communication and integration flows in production",
        "Defect fixes and UI improvements shipped with QA through code review and release process",
        "300+ commits in 2024; reached Pro Level within the first year",
      ],
    },
    {
      title: "Web Architech",
      description:
        "Marketing site and live portfolio for an Australian web studio — 21+ indexed case studies, search, industry filters, and subdomain demos across trades, healthcare, hospitality, automotive, real estate, beauty, and more.",
      longDescription:
        "Public site and portfolio index at web-architech.com.au/portfolio: 21 indexed case studies across hospitality, trades, healthcare, automotive, real estate, beauty, fashion, events, floristry, technology, entertainment, and education. Visitors search and filter by industry, then open each case study (outcome, business impact, key features, tech stack, live or demo links). Marketing copy stays aligned with the SPA via https://www.web-architech.com.au/api/projects. Built to be fast, scannable on mobile, and credible on desktop for planning-heavy buyers.",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
        "Vite",
      ],
      category: "fullstack" as const,
      startDate: "2025-01-01",
      isActive: true,
      liveUrl: "https://www.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Production studio site on React, TypeScript, Express and MongoDB — owned from design to deployment",
        "Validated enquiry flow backed by REST APIs, with local SEO, accessibility and performance built in",
        "Reusable component library and API layer shared across client builds",
        "Public portfolio with search, industry filters, and 21+ case studies aligned to the live projects API",
      ],
      architecture:
        "Full-stack studio stack: React SPA, Node/Express API, MongoDB for dynamic content, static Vite builds and subdomain deploys for demos and client sites.",
    },
    {
      title: "JB IT Services",
      description:
        "IT services provider platform — client engagement, workflows, technician activity, automation, and admin oversight (production client build).",
      longDescription:
        "JB IT Services is a leading Australian small-business IT provider focused on managed technology, infrastructure support, and end-to-end IT operations. This project delivers a fully customised digital operations platform to centralise workflows, automate routine processes, and provide real-time visibility: a complete, searchable client engagement and communication history; technician workflows, assignments, and progress; unified dashboards and activity monitoring; reduced manual work through automation; and seamless REST integration with internal tools and service infrastructure. It functions as the operational backbone for faster decisions, consistent delivery, and measurable productivity. Reported business outcomes include less manual administration, higher technician productivity, stronger operational visibility, faster client response, and better satisfaction through transparent, documented service history. Case study: https://www.web-architech.com.au/portfolio/jb-it-services",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "REST APIs",
        "Tailwind CSS",
        "JWT",
        "Docker",
        "Nginx",
        "GitHub Actions",
      ],
      category: "fullstack" as const,
      startDate: "2025-12-01",
      isActive: true,
      liveUrl: "https://jbitservices.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service pages and enquiry pathways for an Australian IT services business",
        "Containerised deployment with Docker, Nginx and GitHub Actions",
        "Internal CRM to streamline client records and technician workflows",
        "Local SEO, accessibility and performance tuned for mobile visitors",
      ],
      architecture:
        "React frontend, Node.js/Express backend, PostgreSQL, JWT auth, Docker/Nginx hosting, CI/CD via GitHub Actions.",
    },
    {
      title: "DailyMate",
      description:
        "Cross-platform personal life analytics — mood, journal, tasks, finance, health, goals, and smart automation in one offline-first app (iOS & Android).",
      longDescription:
        "DailyMate (https://daily-mate.cloud/) connects mood, money, and habits: daily mood and journal, tasks and quick notes, budgets and spending alerts, Apple Health / Health Connect sync (steps, sleep, energy, heart rate), goals and habit streaks, weekly summaries, and rule-based automation (e.g. overspend → task, step goal → habit check-in). Built for offline-first use with cloud sync on Firebase, encryption in transit/at rest, subscription pricing with trial, and localisation (English, Indonesian, Chinese, Spanish).",
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Firestore",
        "Apple HealthKit",
        "Health Connect",
        "iOS",
        "Android",
      ],
      category: "mobile" as const,
      startDate: "2025-06-01",
      isActive: true,
      liveUrl: "https://daily-mate.cloud/",
      imageUrl:
        "https://images.pexels.com/photos/4145243/pexels-photo-4145243.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Unified modules: tasks, mood & insights, journal, goals & habits, finance, health, quick notes, weekly view, and shareable summary cards",
        "Cross-domain analytics linking mood, spending, habits, and health with automation to reduce manual input",
        "Offline-first data model with secure Firebase sync and multi-language support (EN, ID, ZH, ES)",
      ],
      architecture:
        "Mobile clients (iOS & Android) with local persistence, Firebase backend, and native health SDK integrations.",
    },
    {
      title: "M-arkir",
      description:
        "A license plate recognition system using Python and OpenCV with Arduino integration.",
      longDescription:
        "A license plate recognition system using Python and OpenCV. Integrated with Arduino for hardware control, combining C++ and Python to enable real-time image processing and automated response. Built as a university project.",
      technologies: [
        "Python",
        "OpenCV",
        "Arduino",
        "C++",
        "Computer Vision",
        "OCR",
      ],
      category: "ai" as const,
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Implemented real-time license plate recognition using OpenCV",
        "Integrated computer vision with embedded systems",
        "Created automated gate control system",
        "Demonstrated expertise in computer vision and IoT integration",
      ],
    },
    {
      title: "Kabisa",
      description:
        "An educational app introducing Sundanese script through game-based learning.",
      longDescription:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Published as a research paper. Built with Swift and SwiftUI, featuring interactive learning modules, gamification elements, and cultural preservation features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Game Development",
        "Education Technology",
      ],
      category: "mobile" as const,
      startDate: "2023-01-01",
      endDate: "2023-05-31",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Game-based lessons for learning Sundanese script",
        "Published as a research paper",
        "Built in Swift and SwiftUI following Apple Human Interface Guidelines",
      ],
    },
    {
      title: "giftforyou.idn",
      description:
        "Florist e-commerce for Indonesia — catalog, ordering, promotions, and admin tooling for bouquets and gifts.",
      longDescription:
        "Giftforyou.idn is a professional florist and curated gift brand offering premium arrangements, personalised gifts, and packages for special occasions. The platform is built to streamline daily operations and strengthen digital presence: improved order and workflow efficiency for staff; a seamless, intuitive shopping experience; support for marketing and promotional campaigns; high-quality catalog presentation with rich descriptions; and simple updates for seasonal offers, discounts, and limited-time promotions. The result is a scalable storefront that improves engagement, operational productivity, and competitiveness in online floristry and gifting — with SEO-oriented structure for discovery and conversion. Case study: https://www.web-architech.com.au/portfolio/giftforyou-idn",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack" as const,
      startDate: "2025-10-01",
      isActive: true,
      liveUrl: "https://giftforyou-idn.cloud",
      imageUrl:
        "https://images.pexels.com/photos/4389986/pexels-photo-4389986.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Live e-commerce store for an Indonesian florist — catalogue, ordering and promotions",
        "Authenticated admin for products, orders and seasonal campaigns",
        "REST API across catalogue, order and promotion modules",
        "Product catalog, admin tooling, and SEO-oriented structure for campaigns and seasonal promotions",
      ],
      architecture:
        "Full-stack architecture with React frontend, Express.js backend, and MongoDB database. RESTful API design with JWT authentication and secure payment processing.",
    },
    {
      title: "Christina Sings4You",
      description:
        "Sydney vocalist site — profile, media, packages, and booking inquiries for weddings, corporate events, and private celebrations.",
      longDescription:
        "Christina – Sings4you is a Sydney-based professional vocalist for weddings, private events, corporate functions, and celebrations. The site reflects her artistic identity while giving prospects a smooth path to evaluate and enquire: profile and performance style, structured packages, rich media (photo, video, audio), and an integrated contact and booking inquiry flow — serving as both promotion and professional portfolio. Intended outcomes include stronger presence in the Sydney entertainment market, clearer service positioning, more qualified booking interest through streamlined enquiries, and credible presentation for planners, couples, and corporate clients, with room to grow content and campaigns over time. Case study: https://www.web-architech.com.au/portfolio/christina-sings4you",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack" as const,
      startDate: "2025-11-01",
      isActive: true,
      liveUrl: "https://christina-sings4you.com.au",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Live branding and booking site for a Sydney vocalist, delivered end to end",
        "Clear packages and enquiry flow for weddings and corporate events",
        "Media-rich presentation (photo, video, audio) without hurting mobile performance",
        "Structured inquiry flow for bookings and lead capture",
      ],
      architecture:
        "Full-stack architecture with React frontend and Node.js backend. RESTful API for forms and contact.",
    },
    {
      title: "Memora",
      description:
        "Product and marketing presence for Memora — keeping life's moments organised and beautifully presented.",
      longDescription:
        'Memora (https://mymemora.cloud/) is positioned as a calm, design-forward way to preserve and revisit moments. The public site communicates the product promise ("Your moments, beautifully kept"), supports discovery and download paths, and aligns with a privacy-conscious, user-centred experience for memory and media storytelling.',
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
      category: "web" as const,
      startDate: "2025-09-01",
      isActive: true,
      liveUrl: "https://mymemora.cloud/",
      imageUrl:
        "https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Brand-forward landing and product narrative for a moments-focused experience",
        "Clear positioning for Gen-Z and millennial audiences seeking simple, beautiful memory keeping",
        "Scalable static or SPA delivery suitable for global audience and future app-store deep links",
      ],
      architecture:
        "Modern marketing SPA or static site with optional Firebase for forms, analytics, or future authenticated experiences.",
    },
    {
      title: "Bottani",
      description:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time.",
      longDescription:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy using Swift, SwiftUI, and IoT integration.",
      technologies: ["Swift", "SwiftUI", "IoT", "Core Data", "Bluetooth"],
      category: "mobile" as const,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Real-time soil monitoring from IoT sensors",
        "Remote equipment control from the app",
        "Designed from farmer interviews and usability testing at Apple Developer Academy",
        "Intuitive farmer-facing mobile UI for monitoring and control",
      ],
    },
    {
      title: "Reguards",
      description:
        "A women's travel safety app designed to enhance safety for women travelers.",
      longDescription:
        "A women's travel safety app developed during Apple Developer Academy. Designed to enhance safety for women travelers through real-time location sharing, emergency contacts, and safety alerts. Built with Swift and SwiftUI, featuring GPS tracking, emergency SOS functionality, and community safety features.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Core Location",
        "AVFoundation",
        "GPS",
      ],
      category: "mobile" as const,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Real-time location sharing with trusted contacts",
        "Emergency SOS that broadcasts the user's location",
        "Designed with women travellers through research and usability testing",
      ],
    },
    {
      title: "Phowto",
      description:
        "A photography tutorial app providing interactive tutorials and guides for photography enthusiasts.",
      longDescription:
        "A photography tutorial app developed during Apple Developer Academy. Provides interactive tutorials and guides for photography enthusiasts. Built with Swift and SwiftUI, featuring video tutorials, step-by-step guides, and community features.",
      technologies: ["Swift", "SwiftUI", "AVFoundation", "Video Processing"],
      category: "mobile" as const,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Interactive photography tutorial app with video and step-by-step guides (Apple Developer Academy)",
        "Engaging learning UI and community-oriented feature patterns",
      ],
    },
    {
      title: "L-emot",
      description:
        "A smart lamp controller built with Arduino and custom hardware for wireless lighting control.",
      longDescription:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation.",
      technologies: ["Arduino", "C++", "Bluetooth", "IoT", "Embedded Systems"],
      category: "other" as const,
      startDate: "2022-01-01",
      endDate: "2022-06-30",
      isActive: false,
      imageUrl:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Built custom hardware solution for smart lighting",
        "Implemented wireless control via Bluetooth",
        "Created energy monitoring features",
        "Demonstrated practical IoT application in home automation",
      ],
    },
    {
      title: "Garden & Landscape — Services & seasons",
      description:
        "Seasonal services marketing SPA for gardening and outdoor work — service blocks, imagery, local-operator tone, build-time SEO.",
      longDescription:
        "Studio demo (HOME & GARDEN): clear service blocks, imagery, and a local-operator tone with SEO generated at build time. Outcome: practical on-site mobile reading and credible desktop planning. Impact: better alignment between what you sell (mowing, design, seasonal packages) and what customers request. Case study: https://www.web-architech.com.au/portfolio/gardening",
      technologies: ["React", "Vite", "React Router", "ESLint"],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://gardening.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1410232/pexels-photo-1410232.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service-area storytelling and responsive layouts",
        "Build-time SEO for fast static delivery",
        "Live demo subdomain for landscaping operators",
      ],
      architecture:
        "Static Vite SPA with React Router; assets and copy structured for studio portfolio and subdomain deploy.",
    },
    {
      title: "Event Decor — Styling & gallery",
      description:
        "Portfolio-forward SPA for event styling — galleries, narrative sections, Framer Motion reveals, build-time SEO.",
      longDescription:
        "Studio demo (EVENTS): editorial, image-heavy event vertical UX without sacrificing mobile performance. Impact: helps clients visualise outcomes and shortlist vendors faster, improving enquiry quality. Case study: https://www.web-architech.com.au/portfolio/event-decor",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "ESLint",
      ],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://eventdecor.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Gallery-led layouts and motion-driven section reveals",
        "Responsive imagery and build-time SEO artefacts",
        "Polished event-styling reference implementation",
      ],
      architecture:
        "Vite + React SPA with Framer Motion; static build with generated SEO files.",
    },
    {
      title: "Electrician Co. — Emergency & installs",
      description:
        "Trades-focused SPA — strong CTAs, service scope, mobile drawers/toasts, Motion, build-time SEO.",
      longDescription:
        "Studio demo (TRADES): urgent, trust-heavy vertical with fast load, scannable offers, and clear next steps. Impact: more qualified calls by surfacing service areas, urgency, and credentials clearly. Case study: https://www.web-architech.com.au/portfolio/electrician",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Motion",
        "Lucide React",
        "Sonner",
        "Vaul",
        "ESLint",
      ],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://electrician.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/8090142/pexels-photo-8090142.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service highlights and conversion-oriented CTAs",
        "Mobile UX patterns (drawers, toasts) with Lucide icons",
        "Build-time SEO and motion polish for trades brands",
      ],
      architecture:
        "Vite React SPA with Motion and accessible mobile primitives (Vaul/Sonner).",
    },
    {
      title: "Dental Clinic — Care & patient journey",
      description:
        "Clinical-grade marketing SPA — calm typography, services and team, motion for section reveals.",
      longDescription:
        "Studio demo (HEALTHCARE): balances warmth and professionalism for practices that need trust before the first appointment. Impact: reduces anxiety, clarifies what to expect, and supports higher-quality enquiries. Case study: https://www.web-architech.com.au/portfolio/dental-clinic",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "Phosphor Icons",
        "ESLint",
      ],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://dental.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service storytelling with healthcare-appropriate visual tone",
        "Framer Motion section motion and Phosphor icons",
        "Responsive layout tuned for patient education",
      ],
      architecture:
        "Static Vite SPA; content and motion structured for credibility-first healthcare marketing.",
    },
    {
      title: "Cleaning Service — Bookings & packages",
      description:
        "Residential cleaning SPA — service tiers, trust blocks, booking/contact paths, build-time SEO.",
      longDescription:
        "Studio demo (HOME SERVICES): fast, scannable site so homeowners compare options without clutter. Impact: clearer positioning and fewer unqualified leads by setting expectations upfront. Case study: https://www.web-architech.com.au/portfolio/cleaning-service",
      technologies: ["React", "Vite", "React Router", "ESLint"],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://cleaning.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service packaging layout with booking/contact CTAs",
        "Responsive sections and build-time SEO",
        "Aligned with other home-services vertical demos",
      ],
      architecture:
        "Minimal Vite + React Router static SPA with generated SEO files.",
    },
    {
      title: "Artisan Bakery — Orders & pickup",
      description:
        "Bakery marketing SPA with guided order wizard, availability checks, same-origin API, and admin orders view (demo).",
      longDescription:
        "Studio demo (FOOD & BEVERAGE): product storytelling plus a real order pipeline pattern — pickup dates, availability, submission via same-origin API when deployed, and an admin-facing orders list. Impact: turns browsing into dated pickup orders and reduces back-and-forth for simple fulfilment. Case study: https://www.web-architech.com.au/portfolio/artisan-bakery",
      technologies: ["React", "Vite", "React Router", "Node.js", "REST APIs"],
      category: "fullstack" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://bakery.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1070893/pexels-photo-1070893.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Multi-step order wizard with availability integration",
        "Token-gated admin orders dashboard in demo configuration",
        "Responsive bakery branding and static-first delivery",
      ],
      architecture:
        "Vite React SPA with optional Node API for orders; demonstrates hospitality retail UX beyond static pages.",
    },
    {
      title: "Bridal Atelier — Boutique & collections",
      description:
        "Bridal retail SPA — editorial narrative, collection grids with modals, testimonials, FAQ, motion, build-time SEO.",
      longDescription:
        "Studio demo (WEDDING): trust-led experience for boutiques that rely on appointments and showroom visits. Impact: clearer offer and social proof before the first visit; calmer, more premium first impression than generic templates. Case study: https://www.web-architech.com.au/portfolio/bridal-boutique",
      technologies: ["React", "Vite", "React Router", "Motion", "ESLint"],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://bridal.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2959196/pexels-photo-2959196.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Collection grids with accessible modal and focus handling",
        "Motion-driven sections and responsive imagery",
        "Build-time SEO artefacts for bridal retail",
      ],
      architecture:
        "Vite SPA with Motion; modal/gallery patterns suited to appointment-led retail.",
    },
    {
      title: "Fashion atelier & lookbook",
      description:
        "Fashion SPA — editorial story, bento layouts, lookbook, motion, multi-step appointment flow with API-backed booking.",
      longDescription:
        "Studio demo (FASHION): conversion-led retail UX from first impression through structured booking with real availability handling. Impact: strengthens craft and positioning, routes visitors to fittings, and reduces vague contact-only loops. Case study: https://www.web-architech.com.au/portfolio/fashion-house-atelier",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "ESLint",
      ],
      category: "fullstack" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://fashion.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/6476588/pexels-photo-6476588.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Multi-step appointment wizard with API-backed slots",
        "Lookbook, featured looks, hero and bento content blocks",
        "Framer Motion interactions and responsive image treatment",
      ],
      architecture:
        "Static-first Vite SPA with same-origin booking API on deploy; SEO artefacts at build time.",
    },
    {
      title: "Lumière Frames — Photography studio",
      description:
        "Monochrome-forward photography site — booking flow, portfolio sets, testimonials, contact, SEO assets, subdomain pipeline.",
      longDescription:
        "Studio demo (Photography): production-ready SPA with booking wizard (availability, double-booking prevention, calendar export), gallery and portfolio layouts, testimonials, and generated sitemap/robots. Impact: clearer mobile UX, faster lead capture, stronger trust via work and reviews. Case study: https://www.web-architech.com.au/portfolio/photography-studio",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "JavaScript",
        "CSS",
        "ESLint",
        "GitHub Actions",
        "Nginx",
      ],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://photography.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Booking wizard with double-booking prevention and .ics export",
        "Portfolio sets, gallery grid, testimonials, and contact capture",
        "SEO sitemap/robots and cookie consent for the subdomain",
      ],
      architecture:
        "Vite SPA deployed to subdomain with GitHub Actions and Nginx; demo admin uses local storage.",
    },
    {
      title: "Tropical Açai Sydney — portfolio microsite",
      description:
        "Hospitality single-page site — hero, menu, gallery, reviews, map, CTAs; optional Firestore-backed content.",
      longDescription:
        "Studio demo (Hospitality): tropical café concept with responsive UI, menu and gallery, reviews carousel, Google Maps embed, order/social CTAs, JSON-LD/Open Graph, and optional Firebase/Firestore overrides. Impact: credible live example for F&B prospects with fast loads and a path to ongoing studio engagement. Case study: https://www.web-architech.com.au/portfolio/tropical-acai-sydney",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Firebase",
        "Firestore",
      ],
      category: "web" as const,
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://tropicalacaisydney.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Responsive tropical UI with mobile sticky CTA",
        "Menu, gallery, reviews carousel, and Maps embed",
        "Optional Firestore CMS and static Vite build with structured data",
      ],
      architecture:
        "Static Vite + React SPA; optional Firestore for content overrides in demo configuration.",
    },
    {
      title: "Homes That Feel Like Home",
      description:
        "Real-estate style SPA — property listings, detail pages, booking availability and requests, contact, and admin bookings dashboard.",
      longDescription:
        "Studio demo (REAL ESTATE): fast, SEO-friendly marketing plus listings with a booking funnel and a lightweight staff/admin view for booking requests. Same-origin API integration, sitemap and robots generation, cookie consent, and optional analytics loading. Impact: streamlines enquiry-to-booking for viewings or stays and centralises booking handling. Case study: https://www.web-architech.com.au/portfolio/homes-feel-sydney",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "React Router",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide",
        "Node.js",
        "REST APIs",
      ],
      category: "fullstack" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://homes-feel.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Property listings and detail pages with booking availability",
        "Booking request and contact flows with admin dashboard",
        "Same-origin API, sitemap/robots, and cookie consent patterns",
      ],
      architecture:
        "Vite React SPA with Node API for bookings; static SEO artefacts at build time.",
    },
    {
      title: "Flowline Plumbing Co. — Sydney",
      description:
        "Plumbing marketing site with online booking wizard, availability, issue photo upload, contact, and admin dashboard with ICS export.",
      longDescription:
        "Studio demo (HOME SERVICES): guided booking flow turns visitors into scheduled jobs; admin dashboard reduces overhead with ICS download and centralised bookings. Same-origin API, sitemap/robots, cookie consent. Impact: stronger lead capture and clearer scheduling online. Case study: https://www.web-architech.com.au/portfolio/flowline-plumbing-sydney",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "React Router",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide",
        "Node.js",
        "REST APIs",
      ],
      category: "fullstack" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://flowline.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Booking wizard with availability endpoint and photo upload for issues",
        "Admin bookings dashboard with calendar (.ics) export",
        "Contact, SEO files, and consent/analytics hooks for production-style deploys",
      ],
      architecture:
        "Vite SPA plus Node booking API; Framer Motion and Tailwind for trades UX.",
    },
    {
      title: "Cuore Ristorante — Sydney",
      description:
        "Cinematic Italian restaurant experience — visual menu, gallery, journal, reservations with availability, contact, and staff admin for bookings.",
      longDescription:
        "Studio demo (RESTAURANT): Next.js 15 app with strong brand presence, clearer reservation flow, and manageable content patterns (menu, gallery, blog). Staff-facing admin for bookings; optional email notifications when configured. Cinematic Italian dining showcase with visual menu, gallery, journal, and reservations. Case study: https://www.web-architech.com.au/portfolio/cuore-sydney",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "date-fns",
      ],
      category: "fullstack" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://cuore.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Visual menu, gallery, and journal-style content",
        "Reservations with availability and staff admin for bookings",
        "Contact flows and motion-led layout suited to hospitality brands",
      ],
      architecture:
        "Next.js App Router with TypeScript and Tailwind; booking and content modules for restaurant operations.",
    },
    {
      title: "Lumière Atelier — Makeup studio",
      description:
        "Mobile-first makeup studio concept — services, portfolio, testimonials, and an eight-step booking wizard with live summary.",
      longDescription:
        "Studio demo (BEAUTY / BRIDAL & EVENT): polished SPA with accessible navigation, service detail modal, horizontal-scroll rails where needed, route transitions, and SEO sitemap/robots at build time. Impact: clearer packages, guided booking, premium brand feel on mobile-first traffic. Case study: https://www.web-architech.com.au/portfolio/lumiere-atelier-makeup-studio",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "JavaScript",
        "CSS",
        "ESLint",
        "GitHub Actions",
        "Nginx",
      ],
      category: "web" as const,
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://makeup.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3762878/pexels-photo-3762878.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Eight-step booking wizard with live summary",
        "Service modal, testimonials, and mobile-first layout patterns",
        "Cookie consent, optional scripts, and generated sitemap/robots",
      ],
      architecture:
        "Vite SPA on subdomain; GitHub Actions and Nginx; accessibility-focused UI patterns.",
    },
    {
      title: "kal's ON CAHILL — Riverside café showcase",
      description:
        "Premium single-brand café SPA — hero, menu sections, booking CTA, reviews, and location with Lenis, GSAP, and Framer Motion.",
      longDescription:
        "Studio demo (HOSPITALITY): Wolli Creek–themed live subdomain with editorial layout and motion-rich storytelling for high-end cafés. JSON/config-driven content shape, booking partner deep link, reviews and maps patterns. Impact: reads as bespoke venue experience for premium F&B leads.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
        "Lenis",
        "Lucide React",
      ],
      category: "web" as const,
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://kalsoncahill.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Lenis smooth scroll with GSAP and Framer Motion",
        "Menu highlights, reviews, maps, and brand photography slots",
        "Booking-led conversion patterns for hospitality",
      ],
      architecture:
        "Static Vite deploy with motion stack tuned for editorial F&B storytelling.",
    },
    {
      title: "Wash My Ride Kogarah — Car wash & café",
      description:
        "Hand car wash and café marketing site — services, packages, loyalty, gallery, and contact for high-intent local traffic.",
      longDescription:
        "Studio demo (AUTOMOTIVE SERVICES): hospitality-meets-trades positioning with scannable service tiers, gallery and testimonials, hours and location, Framer Motion, and build-time SEO. Impact: repeatable section patterns for destination local businesses (wash + café).",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Lucide React",
      ],
      category: "web" as const,
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://washmyride.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Service pages, pricing cues, gallery, and testimonials",
        "Social and map integration patterns; mobile-first layout",
        "Brand, OG, and SEO file generation for subdomain hosting",
      ],
      architecture:
        "Vite + React Router static SPA with Framer Motion and Tailwind.",
    },
    {
      title: "Kogarah Automotive — Workshop microsite",
      description:
        "Multi-page workshop SPA — services, about, gallery, contact with phone and WhatsApp CTAs and local SEO–oriented metadata.",
      longDescription:
        "Studio demo (AUTOMOTIVE): trades-grade trust-led layout, fast static delivery, React Router multi-page flow, Framer Motion, and build-time robots/sitemap for local discovery. Impact: easy contact paths and scannable services for repair and service businesses.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Lucide React",
      ],
      category: "web" as const,
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://kogarahautomotive.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service and gallery pages with click-to-call and WhatsApp",
        "Local SEO–oriented titles and meta; Vite static build",
        "Nginx-friendly SPA hosting patterns for subdomain deploys",
      ],
      architecture:
        "Vite multi-route SPA with Tailwind and Framer Motion for automotive retail.",
    },
  ],

  softSkills: [
    {
      name: "Agile & Scrum Development",
      category: "collaboration" as const,
    },
    {
      name: "Analytical Thinking",
      category: "problem-solving" as const,
    },
    {
      name: "Adaptability",
      category: "adaptability" as const,
    },
    {
      name: "Collaboration",
      category: "collaboration" as const,
    },
    {
      name: "Leadership",
      category: "leadership" as const,
    },
    {
      name: "Problem Solving",
      category: "problem-solving" as const,
    },
  ],

  stats: [
    {
      label: "Years building software",
      value: 4,
      unit: "+",
      description:
        "From Apple Developer Academy through Samsung R&D to AI and full-stack roles in Sydney",
    },
    {
      label: "Projects built",
      value: 30,
      unit: "+",
      description:
        "Client platforms, studio demos, mobile apps and research projects",
    },
    {
      label: "Commits at Samsung",
      value: 300,
      unit: "+",
      description: "SmartThings TV plugin features, refinements and bug fixes",
    },
    {
      label: "Live sites deployed",
      value: 20,
      unit: "+",
      description: "Client, studio and product sites running in production",
    },
  ],

  technicalSkills: [
    {
      name: "Python",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "TypeScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "JavaScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "SQL",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Swift",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "Java",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "C++",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "C",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "React",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Node.js",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Express.js",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "TensorFlow / Keras",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "Pandas / NumPy",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "scikit-learn",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "LLM Applications",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 1,
    },
    {
      name: "Prompt Engineering",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 1,
    },
    {
      name: "Machine Learning",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "Computer Vision",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Backend Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "MongoDB",
      category: "database" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "MySQL",
      category: "database" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Git",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "GitHub",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Docker",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "RESTful APIs",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Postman",
      category: "tool" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "PHP",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "SwiftUI",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "UIKit",
      category: "framework" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "OpenCV",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "WordPress",
      category: "framework" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
    {
      name: "SQLite",
      category: "database" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Arduino",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "iOS Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "IoT Development",
      category: "other" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    {
      name: "Competitive Programming",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 4,
    },
    {
      name: "Azure",
      category: "cloud" as const,
      proficiency: "beginner" as const,
      yearsOfExperience: 1,
    },
    {
      name: "KNIME",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 1,
    },
  ],

  testimonials: [
    {
      author: "Latifah Munawaroh",
      role: "Data Scientist",
      company: "Apple Developer Academy | Digital Talent Scholarship Awardee",
      content:
        "Strong programmer with a CP and IoT background; balances design and development well. Great collaborator who listens in design meetings and solves problems with confidence.",
      date: "2024-11-01",
    },
    {
      author: "Ariel Waraney Manueke",
      role: "Master of IT Student @ UTS",
      company: "Apple Developer Academy",
      content:
        "Outstanding at iOS development, collaboration, and problem-solving. Passionate on our internship project, fun to work with, and his work helped us ship our first app.",
      date: "2023-05-01",
    },
    {
      author: "Galih Laras Prakoso",
      role: "Software Engineer",
      company: "Apple Developer Academy",
      content:
        "Highly skilled engineer with strong competitive programming chops; picked up SwiftUI fast and shipped quality iOS work. Critical thinker, positive teammate — I’d recommend him for any software role.",
      date: "2023-05-01",
    },
    {
      author: "Queency Lowen",
      role: "Graphic Designer | UI/UX Designer",
      company: "Apple Developer Academy",
      content:
        "Talented developer and strong collaborator; balances implementation with UX and is a reliable team member.",
      date: "2023-05-01",
    },
    {
      author: "Rido Hendrawan",
      role: "Product Designer",
      company: "Apple Developer Academy",
      content:
        "Skilled with Swift and iOS; his collaboration and clear, steady communication were key to our app project.",
      date: "2023-04-01",
    },
  ],
};
