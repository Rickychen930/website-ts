/**
 * Admin Academics - List and edit education
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Academic = {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

export const AdminAcademics: React.FC = () => {
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

  const academics = (profile?.academics as Academic[] | undefined) ?? [];

  const update = (next: Academic[]) => {
    setProfile((p) => (p ? { ...p, academics: next } : null));
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
    update([
      ...academics,
      {
        institution: "",
        degree: "",
        field: "",
        startDate: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const remove = (i: number) => {
    if (window.confirm("Remove?"))
      update(academics.filter((_, idx) => idx !== i));
  };

  const setOne = (i: number, field: keyof Academic, value: unknown) => {
    const next = [...academics];
    next[i] = { ...next[i], [field]: value };
    update(next);
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
      <h1 className={styles.pageTitle}>Academics</h1>
      <p className={styles.pageIntro}>
        Education entries: institution, degree, field, and dates.
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
        <Button variant="primary" onClick={add}>
          Add
        </Button>
        <Button variant="secondary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Start</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {academics.map((a, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={a.institution}
                    onChange={(e) => setOne(i, "institution", e.target.value)}
                    className={`${styles.input} ${styles.tableColWide}`}
                  />
                </td>
                <td>
                  <input
                    value={a.degree}
                    onChange={(e) => setOne(i, "degree", e.target.value)}
                    className={`${styles.input} ${styles.tableColMedium}`}
                  />
                </td>
                <td>
                  <input
                    value={a.field}
                    onChange={(e) => setOne(i, "field", e.target.value)}
                    className={`${styles.input} ${styles.tableColMedium}`}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={(a.startDate || "").slice(0, 10)}
                    onChange={(e) => setOne(i, "startDate", e.target.value)}
                    className={styles.input}
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
      {academics.length === 0 && (
        <p className={styles.emptyState}>
          No academics. Click Add to create one.
        </p>
      )}
    </>
  );
};
