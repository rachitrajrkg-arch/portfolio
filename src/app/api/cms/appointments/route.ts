import { NextRequest, NextResponse } from 'next/server';
import { getValue, setValue } from '@/lib/db';
import { isAdminAuthed } from '@/lib/adminAuth';
import { Appointment } from '@/types';

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const appointments = (await getValue<Appointment[]>('appointments')) ?? [];
  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const existing = (await getValue<Appointment[]>('appointments')) ?? [];

  const newApt: Appointment = {
    ...body,
    id: `apt-${Date.now().toString().slice(-4)}`,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [newApt, ...existing];
  await setValue('appointments', updated);
  return NextResponse.json(newApt);
}
