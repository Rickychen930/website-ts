// React 19 + Framer Motion 11 compatibility shim.
// AnimatePresence/LayoutGroup return Element|undefined — React 19 rejects in JSX.
import React from "react";
import { AnimatePresence as _AP, LayoutGroup as _LG } from "framer-motion";

interface APProps {
  children?: React.ReactNode;
  mode?: "sync" | "wait" | "popLayout";
  initial?: boolean;
  onExitComplete?: () => void;
  presenceAffectsLayout?: boolean;
  custom?: unknown;
}

interface LGProps {
  children?: React.ReactNode;
  id?: string;
  inherit?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AnimatePresence: React.FC<APProps> = _AP as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LayoutGroup: React.FC<LGProps> = _LG as any;

export * from "framer-motion";
