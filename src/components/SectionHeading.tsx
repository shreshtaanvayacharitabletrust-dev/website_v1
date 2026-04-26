interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}

