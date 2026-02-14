/**
 * Learning Seed Structure
 * ─────────────────────────────────────────────────────────────────────────────
 * The seed structure is designed so that:
 * 1. Presentation: consistent (section → topic → 8 parts), easy to render in the UI
 * 2. Message flow: clear order (flow → material → explanation → application → implementation → logic → example → additional)
 *
 * Writing conventions:
 * - Section description: 1–2 sentences for the card; clear & actionable
 * - Topic id: kebab-case, globally unique (for stable URLs)
 * - Topic description: one line, outcome-focused ("What the reader will get")
 * - Learning flow: 4–6 numbered steps; one sentence per step
 * - learningFlowIntro (optional): "Your first step", "Prerequisites", "By the end" — strongly recommended for the first topic of each section
 * - Material/Explanation: short paragraph or bullets; use **bold** and `code` for terms; clear structure (when to use what)
 * - Example: Problem and Solution clearly separated (Problem: ... Solution: ...)
 */

/** Labels for the 8 content parts — must match frontend SECTION_LABELS */
export const CONTENT_SECTION_LABELS = {
  1: "Learning flow",
  2: "Material",
  3: "Explanation",
  4: "Application",
  5: "How to implement",
  6: "Logic & how the code works",
  7: "Example problem & solution",
  8: "Additional information",
} as const;

/**
 * Content per topic in structured form.
 * Serialized to string **1. Learning flow:** ... **8. Additional information:** for the existing UI.
 */
export interface TopicContentBlocks {
  /** Learning steps (4–6 items); one sentence per item. */
  learningFlow: string[];
  /** Optional: extra paragraph below steps (e.g. "Your first step:", "Prerequisites:"). */
  learningFlowIntro?: string;
  /** Core concepts: definitions, notation, formulas. Paragraph or bullets. */
  material: string;
  /** Explanation of "why" and how to read. */
  explanation: string;
  /** When to use: use case, scenario. */
  application: string;
  /** Implementation steps (numbered or bullet). */
  howToImplement: string;
  /** How the code/algorithm works (can be bullets). */
  logicAndCode: string;
  /** Problem: ... Solution: ... (or similar format). */
  example: string;
  /** Tips, links, common mistakes, interview tip. */
  additionalInfo: string;
}

/**
 * A single topic in authoring format (before serialization).
 */
export interface TopicConfig {
  id: string;
  title: string;
  /** One line for card & meta; outcome-focused. */
  description: string;
  order: number;
  /** Key into image map (see learningSeed.ts). */
  imageKey: string;
  contentBlocks: TopicContentBlocks;
  codeExample?: string;
  codeLanguage?: string;
}

/**
 * A single section in authoring format.
 */
export interface SectionConfig {
  title: string;
  slug: string;
  /** 1–2 sentences for the section card; clear & actionable. */
  description: string;
  order: number;
  published: boolean;
  topics: TopicConfig[];
}

/**
 * Ensures "Problem:" and "Solution:" are separated by newlines so the UI can show
 * Soal and Pembahasan in separate boxes. Normalizes "Solution (C++):" etc. to "Solution:".
 */
function normalizeExampleBlock(example: string): string {
  const t = example.trim();
  return t.replace(/\s+Solution\s*(\([^)]*\))?\s*:\s*/gi, "\n\nSolution: ");
}

/**
 * Inserts paragraph breaks before bold subheadings ( " **" → "\n\n**" ) so dense
 * blocks render with clear paragraphs in the UI. Preserves existing newlines.
 */
