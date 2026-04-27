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

CREATE TABLE IF NOT EXISTS cms_site_content (
  id TEXT PRIMARY KEY,
  content_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS cms_media_assets (
  key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  public_url TEXT NOT NULL,
  created_at TEXT NOT NULL,
  uploaded_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_cms_media_created_at
  ON cms_media_assets(created_at DESC);
