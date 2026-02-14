/**
 * CodeBlock Component - Software Engineer aesthetic
 * Displays code snippets with syntax highlighting and copy-to-clipboard.
 */

import React, { useCallback, useState } from "react";
import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className={`${styles.codeBlock} ${className}`}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "var(--color-error-500)" }}
          />
          <span
            className={styles.dot}
            style={{ backgroundColor: "var(--color-warning-500)" }}
          />
          <span
            className={styles.dot}
            style={{ backgroundColor: "var(--color-accent-500)" }}
          />
        </div>
        <div className={styles.headerRight}>
          <span className={styles.language}>{language}</span>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
