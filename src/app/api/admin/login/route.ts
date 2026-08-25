import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const { passcode } = await req.json();

  if (!process.env.ADMIN_PASSCODE || !process.env.ADMIN_SESSION_TOKEN) {
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 500 });
  }

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return NextResponse.json({ error: 'Incorrect passcode' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, process.env.ADMIN_SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 12,
    path: '/',
  });
  return res;
}
