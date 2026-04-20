/**
 * LinkButton – renders a react-router <Link> that looks like a <Button>.
 * Use this instead of <Link><Button> (which produces invalid <a><button> HTML).
 */

import React from "react";
import { Link, type LinkProps } from "react-router-dom";
import styles from "./Button.module.css";

export interface LinkButtonProps extends Omit<LinkProps, "className"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles["button--full-width"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classNames} {...props}>
      {children}
    </Link>
  );
};
