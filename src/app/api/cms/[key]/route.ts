import { NextRequest, NextResponse } from 'next/server';
import { getValue, setValue } from '@/lib/db';
import { isAdminAuthed } from '@/lib/adminAuth';

const ALLOWED_KEYS = ['profile', 'services', 'clinics', 'testimonials', 'gallery'];

export async function GET(_req: NextRequest, { params }: { params: { key: string } }) {
  const { key } = params;
  if (!ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Unknown key' }, { status: 404 });
  }
  const value = await getValue(key);
  return NextResponse.json(value ?? null);
}

export async function PUT(req: NextRequest, { params }: { params: { key: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { key } = params;
  if (!ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Unknown key' }, { status: 404 });
  }
  const body = await req.json();
  await setValue(key, body);
  return NextResponse.json({ ok: true });
}
