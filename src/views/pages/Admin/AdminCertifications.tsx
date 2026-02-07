/**
 * Admin Certifications - List and edit certifications
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Certification = {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
};

export const AdminCertifications: React.FC = () => {
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

  const certs = (profile?.certifications as Certification[] | undefined) ?? [];

  const update = (next: Certification[]) => {
    setProfile((p) => (p ? { ...p, certifications: next } : null));
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
      ...certs,
      {
        name: "",
        issuer: "",
        issueDate: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const remove = (i: number) => {
    if (window.confirm("Remove?")) update(certs.filter((_, idx) => idx !== i));
  };

  const setOne = (i: number, field: keyof Certification, value: unknown) => {
    const next = [...certs];
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
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Certifications</h1>
        <p className={styles.pageIntro}>
          Professional certifications: name, issuer, and issue date.
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
              <th>Name</th>
              <th>Issuer</th>
              <th>Issue date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={c.name}
                    onChange={(e) => setOne(i, "name", e.target.value)}
                    className={`${styles.input} ${styles.tableColWider}`}
                  />
                </td>
                <td>
                  <input
                    value={c.issuer}
                    onChange={(e) => setOne(i, "issuer", e.target.value)}
                    className={`${styles.input} ${styles.tableColWide}`}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={(c.issueDate || "").slice(0, 10)}
                    onChange={(e) => setOne(i, "issueDate", e.target.value)}
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
      {certs.length === 0 && (
        <p className={styles.emptyState}>
          No certifications. Click Add to create one.
        </p>
      )}
    </>
  );
};
