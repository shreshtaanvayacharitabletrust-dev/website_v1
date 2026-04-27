import type { SiteContent } from "../content/siteContent";

export type InquiryStatus = "new" | "reviewing" | "closed";

export interface AdminInquiry {
  id: string;
  kind: string;
  name: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  sourcePage: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  user: {
    id: string;
    email: string;
    fullName: string;
    imageUrl: string;
    joinedAt: string | null;
    lastSignInAt: string | null;
  };
  directusUrl: string;
  allowlistEnabled: boolean;
  allowedEmails: string[];
}

export interface DashboardSummary {
  total: number;
  newCount: number;
  reviewingCount: number;
  closedCount: number;
}

export type TokenGetter = () => Promise<null | string>;

async function parseError(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  return payload?.error || "Request failed";
}

async function authorizedFetch(
  input: RequestInfo | URL,
  getToken: TokenGetter,
  init?: RequestInit,
) {
  const token = await getToken();

  if (!token) {
    throw new Error("Your admin session is no longer active.");
  }

  const headers = new Headers(init?.headers);

  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response;
}

export async function fetchAdminSession(getToken: TokenGetter): Promise<AdminSession> {
  const response = await authorizedFetch("/api/admin/session", getToken);

  return (await response.json()) as AdminSession;
}

export async function fetchAdminInquiries(getToken: TokenGetter): Promise<AdminInquiry[]> {
  const response = await authorizedFetch("/api/inquiries", getToken);
  const payload = (await response.json()) as { items?: AdminInquiry[] };

  return payload.items || [];
}

export async function updateInquiryStatus(args: {
  getToken: TokenGetter;
  id: string;
  status: InquiryStatus;
}) {
  await authorizedFetch("/api/inquiries", args.getToken, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: args.id,
      status: args.status,
    }),
  });
}

export function buildDashboardSummary(items: AdminInquiry[]): DashboardSummary {
  return {
    total: items.length,
    newCount: items.filter((item) => item.status === "new").length,
    reviewingCount: items.filter((item) => item.status === "reviewing").length,
    closedCount: items.filter((item) => item.status === "closed").length,
  };
}

export function buildInquiryCsv(items: AdminInquiry[]) {
  const rows = [
    [
      "id",
      "kind",
      "status",
      "name",
      "email",
      "phone",
      "subject",
      "message",
      "sourcePage",
      "createdAt",
      "updatedAt",
    ],
    ...items.map((item) => [
      item.id,
      item.kind,
      item.status,
      item.name || "",
      item.email,
      item.phone || "",
      item.subject || "",
      item.message || "",
      item.sourcePage,
      item.createdAt,
      item.updatedAt,
    ]),
  ];

  return rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function describeContentSections(content: SiteContent) {
  return [
    {
      label: "Navigation",
      value: `${content.navigation.length} items`,
      note: "Primary site menu and descriptions.",
    },
    {
      label: "Focus Areas",
      value: `${content.focusAreas.length} areas`,
      note: "Public cause areas shown across the website.",
    },
    {
      label: "Initiatives",
      value: `${content.initiatives.length} initiatives`,
      note: "Program cards and supporting imagery.",
    },
    {
      label: "Action Paths",
      value: `${content.actionPaths.length} paths`,
      note: "Support, volunteer, and partner journeys.",
    },
    {
      label: "Contact Methods",
      value: `${content.contactMethods.length} methods`,
      note: "Public email, phone, and address details.",
    },
    {
      label: "Transparency Notes",
      value: `${content.transparencyNotes.length} notes`,
      note: "Public accountability messaging.",
    },
  ];
}
