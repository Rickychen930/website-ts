/**
 * Admin Messages - Contact form submissions (read-only list + delete)
 */

import React, { useEffect, useState } from "react";
import {
  adminService,
  type ContactMessageItem,
  type ContactMessagesResponse,
} from "@/services/AdminService";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

export const AdminMessages: React.FC = () => {
  const [data, setData] = useState<ContactMessagesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminService
      .getContactMessages({ limit: 100 })
      .then(setData)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await adminService.deleteContactMessage(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (loading && !data) {
    return <p className={styles.loadingState}>Loading…</p>;
  }
  if (error && !data) {
    return (
      <p className={styles.emptyState} role="alert">
        Error: {error}
      </p>
    );
  }

  const items = data?.items ?? [];

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contact messages</h1>
        <p className={styles.pageIntro}>
          Messages sent from the site contact form. Delete to remove.
        </p>
      </header>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((msg: ContactMessageItem) => (
              <tr key={msg.id}>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className={styles.msgPreview} title={msg.message}>
                  {msg.message}
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <p className={styles.emptyState}>No messages yet.</p>
      )}
    </>
  );
};
