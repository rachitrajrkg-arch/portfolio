import crypto from 'crypto';
import { Pool } from 'pg';
import { getPool } from './db';
import { BlogContent, BlogPost, BlogPostInput } from '../types';

declare global {
  // eslint-disable-next-line no-var
  var __blogSchemaReady: Promise<void> | undefined;
}

async function ensureBlogSchema(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id               TEXT PRIMARY KEY,
      slug             TEXT NOT NULL UNIQUE,
      title            TEXT NOT NULL,
      summary          TEXT NOT NULL DEFAULT '',
      cover_url        TEXT,
      category         TEXT NOT NULL DEFAULT '',
      author           TEXT NOT NULL DEFAULT '',
      status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      meta_title       TEXT,
      meta_description TEXT,
      content          JSONB NOT NULL DEFAULT '{"original":{"blocks":[]},"updates":[]}',
      published_at     TIMESTAMPTZ,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS blog_posts_status_published_idx ON blog_posts (status, published_at DESC)`);
}

async function ready(): Promise<Pool> {
  const pool = getPool();
  if (!global.__blogSchemaReady) {
    global.__blogSchemaReady = ensureBlogSchema(pool);
  }
  await global.__blogSchemaReady;
  return pool;
}

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  cover_url: string | null;
  category: string;
  author: string;
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  content: BlogContent;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function rowToBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    coverUrl: row.cover_url ?? undefined,
    category: row.category,
    author: row.author,
    status: row.status,
    metaTitle: row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    content: row.content,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listBlogPosts(opts: { includeDrafts: boolean }): Promise<BlogPost[]> {
  const pool = await ready();
  const result = opts.includeDrafts
    ? await pool.query<BlogPostRow>(
        `SELECT * FROM blog_posts ORDER BY updated_at DESC`
      )
    : await pool.query<BlogPostRow>(
        `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`
      );
  return result.rows.map(rowToBlogPost);
}

export async function getBlogPostBySlug(slug: string, opts: { includeDrafts: boolean }): Promise<BlogPost | undefined> {
  const pool = await ready();
  const result = opts.includeDrafts
    ? await pool.query<BlogPostRow>(`SELECT * FROM blog_posts WHERE slug = $1`, [slug])
    : await pool.query<BlogPostRow>(`SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'`, [slug]);
  const row = result.rows[0];
  return row ? rowToBlogPost(row) : undefined;
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const pool = await ready();
  const result = await pool.query<BlogPostRow>(`SELECT * FROM blog_posts WHERE id = $1`, [id]);
  const row = result.rows[0];
  return row ? rowToBlogPost(row) : undefined;
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const pool = await ready();
  const result = excludeId
    ? await pool.query(`SELECT 1 FROM blog_posts WHERE slug = $1 AND id <> $2 LIMIT 1`, [slug, excludeId])
    : await pool.query(`SELECT 1 FROM blog_posts WHERE slug = $1 LIMIT 1`, [slug]);
  return (result.rowCount ?? 0) > 0;
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const pool = await ready();
  const id = crypto.randomUUID();
  const publishedAt = input.status === 'published' ? new Date().toISOString() : null;
  const result = await pool.query<BlogPostRow>(
    `INSERT INTO blog_posts
       (id, slug, title, summary, cover_url, category, author, status, meta_title, meta_description, content, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      id,
      input.slug,
      input.title,
      input.summary,
      input.coverUrl ?? null,
      input.category,
      input.author,
      input.status,
      input.metaTitle ?? null,
      input.metaDescription ?? null,
      JSON.stringify(input.content),
      publishedAt,
    ]
  );
  return rowToBlogPost(result.rows[0]);
}

export async function updateBlogPost(id: string, patch: BlogPostInput): Promise<BlogPost | undefined> {
  const pool = await ready();
  const existing = await getBlogPostById(id);
  if (!existing) return undefined;

  // Only stamp published_at the first time a post goes live; re-saving a published
  // post (or unpublishing it) never resets its original publish date.
  const publishedAt =
    patch.status === 'published' && !existing.publishedAt ? new Date().toISOString() : existing.publishedAt;

  const result = await pool.query<BlogPostRow>(
    `UPDATE blog_posts SET
       slug = $2, title = $3, summary = $4, cover_url = $5, category = $6, author = $7,
       status = $8, meta_title = $9, meta_description = $10, content = $11,
       published_at = $12, updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      patch.slug,
      patch.title,
      patch.summary,
      patch.coverUrl ?? null,
      patch.category,
      patch.author,
      patch.status,
      patch.metaTitle ?? null,
      patch.metaDescription ?? null,
      JSON.stringify(patch.content),
      publishedAt,
    ]
  );
  return rowToBlogPost(result.rows[0]);
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const pool = await ready();
  const result = await pool.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
