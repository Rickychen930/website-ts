/**
 * Admin Notes - Quick notes (study, work, interview)
 */

import React, { useCallback, useEffect, useState } from "react";
import { adminService, type NoteItem } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

const CATEGORY_OPTIONS = [
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "interview", label: "Interview" },
  { value: "other", label: "Other" },
];

const emptyForm = {
  title: "",
  content: "",
  category: "other",
};

export const AdminNotes: React.FC = () => {
  const [items, setItems] = useState<NoteItem[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("");

  const load = useCallback(() => {
    setLoading(true);
    adminService
      .getNotes({
        limit: 100,
        sort: "-updatedAt",
        ...(filterCategory ? { category: filterCategory } : {}),
      })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [filterCategory]);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const openEdit = (n: NoteItem) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      content: n.content ?? "",
      category: n.category ?? "other",
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
        await adminService.updateNote(editingId, {
          title: form.title,
          content: form.content,
          category: form.category,
        });
        setMessage("Note updated.");
      } else {
        await adminService.createNote({
          title: form.title,
          content: form.content,
          category: form.category,
        });
        setMessage("Note added.");
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
    if (!window.confirm("Delete this note?")) return;
    try {
      await adminService.deleteNote(id);
      if (editingId === id) cancelEdit();
      setExpandedId((prev) => (prev === id ? null : prev));
      setMessage("Note deleted.");
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
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Notes</h1>
        <p className={styles.pageIntro}>
          Study, work, interview prep, or other notes. Use as a scratchpad.
        </p>
      </header>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          {editingId ? "Edit note" : "Add note"}
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
              placeholder="e.g. Interview summary Company X"
            />
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
          <div className={styles.formGroup}>
            <label>Content</label>
            <textarea
              className={styles.input}
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              rows={6}
              placeholder="Write your note here..."
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
        <label htmlFor="notes-filter-category">Filter by category</label>
        <select
          id="notes-filter-category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter notes by category"
        >
          <option value="">All categories</option>
          {CATEGORY_OPTIONS.map((o) => (
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
              <th>Category</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((n) => (
              <React.Fragment key={n.id}>
                <tr>
                  <td>{n.title}</td>
                  <td>
                    {CATEGORY_OPTIONS.find((o) => o.value === n.category)
                      ?.label ?? n.category}
                  </td>
                  <td>
                    {n.updatedAt ? new Date(n.updatedAt).toLocaleString() : "—"}
                  </td>
                  <td>
                    <div className={styles.listActions}>
                      <button
                        type="button"
                        className={styles.tableBtnLink}
                        onClick={() =>
                          setExpandedId((prev) => (prev === n.id ? null : n.id))
                        }
                        aria-expanded={expandedId === n.id}
                      >
                        {expandedId === n.id ? "Hide" : "View"}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(n)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(n.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedId === n.id && (
                  <tr className={styles.detailRow}>
                    <td colSpan={4}>
                      <pre>{n.content || "(empty)"}</pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && !loading && (
        <p className={styles.emptyState}>No notes yet. Add one above.</p>
      )}
      {total > 0 && (
        <p className={styles.totalCount} aria-live="polite">
          Total: {total}
        </p>
      )}
    </>
  );
};
