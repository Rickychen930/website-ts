/**
 * Admin Experience - Full CRUD: list, add, edit (all fields), delete, save
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Experience = {
  id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};

function parseList(s: string): string[] {
  return s
    .split(/[\n,]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}
function joinList(arr: string[]): string {
  return Array.isArray(arr) ? arr.join("\n") : "";
}

export const AdminExperience: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    adminService
      .getProfile()
      .then(setProfile)
      .catch(() => setError("Failed to load"));
  }, []);

  const experiences = (profile?.experiences as Experience[] | undefined) ?? [];

  const updateExperiences = (next: Experience[]) => {
    setProfile((p) => (p ? { ...p, experiences: next } : null));
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
    updateExperiences([
      ...experiences,
      {
        company: "",
        position: "",
        location: "",
        startDate: new Date().toISOString().slice(0, 10),
        isCurrent: false,
        description: "",
        achievements: [],
        technologies: [],
      },
    ]);
    setExpandedIndex(experiences.length);
  };

  const remove = (index: number) => {
    if (window.confirm("Remove this experience?")) {
      updateExperiences(experiences.filter((_, i) => i !== index));
      if (expandedIndex === index) setExpandedIndex(null);
      else if (expandedIndex !== null && expandedIndex > index)
        setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateOne = (
    index: number,
    field: keyof Experience,
    value: unknown,
  ) => {
    const next = [...experiences];
    next[index] = { ...next[index], [field]: value };
    updateExperiences(next);
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
      <h1 className={styles.pageTitle}>Experience</h1>
      <p className={styles.pageIntro}>
        Add experience, edit inline or expand with + for description and
        achievements, then Save all.
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
          Add experience
        </Button>
        <Button variant="secondary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableColThumb}></th>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Current</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((e, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>
                    <button
                      type="button"
                      className={styles.tableBtnLink}
                      onClick={() =>
                        setExpandedIndex(expandedIndex === i ? null : i)
                      }
                      aria-expanded={expandedIndex === i}
                      title={
                        expandedIndex === i ? "Collapse" : "Expand details"
                      }
                    >
                      {expandedIndex === i ? "−" : "+"}
                    </button>
                  </td>
                  <td>
                    <input
                      value={e.company}
                      onChange={(ev) =>
                        updateOne(i, "company", ev.target.value)
                      }
                      className={`${styles.input} ${styles.tableColWide}`}
                    />
                  </td>
                  <td>
                    <input
                      value={e.position}
                      onChange={(ev) =>
                        updateOne(i, "position", ev.target.value)
                      }
                      className={`${styles.input} ${styles.tableColWide}`}
                    />
                  </td>
                  <td>
                    <input
                      value={e.location}
                      onChange={(ev) =>
                        updateOne(i, "location", ev.target.value)
                      }
                      className={`${styles.input} ${styles.tableColMedium}`}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={e.isCurrent}
                      onChange={(ev) =>
                        updateOne(i, "isCurrent", ev.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={(e.startDate || "").slice(0, 10)}
                      onChange={(ev) =>
                        updateOne(i, "startDate", ev.target.value)
                      }
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={(e.endDate || "").slice(0, 10)}
                      onChange={(ev) =>
                        updateOne(i, "endDate", ev.target.value || undefined)
                      }
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={() => remove(i)}>
                      Delete
                    </Button>
                  </td>
                </tr>
                {expandedIndex === i && (
                  <tr className={styles.detailRow}>
                    <td colSpan={8}>
                      <div className={styles.detailGrid}>
                        <div
                          className={`${styles.formGroup} ${styles.gridFullWidth}`}
                        >
                          <label>Description</label>
                          <textarea
                            value={e.description}
                            onChange={(ev) =>
                              updateOne(i, "description", ev.target.value)
                            }
                            className={styles.input}
                            rows={3}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Achievements (one per line or comma)</label>
                          <textarea
                            value={joinList(e.achievements)}
                            onChange={(ev) =>
                              updateOne(
                                i,
                                "achievements",
                                parseList(ev.target.value),
                              )
                            }
                            className={styles.input}
                            rows={3}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Technologies (one per line or comma)</label>
                          <textarea
                            value={joinList(e.technologies)}
                            onChange={(ev) =>
                              updateOne(
                                i,
                                "technologies",
                                parseList(ev.target.value),
                              )
                            }
                            className={styles.input}
                            rows={3}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {experiences.length === 0 && (
        <p className={styles.emptyState}>
          No experiences. Click &quot;Add experience&quot; then &quot;Save
          all&quot;.
        </p>
      )}
    </>
  );
};
