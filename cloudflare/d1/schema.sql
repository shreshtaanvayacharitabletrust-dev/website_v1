CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  source_page TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_kind ON inquiries(kind);
