/**
 * Admin Honors - List and edit honors/awards
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Honor = {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
};

export const AdminHonors: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService.getProfile().then(setProfile).catch(() => setError("Failed to load"));
  }, []);

  const honors = (profile?.honors as Honor[] | undefined) ?? [];

  const update = (next: Honor[]) => {
    setProfile((p) => (p ? { ...p, honors: next } : null));
  };

  const save = async () => {
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

  const add = () => {
    update([...honors, { title: "", issuer: "", date: new Date().toISOString().slice(0, 10) }]);
  };

  const remove = (i: number) => {
    if (window.confirm("Remove?")) update(honors.filter((_, idx) => idx !== i));
  };

  const setOne = (i: number, field: keyof Honor, value: unknown) => {
    const next = [...honors];
    next[i] = { ...next[i], [field]: value };
    update(next);
  };

  if (!profile) {
    if (error) return <p className={styles.emptyState}>Error: {error}</p>;
    return <p className={styles.emptyState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Honors & Awards</h1>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.formActions} style={{ marginBottom: "1rem" }}>
        <Button variant="primary" onClick={add}>Add</Button>
        <Button variant="secondary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save all"}</Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Issuer</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {honors.map((h, i) => (
              <tr key={i}>
                <td><input value={h.title} onChange={(e) => setOne(i, "title", e.target.value)} className={styles.input} style={{ maxWidth: "14rem" }} /></td>
                <td><input value={h.issuer} onChange={(e) => setOne(i, "issuer", e.target.value)} className={styles.input} style={{ maxWidth: "12rem" }} /></td>
                <td><input type="date" value={(h.date || "").slice(0, 10)} onChange={(e) => setOne(i, "date", e.target.value)} className={styles.input} /></td>
                <td><Button variant="ghost" size="sm" onClick={() => remove(i)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {honors.length === 0 && <p className={styles.emptyState}>No honors. Click Add to create one.</p>}
    </>
  );
};
