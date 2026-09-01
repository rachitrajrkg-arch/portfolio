import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { getValue, setValue } from './db';

export const ADMIN_COOKIE_NAME = 'admin_session';
const PASSCODE_HASH_KEY = 'admin_passcode_hash';

export function isAdminAuthed(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return !!token && !!process.env.ADMIN_SESSION_TOKEN && token === process.env.ADMIN_SESSION_TOKEN;
}

function hashPasscode(passcode: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(passcode, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyHash(passcode: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(passcode, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

// Checks a passcode against the DB-stored hash if one has been set (via "Change Password"
// in /admin); otherwise falls back to the ADMIN_PASSCODE env var used at first setup.
export async function isPasscodeValid(passcode: string): Promise<boolean> {
  const storedHash = await getValue<string>(PASSCODE_HASH_KEY);
  if (storedHash) {
    return verifyHash(passcode, storedHash);
  }
  return !!process.env.ADMIN_PASSCODE && passcode === process.env.ADMIN_PASSCODE;
}

export async function setAdminPasscode(newPasscode: string): Promise<void> {
  await setValue(PASSCODE_HASH_KEY, hashPasscode(newPasscode));
}
