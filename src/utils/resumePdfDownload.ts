/**
 * Generate resume as PDF and trigger direct download (one click, no print dialog).
 * Uses jsPDF for client-side PDF generation. Output stays under 2 MB.
 */

import { jsPDF } from "jspdf";
import type { ResumePrintData } from "./resumePrint";

const MARGIN = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

function addPageIfNeeded(doc: jsPDF, y: number, needSpace: number): number {
  if (y + needSpace > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function addText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  options?: { bold?: boolean },
): number {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", options?.bold ? "bold" : "normal");
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * 0.45);
}

function addHeading(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text.toUpperCase(), MARGIN, y);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y + 1, PAGE_WIDTH - MARGIN, y + 1);
  return y + 8;
}

export function downloadResumePdf(data: ResumePrintData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(data.name, MARGIN, y);
  y += 10;

  if (data.title || data.location) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (data.title) {
      doc.setFont("helvetica", "bold");
      doc.text(data.title, MARGIN, y);
      y += 5;
    }
    if (data.location) {
      doc.setFont("helvetica", "normal");
      doc.text(data.location, MARGIN, y);
      y += 5;
    }
  }

  const contactParts = data.contacts
    .filter((c) => c.value)
    .map((c) => `${c.label || c.type}: ${c.value}`);
  if (contactParts.length > 0) {
    doc.setFontSize(9);
    doc.text(contactParts.join("  |  "), MARGIN, y, {
      maxWidth: CONTENT_WIDTH,
    });
    y += 8;
  }

  y += 2;

  if (data.bio) {
    y = addPageIfNeeded(doc, y, 25);
    y = addHeading(doc, "Professional Summary", y);
    y = addText(doc, data.bio, MARGIN, y, 10) + 3;
  }

  if (data.experiences.length > 0) {
    y = addPageIfNeeded(doc, y, 15);
    y = addHeading(doc, "Experience", y);
    for (const exp of data.experiences) {
      y = addPageIfNeeded(doc, y, 20);
      const dateRange = exp.endDate
        ? `${exp.startDate} – ${exp.endDate}`
        : exp.isCurrent
          ? `${exp.startDate} – Present`
          : exp.startDate;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${exp.position} | ${exp.company}${exp.location ? ` – ${exp.location}` : ""}`,
        MARGIN,
        y,
        { maxWidth: CONTENT_WIDTH },
      );
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(dateRange, MARGIN, y);
      y += 5;
      if (exp.description) {
        y = addText(doc, exp.description, MARGIN, y, 9) + 2;
      }
      if (exp.achievements?.length) {
        for (const a of exp.achievements) {
          y = addPageIfNeeded(doc, y, 6);
          doc.text(`• ${a}`, MARGIN + 3, y, { maxWidth: CONTENT_WIDTH - 3 });
          y += 5;
        }
      }
      if (exp.technologies?.length) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.text(`Technologies: ${exp.technologies.join(", ")}`, MARGIN, y, {
          maxWidth: CONTENT_WIDTH,
        });
        y += 6;
        doc.setFont("helvetica", "normal");
      }
      y += 3;
    }
  }

  if (data.academics.length > 0) {
    y = addPageIfNeeded(doc, y, 15);
    y = addHeading(doc, "Education", y);
    for (const a of data.academics) {
      y = addPageIfNeeded(doc, y, 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${a.degree}${a.field ? ` in ${a.field}` : ""}`, MARGIN, y, {
        maxWidth: CONTENT_WIDTH,
      });
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const dateStr =
        a.startDate || a.endDate
          ? ` ${a.startDate ?? ""}${a.endDate ? ` – ${a.endDate}` : ""}`
          : "";
      doc.text(`${a.institution}${dateStr}`, MARGIN, y);
      y += 5;
      if (a.description) {
        y = addText(doc, a.description, MARGIN, y, 9) + 3;
      }
    }
  }

  if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
    y = addPageIfNeeded(doc, y, 15);
    y = addHeading(doc, "Skills", y);
    doc.setFontSize(9);
    if (data.technicalSkills.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Technical: ", MARGIN, y);
      doc.setFont("helvetica", "normal");
      const techText = " " + data.technicalSkills.map((s) => s.name).join(", ");
      doc.text(techText.trim(), MARGIN + doc.getTextWidth("Technical: "), y, {
        maxWidth: CONTENT_WIDTH - doc.getTextWidth("Technical: "),
      });
      y += 6;
    }
    if (data.softSkills.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Soft: ", MARGIN, y);
      doc.setFont("helvetica", "normal");
      doc.text(
        data.softSkills.map((s) => s.name).join(", "),
        MARGIN + doc.getTextWidth("Soft: "),
        y,
        { maxWidth: CONTENT_WIDTH - doc.getTextWidth("Soft: ") },
      );
      y += 6;
    }
    y += 2;
  }

  if (data.projects.length > 0) {
    y = addPageIfNeeded(doc, y, 15);
    y = addHeading(doc, "Projects", y);
    for (const proj of data.projects.slice(0, 8)) {
      y = addPageIfNeeded(doc, y, 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(proj.title, MARGIN, y, { maxWidth: CONTENT_WIDTH });
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      if (proj.description) {
        y = addText(doc, proj.description, MARGIN, y, 9) + 2;
      }
      if (proj.achievements?.length) {
        for (const a of proj.achievements.slice(0, 3)) {
          y = addPageIfNeeded(doc, y, 5);
          doc.text(`• ${a}`, MARGIN + 3, y, { maxWidth: CONTENT_WIDTH - 3 });
          y += 5;
        }
      }
      if (proj.technologies?.length) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.text(proj.technologies.join(", "), MARGIN, y, {
          maxWidth: CONTENT_WIDTH,
        });
        y += 5;
        doc.setFont("helvetica", "normal");
      }
      y += 3;
    }
  }

  if (data.certifications.length > 0) {
    y = addPageIfNeeded(doc, y, 12);
    y = addHeading(doc, "Certifications", y);
    doc.setFontSize(9);
    for (const c of data.certifications) {
      y = addPageIfNeeded(doc, y, 6);
      doc.text(
        `${c.name}${c.issuer ? ` | ${c.issuer}` : ""}${c.issueDate ? ` | ${c.issueDate}` : ""}`,
        MARGIN,
        y,
        { maxWidth: CONTENT_WIDTH },
      );
      y += 5;
    }
    y += 2;
  }

  if (data.honors.length > 0) {
    y = addPageIfNeeded(doc, y, 12);
    y = addHeading(doc, "Honors & Awards", y);
    doc.setFontSize(9);
    for (const h of data.honors) {
      y = addPageIfNeeded(doc, y, 6);
      doc.text(
        `${h.title}${h.issuer ? ` | ${h.issuer}` : ""}${h.date ? ` | ${h.date}` : ""}`,
        MARGIN,
        y,
        { maxWidth: CONTENT_WIDTH },
      );
      y += 5;
    }
    y += 2;
  }

  if (data.stats.length > 0) {
    y = addPageIfNeeded(doc, y, 10);
    y = addHeading(doc, "Highlights", y);
    doc.setFontSize(9);
    const line = data.stats
      .map((s) => `${s.label}: ${s.value}${s.unit ?? ""}`)
      .join("  ·  ");
    y = addText(doc, line, MARGIN, y, 9) + 3;
  }

  if (data.languages.length > 0) {
    y = addPageIfNeeded(doc, y, 10);
    y = addHeading(doc, "Languages", y);
    doc.setFontSize(9);
    doc.text(
      data.languages.map((l) => `${l.name} – ${l.proficiency}`).join("  |  "),
      MARGIN,
      y,
      { maxWidth: CONTENT_WIDTH },
    );
  }

  const safeName =
    data.name.replace(/\s+/g, "_").replace(/[^\w-]/g, "") || "Resume";
  doc.save(`${safeName}_Resume.pdf`);
}
