/**
 * Admin Login Page - Same layout as rest of site (Section + Card)
 */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useSEO } from "@/hooks/useSEO";
import { Section } from "@/views/components/layout/Section";
import { Card } from "@/views/components/ui/Card";
import { Button } from "@/views/components/ui/Button";
import styles from "./Admin.module.css";

export const AdminLogin: React.FC = () => {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/admin/dashboard";

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
      <Section
        title="Sign in"
        subtitle="Admin access. Enter your secret to continue."
        id="admin-login"
      >
        <Card variant="elevated" className={styles.loginCard}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <label htmlFor="admin-secret" className={styles.label}>
              Secret
            </label>
            <input
              id="admin-secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className={styles.input}
              placeholder="Enter admin secret"
              autoComplete="current-password"
              autoFocus
              disabled={loading}
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
            />
            {error && (
              <p id="login-error" className={styles.error} role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              fullWidth
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Card>
      </Section>
    </div>
  );
};
