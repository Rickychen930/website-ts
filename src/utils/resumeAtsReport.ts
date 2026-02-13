/**
 * ATS Readability Report – menilai apakah resume dapat dibaca sistem (ATS) secara otomatis.
 * Menghasilkan skor, checklist, dan preview teks seperti yang diekstrak ATS dari PDF.
 */

import type { ResumePrintData } from "./resumePrint";
import {
  formatContactLabel,
  formatContactValue,
  formatExperienceCompanyLine,
  sortContactsForResume,
  trimResumeText,
} from "./resumeFormat";

/** Nama section standar yang umum dikenali ATS */
const ATS_SECTION_HEADINGS = [
  "PROFESSIONAL SUMMARY",
  "EXPERIENCE",
  "WORK EXPERIENCE",
  "EDUCATION",
  "SKILLS",
  "TECHNICAL SKILLS",
  "PROJECTS",
  "CERTIFICATIONS",
  "HONORS",
  "AWARDS",
  "LANGUAGES",
  "KEY HIGHLIGHTS",
  "HIGHLIGHTS",
];

export interface AtsCheckItem {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
}

export interface ResumeAtsReport {
  /** Skor keseluruhan 0–100 (ATS + HR best practice) */
  score: number;
  /** Apakah resume dinilai dapat dibaca ATS dengan baik */
  atsReadable: boolean;
  /** Checklist item per item */
  checks: AtsCheckItem[];
  /** Rekomendasi perbaikan (jika ada) */
  recommendations: string[];
  /** Preview teks seperti yang akan diekstrak ATS dari PDF (untuk tes) */
  plainTextPreview: string;
  /** Ringkasan singkat */
  summary: string;
}

function buildPlainTextPreview(data: ResumePrintData): string {
  const lines: string[] = [];
  const name = trimResumeText(data.name) || "Resume";
  const title = trimResumeText(data.title);
  const location = trimResumeText(data.location);

  lines.push(name);
  if (title || location) {
    lines.push([title, location].filter(Boolean).join(" · "));
  }

  const contacts = sortContactsForResume(
    data.contacts.filter((c) => trimResumeText(c.value)),
  );
  if (contacts.length > 0) {
    lines.push(
      contacts
        .map(
          (c) =>
            `${formatContactLabel(c.type, c.label)}: ${formatContactValue(c.type, c.value)}`,
        )
        .join(" | "),
    );
  }
  lines.push("");

  const bio = trimResumeText(data.bio);
  if (bio) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push(bio);
    lines.push("");
  }

  if (data.experiences.length > 0) {
    lines.push("EXPERIENCE");
    for (const exp of data.experiences) {
      const companyLine = formatExperienceCompanyLine(
        trimResumeText(exp.company),
        exp.location ? trimResumeText(exp.location) : undefined,
      );
      const dateRange = exp.endDate
        ? `${trimResumeText(exp.startDate)} – ${trimResumeText(exp.endDate)}`
        : exp.isCurrent
          ? `${trimResumeText(exp.startDate)} – Present`
          : trimResumeText(exp.startDate);
      lines.push(`${trimResumeText(exp.position)} | ${companyLine}`);
      lines.push(dateRange);
      if (trimResumeText(exp.description))
        lines.push(trimResumeText(exp.description));
      for (const a of exp.achievements ?? []) {
        lines.push(`• ${trimResumeText(a)}`);
      }
      if (exp.technologies?.length) {
        lines.push(
          `Technologies: ${exp.technologies.map((t) => trimResumeText(t)).join(", ")}`,
        );
      }
      lines.push("");
    }
  }

  if (data.academics.length > 0) {
    lines.push("EDUCATION");
    for (const a of data.academics) {
      const degree = trimResumeText(a.degree);
      const field = trimResumeText(a.field);
      const datePart = [a.startDate, a.endDate]
        .map((d) => trimResumeText(d))
        .filter(Boolean)
        .join(" – ");
      lines.push(`${degree}${field ? ` in ${field}` : ""}`);
      lines.push(
        `${trimResumeText(a.institution)}${datePart ? ` ${datePart}` : ""}`,
      );
      if (trimResumeText(a.description))
        lines.push(trimResumeText(a.description));
      lines.push("");
    }
  }

  if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
    lines.push("SKILLS");
    if (data.technicalSkills.length > 0) {
      lines.push(
        `Technical: ${data.technicalSkills
          .map((s) => trimResumeText(s.name))
          .filter(Boolean)
          .join(", ")}`,
      );
    }
    if (data.softSkills.length > 0) {
      lines.push(
        `Soft: ${data.softSkills
          .map((s) => trimResumeText(s.name))
          .filter(Boolean)
          .join(", ")}`,
      );
    }
    lines.push("");
  }

  if (data.projects.length > 0) {
    lines.push("PROJECTS");
    for (const p of data.projects.slice(0, 8)) {
      lines.push(trimResumeText(p.title));
      if (trimResumeText(p.description))
        lines.push(trimResumeText(p.description));
      for (const a of p.achievements ?? []) {
        lines.push(`• ${trimResumeText(a)}`);
      }
      if (p.technologies?.length) {
        lines.push(p.technologies.map((t) => trimResumeText(t)).join(", "));
      }
      lines.push("");
    }
  }

  if (data.certifications.length > 0) {
    lines.push("CERTIFICATIONS");
    for (const c of data.certifications) {
      const issuer = trimResumeText(c.issuer);
      const date = trimResumeText(c.issueDate);
      lines.push(
        `${trimResumeText(c.name)}${issuer ? ` | ${issuer}` : ""}${date ? ` | ${date}` : ""}`,
      );
    }
    lines.push("");
  }

  if (data.honors.length > 0) {
    lines.push("HONORS & AWARDS");
    for (const h of data.honors) {
      const issuer = trimResumeText(h.issuer);
      const date = trimResumeText(h.date);
      lines.push(
        `${trimResumeText(h.title)}${issuer ? ` | ${issuer}` : ""}${date ? ` | ${date}` : ""}`,
      );
    }
    lines.push("");
  }

  if (data.stats.length > 0) {
    lines.push("KEY HIGHLIGHTS");
    lines.push(
      data.stats
        .map(
          (s) =>
            `${trimResumeText(s.label)}: ${s.value}${s.unit != null ? String(s.unit) : ""}`,
        )
        .join(" · "),
    );
    lines.push("");
  }

  if (data.languages.length > 0) {
    lines.push("LANGUAGES");
    lines.push(
      data.languages
        .map(
          (l) => `${trimResumeText(l.name)} (${trimResumeText(l.proficiency)})`,
        )
        .join(" | "),
    );
  }

  return lines.join("\n");
}

