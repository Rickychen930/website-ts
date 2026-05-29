import React, { useState } from "react";
import { useAdminAuth } from "@/contexts";
export const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const [secret, setSecret] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(secret);
    } catch {
      setErr("Invalid credentials.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--bg-base)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: 360,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            fontSize: "1.5rem",
          }}
        >
          Admin
        </h1>
        <input
          type="password"
          placeholder="Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
          }}
          required
        />
        {err && <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>{err}</p>}
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            background: "var(--accent-1)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
