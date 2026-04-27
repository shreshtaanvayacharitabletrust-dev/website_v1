export interface AdminNavItem {
  label: string;
  path: string;
  shortLabel: string;
  description: string;
}

export const adminNavigation: AdminNavItem[] = [
  {
    label: "Dashboard",
    path: "/internal-admin/dashboard",
    shortLabel: "D",
    description: "Overview of admin activity and quick stats.",
  },
  {
    label: "Content",
    path: "/internal-admin/content",
    shortLabel: "C",
    description: "Review editable website sections and open the CMS.",
  },
  {
    label: "Media",
    path: "/internal-admin/media",
    shortLabel: "M",
    description: "Review image and social assets used across the site.",
  },
  {
    label: "Inquiries",
    path: "/internal-admin/inquiries",
    shortLabel: "I",
    description: "Search, filter, update, and export public submissions.",
  },
  {
    label: "Volunteers & Partners",
    path: "/internal-admin/volunteers-partners",
    shortLabel: "V",
    description: "Focus on support, volunteer, and partnership requests.",
  },
  {
    label: "Users",
    path: "/internal-admin/users",
    shortLabel: "U",
    description: "Review the signed-in admin account and access guidance.",
  },
  {
    label: "Settings",
    path: "/internal-admin/settings",
    shortLabel: "S",
    description: "Check integration and deployment configuration status.",
  },
];
