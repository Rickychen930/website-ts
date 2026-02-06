/**
 * Admin Profile - Edit name, title, location, bio
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

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
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
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

  if (!profile) {
    if (error) return <p className={styles.emptyState} role="alert">Error: {error}</p>;
    return <p className={styles.emptyState}>Loading…</p>;
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Profile</h1>
      <p className={styles.emptyState} style={{ marginBottom: "1rem", textAlign: "left" }}>
        Update: edit fields below → Save profile. (Other sections in sidebar for projects, experience, etc.)
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
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={String(profile.location ?? "")}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
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
          {error && <p className={styles.error} role="alert">{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
