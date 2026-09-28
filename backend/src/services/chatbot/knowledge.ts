/**
 * Chatbot knowledge — keyword intents answered locally from profile data.
 * Mirrors the Web Architech "Archie" pattern: FAQ first, AI only as fallback.
 */

/** Minimal profile shape the chatbot needs (works with DB docs and seed data) */
export interface ChatProfile {
  name: string;
  title: string;
  location: string;
  bio: string;
  openToOpportunities?: boolean;
  contacts: ReadonlyArray<{ type: string; value: string; label?: string }>;
  experiences: ReadonlyArray<{
    company: string;
    position: string;
    location: string;
    startDate: string | Date;
    endDate?: string | Date;
    isCurrent: boolean;
    description: string;
    technologies: readonly string[];
  }>;
  projects: ReadonlyArray<{
    id?: string;
    title: string;
    description: string;
    technologies: readonly string[];
    category: string;
    liveUrl?: string;
    isActive?: boolean;
  }>;
  technicalSkills: ReadonlyArray<{
    name: string;
    category: string;
    proficiency: string;
  }>;
  academics: ReadonlyArray<{
    institution: string;
    degree: string;
    field: string;
    endDate?: string | Date;
  }>;
}

export interface LocalAnswer {
  intent: string;
  reply: string;
  chips: string[];
  escalate?: boolean;
}

interface Intent {
  id: string;
  /** Phrases matched on word boundaries; longer phrases weigh more */
  patterns: string[];
  answer: (p: ChatProfile) => Omit<LocalAnswer, "intent">;
}

export const STARTER_CHIPS = [
  "What does Ricky build?",
  "Show me recent projects",
  "Is he open to work?",
  "How do I contact him?",
];

export const FALLBACK_REPLY =
  "Good question — I don't have that one in my field notes yet. You can browse /projects, read the /resume, or reach Ricky directly via /#contact.";

export const FALLBACK_CHIPS = [
  "Show me recent projects",
  "How do I contact him?",
];

const firstName = (p: ChatProfile) => p.name.split(" ")[0] || p.name;
const contact = (p: ChatProfile, type: string) =>
  p.contacts.find((c) => c.type === type)?.value;
const currentRoles = (p: ChatProfile) =>
  p.experiences.filter((e) => e.isCurrent);
const list = (items: string[]) =>
  items.length <= 1
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const skillsBy = (p: ChatProfile, cats: string[], limit = 6) =>
  p.technicalSkills
    .filter((s) => cats.includes(s.category))
    .sort((a, b) => rank(b.proficiency) - rank(a.proficiency))
    .slice(0, limit)
    .map((s) => s.name);

const rank = (level: string) =>
  ({ expert: 4, advanced: 3, intermediate: 2, beginner: 1 })[level] ?? 0;

