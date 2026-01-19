/**
 * CodeBlock Component - Software Engineer aesthetic
 * Displays code snippets with syntax highlighting ready
 */

import React from "react";
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
  return (
    <div className={`${styles.codeBlock} ${className}`}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ backgroundColor: "#ef4444" }} />
          <span className={styles.dot} style={{ backgroundColor: "#f59e0b" }} />
          <span className={styles.dot} style={{ backgroundColor: "#22c55e" }} />
        </div>
        <span className={styles.language}>{language}</span>
      </div>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
