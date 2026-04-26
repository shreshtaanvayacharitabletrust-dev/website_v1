export type IconKey =
  | "compassion"
  | "education"
  | "children"
  | "elders"
  | "environment"
  | "community"
  | "integrity"
  | "sustainability"
  | "responsibility"
  | "volunteer"
  | "support"
  | "partner"
  | "contact";

export interface NavItem {
  label: string;
  path: string;
  description: string;
}

export interface FocusArea {
  title: string;
  description: string;
  detail: string;
  icon: IconKey;
}

export interface Initiative {
  title: string;
  summary: string;
  detail: string;
  image: string;
  alt: string;
}

export interface Value {
  name: string;
  summary: string;
}

export interface ContactMethod {
  label: string;
  value: string;
  hint: string;
  href?: string;
}

export interface ActionPath {
  title: string;
  description: string;
  detail: string;
  icon: IconKey;
  ctaLabel: string;
  ctaPath: string;
}

export const brand = {
  shortName: "Shrestha Anvaya",
  fullName: "Shrestha Anvaya Charitable Trust",
  tagline: "Building a better tomorrow through compassion and action.",
  footerNote:
    "A compassionate initiative centered on dignity, learning, care, and community well-being.",
};

export const navigation: NavItem[] = [
  {
    label: "Home",
    path: "/",
    description: "Return to the main overview of the trust.",
  },
  {
    label: "Who We Are",
    path: "/who-we-are",
    description: "Vision, mission, and the values that guide the trust.",
  },
  {
    label: "What We Care About",
    path: "/what-we-care-about",
    description: "The focus areas that shape our community work.",
  },
  {
    label: "Initiatives",
    path: "/initiatives",
    description: "Initiatives that bring care, learning, and sustainability together.",
  },
  {
    label: "Get Involved",
    path: "/get-involved",
    description: "Support, volunteer, and partner with the trust.",
  },
  {
    label: "Transparency",
    path: "/transparency",
    description: "A placeholder accountability page for future public trust materials.",
  },
  {
    label: "Contact",
    path: "/contact",
    description: "Start a conversation and explore ways to contribute.",
  },
];

export const hero = {
  eyebrow: "Shrestha Anvaya Charitable Trust",
  heading: "Building a Compassionate Future Together",
  subtext:
    "Empowering communities through education, care, and sustainable change.",
  primaryCtaLabel: "Learn More",
  primaryCtaPath: "/who-we-are",
  secondaryCtaLabel: "Join Us",
  secondaryCtaPath: "/get-involved",
  image:
    "https://images.unsplash.com/photo-1516627145497-ae6968895b9d?auto=format&fit=crop&w=1400&q=80",
  alt: "Children sitting together outdoors during a community gathering.",
};

export const focusAreas: FocusArea[] = [
  {
    title: "Education",
    description: "Creating opportunities for learning and growth.",
    detail:
      "We prioritize learning environments that help children, families, and communities access knowledge with confidence and continuity.",
    icon: "education",
  },
  {
    title: "Children",
    description: "Nurturing young minds.",
    detail:
      "Our approach centers on care, guidance, and encouragement so children can grow with belonging, curiosity, and dignity.",
    icon: "children",
  },
  {
    title: "Elders",
    description: "Caring with dignity.",
    detail:
      "We value elder well-being and support spaces where care is thoughtful, respectful, and rooted in human connection.",
    icon: "elders",
  },
  {
    title: "Environment",
    description: "Protecting our future.",
    detail:
      "We promote environmental awareness and greener habits that strengthen both daily life and long-term community resilience.",
    icon: "environment",
  },
  {
    title: "Community",
    description: "Growing together.",
    detail:
      "We believe meaningful change happens when people participate together and build solutions that reflect shared responsibility.",
    icon: "community",
  },
];

export const coreStatements = [
  {
    title: "Our Vision",
    text:
      "A society where every individual has the opportunity to grow, live with dignity, and contribute meaningfully to the community.",
  },
  {
    title: "Our Mission",
    text:
      "To create meaningful impact through compassion, responsibility, and community-driven efforts in education, social care, and environmental awareness.",
  },
  {
    title: "Our Commitment",
    text:
      "We are dedicated to creating meaningful and responsible impact in the communities we serve.",
  },
];