function ensureParagraphBreaks(text: string): string {
  return text
    .trim()
    .replace(/\s+\*\*/g, "\n\n**")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Converts structured content into an 8-part string understood by the UI.
 * Format: **1. Learning flow:**\n\n(body)\n\n**2. Material:**\n\n(body) ...
 * Example block is normalized so Problem/Solution split correctly; long blocks get paragraph breaks.
 */
export function serializeContentBlocks(blocks: TopicContentBlocks): string {
  const parts: string[] = [];

  const flowSteps = blocks.learningFlow
    .map((step, i) => `(${i + 1}) ${step}`)
    .join(" ");
  const flowBody = blocks.learningFlowIntro
    ? `${flowSteps}\n\n${blocks.learningFlowIntro}`
    : flowSteps;
  parts.push(`**1. ${CONTENT_SECTION_LABELS[1]}:**\n\n${flowBody}`);

  parts.push(
    `**2. ${CONTENT_SECTION_LABELS[2]}:**\n\n${ensureParagraphBreaks(blocks.material)}`,
  );
  parts.push(
    `**3. ${CONTENT_SECTION_LABELS[3]}:**\n\n${ensureParagraphBreaks(blocks.explanation)}`,
  );
  parts.push(
    `**4. ${CONTENT_SECTION_LABELS[4]}:**\n\n${ensureParagraphBreaks(blocks.application)}`,
  );
  parts.push(
    `**5. ${CONTENT_SECTION_LABELS[5]}:**\n\n${ensureParagraphBreaks(blocks.howToImplement)}`,
  );
  parts.push(
    `**6. ${CONTENT_SECTION_LABELS[6]}:**\n\n${ensureParagraphBreaks(blocks.logicAndCode)}`,
  );
  parts.push(
    `**7. ${CONTENT_SECTION_LABELS[7]}:**\n\n${normalizeExampleBlock(blocks.example)}`,
  );
  parts.push(
    `**8. ${CONTENT_SECTION_LABELS[8]}:**\n\n${ensureParagraphBreaks(blocks.additionalInfo)}`,
  );

  return parts.join("\n\n");
}

/**
 * Converts SectionConfig[] + imageMap into a learningSections array
 * that matches the backend schema (content = string, items with id/title/description/order/content/codeExample/codeLanguage/imageUrl).
 * Sections and items are sorted by order. If imageMap[t.imageKey] is missing, imageUrl = undefined (UI uses gradient fallback).
 */
export function buildLearningSections(
  sections: SectionConfig[],
  imageMap: Record<string, string>,
): Array<{
  title: string;
  slug: string;
  description: string;
  order: number;
  published: boolean;
  items: Array<{
    id: string;
    title: string;
    description: string;
    order: number;
    content: string;
    imageUrl?: string;
    codeExample?: string;
    codeLanguage?: string;
  }>;
}> {
  const mapped = sections.map((sec) => ({
    title: sec.title,
    slug: sec.slug,
    description: sec.description,
    order: sec.order,
    published: sec.published,
    items: sec.topics
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        order: t.order,
        content: serializeContentBlocks(t.contentBlocks),
        imageUrl: imageMap[t.imageKey],
        codeExample: t.codeExample,
        codeLanguage: t.codeLanguage,
      })),
  }));
  return mapped.sort((a, b) => a.order - b.order);
}

/** Section slug and topic id must be kebab-case (lowercase, numbers, hyphens) for consistent URLs. */
const KEBAB_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Validates seed config: slug and id are non-empty and kebab-case; every imageKey exists in imageMap.
 * Called at build/seed so typos or missing keys are caught early.
 */
export function validateLearningSeed(
  sections: SectionConfig[],
  imageMap: Record<string, string>,
): void {
  const errors: string[] = [];
  sections.forEach((sec, sIdx) => {
    if (!sec.slug?.trim()) {
      errors.push(`Section[${sIdx}] "${sec.title}" has empty slug`);
    } else if (!KEBAB_REGEX.test(sec.slug.trim())) {
      errors.push(
        `Section[${sIdx}] "${sec.title}" slug "${sec.slug}" must be kebab-case (e.g. how-to-learn)`,
      );
    }
    sec.topics.forEach((t, tIdx) => {
      if (!t.id?.trim()) {
        errors.push(
          `Section "${sec.title}" topic[${tIdx}] "${t.title}" has empty id`,
        );
      } else if (!KEBAB_REGEX.test(t.id.trim())) {
        errors.push(
          `Section "${sec.title}" topic "${t.title}" id "${t.id}" must be kebab-case (e.g. event-loop-and-async)`,
        );
      }
      if (!(t.imageKey in imageMap)) {
        errors.push(
          `Section "${sec.title}" topic "${t.title}" imageKey "${t.imageKey}" not in imageMap. Keys: ${Object.keys(imageMap).join(", ")}`,
        );
      }
    });
  });
  if (errors.length > 0) {
    throw new Error(`Learning seed validation failed:\n${errors.join("\n")}`);
  }
}
