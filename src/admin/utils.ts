export function formatAdminDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export function formatInquiryKind(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match: string) => match.toUpperCase());
}