export const initiatives: Initiative[] = [
  {
    title: "Learning Support",
    summary: "Encouraging steady learning journeys and accessible growth.",
    detail:
      "This initiative emphasizes educational support that keeps learning practical, inclusive, and connected to long-term opportunity.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    alt: "Students learning together in a classroom.",
  },
  {
    title: "Community Well-being",
    summary: "Creating caring spaces for everyday dignity and support.",
    detail:
      "The trust aims to strengthen local well-being through compassionate, community-oriented care and mutual support.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    alt: "Community members sharing time together outdoors.",
  },
  {
    title: "Green Initiatives",
    summary: "Encouraging awareness and actions that protect our future.",
    detail:
      "Environmental action is approached as a shared responsibility, from awareness-building to practical habits that support sustainable living.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding a young plant in soil.",
  },
  {
    title: "Youth Engagement",
    summary: "Making space for participation, leadership, and belonging.",
    detail:
      "Youth engagement is framed around involvement, voice, and contribution so younger community members can shape positive change.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    alt: "Young volunteers collaborating during a community activity.",
  },
];

export const values: Value[] = [
  {
    name: "Compassion",
    summary: "Lead with empathy and care in every interaction.",
  },
  {
    name: "Integrity",
    summary: "Act responsibly and stay accountable to community trust.",
  },
  {
    name: "Community",
    summary: "Build progress together rather than in isolation.",
  },
  {
    name: "Sustainability",
    summary: "Choose actions that support lasting, thoughtful impact.",
  },
  {
    name: "Responsibility",
    summary: "Follow through with purpose, clarity, and respect.",
  },
];

export const actionPaths: ActionPath[] = [
  {
    title: "Support",
    description: "Contribute resources that help compassionate work move forward.",
    detail:
      "Financial and in-kind support can strengthen learning, care, and environmental efforts as the trust grows.",
    icon: "support",
    ctaLabel: "Support the Trust",
    ctaPath: "/contact",
  },
  {
    title: "Volunteer",
    description: "Offer time, skills, and steady presence where it matters.",
    detail:
      "Volunteers can help create warm, practical, people-centered support across the trust's focus areas.",
    icon: "volunteer",
    ctaLabel: "Volunteer With Us",
    ctaPath: "/contact",
  },
  {
    title: "Partner",
    description: "Collaborate through shared values and community commitment.",
    detail:
      "Partnerships can expand reach, strengthen local coordination, and create more durable community outcomes.",
    icon: "partner",
    ctaLabel: "Explore Partnerships",
    ctaPath: "/contact",
  },
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "hello@shresthaanvaya.org",
    hint: "Placeholder address for the first website version.",
    href: "mailto:hello@shresthaanvaya.org",
  },
  {
    label: "Phone",
    value: "+91 00000 00000",
    hint: "Placeholder number until the trust shares a public line.",
    href: "tel:+910000000000",
  },
  {
    label: "Address",
    value: "Public office address to be updated",
    hint: "Location details can be published once confirmed.",
  },
];

export const socialPlaceholders = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "YouTube",
];

export const homepageHighlights = [
  "5 care-focused priorities",
  "4 initiative streams",
  "Community-driven direction",
];

export const involvementSteps = [
  "Start with a conversation about how you want to contribute.",
  "Choose a path that fits your time, resources, or partnership goals.",
  "Coordinate next steps together through the trust's contact channel.",
];

export const contactFormDefaults = {
  subject: "Inquiry from the Shrestha Anvaya website",
};

export const transparencyNotes = [
  {
    title: "Commitment to clarity",
    text:
      "The trust's source content already emphasizes responsibility and meaningful impact. This page extends that message into a public promise of clear communication.",
  },
  {
    title: "Future reporting space",
    text:
      "Annual updates, activity summaries, and governance details can be added here once the trust is ready to publish formal public materials.",
  },
  {
    title: "Community accountability",
    text:
      "Transparency is not only about documents. It is also about staying responsive, respectful, and answerable to the communities the trust serves.",
  },
];
