/**
 * Admin Projects - Full CRUD: list, add, edit (all fields), delete, save
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type Project = {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  achievements: string[];
  architecture?: string;
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

export const AdminProjects: React.FC = () => {
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

  const projects = (profile?.projects as Project[] | undefined) ?? [];

  const updateProjects = (next: Project[]) => {
    setProfile((p) => (p ? { ...p, projects: next } : null));
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
    updateProjects([
      ...projects,
      {
        title: "New Project",
        description: "",
        technologies: [],
        category: "other",
        startDate: new Date().toISOString().slice(0, 10),
        isActive: false,
        achievements: [],
      },
    ]);
    setExpandedIndex(projects.length);
  };

  const remove = (index: number) => {
    if (window.confirm("Remove this project?")) {
      updateProjects(projects.filter((_, i) => i !== index));
      if (expandedIndex === index) setExpandedIndex(null);
      else if (expandedIndex !== null && expandedIndex > index)
        setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateOne = (index: number, field: keyof Project, value: unknown) => {
    const next = [...projects];
    next[index] = { ...next[index], [field]: value };
    updateProjects(next);
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
      <h1 className={styles.pageTitle}>Projects</h1>
      <p className={styles.pageIntro}>
        Add project, edit fields or open details with +, then Save all. Use
        Delete then Save all to remove.
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
          Add project
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
              <th>Title</th>
              <th>Category</th>
              <th>Active</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
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
                      value={p.title}
                      onChange={(e) => updateOne(i, "title", e.target.value)}
                      className={`${styles.input} ${styles.tableColWider}`}
                    />
                  </td>
                  <td>
                    <select
                      value={p.category}
                      onChange={(e) => updateOne(i, "category", e.target.value)}
                      className={styles.input}
                    >
                      {[
                        "web",
                        "mobile",
                        "ai",
                        "backend",
                        "fullstack",
                        "other",
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={p.isActive}
                      onChange={(e) =>
                        updateOne(i, "isActive", e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={(p.startDate || "").slice(0, 10)}
                      onChange={(e) =>
                        updateOne(i, "startDate", e.target.value)
                      }
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={(p.endDate || "").slice(0, 10)}
                      onChange={(e) =>
                        updateOne(i, "endDate", e.target.value || undefined)
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
                    <td colSpan={7}>
                      <div className={styles.detailGrid}>
                        <div className={styles.formGroup}>
                          <label>Description</label>
                          <textarea
                            value={p.description}
                            onChange={(e) =>
                              updateOne(i, "description", e.target.value)
                            }
                            className={styles.input}
                            rows={2}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Long description</label>
                          <textarea
                            value={p.longDescription ?? ""}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "longDescription",
                                e.target.value || undefined,
                              )
                            }
                            className={styles.input}
                            rows={2}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Technologies (one per line or comma)</label>
                          <textarea
                            value={joinList(p.technologies)}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "technologies",
                                parseList(e.target.value),
                              )
                            }
                            className={styles.input}
                            rows={2}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Achievements (one per line or comma)</label>
                          <textarea
                            value={joinList(p.achievements)}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "achievements",
                                parseList(e.target.value),
                              )
                            }
                            className={styles.input}
                            rows={2}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>GitHub URL</label>
                          <input
                            type="url"
                            value={p.githubUrl ?? ""}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "githubUrl",
                                e.target.value || undefined,
                              )
                            }
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Live URL</label>
                          <input
                            type="url"
                            value={p.liveUrl ?? ""}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "liveUrl",
                                e.target.value || undefined,
                              )
                            }
                            className={styles.input}
                          />
                        </div>
                        <div
                          className={`${styles.formGroup} ${styles.gridFullWidth}`}
                        >
                          <label>Architecture</label>
                          <textarea
                            value={p.architecture ?? ""}
                            onChange={(e) =>
                              updateOne(
                                i,
                                "architecture",
                                e.target.value || undefined,
                              )
                            }
                            className={styles.input}
                            rows={2}
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
      {projects.length === 0 && (
        <p className={styles.emptyState}>
          No projects. Click &quot;Add project&quot; then &quot;Save all&quot;.
        </p>
      )}
    </>
  );
};
