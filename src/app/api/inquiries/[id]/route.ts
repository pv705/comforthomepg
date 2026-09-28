import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { readJson, RequestError } from '@/lib/request-body';
import { z } from 'zod';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) return NextResponse.json({ error: 'Invalid inquiry ID' }, { status: 400 });
    const { status } = z.object({ status: z.enum(['New', 'Contacted', 'Resolved']) }).parse(await readJson(request));

    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    const { id } = await params;
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) return NextResponse.json({ error: 'Invalid inquiry ID' }, { status: 400 });
    await prisma.inquiry.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
