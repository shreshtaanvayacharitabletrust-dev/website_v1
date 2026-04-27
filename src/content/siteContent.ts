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

export interface SocialLink {
  label: string;
  href?: string;
}

export interface ActionPath {
  title: string;
  description: string;
  detail: string;
  icon: IconKey;
  ctaLabel: string;
}

export interface SectionContent {
  eyebrow: string;
  title: string;
  intro: string;
}

export interface Note {
  title: string;
  text: string;
}

export interface PageHeroContent {
  eyebrow: string;
  heading: string;
  intro: string;
  ctaLabel?: string;
  ctaPath?: string;
}

export interface HomeActionCard {
  title: string;
  text: string;
  ctaLabel: string;
  path: string;
  themeClass: string;
}

export interface InteriorPreviewLink {
  label: string;
  path: string;
}

export interface FooterMetaLink {
  label: string;
  path: string;
}

export interface BrandContent {
  shortName: string;
  fullName: string;
  tagline: string;
  footerNote: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  primaryCtaLabel: string;
  primaryCtaPath: string;
  secondaryCtaLabel: string;
  secondaryCtaPath: string;
  image: string;
  alt: string;
}

export interface ContactFormDefaults {
  subject: string;
  recipientEmail: string;
  fallbackMessage: string;
}

export interface LayoutContent {
  donateButtonLabel: string;
  donateButtonPath: string;
  quickLinksTitle: string;
  stayConnectedTitle: string;
  stayConnectedCopy: string;
  newsletterTitle: string;
  newsletterIntro: string;
  newsletterInputPlaceholder: string;
  newsletterButtonLabel: string;
  newsletterSubject: string;
  newsletterSuccessMessage: string;
  footerMetaLinks: FooterMetaLink[];
}

export interface HomePageContent {
  overviewInitiativesTitle: string;
  overviewInitiativesAriaLabel: string;
  actionCards: HomeActionCard[];
  interiorPreviewText: string;
  interiorPreviewLinks: InteriorPreviewLink[];
}

export interface WhoWeArePageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  identityNotes: string[];
  coreSection: SectionContent;
  principleSection: SectionContent;
  principleBody: string;
  principleNoteTitle: string;
  principleNoteText: string;
  valuesSection: SectionContent;
}

export interface WhatWeCareAboutPageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  highlightText: string;
  areasSection: SectionContent;
  valuesSection: SectionContent;
}

export interface WhatWeDoPageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  highlightText: string;
  initiativesSection: SectionContent;
  operatingSection: SectionContent;
  operatingNotes: Note[];
  ctaLabel: string;
  ctaPath: string;
}

export interface GetInvolvedPageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  highlightText: string;
  pathsSection: SectionContent;
  processSection: SectionContent;
  processNoteTitle: string;
  processNoteText: string;
  inquirySection: SectionContent;
  inquiryButtonLabel: string;
  inquirySuccessMessage: string;
}

export interface TransparencyPageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  highlightText: string;
  notesSection: SectionContent;
  anchorSection: SectionContent;
}

export interface ContactPageContent {
  hero: PageHeroContent;
  highlightTitle: string;
  highlightText: string;
  detailsSection: SectionContent;
  formSection: SectionContent;
  socialTitle: string;
  socialIntro: string;
  submitButtonLabel: string;
  successMessage: string;
}

export interface SubmissionSettings {
  databaseEnabled: boolean;
  adminUrl: string;
}

export interface SiteContent {
  brand: BrandContent;
  navigation: NavItem[];
  socialLinks: SocialLink[];
  hero: HeroContent;
  focusAreas: FocusArea[];
  coreStatements: Note[];
  initiatives: Initiative[];
  values: Value[];
  actionPaths: ActionPath[];
  contactMethods: ContactMethod[];
  involvementSteps: string[];
  transparencyNotes: Note[];
  contactFormDefaults: ContactFormDefaults;
  layout: LayoutContent;
  homePage: HomePageContent;
  whoWeArePage: WhoWeArePageContent;
  whatWeCareAboutPage: WhatWeCareAboutPageContent;
  whatWeDoPage: WhatWeDoPageContent;
  getInvolvedPage: GetInvolvedPageContent;
  transparencyPage: TransparencyPageContent;
  contactPage: ContactPageContent;
  submissionSettings: SubmissionSettings;
}

