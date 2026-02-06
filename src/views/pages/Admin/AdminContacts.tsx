/**
 * Admin Contacts - Edit contact info (email, phone, links)
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Contact = {
  id?: string;
  type: string;
  value: string;
  label: string;
  isPrimary: boolean;
};

export const AdminContacts: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService.getProfile().then(setProfile).catch(() => setError("Failed to load"));
  }, []);

  const contacts = (profile?.contacts as Contact[] | undefined) ?? [];

  const update = (next: Contact[]) => {
    setProfile((p) => (p ? { ...p, contacts: next } : null));
  };

  const save = async () => {
    if (!profile) return;
    const primaryCount = (profile.contacts as Contact[]).filter((c) => c.isPrimary).length;
    if (primaryCount !== 1) {
      setError("Exactly one contact must be marked as primary.");
      return;
    }
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
    update([...contacts, { type: "other", value: "", label: "", isPrimary: false }]);
  };

  const remove = (i: number) => {
    if (window.confirm("Remove?")) update(contacts.filter((_, idx) => idx !== i));
  };

  const setOne = (i: number, field: keyof Contact, value: unknown) => {
    const next = [...contacts];
    next[i] = { ...next[i], [field]: value };
    update(next);
  };

  if (!profile) {
    if (error) return <p className={styles.emptyState}>Error: {error}</p>;
    return <p className={styles.emptyState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Contact info</h1>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.formActions} style={{ marginBottom: "1rem" }}>
        <Button variant="primary" onClick={add}>Add contact</Button>
        <Button variant="secondary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save all"}</Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Label</th>
              <th>Value</th>
              <th>Primary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={i}>
                <td>
                  <select value={c.type} onChange={(e) => setOne(i, "type", e.target.value)} className={styles.input}>
                    {["email", "phone", "linkedin", "github", "website", "other"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </td>
                <td><input value={c.label} onChange={(e) => setOne(i, "label", e.target.value)} className={styles.input} style={{ maxWidth: "8rem" }} /></td>
                <td><input value={c.value} onChange={(e) => setOne(i, "value", e.target.value)} className={styles.input} style={{ maxWidth: "14rem" }} /></td>
                <td>
                  <input
                    type="radio"
                    name="primary"
                    checked={c.isPrimary}
                    onChange={() => update(contacts.map((x, j) => ({ ...x, isPrimary: j === i })))}
                  />
                </td>
                <td><Button variant="ghost" size="sm" onClick={() => remove(i)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {contacts.length === 0 && <p className={styles.emptyState}>No contacts. Click Add to create one.</p>}
    </>
  );
};
