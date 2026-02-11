/**
 * Open a minimal HTML window for resume and trigger print (Save as PDF).
 * Avoids React/CSS-module/visibility issues that can cause print to fail.
 * Output is text + minimal inline CSS only (no images, no external fonts)
 * so the saved PDF stays well under 2 MB.
 */

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export interface ResumePrintData {
  name: string;
  title: string;
  location: string;
  bio: string;
  contacts: ReadonlyArray<{ label?: string; type: string; value: string }>;
  experiences: ReadonlyArray<{
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    achievements?: readonly string[];
    technologies?: readonly string[];
  }>;
  academics: ReadonlyArray<{
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  projects: ReadonlyArray<{
    title: string;
    description?: string;
    technologies?: readonly string[];
    achievements?: readonly string[];
  }>;
  technicalSkills: ReadonlyArray<{ name: string }>;
  softSkills: ReadonlyArray<{ name: string }>;
  certifications: ReadonlyArray<{
    name: string;
    issuer: string;
    issueDate?: string;
  }>;
  honors: ReadonlyArray<{ title: string; issuer?: string; date?: string }>;
  stats: ReadonlyArray<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
  languages: ReadonlyArray<{ name: string; proficiency: string }>;
}

const PRINT_STYLES = `
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.45; color: #1a1a1a; max-width: 8.5in; margin: 0 auto; padding: 0.5in 0.65in; background: #fff; }
  .resume-name { font-size: 24pt; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.02em; line-height: 1.2; }
  .resume-tagline { font-size: 11pt; margin: 0 0 10px; color: #333; }
  .contact { font-size: 10pt; margin-bottom: 18px; color: #444; line-height: 1.5; }
  .contact span { margin-right: 12px; }
  h2 { font-size: 10.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid #1a1a1a; margin: 18px 0 10px; padding-bottom: 4px; }
  h3 { font-size: 11pt; font-weight: 700; margin: 0 0 4px; }
  p { margin: 0 0 6px; }
  ul { margin: 4px 0 12px; padding-left: 22px; }
  li { margin-bottom: 3px; line-height: 1.4; }
  .summary { margin-bottom: 4px; line-height: 1.5; }
  .job-meta { font-size: 10pt; color: #505050; margin-bottom: 6px; }
  .tech { font-size: 9.5pt; color: #555; font-style: italic; margin-top: 4px; }
  .section-block { margin-bottom: 14px; }
  @media print { body { padding: 0.4in 0.5in; } h2 { page-break-after: avoid; } .section-block { page-break-inside: avoid; } }
`;

function buildResumeHtml(data: ResumePrintData): string {
  const contactParts = data.contacts
    .filter((c) => c.value)
    .map((c) => escapeHtml((c.label || c.type) + ": " + c.value));
  const contactHtml =
    contactParts.length > 0
      ? `<p class="contact">${contactParts.map((p, i) => (i > 0 ? " | " : "") + `<span>${p}</span>`).join("")}</p>`
      : "";

  let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${escapeHtml(data.name)} - Resume</title><style>${PRINT_STYLES}</style></head><body>`;
  html += `<h1 class="resume-name">${escapeHtml(data.name)}</h1>`;
  if (data.title || data.location) {
    html += `<p class="resume-tagline">`;
    if (data.title) html += `<strong>${escapeHtml(data.title)}</strong>`;
    if (data.title && data.location) html += "<br>";
    if (data.location) html += escapeHtml(data.location);
    html += `</p>`;
  }
  html += contactHtml;

  if (data.bio) {
    html += `<h2>Professional Summary</h2><p class="summary">${escapeHtml(data.bio)}</p>`;
  }

  if (data.experiences.length > 0) {
    html += "<h2>Experience</h2>";
    for (const exp of data.experiences) {
      const dateRange = exp.endDate
        ? `${exp.startDate} – ${exp.endDate}`
        : exp.isCurrent
          ? `${exp.startDate} – Present`
          : exp.startDate;
      html += `<div class="section-block"><h3>${escapeHtml(exp.position)} | ${escapeHtml(exp.company)}${exp.location ? ` – ${escapeHtml(exp.location)}` : ""}</h3><p class="job-meta">${escapeHtml(dateRange)}</p>`;
      if (exp.description)
        html += `<p class="summary">${escapeHtml(exp.description)}</p>`;
      if (exp.achievements?.length) {
        html += "<ul>";
        for (const a of exp.achievements) html += `<li>${escapeHtml(a)}</li>`;
        html += "</ul>";
      }
      if (exp.technologies?.length)
        html += `<p class="tech">Technologies: ${exp.technologies.map((t) => escapeHtml(t)).join(", ")}</p>`;
      html += "</div>";
    }
  }

  if (data.academics.length > 0) {
    html += "<h2>Education</h2>";
    for (const a of data.academics) {
      const dateStr =
        a.startDate || a.endDate
          ? ` | ${a.startDate ?? ""}${a.endDate ? ` – ${a.endDate}` : ""}`
          : "";
      html += `<div class="section-block"><h3>${escapeHtml(a.degree)}${a.field ? ` in ${escapeHtml(a.field)}` : ""}</h3><p class="job-meta">${escapeHtml(a.institution)}${dateStr}</p>`;
      if (a.description)
        html += `<p class="summary">${escapeHtml(a.description)}</p>`;
      html += "</div>";
    }
  }

  if (data.technicalSkills.length > 0 || data.softSkills.length > 0) {
    html += "<h2>Skills</h2>";
    if (data.technicalSkills.length > 0)
      html += `<p><strong>Technical:</strong> ${data.technicalSkills.map((s) => escapeHtml(s.name)).join(", ")}</p>`;
    if (data.softSkills.length > 0)
      html += `<p><strong>Soft:</strong> ${data.softSkills.map((s) => escapeHtml(s.name)).join(", ")}</p>`;
  }

  if (data.projects.length > 0) {
    html += "<h2>Projects</h2>";
    for (const proj of data.projects.slice(0, 8)) {
      html += `<div class="section-block"><h3>${escapeHtml(proj.title)}</h3>`;
      if (proj.description)
        html += `<p class="summary">${escapeHtml(proj.description)}</p>`;
      if (proj.achievements?.length) {
        html += "<ul>";
        for (const a of proj.achievements.slice(0, 3))
          html += `<li>${escapeHtml(a)}</li>`;
        html += "</ul>";
      }
      if (proj.technologies?.length)
        html += `<p class="tech">${proj.technologies.map((t) => escapeHtml(t)).join(", ")}</p>`;
      html += "</div>";
    }
  }

  if (data.certifications.length > 0) {
    html += "<h2>Certifications</h2>";
    for (const c of data.certifications)
      html += `<p>${escapeHtml(c.name)}${c.issuer ? ` | ${escapeHtml(c.issuer)}` : ""}${c.issueDate ? ` | ${escapeHtml(c.issueDate)}` : ""}</p>`;
  }

  if (data.honors.length > 0) {
    html += "<h2>Honors &amp; Awards</h2>";
    for (const h of data.honors)
      html += `<p>${escapeHtml(h.title)}${h.issuer ? ` | ${escapeHtml(h.issuer)}` : ""}${h.date ? ` | ${escapeHtml(h.date)}` : ""}</p>`;
  }

  if (data.stats.length > 0) {
    html += "<h2>Highlights</h2>";
    html += `<p>${data.stats.map((s) => `${escapeHtml(s.label)}: ${escapeHtml(String(s.value))}${s.unit ?? ""}`).join(" · ")}</p>`;
  }

  if (data.languages.length > 0) {
    html += "<h2>Languages</h2>";
    html += `<p>${data.languages.map((l) => `${escapeHtml(l.name)} – ${escapeHtml(l.proficiency)}`).join(" | ")}</p>`;
  }

  html += "</body></html>";
  return html;
}

export function printResumeToPdf(data: ResumePrintData): void {
  const html = buildResumeHtml(data);
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) {
    alert(
      "Pop-up was blocked. Please allow pop-ups for this site and try again.",
    );
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();

  const doPrint = () => {
    w.print();
    w.onafterprint = () => w.close();
  };
  setTimeout(doPrint, 300);
}
