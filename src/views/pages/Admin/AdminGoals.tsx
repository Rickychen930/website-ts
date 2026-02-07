/**
 * Admin Goals - Short-term targets (study & career)
 */

import React, { useCallback, useEffect, useState } from "react";
import { adminService, type GoalItem } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const emptyForm = {
  title: "",
  targetDate: "",
  status: "active",
  notes: "",
};

export const AdminGoals: React.FC = () => {
  const [items, setItems] = useState<GoalItem[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");

  const load = useCallback(() => {
    setLoading(true);
    adminService
      .getGoals({
        limit: 100,
        sort: "-createdAt",
        ...(filterStatus ? { status: filterStatus } : {}),
      })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [filterStatus]);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const openEdit = (g: GoalItem) => {
    setEditingId(g.id);
    setForm({
      title: g.title,
      targetDate: g.targetDate?.slice(0, 10) ?? "",
      status: g.status ?? "active",
      notes: g.notes ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const markCompleted = async (g: GoalItem) => {
    try {
      await adminService.updateGoal(g.id, {
        status: g.status === "completed" ? "active" : "completed",
      });
      load();
    } catch {
      setError("Failed to update");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      if (editingId) {
        await adminService.updateGoal(editingId, {
          title: form.title,
          targetDate: form.targetDate
            ? new Date(form.targetDate).toISOString()
            : undefined,
          status: form.status,
          notes: form.notes || undefined,
        });
        setMessage("Goal updated.");
      } else {
        await adminService.createGoal({
          title: form.title,
          targetDate: form.targetDate
            ? new Date(form.targetDate).toISOString()
            : undefined,
          status: form.status,
          notes: form.notes || undefined,
        });
        setMessage("Goal added.");
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
    if (!window.confirm("Delete this goal?")) return;
    try {
      await adminService.deleteGoal(id);
      if (editingId === id) cancelEdit();
      setMessage("Goal deleted.");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading && items.length === 0) {
    return <p className={styles.loadingState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Goals</h1>
      <p className={styles.pageIntro}>
        Short-term targets: this semester, job applications, projects, etc.
      </p>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          {editingId ? "Edit goal" : "Add goal"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title *</label>
            <input
              type="text"
              className={styles.input}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
              placeholder="e.g. Graduate this semester with 3.5 GPA"
            />
          </div>
          <div className={styles.detailGrid}>
            <div className={styles.formGroup}>
              <label>Target date</label>
              <input
                type="date"
                className={styles.input}
                value={form.targetDate}
                onChange={(e) => setField("targetDate", e.target.value)}
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

      <div className={styles.filterBar}>
        <label htmlFor="goals-filter-status">Filter by status</label>
        <select
          id="goals-filter-status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter goals by status"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Target</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((g) => (
              <tr
                key={g.id}
                className={
                  g.status === "completed" ? styles.tableRowMuted : undefined
                }
              >
                <td>
                  <span
                    className={
                      g.status === "completed"
                        ? styles.tableCellStrikethrough
                        : undefined
                    }
                  >
                    {g.title}
                  </span>
                </td>
                <td>
                  {g.targetDate
                    ? new Date(g.targetDate).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.tableBtnLink}
                    onClick={() => markCompleted(g)}
                    title="Mark completed or active"
                  >
                    {STATUS_OPTIONS.find((o) => o.value === g.status)?.label ??
                      g.status}
                  </button>
                </td>
                <td>
                  <div className={styles.listActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(g)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(g.id)}
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
        <p className={styles.emptyState}>No goals yet. Add one above.</p>
      )}
      {total > 0 && (
        <p className={styles.totalCount} aria-live="polite">
          Total: {total}
        </p>
      )}
    </>
  );
};
