/**
 * Admin Saved Jobs - Wishlist of jobs to apply to later
 */

import React, { useEffect, useState } from "react";
import { adminService, type SavedJobItem } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const emptyForm = {
  companyName: "",
  position: "",
  jobUrl: "",
  source: "",
  notes: "",
};

export const AdminSavedJobs: React.FC = () => {
  const [items, setItems] = useState<SavedJobItem[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    adminService
      .getSavedJobs({ limit: 100, sort: "-savedAt" })
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

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const openEdit = (j: SavedJobItem) => {
    setEditingId(j.id);
    setForm({
      companyName: j.companyName,
      position: j.position,
      jobUrl: j.jobUrl ?? "",
      source: j.source ?? "",
      notes: j.notes ?? "",
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
        await adminService.updateSavedJob(editingId, {
          companyName: form.companyName,
          position: form.position,
          jobUrl: form.jobUrl || undefined,
          source: form.source || undefined,
          notes: form.notes || undefined,
        });
        setMessage("Updated.");
      } else {
        await adminService.createSavedJob({
          companyName: form.companyName,
          position: form.position,
          jobUrl: form.jobUrl || undefined,
          source: form.source || undefined,
          notes: form.notes || undefined,
        });
        setMessage("Saved.");
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
    if (!window.confirm("Remove from saved jobs?")) return;
    try {
      await adminService.deleteSavedJob(id);
      if (editingId === id) cancelEdit();
      setMessage("Removed.");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  /** Move to Companies applied and remove from saved */
  const handleApply = async (j: SavedJobItem) => {
    setError(null);
    try {
      await adminService.createCompany({
        companyName: j.companyName,
        position: j.position,
        jobUrl: j.jobUrl || undefined,
        status: "applied",
      });
      await adminService.deleteSavedJob(j.id);
      setMessage(
        `"${j.companyName} – ${j.position}" moved to Companies applied.`,
      );
      load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to move to applied",
      );
    }
  };

  if (loading && items.length === 0) {
    return <p className={styles.loadingState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Saved jobs</h1>
      <p className={styles.pageIntro}>
        Jobs you want to apply to later. When you apply, click &quot;Apply&quot;
        to move them to Companies applied.
      </p>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          {editingId ? "Edit saved job" : "Add job to wishlist"}
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
                placeholder="e.g. Acme Inc."
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
              <label>Job URL</label>
              <input
                type="url"
                className={styles.input}
                value={form.jobUrl}
                onChange={(e) => setField("jobUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className={styles.formGroup}>
              <label>Source</label>
              <input
                type="text"
                className={styles.input}
                value={form.source}
                onChange={(e) => setField("source", e.target.value)}
                placeholder="e.g. LinkedIn, Indeed"
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
              placeholder="Optional"
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
              <th>Source</th>
              <th>Saved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((j) => (
              <tr key={j.id}>
                <td>{j.companyName}</td>
                <td>{j.position}</td>
                <td>{j.source || "—"}</td>
                <td>
                  {j.savedAt ? new Date(j.savedAt).toLocaleDateString() : "—"}
                </td>
                <td>
                  <div className={styles.listActions}>
                    {j.jobUrl && (
                      <a
                        href={j.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.toggleDetail}
                      >
                        Link
                      </a>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApply(j)}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(j)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(j.id)}
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
      {items.length === 0 && !loading && (
        <p className={styles.emptyState}>No saved jobs yet. Add one above.</p>
      )}
      {total > 0 && (
        <p className={styles.totalCount} aria-live="polite">
          Total: {total}
        </p>
      )}
    </>
  );
};
