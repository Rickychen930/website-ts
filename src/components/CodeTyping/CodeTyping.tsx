/**
 * Code Typing Animation - Typing effect for code snippets
 */

import React, { useState, useEffect } from "react";
import styles from "./CodeTyping.module.css";

interface CodeTypingProps {
  code: string;
  speed?: number;
  className?: string;
}

export const CodeTyping: React.FC<CodeTypingProps> = ({
  code,
  speed = 50,
  className = "",
}) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedCode("");
    setIsTyping(true);
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    const timeout = setTimeout(typeChar, 500);
    return () => clearTimeout(timeout);
  }, [code, speed]);

  return (
    <div className={`${styles.codeTyping} ${className}`}>
      <pre className={styles.codeBlock}>
        <code>
          {displayedCode}
          {isTyping && <span className={styles.cursor}>|</span>}
        </code>
      </pre>
    </div>
  );
};
