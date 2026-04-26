interface SocialGlyphProps {
  name: string;
}

export default function SocialGlyph({ name }: SocialGlyphProps) {
  switch (name) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M13.2 21v-7h2.5l.4-3h-2.9V9.1c0-.9.2-1.6 1.6-1.6H16V5c-.2 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8v3h2.3v7h2.9Z"
            fill="currentColor"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="16.8" cy="7.4" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="9" width="3" height="10.5" />
          <circle cx="6" cy="5.8" r="1.6" fill="currentColor" stroke="none" />
          <path d="M11 19.5V9h3v1.5c.7-1.1 1.8-1.8 3.5-1.8 2.7 0 4 1.7 4 5v5.8h-3v-5.2c0-1.5-.5-2.5-1.9-2.5-1 0-1.6.7-1.8 1.3-.1.2-.1.6-.1 1v5.4H11Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.4 8.2c-.2-1-.9-1.7-1.9-1.9C16.9 6 12 6 12 6s-4.9 0-6.5.3c-1 .2-1.7.9-1.9 1.9C3.3 9.8 3.3 12 3.3 12s0 2.2.3 3.8c.2 1 .9 1.7 1.9 1.9 1.6.3 6.5.3 6.5.3s4.9 0 6.5-.3c1-.2 1.7-.9 1.9-1.9.3-1.6.3-3.8.3-3.8s0-2.2-.3-3.8Z"
            fill="currentColor"
          />
          <path d="m10.2 14.8 4.1-2.8-4.1-2.8v5.6Z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
