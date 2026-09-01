import { NextRequest, NextResponse } from 'next/server';
import { isPasscodeValid, setAdminPasscode } from '@/lib/adminAuth';

// No session check here on purpose: knowing the current passcode is itself the proof of
// authorization to change it (same guarantee logging in gives you). This lets the passcode
// be changed either from the authenticated Settings tab or directly from the login screen.
export async function POST(req: NextRequest) {
  const { currentPasscode, newPasscode } = await req.json();

  if (!newPasscode || typeof newPasscode !== 'string' || newPasscode.length < 6) {
    return NextResponse.json({ error: 'New passcode must be at least 6 characters' }, { status: 400 });
  }

  if (!(await isPasscodeValid(currentPasscode))) {
    return NextResponse.json({ error: 'Current passcode is incorrect' }, { status: 401 });
  }

  await setAdminPasscode(newPasscode);
  return NextResponse.json({ ok: true });
}
