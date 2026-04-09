/**
 * Placeholder profile for layout / visual QA. Not real CV data.
 * Enable with REACT_APP_DESIGN_DUMMY_PROFILE=true in .env.local
 *
 * Exported slices (stack, spoken languages, testimonials) are also merged into
 * dev fallback and optional API supplementation when those lists are empty.
 */

import type {
  Language,
  Profile,
  TechnicalSkill,
  Testimonial,
} from "@/types/domain";

const now = new Date().toISOString();

/** Technical stack for About “Stack & languages” and Home marquee (dummy). */
export const DUMMY_TECHNICAL_SKILLS: TechnicalSkill[] = [
  {
    id: "d-skill-ts",
    name: "TypeScript",
    category: "language",
    proficiency: "expert",
    yearsOfExperience: 6,
  },
  {
    id: "d-skill-js",
    name: "JavaScript",
    category: "language",
    proficiency: "advanced",
    yearsOfExperience: 7,
  },
  {
    id: "d-skill-py",
    name: "Python",
    category: "language",
    proficiency: "intermediate",
    yearsOfExperience: 3,
  },
  {
    id: "d-skill-react",
    name: "React",
    category: "framework",
    proficiency: "expert",
    yearsOfExperience: 5,
  },
  {
    id: "d-skill-node",
    name: "Node.js",
    category: "framework",
    proficiency: "advanced",
    yearsOfExperience: 4,
  },
  {
    id: "d-skill-next",
    name: "Next.js",
    category: "framework",
    proficiency: "advanced",
    yearsOfExperience: 3,
  },
  {
    id: "d-skill-pg",
    name: "PostgreSQL",
    category: "database",
    proficiency: "intermediate",
    yearsOfExperience: 3,
  },
  {
    id: "d-skill-mongo",
    name: "MongoDB",
    category: "database",
    proficiency: "intermediate",
  },
  {
    id: "d-skill-redis",
    name: "Redis",
    category: "database",
    proficiency: "intermediate",
    yearsOfExperience: 2,
  },
  {
    id: "d-skill-docker",
    name: "Docker",
    category: "tool",
    proficiency: "advanced",
    yearsOfExperience: 3,
  },
  {
    id: "d-skill-figma",
    name: "Figma",
    category: "tool",
    proficiency: "intermediate",
  },
  {
    id: "d-skill-git",
    name: "Git",
    category: "tool",
    proficiency: "expert",
    yearsOfExperience: 8,
  },
  {
    id: "d-skill-aws",
    name: "AWS",
    category: "cloud",
    proficiency: "intermediate",
    yearsOfExperience: 2,
  },
  {
    id: "d-skill-vercel",
    name: "Vercel",
    category: "cloud",
    proficiency: "intermediate",
    yearsOfExperience: 2,
  },
];

/** Human languages row under Capabilities (dummy). */
export const DUMMY_HUMAN_LANGUAGES: Language[] = [
  { id: "d-lang-1", name: "Indonesia", proficiency: "native" },
  { id: "d-lang-2", name: "English", proficiency: "professional" },
  { id: "d-lang-3", name: "日本語", proficiency: "basic" },
];

/** Home / testimonial cards (dummy). */
export const DUMMY_TESTIMONIALS: Testimonial[] = [
  {
    id: "d-test-1",
    author: "Sam Taylor",
    role: "Product lead",
    company: "Northwind Labs (dummy)",
    content:
      "“Clarity under ambiguity — production-ready prototypes, easy handoff.”",
    date: "2025-11-15",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: "d-test-2",
    author: "Jordan Lee",
    role: "Engineering manager",
    company: "Acme Digital (dummy)",
    content:
      "“Sharp UI detail without sacrificing performance — great on design-system work.”",
    date: "2025-08-01",
    avatarUrl: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: "d-test-3",
    author: "Riley Chen",
    role: "Designer",
    company: "Studio Orion (dummy)",
    content: "“Short quote for layout: wrapping, avatar, and metadata.”",
    date: "2024-12-20",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: "d-test-4",
    author: "Morgan Avery",
    role: "CTO",
    company: "Startup Labs (dummy)",
    content:
      "“Owned discovery through launch — structured collaboration, clear trade-offs, and real polish. I’d bring them back for any greenfield where design quality and speed both matter.”",
    date: "2025-01-10",
    avatarUrl: "https://i.pravatar.cc/120?img=68",
  },
];

function cloneSkills(): TechnicalSkill[] {
  return DUMMY_TECHNICAL_SKILLS.map((s) => ({ ...s }));
}

