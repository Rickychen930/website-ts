/**
 * Admin Testimonials - List and edit testimonials
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Testimonial = {
  id?: string;
  author: string;
  role: string;
  company: string;
  content: string;
  date: string;
  avatarUrl?: string;
};

export const AdminTestimonials: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .getProfile()
      .then(setProfile)
      .catch(() => setError("Failed to load"));
  }, []);

  const testimonials =
    (profile?.testimonials as Testimonial[] | undefined) ?? [];

  const updateTestimonials = (next: Testimonial[]) => {
    setProfile((p) => (p ? { ...p, testimonials: next } : null));
  };

  const handleSave = async () => {
    if (!profile) return;
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      await adminService.updateProfile(profile);
      await refetch();
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const addNew = () => {
    updateTestimonials([
      ...testimonials,
      {
        author: "",
        role: "",
        company: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const remove = (index: number) => {
    if (window.confirm("Remove this testimonial?")) {
      updateTestimonials(testimonials.filter((_, i) => i !== index));
    }
  };

  const updateOne = (
    index: number,
    field: keyof Testimonial,
    value: unknown,
  ) => {
    const next = [...testimonials];
    next[index] = { ...next[index], [field]: value };
    updateTestimonials(next);
  };

  if (!profile) {
    if (error)
      return (
        <p className={styles.error} role="alert">
          {error}
        </p>
      );
    return <p className={styles.loadingState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Testimonials</h1>
      <p className={styles.pageIntro}>
        Add testimonial, edit author/role/company/content inline, then Save all.
      </p>
      {message && <p className={styles.message}>{message}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div
        className={`${styles.formActions} ${styles.formActionsMarginBottom}`}
      >
        <Button variant="primary" onClick={addNew}>
          Add testimonial
        </Button>
        <Button variant="secondary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Role</th>
              <th>Company</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={t.author}
                    onChange={(e) => updateOne(i, "author", e.target.value)}
                    className={`${styles.input} ${styles.tableColMedium}`}
                  />
                </td>
                <td>
                  <input
                    value={t.role}
                    onChange={(e) => updateOne(i, "role", e.target.value)}
                    className={`${styles.input} ${styles.tableColMedium}`}
                  />
                </td>
                <td>
                  <input
                    value={t.company}
                    onChange={(e) => updateOne(i, "company", e.target.value)}
                    className={`${styles.input} ${styles.tableColMedium}`}
                  />
                </td>
                <td>
                  <textarea
                    value={t.content}
                    onChange={(e) => updateOne(i, "content", e.target.value)}
                    className={`${styles.input} ${styles.tableColWidest}`}
                    rows={2}
                  />
                </td>
                <td>
                  <Button variant="ghost" size="sm" onClick={() => remove(i)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {testimonials.length === 0 && (
        <p className={styles.emptyState}>
          No testimonials. Click &quot;Add testimonial&quot; to create one.
        </p>
      )}
    </>
  );
};
