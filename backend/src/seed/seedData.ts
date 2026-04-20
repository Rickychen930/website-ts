/**
 * Seed Data - Ricky Chen Profile
 * Improved and normalized structure matching the backend schema
 *
 * learningSections: imported from ./learningSeed (validated by npm run learning:validate).
 * Do not inline; add or edit sections/topics in learningSeed.ts and keep CONTENT_SECTION_LABELS in sync.
 */

import { learningSections } from "./learningSeed";

export const seedProfileData = {
  name: "Ricky Chen",
  title: "Fullstack Engineer · MSc Artificial Intelligence (UTS)",
  location: "Sydney, Australia",
  bio: "I build across backend, mobile, and web—from high-scale connected products to polished interfaces—applying a competitive-programming mindset to design, delivery, and outcomes.\n\nI'm a fullstack engineer and founder at Web Architech in Sydney, owning work from discovery through deployment with clear architecture, observable systems, and maintainable code. Previously: Samsung R&D Jakarta (SmartThings, One UI) and Apple Developer Academy (Swift/SwiftUI). MSc Artificial Intelligence at UTS (in progress). Open to roles where technical depth, reliability, and UX craft align.",
  heroTagline:
    "Shipping end-to-end products—from systems design to deployed interfaces—with research-grade rigor.",
  openToOpportunities: true,
  avatarUrl: "/images/ricky-chen-portrait.png",

  academics: [
    {
      institution: "University of Technology Sydney (UTS)",
      degree: "Master of Artificial Intelligence",
      field: "Artificial Intelligence",
      startDate: "2025-07-01",
      endDate: "2027-07-31",
      description:
        "Master of Artificial Intelligence | Specializing in machine learning, deep learning, and AI applications. Expected graduation in 2027.",
    },
    {
      institution: "Bina Nusantara University (Binus University)",
      degree: "Bachelor of Computer Science",
      field: "Computer Science",
      startDate: "2019-09-01",
      endDate: "2023-05-31",
      description:
        "Bachelor of Computer Science | GPA: 3.83/4.00 | Focused on software engineering, algorithms, data structures, and software development methodologies. Completed capstone project in IoT and computer vision.",
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
    {
      name: "Multiple Programming Languages Certification",
      issuer: "SoloLearn",
      issueDate: "2020-02-01",
      credentialId: "SOLOLEARN-MULTI-LANG-2020",
      credentialUrl: "https://www.sololearn.com",
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
      value: "https://github.com/rickychen930",
      label: "GitHub",
      isPrimary: false,
    },
  ],

  experiences: [
    {
      company: "Web Architech",
      position: "Fullstack Engineer | Founder",
      location: "Sydney, Australia",
      startDate: "2024-01-01",
      isCurrent: true,
      description:
        "Fullstack engineer and founder of Web Architech (Sydney). Own the full development lifecycle—requirements, system design, implementation, testing, deployment, and optimization—across engagements serving 1M+ users. Deliver modern, high-performance web applications with MongoDB, Node.js, and React; maintain clean codebases using OOP, SOLID, DRY, and MVC. Also ship a public portfolio of 21+ case studies and vertical demos (Vite/Next.js, full-stack dashboards, REST APIs) with discovery-through-care delivery for Australian and international clients.",
      achievements: [
        "Owned end-to-end delivery across multiple projects and 100+ releases with minimal post-launch defects",
        "Cut refactor overhead to under one hour per release through disciplined architecture and code structure",
        "Improved client turnaround by ~15% via streamlined documentation and communication with distributed teams (Korea, India, Vietnam)",
        "Shipped production client platforms (IT operations, e-commerce, entertainment) plus a searchable portfolio at web-architech.com.au/portfolio with public API parity",
      ],
      technologies: [
        "MongoDB",
        "PostgreSQL",
        "Node.js",
        "Express.js",
        "React",
        "Next.js",
        "Vite",
        "TypeScript",
        "Firebase",
        "Docker",
        "Nginx",
        "GitHub Actions",
        "REST APIs",
        "Git",
      ],
      skillIds: [
        "TypeScript",
        "Node.js",
        "React",
        "MongoDB",
        "Full-Stack Development",
      ],
    },
    {
      company: "Samsung R&D Institute – Jakarta",
      position: "Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isCurrent: false,
      description:
        "Software engineer at Samsung R&D Institute, Jakarta. Built the SmartThings TV Plugin for device discovery, remote control, and status monitoring; contributed to One UI 6 enhancements for UI/UX and accessibility. Delivered TypeScript and Node.js services in an Agile, cross-functional environment with impact to 1M+ SmartThings users worldwide.",
      achievements: [
        "Delivered 12 projects end-to-end with improvements that impacted 1M+ users globally",
        "Shipped TV Plugin work ahead of schedule with ~10% processing-time reduction on targeted flows",
        "Contributed 100+ commits across the TV Plugin lifecycle; strengthened SmartThings ecosystem integration",
        "Contributed to One UI 6 enhancements improving UI/UX and accessibility for high-traffic device interactions",
      ],
      technologies: [
        "TypeScript",
        "Node.js",
        "Samsung SmartThings SDK",
        "REST APIs",
        "Git",
        "Agile",
        "Scrum",
      ],
      skillIds: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Git",
        "GitHub",
        "Backend Development",
      ],
    },
    {
      company: "Apple Developer Academy – Tangerang",
      position: "Software Engineer",
      location: "Tangerang, Indonesia",
      startDate: "2022-02-01",
      endDate: "2023-02-28",
      isCurrent: false,
      description:
        "Intensive Apple Developer Academy program: Swift, UIKit, SwiftUI, GitHub, and professional soft skills. Built five shipped-style projects including Phowto (photography tutorials), Reguards (women’s travel safety with real-time location and emergency alerts), and Bottani (smart agriculture with IoT). Design thinking, user research, and iterative delivery with designers and peers.",
      achievements: [
        "Developed five iOS applications using Swift and SwiftUI",
        "Mastered iOS development lifecycle, app architecture, and best practices",
        "Participated in design thinking workshops and user research",
        "Collaborated effectively with designers and developers in cross-functional teams",
      ],
      technologies: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Xcode",
        "Git",
        "Core Data",
        "Core Location",
        "AVFoundation",
      ],
      skillIds: [
        "Swift",
        "SwiftUI",
        "UIKit",
        "Git",
        "GitHub",
        "iOS Development",
      ],
    },
  ],

  honors: [
    {
      title: "LeetCode",
      issuer: "LeetCode Platform",
      date: "2024-01-01",
      description:
        "Solved 84+ problems covering data structures, algorithms, and system design. Skilled in C++, Python, and Java. Focused on improving problem-solving efficiency and code optimization.",
      url: "https://leetcode.com/rickychen930",
    },
    {
      title: "Kattis Competitive Programmer",
      issuer: "Kattis Platform",
      date: "2024-01-01",
      description:
        "Solved 500+ algorithmic problems with a Kattis score of 220.4 (global rank 5510). Strong foundation in competitive programming using C++, Python, and Java — covering dynamic programming, graphs, and data structures.",
      url: "https://open.kattis.com/users/rickychen930",
    },
    {
      title: "Codeforces Specialist",
      issuer: "Codeforces Platform",
      date: "2024-01-01",
      description:
        "Achieved Specialist rating (1450) with 171 problems solved. Actively participates in contests and algorithmic challenges. Consistently solving problems across various difficulty levels including dynamic programming, graph algorithms, and data structures.",
      url: "https://codeforces.com/profile/rickychen930",
    },
    {
      title: "3rd Place – Competitive Programming",
      issuer: "Widyatama International Coding Competition",
      date: "2021-01-15",
      description:
        "Ranked 3rd in a Southeast Asia-wide coding competition. Collaborated in a team to solve advanced algorithmic challenges using C++, Python, and Java under time pressure. Demonstrated strong problem-solving skills and algorithmic thinking.",
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
        "Production company website on a modern stack; ~20% load-performance improvement and support for thousands of monthly visitors",
        "Contact and inquiry flows integrated with backend APIs; stronger lead reliability and ~15% reduction in user drop-off",
        "Scalable RESTful API design improving core service performance with ~15% lower response latency",
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
        "Service and storefront platform improving lead generation and ~15% higher inquiry conversion",
        "Production deployment targeting ~99% uptime with faster customer onboarding workflows",
        "Secure authentication and payment integration; ~20% fewer payment-related errors",
        "RESTful API foundation streamlining service-to-service data flow and ~20% lower maintenance overhead",
      ],
      architecture:
        "React frontend, Node.js/Express backend, PostgreSQL, JWT auth, Docker/Nginx hosting, CI/CD via GitHub Actions.",
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
        "Production personal branding and booking site with ~99% uptime and stronger visibility for a growing audience",
        "Responsive layout and clear information hierarchy improving navigation efficiency and ~15% lower drop-off",
        "Media-rich presentation (photo, video, audio) without hurting mobile performance",
        "Structured inquiry flow for bookings and lead capture",
      ],
      architecture:
        "Full-stack architecture with React frontend and Node.js backend. RESTful API for forms and contact.",
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
        "E-commerce platform with ~10% higher conversion via faster checkout and refined UX",
        "Secure authentication and payments; ~20% reduction in payment-related errors",
        "RESTful API architecture across product modules with high reliability and ~99% uptime target",
        "Product catalog, admin tooling, and SEO-oriented structure for campaigns and seasonal promotions",
      ],
      architecture:
        "Full-stack architecture with React frontend, Express.js backend, and MongoDB database. RESTful API design with JWT authentication and secure payment processing.",
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

    /* Live vertical demos and microsites listed on https://www.web-architech.com.au/portfolio */
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
    {
      title: "Ricky's Portfolio",
      description:
        "Student-focused portfolio platform — projects, academics, skills, certificates, and progress in one responsive, SEO-aware site.",
      longDescription:
        "Production build (EDUCATIONAL): structured sections for education, skills, achievements, and project showcase; responsive UI for mobile and desktop; modular architecture and REST-backed content where needed. Listed on web-architech.com.au/portfolio as a shipped platform for academic and career readiness.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "REST APIs",
        "MongoDB",
      ],
      category: "fullstack" as const,
      startDate: "2026-01-31",
      isActive: true,
      liveUrl: "https://rickychen930.cloud",
      imageUrl:
        "https://images.pexels.com/photos/5212342/pexels-photo-5212342.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Project and certificate showcase with skill progress visualisation",
        "Organised sections for education, experience, and achievements",
        "Responsive layout and SEO-oriented structure for recruiters and institutions",
      ],
      architecture:
        "React SPA with Node/Express API and MongoDB; component-driven, continuously updatable profile surface.",
    },

    {
      title: "TV Plugin – SmartThings",
      description:
        "Developed a TV control plugin for Samsung SmartThings app enabling device discovery, remote control, and status monitoring.",
      longDescription:
        "Developed a TV control plugin for Samsung SmartThings app. Enabled device discovery, remote control, and status monitoring for smart TVs. Contributed to One UI 6 enhancements and improved user experience for millions of users. Built with TypeScript, Node.js, and Samsung SmartThings SDK.",
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
        "SmartThings TV control plugin: discovery, remote commands, and real-time status with ~15% faster control responsiveness",
        "Discovery and remote-control flows reducing setup time ~30% and improving reliability for a growing user base",
        "Optimized high-traffic device UI flows cutting friction for millions of global SmartThings users",
        "Deep SmartThings integration for stable multi-device coordination and ~15% better platform responsiveness",
      ],
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
        "IoT-backed real-time soil monitoring with continuous multi-field sensor data and ~25% better environmental insight accuracy",
        "Automated irrigation cutting water use ~25% with real-time adjustments from sensor telemetry",
        "Predictive crop analytics improving yield-forecast accuracy ~20% while processing thousands of readings daily",
        "Intuitive farmer-facing mobile UI for monitoring and control",
      ],
    },
    {
      title: "Kabisa",
      description:
        "An educational app introducing Sundanese script through game-based learning.",
      longDescription:
        "An educational app introducing Sundanese script through game-based learning. Designed to preserve traditional language and culture. Presented in academic forums and published in IEEE. Built with Swift and SwiftUI, featuring interactive learning modules, gamification elements, and cultural preservation features.",
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
        "Gamified Sundanese script learning lifting completion ~25% and broadening cultural awareness",
        "Presented at multiple academic conferences and published in an IEEE outlet",
        "Interactive modules with gamification increasing participation and ~12% lower drop-off",
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
        "Real-time GPS tracking and location sharing supporting hundreds of active devices with ~20% better positional accuracy",
        "Emergency SOS with instant location broadcast improving critical response times ~30%",
        "Community safety features and real-time alerts improving incident visibility; delivered ~10% ahead of plan",
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
      label: "Years of Experience",
      value: "3+",
      description:
        "Professional software development from academy training through Samsung R&D and fullstack roles",
    },
    {
      label: "Projects Delivered",
      value: 31,
      description:
        "Shipped work across studio demos, client platforms, mobile, and research projects",
    },
    {
      label: "Users Impacted",
      value: "1M+",
      description: "Total users impacted by developed applications",
    },
  ],

  technicalSkills: [
    // Programming Languages
    {
      name: "Python",
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
      name: "JavaScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
    },
    {
      name: "TypeScript",
      category: "language" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
    },
    {
      name: "C",
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
      name: "Java",
      category: "language" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Frameworks & Libraries
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
    // Databases
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
      name: "SQLite",
      category: "database" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Tools & Platforms
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
      name: "Arduino",
      category: "tool" as const,
      proficiency: "intermediate" as const,
      yearsOfExperience: 2,
    },
    // Specialties
    {
      name: "iOS Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 3,
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
      name: "Backend Development",
      category: "other" as const,
      proficiency: "advanced" as const,
      yearsOfExperience: 2,
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

  learningSections,
};
