/**
 * Profile Service - Business logic layer
 * Version 4: Added fallback data when backend is unavailable
 */

import { ProfileModel } from "@/models/ProfileModel";
import type { Profile } from "@/types/domain";
interface CacheEntry {
  data: ProfileModel;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Fallback when the API is unavailable — aligned with seed / Ricky Chen Resume-2026.pdf.
const FALLBACK_PROFILE: Profile = {
  id: "fallback-profile",
  name: "Ricky Chen",
  title: "Fullstack Engineer · MSc Artificial Intelligence (UTS)",
  location: "Sydney, Australia",
  bio: "I build across backend, mobile, and web—from high-scale connected products to polished interfaces—applying a competitive-programming mindset to design, delivery, and outcomes.\n\nI'm a fullstack engineer and founder at Web Architech in Sydney, owning work from discovery through deployment with clear architecture, observable systems, and maintainable code. Previously: Samsung R&D Jakarta (SmartThings, One UI) and Apple Developer Academy (Swift/SwiftUI). MSc Artificial Intelligence at UTS (in progress). Open to roles where technical depth, reliability, and UX craft align.",
  heroTagline:
    "Shipping end-to-end products—from systems design to deployed interfaces—with research-grade rigor.",
  openToOpportunities: true,
  avatarUrl: "/images/ricky-chen-portrait.png",
  academics: [],
  certifications: [],
  contacts: [
    {
      id: "contact-1",
      type: "email",
      value: "rickychen930@gmail.com",
      label: "Email",
      isPrimary: true,
    },
    {
      id: "contact-phone",
      type: "phone",
      value: "+61415185326",
      label: "Phone",
      isPrimary: false,
    },
    {
      id: "contact-2",
      type: "linkedin",
      value: "https://www.linkedin.com/in/rickychen930",
      label: "LinkedIn",
      isPrimary: false,
    },
    {
      id: "contact-3",
      type: "github",
      value: "https://github.com/rickychen930",
      label: "GitHub",
      isPrimary: false,
    },
  ],
  experiences: [
    {
      id: "exp-wa",
      company: "Web Architech",
      position: "Fullstack Engineer | Founder",
      location: "Sydney, Australia",
      startDate: "2024-01-01",
      isCurrent: true,
      description:
        "Fullstack engineer and founder of Web Architech (Sydney). Own the full development lifecycle—requirements, system design, implementation, testing, deployment, and optimization—across engagements serving 1M+ users. Deliver modern, high-performance web applications with MongoDB, Node.js, and React; maintain clean codebases using OOP, SOLID, DRY, and MVC. Also ship a public portfolio of 21+ case studies and vertical demos with discovery-through-care delivery.",
      achievements: [
        "Owned end-to-end delivery across multiple projects and 100+ releases with minimal post-launch defects",
        "Cut refactor overhead to under one hour per release through disciplined architecture and code structure",
        "Improved client turnaround by ~15% via streamlined documentation and communication with distributed teams (Korea, India, Vietnam)",
        "Shipped production client platforms plus a searchable portfolio at web-architech.com.au/portfolio with public API parity",
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
      id: "exp-1",
      company: "Samsung R&D Institute – Jakarta",
      position: "Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-05-01",
      endDate: "2024-05-31",
      isCurrent: false,
      description:
        "Software engineer at Samsung R&D Institute, Jakarta. Built the SmartThings TV Plugin for device discovery, remote control, and status monitoring; contributed to One UI 6 enhancements. TypeScript and Node.js in Agile teams with impact to 1M+ SmartThings users worldwide.",
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
      id: "exp-2",
      company: "Apple Developer Academy – Tangerang",
      position: "Software Engineer",
      location: "Tangerang, Indonesia",
      startDate: "2022-02-01",
      endDate: "2023-02-28",
      isCurrent: false,
      description:
        "Intensive Apple Developer Academy program: Swift, UIKit, SwiftUI, GitHub, and professional soft skills. Built five projects including Phowto, Reguards, and Bottani. Design thinking, user research, and iterative delivery with designers and peers.",
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
  honors: [],
  languages: [],
  projects: [
    {
      id: "project-architech",
      title: "Web Architech",
      description:
        "Marketing site and live portfolio for an Australian web studio — 21+ indexed case studies, search, industry filters, and subdomain demos across trades, healthcare, hospitality, automotive, real estate, beauty, and more.",
      longDescription:
        "Public site and portfolio index at web-architech.com.au/portfolio: 21 indexed case studies across hospitality, trades, healthcare, automotive, real estate, beauty, fashion, events, floristry, technology, entertainment, and education. Marketing copy stays aligned with the SPA via https://www.web-architech.com.au/api/projects.",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
        "Vite",
      ],
      category: "fullstack",
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
        "Full-stack studio stack: React SPA, Node/Express API, MongoDB, static Vite builds and subdomain deploys for demos and client sites.",
    },
    {
      id: "project-jb-it",
      title: "JB IT Services",
      description:
        "IT services provider platform — client engagement, workflows, technician activity, automation, and admin oversight (production client build).",
      longDescription:
        "Fully customised digital operations platform for JB IT Services: centralised workflows, automation, and real-time visibility — client engagement history, technician tasks, dashboards, notifications, REST integration, and role-based access. Featured on web-architech.com.au/portfolio.",
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
      category: "fullstack",
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
        "React frontend, Node.js/Express backend, PostgreSQL, JWT auth, Docker/Nginx, CI/CD via GitHub Actions.",
    },
    {
      id: "project-christina",
      title: "Christina Sings4You",
      description:
        "Sydney vocalist site — profile, media, packages, and booking inquiries for weddings, corporate events, and private celebrations.",
      longDescription:
        "Christina – Sings4you is a Sydney-based professional vocalist for weddings, private events, corporate functions, and celebrations. Case study: https://www.web-architech.com.au/portfolio/christina-sings4you",
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack",
      startDate: "2025-11-01",
      isActive: true,
      liveUrl: "https://christina-sings4you.com.au",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=800&fit=crop&auto=format",
      achievements: [
        "Production personal branding and booking site with ~99% uptime and stronger visibility for a growing audience",
        "Responsive layout and clear information hierarchy improving navigation efficiency and ~15% lower drop-off",
        "Media-rich presentation optimised for mobile",
        "Structured inquiry flow for bookings",
      ],
      architecture:
        "Full-stack architecture with React frontend and Node.js backend.",
    },
    {
      id: "project-1",
      title: "giftforyou.idn",
      description:
        "Florist e-commerce for Indonesia — catalog, ordering, promotions, and admin tooling for bouquets and gifts.",
      longDescription:
        "Giftforyou.idn e-commerce and operations platform. Case study: https://www.web-architech.com.au/portfolio/giftforyou-idn",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Express.js",
        "MongoDB",
        "Node.js",
        "RESTful APIs",
      ],
      category: "fullstack",
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
      id: "project-daily-mate",
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
      category: "mobile",
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
      id: "project-memora",
      title: "Memora",
      description:
        "Product and marketing presence for Memora — keeping life's moments organised and beautifully presented.",
      longDescription:
        'Memora (https://mymemora.cloud/) is positioned as a calm, design-forward way to preserve and revisit moments. The public site communicates the product promise ("Your moments, beautifully kept"), supports discovery and download paths, and aligns with a privacy-conscious, user-centred experience for memory and media storytelling.',
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
      category: "web",
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
      id: "project-wa-garden",
      title: "Garden & Landscape — Services & seasons",
      description:
        "Seasonal services marketing SPA for gardening and outdoor work — service blocks, imagery, local-operator tone, build-time SEO.",
      longDescription:
        "Studio demo (HOME & GARDEN): clear service blocks and local-operator tone with SEO at build time. Outcome: practical on-site mobile reading and credible desktop planning. Impact: better alignment between seasonal packages and customer requests.",
      technologies: ["React", "Vite", "React Router", "ESLint"],
      category: "web",
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
        "Static Vite SPA with React Router; subdomain deploy from web-architech.com.au/portfolio.",
    },
    {
      id: "project-wa-event",
      title: "Event Decor — Styling & gallery",
      description:
        "Portfolio-forward SPA for event styling — galleries, narrative sections, Framer Motion reveals, build-time SEO.",
      longDescription:
        "Studio demo (EVENTS): editorial, image-heavy UX without sacrificing mobile performance. Impact: clients visualise outcomes and shortlist vendors faster.",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "ESLint",
      ],
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://eventdecor.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Gallery-led layouts and motion-driven section reveals",
        "Responsive imagery and build-time SEO",
        "Event-styling reference implementation",
      ],
      architecture: "Vite + React SPA with Framer Motion.",
    },
    {
      id: "project-wa-electrician",
      title: "Electrician Co. — Emergency & installs",
      description:
        "Trades-focused SPA — strong CTAs, service scope, mobile drawers/toasts, Motion, build-time SEO.",
      longDescription:
        "Studio demo (TRADES): urgent, trust-heavy vertical with fast load and clear next steps. Impact: more qualified calls via clear service areas and credentials.",
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
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://electrician.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/8090142/pexels-photo-8090142.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service highlights and conversion-oriented CTAs",
        "Mobile UX (drawers, toasts) with Lucide icons",
        "Build-time SEO and motion polish",
      ],
      architecture: "Vite React SPA with Motion and Vaul/Sonner.",
    },
    {
      id: "project-wa-dental",
      title: "Dental Clinic — Care & patient journey",
      description:
        "Clinical-grade marketing SPA — calm typography, services and team, motion for section reveals.",
      longDescription:
        "Studio demo (HEALTHCARE): warmth and professionalism for trust before the first appointment. Impact: less anxiety, clearer expectations, higher-quality enquiries.",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "Phosphor Icons",
        "ESLint",
      ],
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://dental.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service storytelling with healthcare-appropriate tone",
        "Framer Motion and Phosphor icons",
        "Responsive layout for patient education",
      ],
      architecture:
        "Static Vite SPA tuned for credibility-first healthcare marketing.",
    },
    {
      id: "project-wa-cleaning",
      title: "Cleaning Service — Bookings & packages",
      description:
        "Residential cleaning SPA — service tiers, trust blocks, booking/contact paths, build-time SEO.",
      longDescription:
        "Studio demo (HOME SERVICES): fast, scannable comparisons for homeowners. Impact: clearer positioning and fewer unqualified leads.",
      technologies: ["React", "Vite", "React Router", "ESLint"],
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://cleaning.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Service packaging with booking/contact CTAs",
        "Responsive sections and build-time SEO",
        "Home-services vertical demo",
      ],
      architecture: "Minimal Vite + React Router static SPA.",
    },
    {
      id: "project-wa-bakery",
      title: "Artisan Bakery — Orders & pickup",
      description:
        "Bakery marketing SPA with order wizard, availability checks, same-origin API, admin orders view (demo).",
      longDescription:
        "Studio demo (FOOD & BEVERAGE): order pipeline with pickup dates, availability, API submission, admin orders list. Impact: dated pickup orders with less message back-and-forth.",
      technologies: ["React", "Vite", "React Router", "Node.js", "REST APIs"],
      category: "fullstack",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://bakery.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1070893/pexels-photo-1070893.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Multi-step order wizard with availability integration",
        "Token-gated admin orders in demo",
        "Responsive bakery branding",
      ],
      architecture: "Vite React SPA with optional Node API for orders.",
    },
    {
      id: "project-wa-bridal",
      title: "Bridal Atelier — Boutique & collections",
      description:
        "Bridal retail SPA — editorial narrative, collection grids with modals, testimonials, FAQ, motion.",
      longDescription:
        "Studio demo (WEDDING): trust-led experience for appointment-led boutiques. Impact: clearer offer and social proof before the first visit.",
      technologies: ["React", "Vite", "React Router", "Motion", "ESLint"],
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://bridal.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2959196/pexels-photo-2959196.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Collection grids with accessible modals",
        "Motion-driven sections and responsive imagery",
        "Build-time SEO for bridal retail",
      ],
      architecture: "Vite SPA with Motion.",
    },
    {
      id: "project-wa-fashion",
      title: "Fashion atelier & lookbook",
      description:
        "Fashion SPA — editorial story, bento layouts, lookbook, API-backed appointment booking.",
      longDescription:
        "Studio demo (FASHION): conversion-led path from hero to booking with availability. Impact: stronger positioning and fewer vague contact-only loops.",
      technologies: [
        "React",
        "Vite",
        "React Router",
        "Framer Motion",
        "ESLint",
      ],
      category: "fullstack",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://fashion.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/6476588/pexels-photo-6476588.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Multi-step appointment wizard with API-backed slots",
        "Lookbook, featured looks, bento blocks",
        "Framer Motion and responsive imagery",
      ],
      architecture:
        "Static-first Vite SPA with same-origin booking API on deploy.",
    },
    {
      id: "project-wa-photo",
      title: "Lumière Frames — Photography studio",
      description:
        "Photography site — booking flow, portfolio sets, testimonials, contact, SEO assets.",
      longDescription:
        "Studio demo: booking with double-booking prevention, gallery/portfolio layouts, testimonials, sitemap/robots. Impact: faster lead capture and stronger trust.",
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
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://photography.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Booking wizard with calendar export",
        "Portfolio sets, gallery, testimonials",
        "SEO sitemap/robots and cookie consent",
      ],
      architecture: "Vite SPA on subdomain; GitHub Actions and Nginx.",
    },
    {
      id: "project-wa-acai",
      title: "Tropical Açai Sydney — portfolio microsite",
      description:
        "Hospitality single-page site — hero, menu, gallery, reviews, map, CTAs; optional Firestore content.",
      longDescription:
        "Studio demo: tropical café concept with reviews carousel, Maps embed, JSON-LD, optional Firestore. Impact: credible F&B example with fast loads.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Firebase",
        "Firestore",
      ],
      category: "web",
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://tropicalacaisydney.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Responsive tropical UI with mobile sticky CTA",
        "Menu, gallery, reviews, Maps embed",
        "Optional Firestore CMS and structured data",
      ],
      architecture: "Static Vite + React; optional Firestore overrides.",
    },
    {
      id: "project-wa-homes",
      title: "Homes That Feel Like Home",
      description:
        "Real-estate SPA — listings, detail pages, booking requests, contact, admin bookings dashboard.",
      longDescription:
        "Studio demo: SEO-friendly listings and booking funnel with admin view; API, sitemap/robots, cookie consent.",
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
      category: "fullstack",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://homes-feel.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Listings and detail pages with booking availability",
        "Booking and contact flows with admin dashboard",
        "Same-origin API and SEO/consent patterns",
      ],
      architecture: "Vite React SPA with Node API for bookings.",
    },
    {
      id: "project-wa-flowline",
      title: "Flowline Plumbing Co. — Sydney",
      description:
        "Plumbing site with booking wizard, availability, photo upload, contact, admin dashboard, ICS export.",
      longDescription:
        "Studio demo: guided scheduling and centralised bookings for trades; API and SEO helpers.",
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
      category: "fullstack",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://flowline.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Booking wizard with availability and issue photo upload",
        "Admin dashboard with calendar export",
        "SEO files and consent hooks",
      ],
      architecture: "Vite SPA plus Node booking API.",
    },
    {
      id: "project-wa-cuore",
      title: "Cuore Ristorante — Sydney",
      description:
        "Italian restaurant site — visual menu, gallery, journal, reservations, staff admin.",
      longDescription:
        "Studio demo: Next.js dining experience with reservations and manageable content.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "date-fns",
      ],
      category: "fullstack",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://cuore.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Visual menu, gallery, and journal content",
        "Reservations with staff admin",
        "Motion-led layout for hospitality",
      ],
      architecture: "Next.js App Router, TypeScript, Tailwind.",
    },
    {
      id: "project-wa-makeup",
      title: "Lumière Atelier — Makeup studio",
      description:
        "Makeup studio SPA — services, portfolio, testimonials, eight-step booking wizard.",
      longDescription:
        "Studio demo: mobile-first beauty booking with SEO sitemap/robots.",
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
      category: "web",
      startDate: "2026-04-08",
      isActive: true,
      liveUrl: "https://makeup.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3762878/pexels-photo-3762878.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Booking wizard with live summary",
        "Service modal and mobile rails",
        "Sitemap/robots and cookie consent",
      ],
      architecture: "Vite SPA; Actions + Nginx deploy.",
    },
    {
      id: "project-wa-kals",
      title: "kal's ON CAHILL — Riverside café showcase",
      description:
        "Premium café SPA — Lenis, GSAP, Framer Motion, menu, reviews, booking CTA.",
      longDescription:
        "Studio demo: editorial hospitality with motion-rich storytelling.",
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
      category: "web",
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://kalsoncahill.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Lenis + GSAP + Framer Motion",
        "Menu, reviews, maps, booking patterns",
        "Config-driven content shape",
      ],
      architecture: "Static Vite with advanced motion stack.",
    },
    {
      id: "project-wa-wash",
      title: "Wash My Ride Kogarah — Car wash & café",
      description:
        "Car wash and café site — services, packages, loyalty, gallery, contact.",
      longDescription:
        "Studio demo: local high-intent automotive + hospitality patterns.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Lucide React",
      ],
      category: "web",
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://washmyride.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=1200",
      achievements: [
        "Service tiers and gallery/testimonials",
        "Maps and social patterns",
        "Build-time SEO and mobile-first layout",
      ],
      architecture: "Vite + React Router + Tailwind.",
    },
    {
      id: "project-wa-kogarah-auto",
      title: "Kogarah Automotive — Workshop microsite",
      description:
        "Workshop SPA — services, about, gallery, phone/WhatsApp CTAs, local SEO metadata.",
      longDescription:
        "Studio demo: trades trust layout with multi-page Router flow.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Lucide React",
      ],
      category: "web",
      startDate: "2026-04-07",
      isActive: true,
      liveUrl: "https://kogarahautomotive.web-architech.com.au",
      imageUrl:
        "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Multi-page flow with call and WhatsApp",
        "Local SEO meta and static build",
        "Gallery and service pages",
      ],
      architecture: "Vite SPA for automotive subdomain.",
    },
    {
      id: "project-ricky-portfolio",
      title: "Ricky's Portfolio",
      description:
        "Portfolio platform — projects, academics, skills, certificates, progress tracking.",
      longDescription:
        "Production educational platform: responsive, modular, REST-backed sections. Listed on web-architech.com.au/portfolio.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "REST APIs",
        "MongoDB",
      ],
      category: "fullstack",
      startDate: "2026-01-31",
      isActive: true,
      liveUrl: "https://rickychen930.cloud",
      imageUrl:
        "https://images.pexels.com/photos/5212342/pexels-photo-5212342.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      achievements: [
        "Project and certificate showcase",
        "Skill progress and organised sections",
        "SEO-aware layout for career readiness",
      ],
      architecture: "React SPA with Node/Express and MongoDB.",
    },
    {
      id: "project-2",
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
      category: "backend",
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
      id: "project-3",
      title: "Bottani",
      description:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time.",
      longDescription:
        "A smart agriculture app integrated with IoT devices to monitor soil parameters in real time. Enables automated responses based on environmental data, helping farmers maintain optimal soil conditions and improve crop productivity. Built during Apple Developer Academy using Swift, SwiftUI, and IoT integration.",
      technologies: ["Swift", "SwiftUI", "IoT", "Core Data", "Bluetooth"],
      category: "mobile",
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
      id: "project-4",
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
      category: "mobile",
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
      id: "project-5",
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
      category: "mobile",
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
      id: "project-6",
      title: "Phowto",
      description:
        "A photography tutorial app providing interactive tutorials and guides for photography enthusiasts.",
      longDescription:
        "A photography tutorial app developed during Apple Developer Academy. Provides interactive tutorials and guides for photography enthusiasts. Built with Swift and SwiftUI, featuring video tutorials, step-by-step guides, and community features.",
      technologies: ["Swift", "SwiftUI", "AVFoundation", "Video Processing"],
      category: "mobile",
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
      id: "project-7",
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
      category: "ai",
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
      id: "project-8",
      title: "L-emot",
      description:
        "A smart lamp controller built with Arduino and custom hardware for wireless lighting control.",
      longDescription:
        "A smart lamp controller built with Arduino and custom hardware. Enabled wireless control of lighting through embedded systems and software integration. Demonstrates practical IoT applications in home automation.",
      technologies: ["Arduino", "C++", "Bluetooth", "IoT", "Embedded Systems"],
      category: "other",
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
  learningSections: [],
  softSkills: [],
  stats: [],
  technicalSkills: [],
  testimonials: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export class ProfileService {
  private profile: ProfileModel | null = null;
  private cache: CacheEntry | null = null;
  private profileNotFoundError: Error | null = null; // Cache 404 errors to prevent repeated requests
  private isFetching: boolean = false; // Prevent concurrent requests
  private fetchPromise: Promise<ProfileModel> | null = null; // Deduplicate concurrent requests

  private async fetchWithRetry(
    url: string,
    retries: number = MAX_RETRIES,
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        if (
          text.trim().startsWith("<!DOCTYPE") ||
          text.trim().startsWith("<html")
        ) {
          throw new Error(
            `Server returned HTML instead of JSON. The backend server may not be running or the API endpoint is incorrect. URL: ${url}`,
          );
        }
        throw new Error(
          `Expected JSON but received ${contentType}. Response: ${text.substring(0, 100)}`,
        );
      }

      if (!response.ok) {
        // Handle 404 (Profile not found) - don't retry
        if (response.status === 404) {
          throw new Error("PROFILE_NOT_FOUND");
        }

        const errorText = await response.text();
        let errMsg = `Request failed (${response.status})`;
        try {
          const data = JSON.parse(errorText) as {
            message?: string;
            error?: string;
          };
          if (data?.message) errMsg = data.message;
          else if (data?.error) errMsg = data.error;
        } catch {
          if (errorText) errMsg = errorText.substring(0, 200);
        }
        throw new Error(errMsg);
      }

      return response;
    } catch (error) {
      // Don't retry on 404 errors or HTML responses
      if (
        error instanceof Error &&
        (error.message === "PROFILE_NOT_FOUND" ||
          error.message.includes("HTML instead of JSON"))
      ) {
        throw error;
      }

      // Retry for other errors
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return this.fetchWithRetry(url, retries - 1);
      }
      throw error;
    }
  }

  private isCacheValid(): boolean {
    if (!this.cache) {
      return false;
    }
    const now = Date.now();
    return now - this.cache.timestamp < CACHE_DURATION;
  }

  public async fetchProfile(): Promise<ProfileModel> {
    // Return cached data if valid
    if (this.isCacheValid() && this.cache) {
      return this.cache.data;
    }

    // Return in-memory profile if available
    if (this.profile) {
      return this.profile;
    }

    // If we've already determined the profile is not found, throw immediately
    // (prevents repeated 404 requests)
    if (this.profileNotFoundError) {
      throw this.profileNotFoundError;
    }

    // Deduplicate concurrent requests
    if (this.isFetching && this.fetchPromise) {
      return this.fetchPromise;
    }

    this.isFetching = true;
    this.fetchPromise = (async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const apiEndpoint = `${apiUrl}/api/profile`;

        const response = await this.fetchWithRetry(apiEndpoint);

        // Double check content type before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          await response.text(); // Consume response body
          throw new Error(
            `Invalid response format. Expected JSON but received ${contentType}. Make sure the backend server is running at ${apiUrl}`,
          );
        }

        const data: Profile = await response.json();

        let profilePayload = data;
        const supplementEmptyProjects =
          process.env.REACT_APP_SUPPLEMENT_EMPTY_PROJECTS !== "false";
        if (
          supplementEmptyProjects &&
          (!Array.isArray(profilePayload.projects) ||
            profilePayload.projects.length === 0)
        ) {
          console.warn(
            "[ProfileService] Profile from API has no projects — using bundled sample projects. " +
              "Run `npm run seed` in the backend to persist seed data, or set REACT_APP_SUPPLEMENT_EMPTY_PROJECTS=false to keep an empty list.",
          );
          profilePayload = {
            ...profilePayload,
            projects: FALLBACK_PROFILE.projects.map((p) => ({ ...p })),
          };
        }

        this.profile = ProfileModel.create(profilePayload);
        this.cache = {
          data: this.profile,
          timestamp: Date.now(),
        };
        // Clear 404 error cache on success
        this.profileNotFoundError = null;

        return this.profile;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch profile";

        // Only use fallback in development mode when backend is truly unavailable
        // In production, always require database connection
        const isDevelopment = process.env.NODE_ENV === "development";
        const isBackendUnavailable =
          (errorMessage.includes("HTML instead of JSON") ||
            errorMessage.includes("Invalid response format") ||
            errorMessage.includes("Failed to fetch") ||
            errorMessage.includes("NetworkError") ||
            errorMessage.includes("Network request failed") ||
            errorMessage.includes("fetch failed") ||
            errorMessage.includes("CORS") ||
            (error instanceof TypeError && error.message.includes("fetch"))) &&
          !errorMessage.includes("PROFILE_NOT_FOUND");

        // Only use fallback in development mode
        if (isBackendUnavailable && isDevelopment) {
          console.warn(
            "⚠️ Backend server unavailable, using fallback profile data (development mode only).\n" +
              "To enable full functionality with MongoDB Atlas, please:\n" +
              "1. Ensure MONGODB_URI is set in your .env file\n" +
              "2. Start the backend server: npm run server:watch\n" +
              "3. Seed the database: npm run seed\n" +
              `Backend URL: ${process.env.REACT_APP_API_URL || "http://localhost:4000"}`,
          );

          this.profile = ProfileModel.create(FALLBACK_PROFILE);
          this.cache = {
            data: this.profile,
            timestamp: Date.now(),
          };

          return this.profile;
        }

        // In production or when profile not found, cache the error and throw
        if (errorMessage === "PROFILE_NOT_FOUND") {
          const notFoundError = new Error(
            "Profile not found in MongoDB Atlas database. Please run 'npm run seed' to populate the database with your profile data.",
          );
          // Cache the 404 error to prevent repeated requests
          this.profileNotFoundError = notFoundError;
          throw notFoundError;
        }

        // In production, don't use fallback - require database connection
        if (!isDevelopment && isBackendUnavailable) {
          throw new Error(
            "Cannot connect to backend server. Please ensure the backend is running and connected to MongoDB Atlas.",
          );
        }

        throw new Error(errorMessage);
      } finally {
        this.isFetching = false;
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  public getProfile(): ProfileModel | null {
    return this.profile;
  }

  public clearCache(): void {
    this.profile = null;
    this.cache = null;
    this.profileNotFoundError = null; // Clear 404 error cache when clearing cache
  }

  public async updateContacts(
    contacts: Array<{
      id?: string;
      type: "email" | "phone" | "linkedin" | "github" | "website" | "other";
      value: string;
      label: string;
      isPrimary: boolean;
    }>,
  ): Promise<ProfileModel> {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const apiEndpoint = `${apiUrl}/api/profile/contacts`;

      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ contacts }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to update contacts",
        }));
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`,
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Invalid response format. Expected JSON but received ${contentType}`,
        );
      }

      const data: Profile = await response.json();

      // Update cached profile
      this.profile = ProfileModel.create(data);
      this.cache = {
        data: this.profile,
        timestamp: Date.now(),
      };

      return this.profile;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update contact information";
      throw new Error(errorMessage);
    }
  }
}

export const profileService = new ProfileService();
