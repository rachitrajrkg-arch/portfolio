import { NextRequest, NextResponse } from 'next/server';
import { getValue, setValue } from '@/lib/db';
import { isAdminAuthed } from '@/lib/adminAuth';
import { Appointment } from '@/types';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { status } = await req.json();
  const existing = (await getValue<Appointment[]>('appointments')) ?? [];
  const updated = existing.map((a) => (a.id === params.id ? { ...a, status } : a));
  await setValue('appointments', updated);
  return NextResponse.json({ ok: true });
}
