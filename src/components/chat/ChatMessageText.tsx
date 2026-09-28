import React from "react";
import { Link } from "react-router-dom";

interface ChatMessageTextProps {
  text: string;
  onNavigate?: () => void;
}

// Site paths (/projects, /projects/:id, /resume, /#contact …) and https links
const TOKEN =
  /(https?:\/\/[^\s)]+|\/#(?:about|projects|work|atlas|stack|contact)\b|\/projects(?:\/[A-Za-z0-9_-]+)?|\/resume\b)/g;

/** Plain text with in-site paths turned into links */
export const ChatMessageText: React.FC<ChatMessageTextProps> = ({
  text,
  onNavigate,
}) => (
  <>
    {text.split(TOKEN).map((part, i) => {
      if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>;
      if (part.startsWith("http")) {
        const clean = part.replace(/[.,]$/, "");
        return (
          <a key={i} href={clean} target="_blank" rel="noopener noreferrer">
            {clean.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        );
      }
      if (part.startsWith("/#")) {
        return (
          <a key={i} href={part} onClick={onNavigate}>
            {part}
          </a>
        );
      }
      return (
        <Link key={i} to={part} onClick={onNavigate}>
          {part}
        </Link>
      );
    })}
  </>
);