function cloneLanguages(): Language[] {
  return DUMMY_HUMAN_LANGUAGES.map((l) => ({ ...l }));
}

function cloneTestimonials(): Testimonial[] {
  return DUMMY_TESTIMONIALS.map((t) => ({ ...t }));
}

/** Full profile with every list-driven UI surface populated. */
export const VISUAL_DESIGN_DUMMY_PROFILE: Profile = {
  id: "visual-design-dummy",
  name: "Alex Morgan (dummy)",
  title: "Product engineer · UI systems · TypeScript",
  location: "Jakarta (dummy)",
  bio: "Ini adalah bio dummy dua paragraf untuk melihat tipografi dan jarak antar blok teks di halaman About.\n\nParagraf kedua menjelaskan bahwa semua angka, nama perusahaan, dan kutipan di profil ini fiktif — hanya untuk preview desain.",
  heroTagline:
    "Dummy data: semua section terisi agar layout dan komponen terlihat utuh.",
  openToOpportunities: true,
  avatarUrl:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&auto=format",
  contacts: [
    {
      id: "d-contact-email",
      type: "email",
      value: "hello@example.test",
      label: "Email",
      isPrimary: true,
    },
    {
      id: "d-contact-li",
      type: "linkedin",
      value: "https://www.linkedin.com",
      label: "LinkedIn",
      isPrimary: false,
    },
    {
      id: "d-contact-gh",
      type: "github",
      value: "https://github.com",
      label: "GitHub",
      isPrimary: false,
    },
  ],
  experiences: [
    {
      id: "d-exp-1",
      company: "Contoh Studio",
      position: "Lead frontend (dummy)",
      location: "Remote",
      startDate: "2023-01-01",
      isCurrent: true,
      description:
        "Ringkasan peran dummy: desain sistem komponen, aksesibilitas, dan kolaborasi dengan produk.",
      achievements: [
        "Mengurangi waktu build storybook dummy ~20% (angka fiktif).",
        "Menyelaraskan token warna dan tipografi di seluruh aplikasi.",
      ],
      technologies: ["React", "TypeScript", "Figma", "Vite"],
    },
    {
      id: "d-exp-2",
      company: "Previous Co (dummy)",
      position: "Software engineer",
      location: "Bandung",
      startDate: "2020-06-01",
      endDate: "2022-12-31",
      isCurrent: false,
      description:
        "Pengembangan fitur API dan dashboard internal — teks placeholder.",
      achievements: [
        "Migrasi modul pembayaran (dummy).",
        "Peningkatan skor Lighthouse (fiktif).",
      ],
      technologies: ["Node.js", "PostgreSQL", "React"],
    },
  ],
  projects: [
    {
      id: "d-proj-1",
      title: "Lift — app preview (dummy)",
      description:
        "Kartu proyek dengan gambar lokal untuk memastikan rasio dan crop thumbnail.",
      longDescription:
        "Detail panjang dummy: alur pengguna, stack, dan hasil (fiktif).",
      technologies: ["React", "TypeScript", "Vite"],
      category: "web",
      startDate: "2025-01-01",
      isActive: true,
      liveUrl: "https://example.com",
      imageUrl: "/liftapp.png",
      achievements: [
        "Hero responsif",
        "Dark mode",
        "Animasi halus (placeholder)",
      ],
    },
    {
      id: "d-proj-2",
      title: "Commerce shell (dummy)",
      description: "Keranjang dan checkout — data fiktif untuk grid proyek.",
      technologies: ["Next.js", "Stripe", "Tailwind CSS"],
      category: "fullstack",
      startDate: "2024-03-01",
      isActive: true,
      imageUrl: "https://picsum.photos/seed/dummyproj2/800/600",
      achievements: ["SSR untuk SEO", "Integrasi pembayaran (dummy)"],
    },
    {
      id: "d-proj-3",
      title: "Mobile habits (dummy)",
      description:
        "Aplikasi kebiasaan harian — ilustrasi kartu kategori mobile.",
      technologies: ["React Native", "Firebase"],
      category: "mobile",
      startDate: "2023-08-01",
      isActive: true,
      imageUrl: "https://picsum.photos/seed/dummyproj3/800/600",
      achievements: ["Sinkron cloud", "Notifikasi lokal (placeholder)"],
    },
  ],
  stats: [
    {
      id: "d-stat-1",
      label: "Pengguna aktif",
      value: 48,
      unit: "k",
      description: "Angka dummy untuk grid statistik.",
    },
    {
      id: "d-stat-2",
      label: "Waktu muat",
      value: 1.2,
      unit: "s",
      description: "Metrik fiktif.",
    },
    {
      id: "d-stat-3",
      label: "Coverage",
      value: 92,
      unit: "%",
    },
    {
      id: "d-stat-4",
      label: "Rilis",
      value: 120,
      unit: "+",
      description: "Jumlah rilis dummy.",
    },
  ],
  technicalSkills: cloneSkills(),
  softSkills: [
    { id: "d-soft-1", name: "Facilitasi workshop", category: "leadership" },
    {
      id: "d-soft-2",
      name: "Presentasi stakeholder",
      category: "communication",
    },
    { id: "d-soft-3", name: "Debug sistematis", category: "problem-solving" },
    { id: "d-soft-4", name: "Pair programming", category: "collaboration" },
    { id: "d-soft-5", name: "Prioritas berubah", category: "adaptability" },
    { id: "d-soft-6", name: "Dokumentasi", category: "other" },
  ],
  testimonials: cloneTestimonials(),
  academics: [
    {
      id: "d-acad-1",
      institution: "Universitas Contoh",
      degree: "S.Kom",
      field: "Ilmu komputer (dummy)",
      startDate: "2016-09-01",
      endDate: "2020-07-01",
      description: "Fokus pada HCI dan pemrograman web — teks placeholder.",
    },
    {
      id: "d-acad-2",
      institution: "Open Learning (dummy)",
      degree: "Micro-credential",
      field: "Aksesibilitas web",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
    },
  ],
  certifications: [
    {
      id: "d-cert-1",
      name: "Certified Placeholder Professional",
      issuer: "Example Institute",
      issueDate: "2024-03-01",
      expiryDate: "2027-03-01",
      credentialId: "DUMMY-001",
      credentialUrl: "https://example.com/credential",
    },
    {
      id: "d-cert-2",
      name: "Cloud fundamentals (sample)",
      issuer: "Training Co",
      issueDate: "2023-01-15",
    },
  ],
  honors: [
    {
      id: "d-honor-1",
      title: "Hackathon finalist (dummy)",
      issuer: "Tech Week",
      date: "2024-09-01",
      description: "Tim 3 orang, prototipe 24 jam — deskripsi fiktif.",
      url: "https://example.com",
    },
    {
      id: "d-honor-2",
      title: "Speaker — UI patterns",
      issuer: "Meetup Jakarta",
      date: "2023-05-20",
    },
  ],
  languages: cloneLanguages(),
  learningSections: [
    {
      id: "d-learn-react",
      title: "React (dummy section)",
      slug: "react",
      description: "Dua topik contoh dengan thumbnail gambar dan tanpa gambar.",
      order: 1,
      published: true,
      items: [
        {
          id: "d-topic-hooks",
          title: "Hooks & state patterns",
          description: "Ringkasan dummy untuk kartu topik di daftar.",
          order: 1,
          imageUrl: "https://picsum.photos/seed/learndummy1/600/400",
          content:
            "Ini isi artikel dummy singkat. Tambahkan paragraf lain di CMS atau seed sungguhan nanti.\n\n- Poin pertama\n- Poin kedua",
          codeExample: "const [x, setX] = useState(0);",
          codeLanguage: "tsx",
        },
        {
          id: "d-topic-a11y",
          title: "Aksesibilitas form",
          description: "Tanpa imageUrl — tema gradient dari slug section.",
          order: 2,
          content: "Topik kedua memakai ikon default bila tidak ada gambar.",
        },
      ],
    },
    {
      id: "d-learn-dsa",
      title: "Competitive programming (dummy)",
      slug: "competitive-programming",
      description: "Section kedua untuk memeriksa grid kurikulum.",
      order: 2,
      published: true,
      items: [
        {
          id: "d-topic-graph",
          title: "Graf — BFS dummy",
          description: "Thumbnail + cuplikan teks.",
          order: 1,
          imageUrl: "https://picsum.photos/seed/learndummy2/600/400",
          content:
            "**1. Learning flow:**\n\nBaca soal, identifikasi model graf.\n\n**2. Material:**\n\nAdjacency list dan queue.\n\n**3. Explanation:**\n\nBFS menelusuri level per level.",
          codeExample:
            "from collections import deque\n\ndef bfs(g, s):\n    q = deque([s])",
          codeLanguage: "python",
        },
      ],
    },
  ],
  createdAt: now,
  updatedAt: now,
};