export const defaultSiteContent: SiteContent = {
  brand: {
    shortName: "Shrestha Anvaya",
    fullName: "Shrestha Anvaya Charitable Trust",
    tagline: "Building a better tomorrow through compassion and action.",
    footerNote:
      "A compassionate initiative centered on dignity, learning, care, and community well-being.",
  },
  navigation: [
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
  ],
  socialLinks: [
    { label: "Facebook" },
    { label: "Instagram" },
    { label: "LinkedIn" },
    { label: "YouTube" },
  ],
  hero: {
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
  },
  focusAreas: [
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
  ],
  coreStatements: [
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
  ],
  initiatives: [
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
  ],
  values: [
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
  ],
  actionPaths: [
    {
      title: "Support",
      description: "Contribute resources that help compassionate work move forward.",
      detail:
        "Financial and in-kind support can strengthen learning, care, and environmental efforts as the trust grows.",
      icon: "support",
      ctaLabel: "Support the Trust",
    },
    {
      title: "Volunteer",
      description: "Offer time, skills, and steady presence where it matters.",
      detail:
        "Volunteers can help create warm, practical, people-centered support across the trust's focus areas.",
      icon: "volunteer",
      ctaLabel: "Volunteer With Us",
    },
    {
      title: "Partner",
      description: "Collaborate through shared values and community commitment.",
      detail:
        "Partnerships can expand reach, strengthen local coordination, and create more durable community outcomes.",
      icon: "partner",
      ctaLabel: "Explore Partnerships",
    },
  ],
  contactMethods: [
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
  ],
  involvementSteps: [
    "Start with a conversation about how you want to contribute.",
    "Choose a path that fits your time, resources, or partnership goals.",
    "Coordinate next steps together through the trust's contact channel.",
  ],
  transparencyNotes: [
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
  ],
  contactFormDefaults: {
    subject: "Inquiry from the Shrestha Anvaya website",
    recipientEmail: "hello@shresthaanvaya.org",
    fallbackMessage: "Hello, I would like to learn more about the trust.",
  },
  layout: {
    donateButtonLabel: "Donate Now",
    donateButtonPath: "/get-involved",
    quickLinksTitle: "Quick Links",
    stayConnectedTitle: "Stay Connected",
    stayConnectedCopy: "Follow us for updates on our latest work.",
    newsletterTitle: "Newsletter",
    newsletterIntro: "Stay updated with our initiatives and stories.",
    newsletterInputPlaceholder: "Enter your email",
    newsletterButtonLabel: "Subscribe",
    newsletterSubject: "Newsletter signup",
    newsletterSuccessMessage:
      "Thank you. Your interest has been recorded and we will stay in touch.",
    footerMetaLinks: [
      { label: "Transparency", path: "/transparency" },
      { label: "Privacy Policy", path: "/contact" },
      { label: "Terms & Conditions", path: "/contact" },
    ],
  },
  homePage: {
    overviewInitiativesTitle: "Our Initiatives",
    overviewInitiativesAriaLabel: "View initiative details",
    actionCards: [
      {
        title: "Get Involved",
        text: "Support. Volunteer. Partner.",
        ctaLabel: "Join Us",
        path: "/get-involved",
        themeClass: "action-card-teal",
      },
      {
        title: "Our Commitment",
        text:
          "We are dedicated to creating meaningful and responsible impact in the communities we serve.",
        ctaLabel: "Learn More",
        path: "/who-we-are",
        themeClass: "action-card-gold",
      },
      {
        title: "Contact Us",
        text: "Let's connect and create change together.",
        ctaLabel: "Reach Out",
        path: "/contact",
        themeClass: "action-card-light",
      },
    ],
    interiorPreviewText:
      "Explore the interior pages for detailed focus areas, initiatives, involvement opportunities, transparency notes, and contact information.",
    interiorPreviewLinks: [
      { label: "Who We Are", path: "/who-we-are" },
      { label: "What We Care About", path: "/what-we-care-about" },
      { label: "Transparency", path: "/transparency" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
  whoWeArePage: {
    hero: {
      eyebrow: "Who We Are",
      heading: "A compassionate trust centered on meaningful community impact",
      intro:
        "Shrestha Anvaya Charitable Trust is framed through a simple but clear direction: support growth, dignity, and participation through compassionate community work.",
      ctaLabel: "Start a Conversation",
      ctaPath: "/contact",
    },
    highlightTitle: "At a glance",
    identityNotes: [
      "The trust is presented as community-rooted, people-centered, and guided by dignity.",
      "Its mission emphasizes compassionate action across education, social care, and environmental awareness.",
      "Its commitment is to create meaningful and responsible impact in the communities it serves.",
    ],
    coreSection: {
      eyebrow: "Vision, Mission, Commitment",
      title: "The trust's core direction",
      intro:
        "These statements define the trust's purpose and should remain the anchor for future content updates.",
    },
    principleSection: {
      eyebrow: "Why This Matters",
      title: "A people-first identity",
      intro:
        "The trust's positioning avoids broad institutional language and stays focused on human dignity, practical support, and shared responsibility.",
    },
    principleBody:
      "That direction is important for an NGO website because it keeps the organization understandable and welcoming. The message is not about scale or self-promotion. It is about community, care, and action that feels grounded.",
    principleNoteTitle: "Content principle",
    principleNoteText:
      "Future updates should expand the story carefully, adding real facts, timelines, and leadership details only after they are confirmed by the trust.",
    valuesSection: {
      eyebrow: "Values",
      title: "The principles behind the work",
      intro:
        "These values explain how the trust wants to show up in the community, not just what it wants to do.",
    },
  },
  whatWeCareAboutPage: {
    hero: {
      eyebrow: "What We Care About",
      heading: "Five focus areas, one shared purpose",
      intro:
        "The trust's priorities connect education, care, environmental awareness, and community well-being into one compassionate direction.",
    },
    highlightTitle: "Shared thread",
    highlightText:
      "Every focus area is connected by the same belief: people deserve the opportunity to grow, live with dignity, and contribute meaningfully.",
    areasSection: {
      eyebrow: "Focus Areas",
      title: "What the trust chooses to hold close",
      intro:
        "Each focus area expands the one-line description from the source document into a fuller website explanation without inventing new programs.",
    },
    valuesSection: {
      eyebrow: "Connected Values",
      title: "Care is strongest when values stay visible",
      intro:
        "The trust's values reinforce the focus areas and prevent the website from feeling like a list of disconnected causes.",
    },
  },
  whatWeDoPage: {
    hero: {
      eyebrow: "What We Do",
      heading: "Initiatives designed to turn compassion into practical action",
      intro:
        "The current website content defines four initiative streams that translate the trust's mission into clear areas of work.",
    },
    highlightTitle: "Working principle",
    highlightText:
      "Each initiative reflects the same direction: meaningful impact shaped by care, responsibility, and community participation.",
    initiativesSection: {
      eyebrow: "Initiatives",
      title: "The trust's current program framing",
      intro:
        "These initiative descriptions stay faithful to the source draft while giving the website enough depth to feel complete and navigable.",
    },
    operatingSection: {
      eyebrow: "How We Approach Impact",
      title: "A consistent way of working matters as much as the work itself",
      intro:
        "Because this is an early NGO website, the strongest signal is not scale. It is clarity, responsibility, and alignment with the trust's values.",
    },
    operatingNotes: [
      {
        title: "Community-Driven",
        text:
          "The mission explicitly centers community-driven efforts, so every initiative should stay close to real people and local participation.",
      },
      {
        title: "Responsible",
        text:
          "The trust's commitment emphasizes responsibility, which makes clarity and follow-through central to how the work is presented.",
      },
      {
        title: "Sustainable",
        text:
          "Environmental awareness and sustainability are part of the trust's values, so progress should aim to be thoughtful and lasting.",
      },
    ],
    ctaLabel: "Explore Ways to Help",
    ctaPath: "/get-involved",
  },
  getInvolvedPage: {
    hero: {
      eyebrow: "Get Involved",
      heading: "Support, volunteer, or partner with purpose",
      intro:
        "The source content invites people to help through support, volunteering, and partnership. This page turns that invitation into a clearer pathway.",
    },
    highlightTitle: "Why involvement matters",
    highlightText:
      "Community-driven work becomes stronger when people contribute not only funds, but also time, skills, and trusted collaboration.",
    pathsSection: {
      eyebrow: "Ways to Help",
      title: "Three clear paths for contribution",
      intro:
        "Each path is designed to stay flexible while giving visitors a practical next step.",
    },
    processSection: {
      eyebrow: "Simple Process",
      title: "How engagement can begin",
      intro:
        "The first version of the site keeps the process intentionally lightweight so the trust can adapt it as real operating details become available.",
    },
    processNoteTitle: "Version one note",
    processNoteText:
      "Once the trust has confirmed volunteer programs, partnership models, or donation workflows, this page can expand with formal processes and real calls to action.",
    inquirySection: {
      eyebrow: "Register Your Interest",
      title: "Send a support, volunteer, or partnership request",
      intro:
        "Use this form to share how you would like to support the trust, volunteer, or explore a partnership.",
    },
    inquiryButtonLabel: "Send Request",
    inquirySuccessMessage:
      "Thank you. Your request has been received and our team will review it.",
  },
  transparencyPage: {
    hero: {
      eyebrow: "Transparency",
      heading: "Our commitment to accountability, clarity, and community trust",
      intro:
        "This page is a placeholder foundation for the trust's future public reporting. It reflects the same commitment already present in the website content: meaningful and responsible impact.",
      ctaLabel: "Ask a Question",
      ctaPath: "/contact",
    },
    highlightTitle: "Version one note",
    highlightText:
      "Formal public reports, governance details, and financial disclosures can be added here once the trust finalizes the materials it wants to publish.",
    notesSection: {
      eyebrow: "What This Page Will Hold",
      title: "A clear home for future public trust materials",
      intro:
        "The goal is to make transparency visible early, even before the full reporting structure is ready.",
    },
    anchorSection: {
      eyebrow: "Anchor Statements",
      title: "Transparency should stay connected to the trust's purpose",
      intro:
        "These existing statements remain the foundation for how future accountability information should be framed.",
    },
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      heading: "Let's connect and create meaningful change together",
      intro:
        "This first website version uses placeholder contact details so the trust can launch now and swap in confirmed public information later.",
    },
    highlightTitle: "What happens here",
    highlightText:
      "The form below sends a structured inquiry so your message reaches the trust clearly and directly.",
    detailsSection: {
      eyebrow: "Contact Details",
      title: "Public contact information",
      intro:
        "These details can be updated whenever the trust confirms new public contact channels.",
    },
    formSection: {
      eyebrow: "Reach Out",
      title: "Send an inquiry",
      intro:
        "Use this form for volunteering, partnerships, support, or general questions.",
    },
    socialTitle: "Social channels",
    socialIntro:
      "Social profiles can be published or updated as official channels become available.",
    submitButtonLabel: "Send Inquiry",
    successMessage:
      "Thank you. Your inquiry has been submitted successfully.",
  },
  submissionSettings: {
    databaseEnabled: false,
    adminUrl: "https://admin.shreshtaanvayatrust.org",
  },
};
