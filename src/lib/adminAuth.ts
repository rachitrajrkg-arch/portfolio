import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'admin_session';

export function isAdminAuthed(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return !!token && !!process.env.ADMIN_SESSION_TOKEN && token === process.env.ADMIN_SESSION_TOKEN;
}
