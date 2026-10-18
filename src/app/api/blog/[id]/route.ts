import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/adminAuth';
import { deleteBlogPost, getBlogPostById, isSlugTaken, updateBlogPost } from '@/lib/blogDb';
import { BlogPostInput } from '@/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const post = await getBlogPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as BlogPostInput;
  if (!body.slug || !body.slug.trim()) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }
  if (await isSlugTaken(body.slug, params.id)) {
    return NextResponse.json({ error: 'That slug is already in use' }, { status: 409 });
  }

  const post = await updateBlogPost(params.id, body);
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const ok = await deleteBlogPost(params.id);
  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
