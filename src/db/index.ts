// Database setup and operations
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Determine db path - use in-memory for tests
const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'crossreach.db');

// Ensure data directory exists (only for file-based db)
const dataDir = path.dirname(dbPath);
if (dbPath !== ':memory:' && !fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable WAL mode for better performance
void db.pragma('journal_mode = WAL');

// Create tables
void db.exec(`
  CREATE TABLE IF NOT EXISTS generated_posts (
    id TEXT PRIMARY KEY,
    original_content TEXT NOT NULL,
    platform TEXT NOT NULL,
    generated_content TEXT NOT NULL,
    tone TEXT,
    hashtags BOOLEAN DEFAULT 0,
    media_urls TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS post_history (
    id TEXT PRIMARY KEY,
    generated_post_id TEXT,
    platform TEXT NOT NULL,
    post_id TEXT,
    status TEXT DEFAULT 'draft',
    scheduled_at TEXT,
    published_at TEXT,
    error TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_post_id) REFERENCES generated_posts(id)
  );

  CREATE INDEX IF NOT EXISTS idx_posts_platform ON generated_posts(platform);
  CREATE INDEX IF NOT EXISTS idx_posts_created ON generated_posts(created_at);
  CREATE INDEX IF NOT EXISTS idx_history_status ON post_history(status);
`);

export interface GeneratedPost {
  id: string;
  original_content: string;
  platform: string;
  generated_content: string;
  tone?: string;
  hashtags?: boolean;
  media_urls?: string;
  created_at?: string;
}

export interface PostHistory {
  id: string;
  generated_post_id?: string;
  platform: string;
  post_id?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduled_at?: string;
  published_at?: string;
  error?: string;
  created_at?: string;
}

// Save generated post
export function saveGeneratedPost(post: GeneratedPost): string {
  const stmt = db.prepare(`
    INSERT INTO generated_posts (id, original_content, platform, generated_content, tone, hashtags, media_urls)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    post.id,
    post.original_content,
    post.platform,
    post.generated_content,
    post.tone || null,
    post.hashtags ? 1 : 0,
    post.media_urls || null
  );

  return post.id;
}

// Get recent posts by platform
export function getRecentPosts(platform?: string, limit: number = 10): GeneratedPost[] {
  if (platform) {
    const stmt = db.prepare(`
      SELECT * FROM generated_posts
      WHERE platform = ?
      ORDER BY created_at DESC
      LIMIT ?
    `);
    return stmt.all(platform, limit) as GeneratedPost[];
  }

  const stmt = db.prepare(`
    SELECT * FROM generated_posts
    ORDER BY created_at DESC
    LIMIT ?
  `);
  return stmt.all(limit) as GeneratedPost[];
}

// Save post history
export function savePostHistory(history: PostHistory): string {
  const stmt = db.prepare(`
    INSERT INTO post_history (id, generated_post_id, platform, post_id, status, scheduled_at, error)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    history.id,
    history.generated_post_id || null,
    history.platform,
    history.post_id || null,
    history.status,
    history.scheduled_at || null,
    history.error || null
  );

  return history.id;
}

// Update post status
export function updatePostStatus(id: string, status: Partial<PostHistory>): void {
  const updates: string[] = [];
  const values: (string | number | null | undefined)[] = [];

  if (status.post_id !== undefined) {
    updates.push('post_id = ?');
    values.push(status.post_id);
  }
  if (status.status !== undefined) {
    updates.push('status = ?');
    values.push(status.status);
  }
  if (status.published_at !== undefined) {
    updates.push('published_at = ?');
    values.push(status.published_at);
  }
  if (status.error !== undefined) {
    updates.push('error = ?');
    values.push(status.error);
  }

  if (updates.length === 0) return;

  values.push(id);
  const stmt = db.prepare(`
    UPDATE post_history SET ${updates.join(', ')} WHERE id = ?
  `);
  stmt.run(...values);
}

// Get pending scheduled posts
export function getScheduledPosts(): PostHistory[] {
  const stmt = db.prepare(`
    SELECT * FROM post_history
    WHERE status = 'scheduled'
    AND scheduled_at <= datetime('now')
  `);
  return stmt.all() as PostHistory[];
}

// Clean up test data
export function cleanupTestData(): void {
  db.prepare('DELETE FROM post_history').run();
  db.prepare('DELETE FROM generated_posts').run();
}
