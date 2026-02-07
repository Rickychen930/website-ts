/**
 * Admin Companies - Track companies you've applied to
 */

import React, { useEffect, useState } from "react";
import { adminService, type AppliedCompanyItem } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

const emptyForm = {
  companyName: "",
  position: "",
  appliedAt: new Date().toISOString().slice(0, 10),
  status: "applied",
  notes: "",
  jobUrl: "",
  followUpAt: "",
  nextInterviewAt: "",
  contactPerson: "",
};

export const AdminCompanies: React.FC = () => {
  const [items, setItems] = useState<AppliedCompanyItem[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [aiConfigured, setAiConfigured] = useState(false);
  const [interviewModal, setInterviewModal] =
    useState<AppliedCompanyItem | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<string | null>(
    null,
  );
  const [interviewLoading, setInterviewLoading] = useState(false);

  const load = () => {
    setLoading(true);
    adminService
      .getCompanies({ limit: 100, sort: "-appliedAt" })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    adminService
      .getAiStatus()
      .then((r) => setAiConfigured(r.configured))
      .catch(() => setAiConfigured(false));
  }, []);

  const handleGenerateInterviewQuestions = async () => {
    if (!interviewModal) return;
    setInterviewLoading(true);
    setInterviewQuestions(null);
    try {
      const { questions } = await adminService.aiGenerateInterviewQuestions({
        companyName: interviewModal.companyName,
        position: interviewModal.position,
        jobDescription: interviewModal.notes || undefined,
      });
      setInterviewQuestions(questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed");
    } finally {
      setInterviewLoading(false);
    }
  };

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const openEdit = (c: AppliedCompanyItem) => {
    setEditingId(c.id);
    setForm({
      companyName: c.companyName,
      position: c.position,
      appliedAt:
        c.appliedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      status: c.status ?? "applied",
      notes: c.notes ?? "",
      jobUrl: c.jobUrl ?? "",
      followUpAt: c.followUpAt?.slice(0, 16) ?? "",
      nextInterviewAt: c.nextInterviewAt?.slice(0, 16) ?? "",
      contactPerson: c.contactPerson ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      if (editingId) {
        await adminService.updateCompany(editingId, {
          companyName: form.companyName,
          position: form.position,
          appliedAt: new Date(form.appliedAt).toISOString(),
          status: form.status,
          notes: form.notes || undefined,
          jobUrl: form.jobUrl || undefined,
          followUpAt: form.followUpAt
            ? new Date(form.followUpAt).toISOString()
            : undefined,
          nextInterviewAt: form.nextInterviewAt
            ? new Date(form.nextInterviewAt).toISOString()
            : undefined,
          contactPerson: form.contactPerson || undefined,
        });
        setMessage("Updated.");
      } else {
        await adminService.createCompany({
          companyName: form.companyName,
          position: form.position,
          appliedAt: new Date(form.appliedAt).toISOString(),
          status: form.status,
          notes: form.notes || undefined,
          jobUrl: form.jobUrl || undefined,
          followUpAt: form.followUpAt
            ? new Date(form.followUpAt).toISOString()
            : undefined,
          nextInterviewAt: form.nextInterviewAt
            ? new Date(form.nextInterviewAt).toISOString()
            : undefined,
          contactPerson: form.contactPerson || undefined,
        });
        setMessage("Added.");
        setForm(emptyForm);
      }
      setEditingId(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this company from the list?")) return;
    try {
      await adminService.deleteCompany(id);
      if (editingId === id) cancelEdit();
      setMessage("Removed.");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading && items.length === 0) {
    return <p className={styles.emptyState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Companies applied</h1>
      <p
        className={styles.emptyState}
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        Track companies you've applied to so you don't forget.
      </p>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          {editingId ? "Edit company" : "Add company"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.detailGrid}>
            <div className={styles.formGroup}>
              <label>Company name *</label>
              <input
                type="text"
                className={styles.input}
                value={form.companyName}
                onChange={(e) => setField("companyName", e.target.value)}
                required
                placeholder="e.g. PT ABC"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Position *</label>
              <input
                type="text"
                className={styles.input}
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
                required
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Applied date</label>
              <input
                type="date"
                className={styles.input}
                value={form.appliedAt}
                onChange={(e) => setField("appliedAt", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                className={styles.input}
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Job URL</label>
            <input
              type="url"
              className={styles.input}
              value={form.jobUrl}
              onChange={(e) => setField("jobUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className={styles.detailGrid}>
            <div className={styles.formGroup}>
              <label>Follow-up date</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={form.followUpAt}
                onChange={(e) => setField("followUpAt", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Next interview</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={form.nextInterviewAt}
                onChange={(e) => setField("nextInterviewAt", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Contact (recruiter / HM)</label>
              <input
                type="text"
                className={styles.input}
                value={form.contactPerson}
                onChange={(e) => setField("contactPerson", e.target.value)}
                placeholder="Name or email"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Notes</label>
            <textarea
              className={styles.input}
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              rows={2}
              placeholder="Optional notes"
            />
          </div>
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save" : "Add"}
            </Button>
            {editingId && (
              <Button type="button" variant="ghost" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Follow-up</th>
              <th>Interview</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td>{c.companyName}</td>
                <td>{c.position}</td>
                <td>
                  {c.appliedAt
                    ? new Date(c.appliedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {STATUS_OPTIONS.find((o) => o.value === c.status)?.label ??
                    c.status}
                </td>
                <td>
                  {c.followUpAt
                    ? new Date(c.followUpAt).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "—"}
                </td>
                <td>
                  {c.nextInterviewAt
                    ? new Date(c.nextInterviewAt).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "—"}
                </td>
                <td className={styles.msgPreview} title={c.notes ?? ""}>
                  {c.notes
                    ? c.notes.length > 20
                      ? `${c.notes.slice(0, 20)}…`
                      : c.notes
                    : "—"}
                </td>
                <td>
                  <div className={styles.listActions}>
                    {c.jobUrl && (
                      <a
                        href={c.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.toggleDetail}
                      >
                        Link
                      </a>
                    )}
                    {aiConfigured && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setInterviewModal(c);
                          setInterviewQuestions(null);
                        }}
                      >
                        Questions
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(c)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {interviewModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setInterviewModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="interview-questions-title"
        >
          <div
            className={styles.formSection}
            style={{ maxWidth: "32rem", maxHeight: "85vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="interview-questions-title"
              className={styles.formSectionTitle}
            >
              Interview questions – {interviewModal.companyName} (
              {interviewModal.position})
            </h2>
            {aiConfigured && (
              <div
                className={styles.formActions}
                style={{ marginBottom: "1rem" }}
              >
                <Button
                  variant="primary"
                  onClick={handleGenerateInterviewQuestions}
                  disabled={interviewLoading}
                >
                  {interviewLoading ? "Generating…" : "Generate with AI"}
                </Button>
                <Button variant="ghost" onClick={() => setInterviewModal(null)}>
                  Close
                </Button>
              </div>
            )}
            {interviewQuestions && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  fontSize: "var(--font-size-sm)",
                  margin: 0,
                }}
              >
                {interviewQuestions}
              </pre>
            )}
            {!aiConfigured && (
              <p className={styles.emptyState}>
                Set OPENAI_API_KEY on the server to generate interview
                questions.
              </p>
            )}
          </div>
        </div>
      )}

      {items.length === 0 && !loading && (
        <p className={styles.emptyState}>No companies yet. Add one above.</p>
      )}
      {total > 0 && (
        <p className={styles.emptyState} style={{ marginTop: "0.5rem" }}>
          Total: {total}
        </p>
      )}
    </>
  );
};
