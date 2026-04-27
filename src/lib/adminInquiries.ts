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

async function parseError(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  return payload?.error || "Request failed";
}

export async function fetchAdminInquiries(adminToken: string): Promise<AdminInquiry[]> {
  const response = await fetch("/api/inquiries", {
    headers: {
      Accept: "application/json",
      "x-admin-token": adminToken,
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const payload = (await response.json()) as { items?: AdminInquiry[] };

  return payload.items || [];
}

export async function updateInquiryStatus(args: {
  adminToken: string;
  id: string;
  status: InquiryStatus;
}) {
  const response = await fetch("/api/inquiries", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-admin-token": args.adminToken,
    },
    body: JSON.stringify({
      id: args.id,
      status: args.status,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
}
