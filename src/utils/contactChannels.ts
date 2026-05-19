/**
 * Contact channel helpers — href resolution and display formatting.
 */

import type { Contact } from "@/types/domain";

export const contactHref = (
  contact: Contact,
): { href: string; external: boolean } => {
  if (contact.type === "email") {
    return { href: `mailto:${contact.value}`, external: false };
  }
  if (contact.type === "phone") {
    return { href: `tel:${contact.value}`, external: false };
  }
  return { href: contact.value, external: true };
};

/** Shorter label for UI (e.g. LinkedIn username instead of full URL). */
export function formatChannelDisplay(
  type: Contact["type"],
  value: string,
): string {
  const raw = value.trim();
  if (!raw) return "";
  if (type === "email" || type === "phone") return raw;

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (type === "linkedin") {
      const match = url.pathname.match(/\/in\/([^/]+)/i);
      if (match) return match[1];
      const segment = url.pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
      return segment || url.hostname.replace(/^www\./, "");
    }
    if (type === "github") {
      const segment = url.pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
      return segment || url.hostname.replace(/^www\./, "");
    }
    if (type === "website") {
      return url.hostname.replace(/^www\./, "");
    }
    return url.hostname.replace(/^www\./, "");
  } catch {
    return raw;
  }
}

export function sortChannelsForDisplay(
  contacts: readonly Contact[],
): Contact[] {
  const primary = contacts.find((c) => c.isPrimary);
  const rest = contacts.filter((c) => !c.isPrimary);
  const order: Contact["type"][] = [
    "email",
    "phone",
    "linkedin",
    "github",
    "website",
    "other",
  ];
  const sortedRest = [...rest].sort(
    (a, b) => order.indexOf(a.type) - order.indexOf(b.type),
  );
  return primary ? [primary, ...sortedRest] : sortedRest;
}
