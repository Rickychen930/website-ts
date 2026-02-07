/**
 * Admin Stats - Edit stats (By The Numbers)
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Stat = {
  id?: string;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
};

export const AdminStats: React.FC = () => {
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

  const stats = (profile?.stats as Stat[] | undefined) ?? [];

  const updateStats = (next: Stat[]) => {
    setProfile((p) => (p ? { ...p, stats: next } : null));
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
    updateStats([...stats, { label: "", value: 0 }]);
  };

  const remove = (index: number) => {
    if (window.confirm("Remove this stat?")) {
      updateStats(stats.filter((_, i) => i !== index));
    }
  };

  const updateOne = (index: number, field: keyof Stat, value: unknown) => {
    const next = [...stats];
    next[index] = { ...next[index], [field]: value };
    if (field === "value") {
      const v = value as string;
      next[index].value = /^\d+$/.test(v) ? parseInt(v, 10) : v;
    }
    updateStats(next);
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
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Stats</h1>
        <p className={styles.pageIntro}>
          Profile stats (e.g. &quot;Years of experience&quot;, &quot;Projects
          completed&quot;) with optional unit.
        </p>
      </header>
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
          Add stat
        </Button>
        <Button variant="secondary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Unit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={s.label}
                    onChange={(e) => updateOne(i, "label", e.target.value)}
                    className={`${styles.input} ${styles.tableColWide}`}
                  />
                </td>
                <td>
                  <input
                    value={String(s.value)}
                    onChange={(e) => updateOne(i, "value", e.target.value)}
                    className={`${styles.input} ${styles.tableColFixed6}`}
                  />
                </td>
                <td>
                  <input
                    value={s.unit ?? ""}
                    onChange={(e) => updateOne(i, "unit", e.target.value)}
                    className={`${styles.input} ${styles.tableColNarrow}`}
                    placeholder="e.g. +"
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
      {stats.length === 0 && (
        <p className={styles.emptyState}>
          No stats. Click &quot;Add stat&quot; to create one.
        </p>
      )}
    </>
  );
};
