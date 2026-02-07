/**
 * Admin Tasks - To-do for study & work
 */

import React, { useCallback, useEffect, useState } from "react";
import { adminService, type TaskItem } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
const STATUS_OPTIONS = [
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];
const CATEGORY_OPTIONS = [
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
];

const emptyForm = {
  title: "",
  dueDate: "",
  priority: "medium",
  status: "todo",
  category: "personal",
  notes: "",
};

export const AdminTasks: React.FC = () => {
  const [items, setItems] = useState<TaskItem[]>([]);
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
      .getTasks({
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

  const openEdit = (t: TaskItem) => {
    setEditingId(t.id);
    setForm({
      title: t.title,
      dueDate: t.dueDate?.slice(0, 10) ?? "",
      priority: t.priority ?? "medium",
      status: t.status ?? "todo",
      category: t.category ?? "personal",
      notes: t.notes ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const toggleStatus = async (t: TaskItem) => {
    const next =
      t.status === "todo"
        ? "in_progress"
        : t.status === "in_progress"
          ? "done"
          : "todo";
    try {
      await adminService.updateTask(t.id, { status: next });
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
        await adminService.updateTask(editingId, {
          title: form.title,
          dueDate: form.dueDate
            ? new Date(form.dueDate).toISOString()
            : undefined,
          priority: form.priority,
          status: form.status,
          category: form.category,
          notes: form.notes || undefined,
        });
        setMessage("Task updated.");
      } else {
        await adminService.createTask({
          title: form.title,
          dueDate: form.dueDate
            ? new Date(form.dueDate).toISOString()
            : undefined,
          priority: form.priority,
          status: form.status,
          category: form.category,
          notes: form.notes || undefined,
        });
        setMessage("Task added.");
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
    if (!window.confirm("Delete this task?")) return;
    try {
      await adminService.deleteTask(id);
      if (editingId === id) cancelEdit();
      setMessage("Task deleted.");
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
      <h1 className={styles.pageTitle}>Tasks</h1>
      <p className={styles.pageIntro}>
        Track study, work, and personal tasks. Filter by status below.
      </p>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          {editingId ? "Edit task" : "Add task"}
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
              placeholder="e.g. Finish final report"
            />
          </div>
          <div className={styles.detailGrid}>
            <div className={styles.formGroup}>
              <label>Due date</label>
              <input
                type="date"
                className={styles.input}
                value={form.dueDate}
                onChange={(e) => setField("dueDate", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Priority</label>
              <select
                className={styles.input}
                value={form.priority}
                onChange={(e) => setField("priority", e.target.value)}
              >
                {PRIORITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
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
            <div className={styles.formGroup}>
              <label>Category</label>
              <select
                className={styles.input}
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
              >
                {CATEGORY_OPTIONS.map((o) => (
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
        <label htmlFor="tasks-filter-status">Filter by status</label>
        <select
          id="tasks-filter-status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter tasks by status"
        >
          <option value="">All</option>
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
              <th>Due</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr
                key={t.id}
                className={
                  t.status === "done" ? styles.tableRowMuted : undefined
                }
              >
                <td>
                  <span
                    className={
                      t.status === "done"
                        ? styles.tableCellStrikethrough
                        : undefined
                    }
                  >
                    {t.title}
                  </span>
                </td>
                <td>
                  {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
                </td>
                <td>
                  {PRIORITY_OPTIONS.find((o) => o.value === t.priority)
                    ?.label ?? t.priority}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.tableBtnLink}
                    onClick={() => toggleStatus(t)}
                    title="Change status"
                  >
                    {STATUS_OPTIONS.find((o) => o.value === t.status)?.label ??
                      t.status}
                  </button>
                </td>
                <td>
                  {CATEGORY_OPTIONS.find((o) => o.value === t.category)
                    ?.label ?? t.category}
                </td>
                <td>
                  <div className={styles.listActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(t)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(t.id)}
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
        <p className={styles.emptyState}>No tasks yet. Add one above.</p>
      )}
      {total > 0 && (
        <p className={styles.totalCount} aria-live="polite">
          Total: {total}
        </p>
      )}
    </>
  );
};
