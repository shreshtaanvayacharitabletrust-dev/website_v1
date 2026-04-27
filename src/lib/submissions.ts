export type InquiryKind =
  | "contact"
  | "support"
  | "volunteer"
  | "partner"
  | "newsletter";

export interface InquiryPayload {
  kind: InquiryKind;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  sourcePage: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(data?.error || "Submission failed");
  }
}

export function buildMailtoUrl(args: {
  recipientEmail: string;
  subject: string;
  bodyLines: string[];
}) {
  const body = args.bodyLines.join("\n");

  return `mailto:${args.recipientEmail}?subject=${encodeURIComponent(args.subject)}&body=${encodeURIComponent(body)}`;
}