const INTENTS: Intent[] = [
  {
    id: "greeting",
    patterns: ["hi", "hello", "hey", "g'day", "gday", "good morning", "halo"],
    answer: (p) => ({
      reply: `G'day! I'm Kobi, ${firstName(p)}'s quokka guide. Ask me about his work, skills, experience or how to get in touch.`,
      chips: STARTER_CHIPS,
    }),
  },
  {
    id: "mascot",
    patterns: [
      "who are you",
      "are you a bot",
      "are you ai",
      "your name",
      "quokka",
      "kobi",
    ],
    answer: (p) => ({
      reply: `I'm Kobi — a quokka from Rottnest Island and the site's assistant. I answer from ${firstName(p)}'s portfolio notes, so for anything binding it's best to message him directly.`,
      chips: ["What does Ricky build?", "How do I contact him?"],
    }),
  },
  {
    id: "about",
    patterns: [
      "about",
      "who is",
      "tell me about",
      "background",
      "introduce",
      "summary",
    ],
    answer: (p) => ({
      reply: `${p.name} is a ${p.title.split("·")[0].trim()} based in ${p.location}. ${p.bio.split("\n")[0]}`,
      chips: ["What's his tech stack?", "Where has he worked?"],
    }),
  },
  {
    id: "services",
    patterns: [
      "build",
      "builds",
      "what does he do",
      "services",
      "offer",
      "specialise",
      "specialize",
      "what can he",
      "focus",
    ],
    answer: (p) => ({
      reply: `${firstName(p)} builds end-to-end products: React frontends, Node/Express APIs and data models, AI features like chatbots and summarisers, and mobile apps — from discovery through deployment. Selected works are at /projects.`,
      chips: [
        "Show me recent projects",
        "What's his tech stack?",
        "Does he do AI work?",
      ],
    }),
  },
  {
    id: "skills",
    patterns: [
      "skills",
      "stack",
      "tech stack",
      "technologies",
      "languages",
      "frameworks",
      "tools",
      "react",
      "node",
      "typescript",
      "python",
    ],
    answer: (p) => {
      const langs = skillsBy(p, ["language"], 5);
      const fw = skillsBy(p, ["framework"], 5);
      const data = skillsBy(p, ["database", "cloud"], 5);
      return {
        reply: `Core materials: ${list(langs)}. Frameworks: ${list(fw)}. Data & cloud: ${list(data)}. The full schedule is in the Materials section (/#stack).`,
        chips: ["Show me recent projects", "Does he do AI work?"],
      };
    },
  },
  {
    id: "ai",
    patterns: [
      "ai",
      "machine learning",
      "llm",
      "chatbot",
      "artificial intelligence",
      "ml",
      "gpt",
      "rag",
    ],
    answer: (p) => {
      const ai = p.projects
        .filter((x) => x.category === "ai")
        .map((x) => x.title);
      return {
        reply: `Yes — AI is a big part of the practice: LLM features, chatbots, summarisers and retrieval pipelines, plus an MSc in AI at UTS.${ai.length ? ` AI projects include ${list(ai.slice(0, 3))}.` : ""} See /projects for details.`,
        chips: ["Show me recent projects", "Is he open to work?"],
      };
    },
  },
  {
    id: "projects",
    patterns: [
      "projects",
      "portfolio",
      "work samples",
      "case study",
      "case studies",
      "built",
      "recent work",
      "examples",
    ],
    answer: (p) => {
      const top = p.projects.slice(0, 4).map((x) => x.title);
      return {
        reply: `${p.projects.length} works so far. Recent highlights: ${list(top)}. The full index — with plates and case studies — is at /projects.`,
        chips: ["Tell me about Web Architech", "What's his tech stack?"],
      };
    },
  },
  {
    id: "experience",
    patterns: [
      "experience",
      "worked",
      "work history",
      "jobs",
      "career",
      "employer",
      "companies",
      "current role",
      "currently",
    ],
    answer: (p) => {
      const now = currentRoles(p).map((e) => `${e.position} at ${e.company}`);
      const past = p.experiences
        .filter((e) => !e.isCurrent)
        .slice(0, 3)
        .map((e) => e.company);
      return {
        reply: `${now.length ? `Currently: ${list(now)}. ` : ""}${past.length ? `Previously: ${list(past)}. ` : ""}The full chronology is at /#work.`,
        chips: ["Where did he study?", "Is he open to work?"],
      };
    },
  },
  {
    id: "web_architech",
    patterns: [
      "web architech",
      "architech",
      "studio",
      "agency",
      "freelance",
      "business",
    ],
    answer: (p) => ({
      reply: `${firstName(p)} founded Web Architech in Sydney — a studio that takes clients from discovery through deployment: marketing sites, portals and automation. He's open to freelance commissions; start at /#contact.`,
      chips: ["How do I contact him?", "Show me recent projects"],
    }),
  },
  {
    id: "education",
    patterns: [
      "study",
      "studied",
      "education",
      "degree",
      "university",
      "uni",
      "masters",
      "master",
      "uts",
    ],
    answer: (p) => ({
      reply: `Education: ${list(p.academics.map((a) => `${a.degree} — ${a.institution}`))}.`,
      chips: ["Where has he worked?", "Does he do AI work?"],
    }),
  },
  {
    id: "availability",
    patterns: [
      "hire",
      "hiring",
      "available",
      "availability",
      "open to work",
      "job",
      "role",
      "opportunity",
      "recruit",
      "freelance work",
    ],
    answer: (p) => ({
      reply:
        p.openToOpportunities === false
          ? `${firstName(p)} isn't actively looking right now, but he's always happy to hear about interesting work — reach out via /#contact.`
          : `Yes — ${firstName(p)} is open to fullstack and AI engineering roles, plus freelance commissions, in ${p.location} or remote. The quickest path is /#contact.`,
      chips: ["How do I contact him?", "Can I see his resume?"],
      escalate: false,
    }),
  },
  {
    id: "contact",
    patterns: [
      "contact",
      "email",
      "reach",
      "get in touch",
      "phone",
      "call",
      "linkedin",
      "message him",
      "talk to ricky",
      "speak to",
    ],
    answer: (p) => {
      const email = contact(p, "email");
      const linkedin = contact(p, "linkedin");
      return {
        reply: `${email ? `Email ${email}` : "Use the form at /#contact"}${linkedin ? `, or connect on LinkedIn (${linkedin})` : ""}. You can also leave a message at /#contact and he'll reply personally.`,
        chips: ["Can I see his resume?", "Is he open to work?"],
      };
    },
  },
  {
    id: "resume",
    patterns: ["resume", "résumé", "cv", "curriculum"],
    answer: () => ({
      reply: "The résumé is at /resume — it prints cleanly to PDF from there.",
      chips: ["Where has he worked?", "How do I contact him?"],
    }),
  },
  {
    id: "location",
    patterns: [
      "where",
      "location",
      "based",
      "sydney",
      "australia",
      "timezone",
      "time zone",
    ],
    answer: (p) => ({
      reply: `Based in ${p.location} (AEST/AEDT) and happy to work remotely across time zones.`,
      chips: ["Is he open to work?", "How do I contact him?"],
    }),
  },
  {
    id: "australia",
    patterns: [
      "uluru",
      "kangaroo",
      "koala",
      "animals",
      "flora",
      "fauna",
      "landmark",
      "images",
      "photos",
    ],
    answer: () => ({
      reply:
        "The site's visuals are an atlas of Australia — landmarks, flora and fauna. Scroll to the Field Atlas (/#atlas) for the species.",
      chips: ["What does Ricky build?", "Show me recent projects"],
    }),
  },
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const COMPILED = INTENTS.map((intent) => ({
  intent,
  tests: intent.patterns.map((phrase) => ({
    re: new RegExp(
      `(^|[^\\p{L}\\p{N}])${escape(phrase)}($|[^\\p{L}\\p{N}])`,
      "iu",
    ),
    weight: phrase.split(/\s+/).length + phrase.length / 20,
  })),
}));

/** Also match a project by name, e.g. "tell me about DailyMate" */
const matchProject = (p: ChatProfile, text: string): LocalAnswer | null => {
  const lower = text.toLowerCase();
  const hit = p.projects.find(
    (x) => x.title.length > 3 && lower.includes(x.title.toLowerCase()),
  );
  if (!hit) return null;
  const path = hit.id ? `/projects/${hit.id}` : "/projects";
  return {
    intent: "project_detail",
    reply: `${hit.title} — ${hit.description} Built with ${list(hit.technologies.slice(0, 4))}. Case study: ${path}${hit.liveUrl ? ` · live: ${hit.liveUrl}` : ""}`,
    chips: ["Show me recent projects", "What's his tech stack?"],
  };
};

export const matchLocal = (
  profile: ChatProfile,
  message: string,
): LocalAnswer | null => {
  const project = matchProject(profile, message);
  if (project) return project;

  let best: { intent: Intent; score: number } | null = null;
  for (const { intent, tests } of COMPILED) {
    const score = tests.reduce(
      (sum, t) => (t.re.test(message) ? sum + t.weight : sum),
      0,
    );
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  // Greetings only win when the message is short ("hi", "hey there")
  if (best?.intent.id === "greeting" && message.split(/\s+/).length > 4) {
    return null;
  }
  return best
    ? { intent: best.intent.id, ...best.intent.answer(profile) }
    : null;
};

/** Compact fact sheet for the AI fallback system prompt */
export const buildFactSheet = (p: ChatProfile): string => {
  const lines = [
    `Name: ${p.name}`,
    `Title: ${p.title}`,
    `Location: ${p.location}`,
    `Open to work: ${p.openToOpportunities === false ? "not actively" : "yes"}`,
    `Bio: ${p.bio.replace(/\s+/g, " ")}`,
    `Experience: ${p.experiences
      .map(
        (e) =>
          `${e.position} @ ${e.company} (${e.isCurrent ? "current" : "past"}; ${e.technologies.slice(0, 5).join(", ")})`,
      )
      .join(" | ")}`,
    `Education: ${p.academics.map((a) => `${a.degree}, ${a.institution}`).join(" | ")}`,
    `Skills: ${p.technicalSkills.map((s) => `${s.name} (${s.proficiency})`).join(", ")}`,
    `Projects: ${p.projects
      .slice(0, 16)
      .map((x) => `${x.title} [${x.category}] — ${x.description.slice(0, 140)}`)
      .join(" | ")}`,
    `Contact: email ${contact(p, "email") ?? "via /#contact"}; LinkedIn ${contact(p, "linkedin") ?? "n/a"}`,
  ];
  return lines.join("\n");
};
