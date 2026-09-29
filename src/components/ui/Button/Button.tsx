import React from "react";
import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "ghost"
  | "icon"
  | "inverse"
  | "outlineInverse";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  /** Anchor only: suggest a download (optionally with a file name) */
  download?: boolean | string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  as: Tag = "button",
  href,
  target,
  rel,
  download,
  className,
  ...rest
}) => {
  const cls = [styles.btn, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (Tag === "a") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={cls}
        data-magnetic=""
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} data-magnetic="" {...rest}>
      {children}
    </button>
  );
};
