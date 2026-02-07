/**
 * Admin Profile - Edit name, title, location, bio, languages
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Language = { id?: string; name: string; proficiency: string };

const PROFICIENCY_OPTIONS = [
  "native",
  "fluent",
  "professional",
  "conversational",
  "basic",
];

export const AdminProfile: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .getProfile()
      .then(setProfile)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      await adminService.updateProfile({
        name: profile.name,
        title: profile.title,
        location: profile.location,
        bio: profile.bio,
        academics: profile.academics,
        certifications: profile.certifications,
        contacts: profile.contacts,
        experiences: profile.experiences,
        honors: profile.honors,
        languages: profile.languages,
        projects: profile.projects,
        softSkills: profile.softSkills,
        stats: profile.stats,
        technicalSkills: profile.technicalSkills,
        testimonials: profile.testimonials,
      });
      await refetch();
      setMessage("Profile saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const languages = (profile?.languages as Language[] | undefined) ?? [];
  const setLanguages = (next: Language[]) => {
    setProfile((p) => (p ? { ...p, languages: next } : null));
  };
  const addLanguage = () => {
    setLanguages([...languages, { name: "", proficiency: "professional" }]);
  };
  const removeLanguage = (i: number) => {
    if (window.confirm("Remove this language?"))
      setLanguages(languages.filter((_, idx) => idx !== i));
  };
  const updateLanguage = (i: number, field: keyof Language, value: string) => {
    const next = [...languages];
    next[i] = { ...next[i], [field]: value };
    setLanguages(next);
  };

  if (!profile) {
    if (error)
      return (
        <p className={styles.emptyState} role="alert">
          Error: {error}
        </p>
      );
    return <p className={styles.loadingState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Profile</h1>
      <p className={styles.pageIntro}>
        Edit fields below, then Save profile. Other sections (Projects,
        Experience, etc.) are in the sidebar.
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Basic info</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={String(profile.name ?? "")}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={String(profile.title ?? "")}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={String(profile.location ?? "")}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={String(profile.bio ?? "")}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={5}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Languages</h2>
          {languages.map((lang, i) => (
            <div
              key={lang.id ?? i}
              className={`${styles.formGroup} ${styles.formRow}`}
            >
              <input
                className={styles.formRowFlex1}
                placeholder="Language name"
                value={lang.name}
                onChange={(e) => updateLanguage(i, "name", e.target.value)}
              />
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  updateLanguage(i, "proficiency", e.target.value)
                }
              >
                {PROFICIENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(i)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className={styles.formActionsMarginBottom}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLanguage}
            >
              Add language
            </Button>
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </>
  );
};
