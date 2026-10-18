import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/adminAuth';
import { createBlogPost, isSlugTaken, listBlogPosts } from '@/lib/blogDb';
import { BlogPostInput } from '@/types';

export async function GET(req: NextRequest) {
  const posts = await listBlogPosts({ includeDrafts: isAdminAuthed(req) });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as BlogPostInput;
  if (!body.slug || !body.slug.trim()) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  if (await isSlugTaken(body.slug)) {
    return NextResponse.json({ error: 'That slug is already in use' }, { status: 409 });
  }

  const post = await createBlogPost(body);
  return NextResponse.json(post, { status: 201 });
}
