/**
 * Admin Cover Letter - Premium design, different letter per company (saved)
 */

import React, { useEffect, useState, useRef } from "react";
import {
  adminService,
  type SavedCoverLetterItem,
} from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";
import coverLetterStyles from "./AdminCoverLetter.module.css";

type Profile = Record<string, unknown> & {
  name?: string;
  title?: string;
  location?: string;
  contacts?: Array<{
    type: string;
    value: string;
    label: string;
    isPrimary?: boolean;
  }>;
  experiences?: Array<{
    company: string;
    position: string;
    description?: string;
    achievements?: string[];
    isCurrent?: boolean;
  }>;
  technicalSkills?: Array<{ name: string }>;
};

function getPrimaryContact(profile: Profile, type: string): string {
  const contacts = profile?.contacts ?? [];
  const primary = contacts.find((c) => c.isPrimary && c.type === type);
  if (primary?.value) return primary.value;
  const any = contacts.find((c) => c.type === type);
  return any?.value ?? "";
}

/** Generate default body text (paragraphs between greeting and closing) so each company can later be edited differently. */
function generateBodyText(
  profile: Profile,
  companyName: string,
  position: string,
  jobDescription: string,
): string {
  const recentExp = (profile?.experiences ?? []).filter(Boolean)[0];
  const expLine = recentExp
    ? `At ${recentExp.company}, I held the role of ${recentExp.position}. ${(recentExp.achievements?.[0] ?? recentExp.description ?? "").slice(0, 180)}${(recentExp.achievements?.[0] ?? recentExp.description ?? "").length > 180 ? "…" : ""}`
    : "I have relevant experience in my field and am eager to contribute to your team.";
  const skills = (profile?.technicalSkills ?? [])
    .slice(0, 5)
    .map((s: { name?: string }) => s?.name)
    .filter(Boolean)
    .join(", ");
  const skillsLine = skills ? `My technical skills include ${skills}.` : "";

  const intro = jobDescription.trim()
    ? `I am writing to apply for the ${position} position at ${companyName}. After reviewing the job description, I am confident that my background aligns well with your requirements.`
    : `I am writing to express my interest in the ${position} position at ${companyName}. I believe my experience and skills make me a strong fit for your team.`;

  const body = jobDescription.trim()
    ? `My experience has prepared me for this role. ${expLine} ${skillsLine} I am particularly drawn to this opportunity because of ${companyName}'s focus on quality and innovation.`
    : `${expLine} ${skillsLine}`;

  const closing = `I would welcome the opportunity to discuss how I can contribute to ${companyName}. Thank you for considering my application.`;

  return [intro, body, closing].join("\n\n");
}

function buildLetterHtml(
  profile: Profile,
  companyName: string,
  position: string,
  bodyText: string,
  cssClass: (c: string) => string,
): string {
  const name = (profile?.name as string) || "Your Name";
  const title = (profile?.title as string) || "Professional";
  const location = (profile?.location as string) || "";
  const email = getPrimaryContact(profile, "email") || "your.email@example.com";
  const phone = getPrimaryContact(profile, "phone");
  const linkedIn = getPrimaryContact(profile, "linkedin");

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const paragraphs = bodyText
    .trim()
    .split(/\n\n+/)
    .filter(Boolean)
    .map(
      (p) => `<p class="${cssClass("paragraph")}">${p.replace(/\n/g, " ")}</p>`,
    )
    .join("\n");

  return `
<div class="${cssClass("letter")}">
  <div class="${cssClass("letterhead")}" aria-hidden="true"></div>
  <p class="${cssClass("date")}">${today}</p>
  <p class="${cssClass("recipient")}">${companyName}<br />Hiring Team</p>
  <p class="${cssClass("re")}">Re: Application for ${position}</p>
  <p class="${cssClass("greeting")}">Dear Hiring Manager,</p>
  ${paragraphs}
  <p class="${cssClass("closing")}">Sincerely,</p>
  <p class="${cssClass("signature")}">
    <strong>${name}</strong><br />
    ${title}${location ? ` · ${location}` : ""}<br />
    ${email}${phone ? ` · ${phone}` : ""}${linkedIn ? ` · LinkedIn: ${linkedIn}` : ""}
  </p>
</div>
`.trim();
}

const PRINT_STYLES = `
  * { box-sizing: border-box; }
  body { font-family: Georgia, "Times New Roman", serif; font-size: 11.5pt; line-height: 1.55; color: #1c1c1c; max-width: 6.75in; margin: 0 auto; padding: 0.5in 0.6in; background: #fff; }
  .letterhead { margin-bottom: 1.25em; padding-bottom: 0.65em; border-bottom: 2px solid #1c1c1c; width: 2.5em; }
  .date { margin: 0 0 1.75em 0; font-size: 10.5pt; color: #505050; }
  .recipient { margin: 0 0 0.5em 0; font-size: 11pt; line-height: 1.45; color: #252525; }
  .re { margin: 0 0 1.75em 0; font-weight: 600; font-size: 11pt; color: #1c1c1c; }
  .greeting { margin: 0 0 1.1em 0; font-size: 11.5pt; }
  .paragraph { margin: 0 0 1.1em 0; text-align: justify; hyphens: auto; font-size: 11.5pt; }
  .closing { margin: 1.6em 0 0.35em 0; font-size: 11.5pt; }
  .signature { margin: 0; font-size: 10.5pt; line-height: 1.6; color: #404040; }
  .signature strong { color: #1c1c1c; font-size: 11pt; }
`;

