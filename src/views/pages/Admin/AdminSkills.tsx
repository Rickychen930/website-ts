/**
 * Admin Skills - Full CRUD: add/edit/delete technical and soft skills, save
 */

import React, { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

type TechnicalSkill = {
  id?: string;
  name: string;
  category: string;
  proficiency: string;
  yearsOfExperience?: number;
};
type SoftSkill = { id?: string; name: string; category: string };

export const AdminSkills: React.FC = () => {
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

  const technicalSkills =
    (profile?.technicalSkills as TechnicalSkill[] | undefined) ?? [];
  const softSkills = (profile?.softSkills as SoftSkill[] | undefined) ?? [];

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

  const updateTechnical = (next: TechnicalSkill[]) => {
    setProfile((p) => (p ? { ...p, technicalSkills: next } : null));
  };
  const updateSoft = (next: SoftSkill[]) => {
    setProfile((p) => (p ? { ...p, softSkills: next } : null));
  };

  const addTechnical = () => {
    updateTechnical([
      ...technicalSkills,
      { name: "", category: "other", proficiency: "intermediate" },
    ]);
  };
  const addSoft = () => {
    updateSoft([...softSkills, { name: "", category: "other" }]);
  };

  const removeTechnical = (i: number) => {
    if (window.confirm("Remove this technical skill?"))
      updateTechnical(technicalSkills.filter((_, j) => j !== i));
  };
  const removeSoft = (i: number) => {
    if (window.confirm("Remove this soft skill?"))
      updateSoft(softSkills.filter((_, j) => j !== i));
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
        <h1 className={styles.pageTitle}>Skills</h1>
        <p className={styles.pageIntro}>
          Add technical or soft skills, edit inline, then Save all. Use Delete
          then Save all to remove.
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
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          Technical skills ({technicalSkills.length})
        </h2>
        <div
          className={`${styles.formActions} ${styles.formActionsMarginBottom}`}
        >
          <Button variant="primary" size="sm" onClick={addTechnical}>
            Add technical skill
          </Button>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {technicalSkills.map((s, i) => (
                <tr key={i}>
                  <td>
                    <input
                      value={s.name}
                      onChange={(e) => {
                        const n = [...technicalSkills];
                        n[i] = { ...n[i], name: e.target.value };
                        updateTechnical(n);
                      }}
                      className={`${styles.input} ${styles.tableColWide}`}
                    />
                  </td>
                  <td>
                    <select
                      value={s.category}
                      onChange={(e) => {
                        const n = [...technicalSkills];
                        n[i] = { ...n[i], category: e.target.value };
                        updateTechnical(n);
                      }}
                      className={styles.input}
                    >
                      {[
                        "language",
                        "framework",
                        "database",
                        "tool",
                        "cloud",
                        "other",
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={s.proficiency}
                      onChange={(e) => {
                        const n = [...technicalSkills];
                        n[i] = { ...n[i], proficiency: e.target.value };
                        updateTechnical(n);
                      }}
                      className={styles.input}
                    >
                      {["expert", "advanced", "intermediate", "beginner"].map(
                        (p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ),
                      )}
                    </select>
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTechnical(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.formSection}>
        <h2 className={styles.formSectionTitle}>
          Soft skills ({softSkills.length})
        </h2>
        <div
          className={`${styles.formActions} ${styles.formActionsMarginBottom}`}
        >
          <Button variant="primary" size="sm" onClick={addSoft}>
            Add soft skill
          </Button>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {softSkills.map((s, i) => (
                <tr key={i}>
                  <td>
                    <input
                      value={s.name}
                      onChange={(e) => {
                        const n = [...softSkills];
                        n[i] = { ...n[i], name: e.target.value };
                        updateSoft(n);
                      }}
                      className={`${styles.input} ${styles.tableColWide}`}
                    />
                  </td>
                  <td>
                    <select
                      value={s.category}
                      onChange={(e) => {
                        const n = [...softSkills];
                        n[i] = { ...n[i], category: e.target.value };
                        updateSoft(n);
                      }}
                      className={styles.input}
                    >
                      {[
                        "leadership",
                        "communication",
                        "problem-solving",
                        "collaboration",
                        "adaptability",
                        "other",
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSoft(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
