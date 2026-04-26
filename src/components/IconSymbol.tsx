import type { ReactNode } from "react";
import type { IconKey } from "../content/siteContent";

interface IconSymbolProps {
  name: IconKey;
}

const icons: Record<IconKey, ReactNode> = {
  compassion: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 20s-6.5-4-6.5-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 6.5 2.8C18.5 16 12 20 12 20Z" />
      <path d="M12 7.5V4.5" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Z" />
      <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4l-6 3-6-3Z" />
    </svg>
  ),
  children: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16.5" cy="7.5" r="2.5" />
      <path d="M4 20c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8H4Z" />
      <path d="M13 20c.4-2.2 1.8-3.8 4-3.8 1.8 0 3.3 1.1 4 3.8h-8Z" />
    </svg>
  ),
  elders: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <circle cx="10" cy="6" r="3" />
      <path d="M9 10c-1.4 0-2.5 1-2.7 2.3L5.6 18H8l.6-3h2.1l.8 5H14l-1-6.3A3 3 0 0 0 10 10H9Z" />
      <path d="M16 5v15" />
      <path d="M16 10h3" />
    </svg>
  ),
  environment: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 21c4.4-2.5 7-6.4 7-11.3C15.5 9.6 13 11.1 12 14c-1-2.9-3.5-4.4-7-4.3 0 4.9 2.6 8.8 7 11.3Z" />
      <path d="M12 14v7" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <circle cx="6.5" cy="8" r="2.5" />
      <circle cx="17.5" cy="8" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <path d="M3 19c.5-2.3 2-3.8 4-3.8s3.5 1.3 4 3.8H3Z" />
      <path d="M13 19c.5-2.3 2-3.8 4-3.8s3.5 1.3 4 3.8h-8Z" />
      <path d="M7.5 18c.6-2.8 2.3-4.6 4.5-4.6 2.1 0 3.8 1.8 4.4 4.6H7.5Z" />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 3 5 6v5.6c0 4.4 3 7.6 7 9 4-.9 7-4.1 7-8.5V6l-7-3Z" />
      <path d="m9.3 12.1 1.8 1.8 3.8-4" />
    </svg>
  ),
  sustainability: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M7 14c0-5 4-8 10-8-1 6-4 10-9 10-3 0-5-2-5-5 0-2.5 1.7-4.3 4-5" />
      <path d="M7 21c1.3-4 4.1-7 9-10" />
    </svg>
  ),
  responsibility: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.6 2.2" />
    </svg>
  ),
  volunteer: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 21s-7-4.3-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 11c0 5.7-7 10-7 10Z" />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M12 3 4 7v5c0 5 3.5 8.1 8 9 4.5-.9 8-4 8-9V7l-8-4Z" />
      <path d="m9.5 12 1.7 1.7L14.8 10" />
    </svg>
  ),
  partner: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M7.5 12.5 5 10a3 3 0 1 1 4.2-4.2l2.2 2.2" />
      <path d="m16.5 11.5 2.5 2.5a3 3 0 0 1-4.2 4.2l-2.2-2.2" />
      <path d="m8 16 8-8" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

export default function IconSymbol({ name }: IconSymbolProps) {
  return <span className="icon-symbol">{icons[name]}</span>;
}
