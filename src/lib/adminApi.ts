import type { SiteContent } from "../content/siteContent";
import { mergeSiteContentWithDefaults } from "./siteContentApi";

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
  allowlistEnabled: boolean;
  allowedEmails: string[];
  cmsProvider: string;
  databaseConfigured: boolean;
  mediaConfigured: boolean;
  cacheConfigured: boolean;
  mediaBaseUrl: string;
}

export interface AdminContentRecord {
  persisted: boolean;
  content: SiteContent;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface AdminMediaAsset {
  key: string;
  title: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
  uploadedBy: string | null;
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

export async function fetchAdminContent(
  getToken: TokenGetter,
): Promise<AdminContentRecord> {
  const response = await authorizedFetch("/api/admin/content", getToken);
  const payload = (await response.json()) as {
    persisted?: boolean;
    content?: unknown;
    updatedAt?: string | null;
    updatedBy?: string | null;
  };

  return {
    persisted: payload.persisted === true,
    content: mergeSiteContentWithDefaults(payload.content),
    updatedAt:
      typeof payload.updatedAt === "string" ? payload.updatedAt : null,
    updatedBy:
      typeof payload.updatedBy === "string" ? payload.updatedBy : null,
  };
}

export async function updateAdminContent(args: {
  getToken: TokenGetter;
  content: unknown;
}): Promise<AdminContentRecord> {
  const response = await authorizedFetch("/api/admin/content", args.getToken, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: args.content,
    }),
  });
  const payload = (await response.json()) as {
    persisted?: boolean;
    content?: unknown;
    updatedAt?: string | null;
    updatedBy?: string | null;
  };

  return {
    persisted: payload.persisted === true,
    content: mergeSiteContentWithDefaults(payload.content),
    updatedAt:
      typeof payload.updatedAt === "string" ? payload.updatedAt : null,
    updatedBy:
      typeof payload.updatedBy === "string" ? payload.updatedBy : null,
  };
}

export async function fetchAdminMedia(
  getToken: TokenGetter,
): Promise<AdminMediaAsset[]> {
  const response = await authorizedFetch("/api/admin/media", getToken);
  const payload = (await response.json()) as { items?: AdminMediaAsset[] };

  return payload.items || [];
}

export async function uploadAdminMedia(args: {
  getToken: TokenGetter;
  file: File;
  title?: string;
}): Promise<AdminMediaAsset> {
  const token = await args.getToken();

  if (!token) {
    throw new Error("Your admin session is no longer active.");
  }

  const formData = new FormData();

  formData.set("file", args.file);

  if (args.title?.trim()) {
    formData.set("title", args.title.trim());
  }

  const response = await fetch("/api/admin/media", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const payload = (await response.json()) as { item?: AdminMediaAsset };

  if (!payload.item) {
    throw new Error("Upload completed but no media record was returned.");
  }

  return payload.item;
}

export async function deleteAdminMedia(args: {
  getToken: TokenGetter;
  key: string;
}) {
  await authorizedFetch("/api/admin/media", args.getToken, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: args.key,
    }),
  });
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

export function formatBytes(sizeBytes: number) {
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = sizeBytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${
    units[unitIndex]
  }`;
}
