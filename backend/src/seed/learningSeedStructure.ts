/**
 * Learning Seed Structure
 * ─────────────────────────────────────────────────────────────────────────────
 * Struktur seed dirancang agar:
 * 1. Penampilan: konsisten (section → topic → 8 bagian), mudah di-render UI
 * 2. Penyampaian pesan: urutan jelas (flow → material → penjelasan → aplikasi → implementasi → logic → contoh → tambahan)
 *
 * Konvensi penulisan:
 * - Section description: 1–2 kalimat untuk kartu; jelas & actionable
 * - Topic id: kebab-case, unik global (untuk URL stabil)
 * - Topic description: satu baris, fokus outcome ("Apa yang didapat pembaca")
 * - Learning flow: 4–6 langkah bernomor; satu kalimat per langkah
 * - Material/Explanation: paragraf singkat atau bullet; gunakan **bold** dan `code` untuk istilah
 * - Example: Problem dan Solution dipisah jelas (Problem: ... Solution: ...)
 */

/** Label untuk 8 bagian konten — harus sama dengan frontend SECTION_LABELS */
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
 * Konten per topik dalam bentuk terstruktur.
 * Diserialisasi ke string **1. Learning flow:** ... **8. Additional information:** untuk UI yang ada.
 */
export interface TopicContentBlocks {
  /** Langkah belajar (4–6 item); tiap item satu kalimat. */
  learningFlow: string[];
  /** Opsional: paragraf tambahan di bawah langkah (e.g. "Your first step:", "Prerequisites:"). */
  learningFlowIntro?: string;
  /** Konsep utama: definisi, notasi, rumus. Boleh paragraf atau bullet. */
  material: string;
  /** Penjelasan "mengapa" dan cara baca. */
  explanation: string;
  /** Kapan dipakai: use case, skenario. */
  application: string;
  /** Langkah implementasi (bernomor atau bullet). */
  howToImplement: string;
  /** Cara kerja kode / algoritma (bisa bullet). */
  logicAndCode: string;
  /** Problem: ... Solution: ... (atau format serupa). */
  example: string;
  /** Tips, link, common mistakes, interview tip. */
  additionalInfo: string;
}

/**
 * Satu topik dalam authoring format (sebelum diserialisasi).
 */
export interface TopicConfig {
  id: string;
  title: string;
  /** Satu baris untuk kartu & meta; fokus outcome. */
  description: string;
  order: number;
  /** Key ke image map (lihat learningSeed.ts). */
  imageKey: string;
  contentBlocks: TopicContentBlocks;
  codeExample?: string;
  codeLanguage?: string;
}

/**
 * Satu section dalam authoring format.
 */
export interface SectionConfig {
  title: string;
  slug: string;
  /** 1–2 kalimat untuk kartu section; jelas & actionable. */
  description: string;
  order: number;
  published: boolean;
  topics: TopicConfig[];
}

/**
 * Mengubah konten terstruktur menjadi string 8-bagian yang dipahami UI.
 * Format: **1. Learning flow:**\n\n(body)\n\n**2. Material:**\n\n(body) ...
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
    `**2. ${CONTENT_SECTION_LABELS[2]}:**\n\n${blocks.material.trim()}`,
  );
  parts.push(
    `**3. ${CONTENT_SECTION_LABELS[3]}:**\n\n${blocks.explanation.trim()}`,
  );
  parts.push(
    `**4. ${CONTENT_SECTION_LABELS[4]}:**\n\n${blocks.application.trim()}`,
  );
  parts.push(
    `**5. ${CONTENT_SECTION_LABELS[5]}:**\n\n${blocks.howToImplement.trim()}`,
  );
  parts.push(
    `**6. ${CONTENT_SECTION_LABELS[6]}:**\n\n${blocks.logicAndCode.trim()}`,
  );
  parts.push(
    `**7. ${CONTENT_SECTION_LABELS[7]}:**\n\n${blocks.example.trim()}`,
  );
  parts.push(
    `**8. ${CONTENT_SECTION_LABELS[8]}:**\n\n${blocks.additionalInfo.trim()}`,
  );

  return parts.join("\n\n");
}

/**
 * Mengubah SectionConfig[] + imageMap menjadi array learningSections
 * yang sesuai dengan schema backend (content = string, items dengan id/title/description/order/content/codeExample/codeLanguage/imageUrl).
 * Sections dan items diurutkan by order. Jika imageMap[t.imageKey] tidak ada, imageUrl = undefined (UI pakai gradient fallback).
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

/** Slug dan topic id harus kebab-case (huruf kecil, angka, strip) untuk URL konsisten. */
const KEBAB_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Validasi konfigurasi seed: slug dan id tidak kosong dan kebab-case; setiap imageKey ada di imageMap.
 * Dipanggil saat build/seed agar typo atau key yang hilang ketahuan cepat.
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
