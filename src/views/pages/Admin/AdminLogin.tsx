/**
 * Admin Login – Full-screen centered panel, modern design
 */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

export const AdminLogin: React.FC = () => {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const rawFrom = (location.state as { from?: { pathname?: string } })?.from
    ?.pathname;
  const from =
    rawFrom && String(rawFrom).startsWith("/admin")
      ? rawFrom
      : "/admin/dashboard";

  useSEO({
    title: "Sign in | Admin",
    description: "Admin sign in to manage portfolio content.",
    type: "website",
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(secret);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBackdrop} aria-hidden="true" />
      <div className={styles.loginCard}>
        <div className={styles.loginBrand}>
          <span className={styles.loginLogo} aria-hidden="true">
            ◈
          </span>
          <h1 className={styles.loginTitle}>Admin</h1>
          <p className={styles.loginSubtitle}>
            Portfolio control panel · Sign in to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label htmlFor="admin-secret" className={styles.loginLabel}>
            Secret key
          </label>
          <input
            id="admin-secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className={styles.loginInput}
            placeholder="Enter your secret"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
          />
          {error && (
            <p id="login-error" className={styles.loginError} role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            fullWidth
            className={styles.loginSubmit}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};
