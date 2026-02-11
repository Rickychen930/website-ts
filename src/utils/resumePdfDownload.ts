/**
 * Generate resume as PDF – ATS-friendly, professional, structured.
 * Single column, clear headings, consistent spacing. Output stays under 2 MB.
 */

import { jsPDF } from "jspdf";
import type { ResumePrintData } from "./resumePrint";
import {
  formatContactLabel,
  formatContactValue,
  formatExperienceCompanyLine,
  sortContactsForResume,
  trimResumeText,
} from "./resumeFormat";

const MARGIN = 18;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
const LINE_HEIGHT_FACTOR = 0.42; // mm per pt of font size

function addPageIfNeeded(doc: jsPDF, y: number, needSpace: number): number {
  if (y + needSpace > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

/** Add body text with wrapping; returns new y */
function addBodyText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  maxWidth: number = CONTENT_WIDTH,
): number {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * LINE_HEIGHT_FACTOR);
}

/** Add bold text with optional wrap; returns new y */
function addBoldText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  maxWidth: number = CONTENT_WIDTH,
): number {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "bold");
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * LINE_HEIGHT_FACTOR);
}

/** ATS-friendly section heading: uppercase, underline; avoid orphan (require min space after). */
function addSectionHeading(doc: jsPDF, text: string, y: number): number {
  y = addPageIfNeeded(doc, y, 25);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(text.toUpperCase(), MARGIN, y);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.35);
  doc.line(MARGIN, y + 1.5, PAGE_WIDTH - MARGIN, y + 1.5);
  return y + 10;
}

