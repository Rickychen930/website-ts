/**
 * ContactChannelsPanel — editorial direct-contact list (Contact + Home).
 */

import React from "react";
import { ContactChannelIcon } from "@/components/ContactChannelIcon";
import { LinkButton } from "@/views/components/ui/Button";
import {
  contactHref,
  formatChannelDisplay,
  sortChannelsForDisplay,
} from "@/utils/contactChannels";
import type { Contact } from "@/types/domain";
import styles from "./ContactChannelsPanel.module.css";

export interface ContactChannelsPanelProps {
  channels: readonly Contact[];
  /** HTML id for the panel heading (accessibility). */
  headingId?: string;
  title?: string;
  lead?: string;
  variant?: "sidebar" | "compact";
  showQuickLinks?: boolean;
  className?: string;
}

const TYPE_LABEL: Record<Contact["type"], string> = {
  email: "Email",
  phone: "Phone",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Website",
  other: "Link",
};

export const ContactChannelsPanel: React.FC<ContactChannelsPanelProps> = ({
  channels,
  headingId = "contact-channels-title",
  title = "Direct channels",
  lead = "Fastest path for hiring, partnerships, or project inquiries.",
  variant = "sidebar",
  showQuickLinks = false,
  className,
}) => {
  const sorted = sortChannelsForDisplay(channels);
  const [primary, ...secondary] = sorted;

  const rootClass = [
    styles.panel,
    variant === "compact" ? styles.panelCompact : styles.panelSidebar,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (sorted.length === 0) {
    return (
      <div className={rootClass}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>
        <p className={styles.empty} role="status">
          No contact channels listed yet. Use the message form to reach out.
        </p>
        {showQuickLinks ? <QuickLinks /> : null}
      </div>
    );
  }

  const showHead = Boolean(title.trim() || lead.trim());

  return (
    <div
      className={rootClass}
      {...(showHead ? { "aria-labelledby": headingId } : {})}
    >
      {showHead ? (
        <div className={styles.head}>
          {title.trim() ? (
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          ) : null}
          {lead.trim() ? <p className={styles.lead}>{lead}</p> : null}
        </div>
      ) : null}

      {primary ? <PrimaryChannelRow channel={primary} /> : null}

      {secondary.length > 0 ? (
        <ul className={styles.list} aria-label="Additional contact channels">
          {secondary.map((channel) => (
            <li key={channel.id}>
              <ChannelRow channel={channel} />
            </li>
          ))}
        </ul>
      ) : null}

      {showQuickLinks ? <QuickLinks /> : null}
    </div>
  );
};

const QuickLinks: React.FC = () => (
  <div className={styles.quickLinks}>
    <LinkButton to="/projects" variant="outline" size="sm">
      View projects
    </LinkButton>
    <LinkButton to="/resume" variant="ghost" size="sm">
      Resume
    </LinkButton>
  </div>
);

function PrimaryChannelRow({ channel }: { channel: Contact }) {
  const { href, external } = contactHref(channel);
  const display = formatChannelDisplay(channel.type, channel.value);
  const typeLabel = TYPE_LABEL[channel.type] ?? channel.label;

  return (
    <a
      href={href}
      className={styles.primaryRow}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.primaryIcon} aria-hidden>
        <ContactChannelIcon type={channel.type} />
      </span>
      <span className={styles.primaryBody}>
        <span className={styles.primaryType}>{typeLabel}</span>
        <span className={styles.primaryValue}>{display}</span>
        {channel.label !== typeLabel ? (
          <span className={styles.primaryHint}>{channel.label}</span>
        ) : null}
      </span>
      <span className={styles.chevron} aria-hidden>
        →
      </span>
    </a>
  );
}

function ChannelRow({ channel }: { channel: Contact }) {
  const { href, external } = contactHref(channel);
  const display = formatChannelDisplay(channel.type, channel.value);
  const typeLabel = TYPE_LABEL[channel.type] ?? channel.label;

  return (
    <a
      href={href}
      className={styles.row}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.rowIcon} aria-hidden>
        <ContactChannelIcon type={channel.type} />
      </span>
      <span className={styles.rowLabel}>{typeLabel}</span>
      <span className={styles.rowValue}>{display}</span>
      <span className={styles.chevron} aria-hidden>
        →
      </span>
    </a>
  );
}