export const AdminCoverLetter: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedList, setSavedList] = useState<SavedCoverLetterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "saved">("create");

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [aiConfigured, setAiConfigured] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [jdSummary, setJdSummary] = useState<string | null>(null);
  const [jdSummaryLoading, setJdSummaryLoading] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);

  const loadProfile = () => {
    adminService
      .getProfile()
      .then((p) => setProfile(p as Profile))
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  };

  const loadSaved = () => {
    adminService
      .getCoverLetters({ limit: 100, sort: "-updatedAt" })
      .then((res) => setSavedList(res.items))
      .catch(() => {});
  };

  useEffect(() => {
    loadProfile();
    loadSaved();
  }, []);

  useEffect(() => {
    adminService
      .getAiStatus()
      .then((r) => setAiConfigured(r.configured))
      .catch(() => setAiConfigured(false));
  }, []);

  useEffect(() => {
    if (!profile || editingId) return;
    const body = generateBodyText(
      profile,
      companyName || "Company Name",
      position || "Position Title",
      jobDescription,
    );
    setBodyText(body);
  }, [profile, companyName, position, jobDescription, editingId]);

  const letterHtml =
    profile && (companyName || position || bodyText.trim())
      ? buildLetterHtml(
          profile,
          companyName || "Company Name",
          position || "Position Title",
          bodyText.trim() || "Enter your letter content above.",
          (c) => coverLetterStyles[c] ?? c,
        )
      : "";

  const resetForm = () => {
    setCompanyName("");
    setPosition("");
    setJobDescription("");
    setEditingId(null);
    if (profile)
      setBodyText(
        generateBodyText(profile, "Company Name", "Position Title", ""),
      );
  };

  const handleGenerate = () => {
    if (!profile) return;
    setBodyText(
      generateBodyText(
        profile,
        companyName || "Company",
        position || "Role",
        jobDescription,
      ),
    );
  };

  const handleImproveWithAi = async () => {
    if (!bodyText.trim()) return;
    setError(null);
    setAiLoading(true);
    try {
      const { improved } = await adminService.aiEnhanceCoverLetter({
        bodyText: bodyText.trim(),
        jobDescription: jobDescription.trim() || undefined,
        companyName: companyName.trim() || undefined,
        position: position.trim() || undefined,
      });
      setBodyText(improved);
      setMessage("Cover letter improved with AI.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSummarizeJd = async () => {
    if (!jobDescription.trim()) return;
    setError(null);
    setJdSummaryLoading(true);
    setJdSummary(null);
    try {
      const { summary } = await adminService.aiSummarizeJobDescription(
        jobDescription.trim(),
      );
      setJdSummary(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed");
    } finally {
      setJdSummaryLoading(false);
    }
  };

  const handleSave = async () => {
    if (!companyName.trim() || !position.trim()) {
      setError("Company name and position are required.");
      return;
    }
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      if (editingId) {
        await adminService.updateCoverLetter(editingId, {
          companyName: companyName.trim(),
          position: position.trim(),
          jobDescription: jobDescription.trim() || undefined,
          bodyText: bodyText.trim(),
        });
        setMessage("Cover letter updated.");
      } else {
        await adminService.createCoverLetter({
          companyName: companyName.trim(),
          position: position.trim(),
          jobDescription: jobDescription.trim() || undefined,
          bodyText: bodyText.trim(),
        });
        setMessage(
          "Cover letter saved. You can create another for a different company.",
        );
        resetForm();
      }
      loadSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (letter: SavedCoverLetterItem) => {
    setEditingId(letter.id);
    setCompanyName(letter.companyName);
    setPosition(letter.position);
    setJobDescription(letter.jobDescription ?? "");
    setBodyText(letter.bodyText || "");
    setActiveTab("create");
  };

  const handleDuplicate = (letter: SavedCoverLetterItem) => {
    setEditingId(null);
    setCompanyName(letter.companyName);
    setPosition(letter.position);
    setJobDescription(letter.jobDescription ?? "");
    setBodyText(letter.bodyText || "");
    setActiveTab("create");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this cover letter?")) return;
    try {
      await adminService.deleteCoverLetter(id);
      if (editingId === id) resetForm();
      setMessage("Cover letter deleted.");
      loadSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const handleCopy = () => {
    if (!letterRef.current) return;
    const text = letterRef.current.innerText;
    navigator.clipboard.writeText(text).then(
      () => setMessage("Copied to clipboard."),
      () => setError("Copy failed."),
    );
  };

  const handlePrint = (letter?: {
    companyName: string;
    position: string;
    bodyText: string;
  }) => {
    const company = letter?.companyName ?? (companyName || "Company");
    const pos = letter?.position ?? (position || "Position");
    const body = letter?.bodyText ?? bodyText;
    const content =
      profile && body
        ? buildLetterHtml(profile, company, pos, body, (c) => c)
        : "";

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print.");
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cover Letter – ${company.replace(/</g, "&lt;")}</title>
          <style>${PRINT_STYLES}</style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  if (loading && !profile) {
    return <p className={styles.emptyState}>Loading profile…</p>;
  }
  if (error && !profile) {
    return (
      <p className={styles.emptyState} role="alert">
        {error}
      </p>
    );
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Cover letter</h1>
      <p
        className={styles.emptyState}
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        Create a different cover letter for each company. Edit the body for each
        application, then save and print.
      </p>

      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={coverLetterStyles.tabs}>
        <button
          type="button"
          className={`${coverLetterStyles.tab} ${activeTab === "create" ? coverLetterStyles.tabActive : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create / Edit
        </button>
        <button
          type="button"
          className={`${coverLetterStyles.tab} ${activeTab === "saved" ? coverLetterStyles.tabActive : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved letters ({savedList.length})
        </button>
      </div>

      {activeTab === "saved" && (
        <div className={coverLetterStyles.savedList}>
          <h2 className={styles.formSectionTitle}>Saved cover letters</h2>
          {savedList.length === 0 ? (
            <p className={styles.emptyState}>
              No saved letters yet. Create one and click Save.
            </p>
          ) : (
            savedList.map((letter) => (
              <div key={letter.id} className={coverLetterStyles.savedItem}>
                <div>
                  <div className={coverLetterStyles.savedItemTitle}>
                    {letter.companyName} – {letter.position}
                  </div>
                  <div className={coverLetterStyles.savedItemMeta}>
                    Updated{" "}
                    {letter.updatedAt
                      ? new Date(letter.updatedAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
                <div className={coverLetterStyles.savedItemActions}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePrint(letter)}
                  >
                    Print
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(letter)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicate(letter)}
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(letter.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "create" && (
        <>
          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {editingId ? "Edit this letter" : "Application details"}
            </h2>
            <div className={styles.detailGrid}>
              <div className={styles.formGroup}>
                <label>Company name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Inc."
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Position *</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Job description (optional – paste to tailor)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description to tailor the letter..."
                rows={3}
                className={styles.input}
              />
              {aiConfigured && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSummarizeJd}
                    disabled={!jobDescription.trim() || jdSummaryLoading}
                    style={{ marginTop: "0.5rem" }}
                  >
                    {jdSummaryLoading ? "Summarizing…" : "Summarize with AI"}
                  </Button>
                  {jdSummary && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        padding: "0.75rem",
                        background: "var(--bg-tertiary)",
                        borderRadius: "var(--radius-md)",
                        whiteSpace: "pre-wrap",
                        fontSize: "var(--font-size-sm)",
                      }}
                    >
                      {jdSummary}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className={styles.formActions}>
              <Button variant="secondary" onClick={handleGenerate}>
                Regenerate body from profile
              </Button>
              {aiConfigured && (
                <Button
                  variant="secondary"
                  onClick={handleImproveWithAi}
                  disabled={!bodyText.trim() || aiLoading}
                >
                  {aiLoading ? "Improving…" : "Improve with AI"}
                </Button>
              )}
              {editingId && (
                <Button variant="ghost" onClick={resetForm}>
                  Cancel / New letter
                </Button>
              )}
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              Letter body (edit for this company)
            </h2>
            <p
              className={styles.emptyState}
              style={{ textAlign: "left", marginBottom: "0.5rem" }}
            >
              Each paragraph separated by a blank line. Customize this for every
              company.
            </p>
            <textarea
              className={coverLetterStyles.bodyEditor}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Dear Hiring Manager, ..."
              spellCheck
            />
            <div className={styles.formActions} style={{ marginTop: "1rem" }}>
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving
                  ? "Saving…"
                  : editingId
                    ? "Update letter"
                    : "Save this letter"}
              </Button>
              <Button variant="secondary" onClick={handleCopy}>
                Copy text
              </Button>
              <Button variant="secondary" onClick={() => handlePrint()}>
                Print / Save PDF
              </Button>
            </div>
          </div>

          <div className={coverLetterStyles.previewWrap}>
            <h2 className={styles.formSectionTitle}>Preview</h2>
            <div
              ref={letterRef}
              className={coverLetterStyles.letterContainer}
              dangerouslySetInnerHTML={{ __html: letterHtml }}
            />
          </div>
        </>
      )}
    </>
  );
};
