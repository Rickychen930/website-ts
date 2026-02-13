/**
 * Admin Learning - Edit learning sections and topics (profile.learningSections)
 * DRY: reuses Admin styles; single source of truth via profile.
 */

import React, { useCallback, useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { adminService } from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import type { LearningSection } from "@/types/domain";
import styles from "./Admin.module.css";

type EditableItem = {
  id?: string;
  title: string;
  description: string;
  order: number;
  content: string;
  codeExample: string;
  codeLanguage: string;
  imageUrl: string;
};

type EditableSection = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  published: boolean;
  items: EditableItem[];
};

function toEditable(s: LearningSection): EditableSection {
  return {
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description ?? "",
    order: s.order,
    published: s.published,
    items: [...(s.items ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description ?? "",
        order: t.order,
        content: t.content ?? "",
        codeExample: t.codeExample ?? "",
        codeLanguage: t.codeLanguage ?? "",
        imageUrl: t.imageUrl ?? "",
      })),
  };
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const AdminLearning: React.FC = () => {
  const { refetch } = useProfile();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(() => {
    adminService
      .getProfile()
      .then(setProfile)
      .catch(() => setError("Failed to load profile"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const sections: EditableSection[] = (
    (profile?.learningSections as LearningSection[] | undefined) ?? []
  ).map(toEditable);

  const updateSections = useCallback((next: EditableSection[]) => {
    setProfile((p) => (p ? { ...p, learningSections: next } : null));
  }, []);

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

  const addSection = () => {
    const order = sections.length;
    const title = "New section";
    updateSections([
      ...sections,
      {
        title,
        slug: slugFromTitle(title),
        description: "",
        order,
        published: false,
        items: [],
      },
    ]);
    setExpandedId(`new-${order}`);
  };

  const removeSection = (index: number) => {
    if (!window.confirm("Remove this section and all its topics?")) return;
    updateSections(sections.filter((_, i) => i !== index));
    setExpandedId(null);
  };

  const setSection = (
    index: number,
    field: keyof EditableSection,
    value: unknown,
  ) => {
    const next = [...sections];
    const sec = next[index] as Record<string, unknown>;
    sec[field] = value;
    if (field === "title") {
      sec.slug = slugFromTitle(String(value));
    }
    updateSections(next);
  };

  const addItem = (sectionIndex: number) => {
    const sec = sections[sectionIndex];
    if (!sec) return;
    const order = sec.items.length;
    updateSections(
      sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              items: [
                ...s.items,
                {
                  title: "",
                  description: "",
                  order,
                  content: "",
                  codeExample: "",
                  codeLanguage: "",
                  imageUrl: "",
                },
              ],
            }
          : s,
      ),
    );
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    if (!window.confirm("Remove this topic?")) return;
    updateSections(
      sections.map((s, i) =>
        i === sectionIndex
          ? { ...s, items: s.items.filter((_, j) => j !== itemIndex) }
          : s,
      ),
    );
  };

  const setItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof EditableItem,
    value: string | number,
  ) => {
    updateSections(
      sections.map((s, i) => {
        if (i !== sectionIndex) return s;
        const items = [...s.items];
        const it = items[itemIndex];
        if (!it) return s;
        (it as Record<string, unknown>)[field] = value;
        return { ...s, items };
      }),
    );
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
        <h1 className={styles.pageTitle}>Learning sections</h1>
        <p className={styles.pageIntro}>
          Edit sections and topics shown on the public Learning page. Only
          published sections are visible.
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
        <Button variant="primary" onClick={addSection}>
          Add section
        </Button>
        <Button variant="secondary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save all"}
        </Button>
      </div>

      <div className={styles.learningSections}>
        {sections.map((sec, sIdx) => (
          <div key={sec.id ?? `sec-${sIdx}`} className={styles.learningBlock}>
            <div className={styles.learningSectionHeader}>
              <button
                type="button"
                className={styles.learningSectionTitleBtn}
                onClick={() =>
                  setExpandedId(
                    expandedId === sec.id ? null : (sec.id ?? `sec-${sIdx}`),
                  )
                }
                aria-expanded={
                  expandedId === sec.id || expandedId === `sec-${sIdx}`
                }
              >
                {sec.title || "Untitled section"}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSection(sIdx)}
              >
                Delete section
              </Button>
            </div>
            <div
              className={
                expandedId === sec.id ||
                expandedId === `sec-${sIdx}` ||
                expandedId === `new-${sIdx}`
                  ? styles.learningSectionBody
                  : styles.learningSectionBodyHidden
              }
            >
              <div className={styles.learningFields}>
                <label className={styles.label}>
                  Title
                  <input
                    value={sec.title}
                    onChange={(e) => setSection(sIdx, "title", e.target.value)}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Slug
                  <input
                    value={sec.slug}
                    onChange={(e) => setSection(sIdx, "slug", e.target.value)}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Description
                  <input
                    value={sec.description}
                    onChange={(e) =>
                      setSection(sIdx, "description", e.target.value)
                    }
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Order
                  <input
                    type="number"
                    value={sec.order}
                    onChange={(e) =>
                      setSection(
                        sIdx,
                        "order",
                        parseInt(e.target.value, 10) || 0,
                      )
                    }
                    className={styles.input}
                  />
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={sec.published}
                    onChange={(e) =>
                      setSection(sIdx, "published", e.target.checked)
                    }
                  />
                  Published
                </label>
              </div>
              <div className={styles.learningItems}>
                <div className={styles.learningItemsHeader}>
                  <span>Topics</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addItem(sIdx)}
                  >
                    Add topic
                  </Button>
                </div>
                {sec.items.map((item, iIdx) => (
                  <div
                    key={item.id ?? `item-${iIdx}`}
                    className={styles.learningItemBlock}
                  >
                    <div className={styles.learningItemRow}>
                      <input
                        value={item.title}
                        onChange={(e) =>
                          setItem(sIdx, iIdx, "title", e.target.value)
                        }
                        placeholder="Topic title"
                        className={styles.input}
                      />
                      <input
                        value={item.description}
                        onChange={(e) =>
                          setItem(sIdx, iIdx, "description", e.target.value)
                        }
                        placeholder="Short description"
                        className={`${styles.input} ${styles.tableColWide}`}
                      />
                      <input
                        type="number"
                        value={item.order}
                        onChange={(e) =>
                          setItem(
                            sIdx,
                            iIdx,
                            "order",
                            parseInt(e.target.value, 10) || 0,
                          )
                        }
                        className={styles.input}
                        style={{ width: "4rem" }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(sIdx, iIdx)}
                      >
                        Remove
                      </Button>
                    </div>
                    <label className={styles.label}>
                      Content (full text, paragraphs separated by blank lines)
                      <textarea
                        value={item.content}
                        onChange={(e) =>
                          setItem(sIdx, iIdx, "content", e.target.value)
                        }
                        placeholder="Optional: full content"
                        className={styles.textarea}
                        rows={3}
                      />
                    </label>
                    <label className={styles.label}>
                      Code example
                      <textarea
                        value={item.codeExample}
                        onChange={(e) =>
                          setItem(sIdx, iIdx, "codeExample", e.target.value)
                        }
                        placeholder="Optional: code snippet"
                        className={styles.textarea}
                        rows={4}
                      />
                    </label>
                    <div className={styles.learningItemRow}>
                      <label className={styles.label} style={{ flex: 1 }}>
                        Image URL
                        <input
                          value={item.imageUrl}
                          onChange={(e) =>
                            setItem(sIdx, iIdx, "imageUrl", e.target.value)
                          }
                          placeholder="https://..."
                          className={styles.input}
                        />
                      </label>
                      <label className={styles.label} style={{ width: "8rem" }}>
                        Code language
                        <input
                          value={item.codeLanguage}
                          onChange={(e) =>
                            setItem(sIdx, iIdx, "codeLanguage", e.target.value)
                          }
                          placeholder="e.g. cpp, javascript"
                          className={styles.input}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {sections.length === 0 && (
        <p className={styles.emptyState}>
          No sections. Click &quot;Add section&quot; to create one.
        </p>
      )}
    </>
  );
};
