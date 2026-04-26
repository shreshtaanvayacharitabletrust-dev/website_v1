interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function BrandLogo({
  variant = "dark",
  className,
}: BrandLogoProps) {
  const main = variant === "light" ? "#f7f3ec" : "#183c3b";
  const accent = "#c7904d";
  const soft = variant === "light" ? "rgba(247, 243, 236, 0.72)" : "#6d5d4f";

  return (
    <svg
      aria-label="Shrestha Anvaya Charitable Trust"
      className={className}
      role="img"
      viewBox="0 0 420 78"
    >
      <g transform="translate(4 7)">
        <path
          d="M28 3c7 10 11 18 11 26 0 11-7 19-18 19S3 40 3 29C3 18 12 8 28 3Z"
          fill={main}
          opacity="0.16"
        />
        <path
          d="M23 7c6 7 10 14 10 22 0 8-5 15-12 15S9 37 9 29C9 19 15 12 23 7Z"
          fill={accent}
          opacity="0.9"
        />
        <path
          d="M18 15c4 4 7 9 7 15 0 6-4 10-9 10s-9-4-9-10c0-7 4-12 11-15Z"
          fill={main}
        />
        <path
          d="M35 11c9 4 15 11 15 20 0 8-6 14-14 14-7 0-12-4-14-11 8-1 12-8 13-23Z"
          fill={accent}
        />
      </g>
      <text
        x="70"
        y="29"
        fill={main}
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="0.8"
      >
        SHRESTHA ANVAYA
      </text>
      <text
        x="70"
        y="50"
        fill={accent}
        fontFamily="'Mulish', Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="4.5"
      >
        CHARITABLE TRUST
      </text>
      <path d="M70 58H235" stroke={soft} strokeWidth="1" />
    </svg>
  );
}