export function downloadResumePdf(data: ResumePrintData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica");
  doc.setTextColor(0, 0, 0);
  let y = MARGIN;

  // —— Name ——
  const name = trimResumeText(data.name) || "Resume";
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(name, MARGIN, y);
  y += 9;

  // —— Title & Location (one line if possible) ——
  const title = trimResumeText(data.title);
  const location = trimResumeText(data.location);
  if (title || location) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const titleLine = [title, location].filter(Boolean).join("  ·  ");
    doc.text(titleLine, MARGIN, y, { maxWidth: CONTENT_WIDTH });
    y += 6;
  }

  // —— Contact line: Email | Phone | LinkedIn | GitHub (sorted, short, professional) ——
  const contactEntries = sortContactsForResume(
    data.contacts.filter((c) => trimResumeText(c.value)),
  ).map(
    (c) =>
      `${formatContactLabel(c.type, c.label)}: ${formatContactValue(c.type, c.value)}`,
  );
  if (contactEntries.length > 0) {
    doc.setFontSize(9);
    const contactLine = contactEntries.join("  |  ");
    const contactLines = doc.splitTextToSize(contactLine, CONTENT_WIDTH);
    doc.text(contactLines, MARGIN, y);
    y += contactLines.length * (9 * LINE_HEIGHT_FACTOR) + 4;
  }

  // —— Professional Summary ——
  const bio = trimResumeText(data.bio);
  if (bio) {
    y = addSectionHeading(doc, "Professional Summary", y);
    y = addBodyText(doc, bio, MARGIN, y, 10) + 5;
  }

  // —— Experience ——
  if (data.experiences.length > 0) {
    y = addSectionHeading(doc, "Experience", y);
    for (const exp of data.experiences) {
      y = addPageIfNeeded(doc, y, 25);
      const dateRange = exp.endDate
        ? `${trimResumeText(exp.startDate)} – ${trimResumeText(exp.endDate)}`
        : exp.isCurrent
          ? `${trimResumeText(exp.startDate)} – Present`
          : trimResumeText(exp.startDate);
      const companyPart = formatExperienceCompanyLine(
        trimResumeText(exp.company),
        exp.location ? trimResumeText(exp.location) : undefined,
      );
      const titleLine = `${trimResumeText(exp.position)} | ${companyPart}`;
      y = addBoldText(doc, titleLine, MARGIN, y, 10) + 1;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(dateRange, MARGIN, y);
      y += 5;
      const desc = trimResumeText(exp.description);
      if (desc) {
        y = addBodyText(doc, desc, MARGIN, y, 9) + 2;
      }
      if (exp.achievements?.length) {
        doc.setFontSize(9);
        for (const a of exp.achievements) {
          y = addPageIfNeeded(doc, y, 8);
          const bulletText = `• ${trimResumeText(a)}`;
          const lines = doc.splitTextToSize(bulletText, CONTENT_WIDTH - 4);
          doc.text(lines, MARGIN + 4, y);
          y += lines.length * (9 * LINE_HEIGHT_FACTOR) + 1;
        }
      }
      if (exp.technologies?.length) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        const techText = `Technologies: ${exp.technologies.map((t) => trimResumeText(t)).join(", ")}`;
        const techLines = doc.splitTextToSize(techText, CONTENT_WIDTH);
        doc.text(techLines, MARGIN, y);
        y += techLines.length * (8 * LINE_HEIGHT_FACTOR) + 2;
        doc.setFont("helvetica", "normal");
      }
      y += 4;
    }
  }

  // —— Education ——
  if (data.academics.length > 0) {
    y = addSectionHeading(doc, "Education", y);
    for (const a of data.academics) {
      y = addPageIfNeeded(doc, y, 18);
      const degree = trimResumeText(a.degree);
      const field = trimResumeText(a.field);
      const degreeLine = `${degree}${field ? ` in ${field}` : ""}`;
      y = addBoldText(doc, degreeLine, MARGIN, y, 10) + 1;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const datePart = [a.startDate, a.endDate]
        .map((d) => trimResumeText(d))
        .filter(Boolean)
        .join(" – ");
      const dateStr = datePart ? `  ${datePart}` : "";
      doc.text(`${trimResumeText(a.institution)}${dateStr}`.trim(), MARGIN, y);
      y += 5;
      const acadDesc = trimResumeText(a.description);
      if (acadDesc) {
        y = addBodyText(doc, acadDesc, MARGIN, y, 9) + 3;
      }
    }
  }

  // —— Skills (Technical & Soft each on own line; content wraps with correct y) ——
  if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
    y = addSectionHeading(doc, "Skills", y);
    doc.setFontSize(9);
    if (data.technicalSkills.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Technical:", MARGIN, y);
      y += 9 * LINE_HEIGHT_FACTOR;
      const techStr = data.technicalSkills
        .map((s) => trimResumeText(s.name))
        .filter(Boolean)
        .join(", ");
      doc.setFont("helvetica", "normal");
      y = addBodyText(doc, techStr, MARGIN, y, 9) + 4;
    }
    if (data.softSkills.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Soft:", MARGIN, y);
      y += 9 * LINE_HEIGHT_FACTOR;
      const softStr = data.softSkills
        .map((s) => trimResumeText(s.name))
        .filter(Boolean)
        .join(", ");
      doc.setFont("helvetica", "normal");
      y = addBodyText(doc, softStr, MARGIN, y, 9) + 4;
    }
    y += 2;
  }

  // —— Projects ——
  if (data.projects.length > 0) {
    y = addSectionHeading(doc, "Projects", y);
    for (const proj of data.projects.slice(0, 8)) {
      y = addPageIfNeeded(doc, y, 20);
      y = addBoldText(doc, trimResumeText(proj.title), MARGIN, y, 10) + 2;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const projDesc = trimResumeText(proj.description);
      if (projDesc) {
        y = addBodyText(doc, projDesc, MARGIN, y, 9) + 2;
      }
      if (proj.achievements?.length) {
        doc.setFontSize(9);
        for (const a of proj.achievements.slice(0, 3)) {
          y = addPageIfNeeded(doc, y, 8);
          const bulletText = `• ${trimResumeText(a)}`;
          const lines = doc.splitTextToSize(bulletText, CONTENT_WIDTH - 4);
          doc.text(lines, MARGIN + 4, y);
          y += lines.length * (9 * LINE_HEIGHT_FACTOR) + 1;
        }
      }
      if (proj.technologies?.length) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        const projTechLines = doc.splitTextToSize(
          proj.technologies.map((t) => trimResumeText(t)).join(", "),
          CONTENT_WIDTH,
        );
        doc.text(projTechLines, MARGIN, y);
        y += projTechLines.length * (8 * LINE_HEIGHT_FACTOR) + 2;
        doc.setFont("helvetica", "normal");
      }
      y += 4;
    }
  }

  // —— Certifications ——
  if (data.certifications.length > 0) {
    y = addSectionHeading(doc, "Certifications", y);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    for (const c of data.certifications) {
      y = addPageIfNeeded(doc, y, 7);
      const issuer = trimResumeText(c.issuer);
      const issueDate = trimResumeText(c.issueDate);
      const line = `${trimResumeText(c.name)}${issuer ? ` | ${issuer}` : ""}${issueDate ? ` | ${issueDate}` : ""}`;
      y = addBodyText(doc, line, MARGIN, y, 9) + 2;
    }
    y += 2;
  }

  // —— Honors & Awards ——
  if (data.honors.length > 0) {
    y = addSectionHeading(doc, "Honors & Awards", y);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    for (const h of data.honors) {
      y = addPageIfNeeded(doc, y, 7);
      const honIssuer = trimResumeText(h.issuer);
      const honDate = trimResumeText(h.date);
      const line = `${trimResumeText(h.title)}${honIssuer ? ` | ${honIssuer}` : ""}${honDate ? ` | ${honDate}` : ""}`;
      y = addBodyText(doc, line, MARGIN, y, 9) + 2;
    }
    y += 2;
  }

  // —— Highlights (Key metrics) ——
  if (data.stats.length > 0) {
    y = addSectionHeading(doc, "Key Highlights", y);
    doc.setFontSize(9);
    const line = data.stats
      .map(
        (s) =>
          `${trimResumeText(s.label)}: ${s.value}${s.unit != null ? trimResumeText(String(s.unit)) : ""}`,
      )
      .join("  ·  ");
    y = addBodyText(doc, line, MARGIN, y, 9) + 4;
  }

  // —— Languages (wrap correctly, advance y) ——
  if (data.languages.length > 0) {
    y = addSectionHeading(doc, "Languages", y);
    doc.setFontSize(9);
    const langStr = data.languages
      .map(
        (l) => `${trimResumeText(l.name)} (${trimResumeText(l.proficiency)})`,
      )
      .join("  |  ");
    y = addBodyText(doc, langStr, MARGIN, y, 9);
  }

  const safeName = name.replace(/\s+/g, "_").replace(/[^\w-]/g, "") || "Resume";
  doc.save(`${safeName}_Resume.pdf`);
}
