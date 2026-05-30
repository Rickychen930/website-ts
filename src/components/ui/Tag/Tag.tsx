import React from "react";
import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  className,
}) => {
  const cls = [styles.tag, styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{children}</span>;
};