/**
 * Menghasilkan laporan keterbacaan ATS dan skor resume.
 * Gunakan untuk mengetes apakah sistem dapat membaca resume Anda secara otomatis.
 */
export function getResumeAtsReport(data: ResumePrintData): ResumeAtsReport {
  const checks: AtsCheckItem[] = [];
  const recommendations: string[] = [];

  // 1. Name present and not empty
  const hasName = !!trimResumeText(data.name);
  checks.push({
    id: "name",
    label: "Name is clear and filled",
    passed: hasName,
    detail: hasName ? trimResumeText(data.name) : "Name is empty",
  });
  if (!hasName) recommendations.push("Add full name in Profile section.");

  // 2. Contact (minimal email or phone for ATS)
  const contacts = data.contacts.filter((c) => trimResumeText(c.value));
  const hasEmail = contacts.some((c) => c.type?.toLowerCase() === "email");
  const hasPhone = contacts.some((c) => c.type?.toLowerCase() === "phone");
  const hasContact = contacts.length > 0;
  checks.push({
    id: "contact",
    label: "Contact is parseable (Email/Phone/LinkedIn)",
    passed: hasContact,
    detail: hasContact
      ? `Email: ${hasEmail ? "Yes" : "No"} | Phone: ${hasPhone ? "Yes" : "No"} | ${contacts.length} item(s)`
      : "No contacts",
  });
  if (!hasEmail && hasContact)
    recommendations.push("Add Email so ATS and HR can reach you.");
  if (!hasContact)
    recommendations.push("Add at least Email or Phone in Profile.");

  // 3. Section headings standar (semua section kita pakai nama standar)
  const usedHeadings = [
    data.bio && "PROFESSIONAL SUMMARY",
    data.experiences.length > 0 && "EXPERIENCE",
    data.academics.length > 0 && "EDUCATION",
    (data.technicalSkills.length > 0 || data.softSkills.length > 0) && "SKILLS",
    data.projects.length > 0 && "PROJECTS",
    data.certifications.length > 0 && "CERTIFICATIONS",
    data.honors.length > 0 && "HONORS & AWARDS",
    data.stats.length > 0 && "KEY HIGHLIGHTS",
    data.languages.length > 0 && "LANGUAGES",
  ].filter(Boolean) as string[];
  const standardHeadings = usedHeadings.filter((h) =>
    ATS_SECTION_HEADINGS.some(
      (std) => h.includes(std) || std.includes(h.split(" ")[0]),
    ),
  );
  checks.push({
    id: "sections",
    label: "Sections use standard names (ATS-recognized)",
    passed: standardHeadings.length === usedHeadings.length,
    detail: `${standardHeadings.length}/${usedHeadings.length} standard section(s)`,
  });

  // 4. Single column / no complex layout (we always use single column)
  checks.push({
    id: "layout",
    label: "Single-column layout (ATS-friendly)",
    passed: true,
    detail: "PDF and display use single column.",
  });

  // 5. Real text (not image/scan) – our PDF is from jsPDF = real text
  checks.push({
    id: "text",
    label: "Resume uses real text (not scan/image)",
    passed: true,
    detail: "PDF is generated from text (jsPDF), not image/OCR.",
  });

  // 6. Experience with role + company + date
  const expOk =
    data.experiences.length === 0 ||
    data.experiences.every(
      (e) =>
        trimResumeText(e.position) &&
        trimResumeText(e.company) &&
        trimResumeText(e.startDate),
    );
  checks.push({
    id: "experience",
    label: "Experience has Role, Company, and Date",
    passed: expOk,
    detail: `${data.experiences.length} experience(s); complete format: ${expOk ? "Yes" : "Check each entry"}`,
  });
  if (!expOk)
    recommendations.push(
      "Ensure each Experience has Position, Company, and Start Date.",
    );

  // 7. Education with degree + institution
  const eduOk =
    data.academics.length === 0 ||
    data.academics.every(
      (a) => trimResumeText(a.degree) && trimResumeText(a.institution),
    );
  checks.push({
    id: "education",
    label: "Education has Degree and Institution",
    passed: eduOk,
    detail: `${data.academics.length} education entr${data.academics.length === 1 ? "y" : "ies"}`,
  });

  // 8. Skills filled (technical or soft)
  const hasSkills =
    data.technicalSkills.length > 0 || data.softSkills.length > 0;
  checks.push({
    id: "skills",
    label: "Skills (Technical/Soft) filled",
    passed: hasSkills,
    detail: hasSkills
      ? `Technical: ${data.technicalSkills.length}, Soft: ${data.softSkills.length}`
      : "No skills",
  });
  if (!hasSkills)
    recommendations.push("Add Technical or Soft Skills to improve ATS match.");

  // 9. Summary/bio (improves keyword matching)
  const hasSummary = !!trimResumeText(data.bio);
  checks.push({
    id: "summary",
    label: "Professional Summary filled",
    passed: hasSummary,
    detail: hasSummary ? "Summary present" : "Empty",
  });
  if (!hasSummary)
    recommendations.push(
      "Add Professional Summary with relevant keywords for ATS.",
    );

  const passedCount = checks.filter((c) => c.passed).length;
  const score =
    checks.length > 0 ? Math.round((passedCount / checks.length) * 100) : 0;
  const atsReadable = score >= 70 && hasName && hasContact;

  let summary: string;
  if (score >= 90 && atsReadable) {
    summary =
      "Your resume is ATS-ready: clear structure, standard contact and sections, real text. The system can read and parse it well.";
  } else if (score >= 70 && atsReadable) {
    summary =
      "Resume is readable by ATS. A few items can be improved for a higher score.";
  } else if (score >= 50) {
    summary =
      "Resume is partially ATS-readable. Complete contact, summary, or experience for more reliable parsing.";
  } else {
    summary =
      "Resume may not parse well with ATS. Complete name, contact, and required sections.";
  }

  return {
    score,
    atsReadable,
    checks,
    recommendations,
    plainTextPreview: buildPlainTextPreview(data),
    summary,
  };
}
