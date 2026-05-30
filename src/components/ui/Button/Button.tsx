import React from "react";
import { motion } from "@/lib/motion";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "ghost" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  as: Tag = "button",
  href,
  target,
  rel,
  className,
  ...rest
}) => {
  const cls = [styles.btn, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (Tag === "a") {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};
