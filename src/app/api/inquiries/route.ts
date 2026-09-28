import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { isAdmin } from '@/lib/auth';
import { inquirySchema } from '@/lib/inquiry-validation';
import { readJson, RequestError } from '@/lib/request-body';

export async function GET(request: Request) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};
    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { website, ...data } = inquirySchema.parse(await readJson(request));
    const recent = await prisma.inquiry.count({
      where: { phone: data.phone, createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) } },
    });
    if (recent >= 3) return NextResponse.json({ error: 'We have your recent requests. Please try again later or contact us on WhatsApp.' }, { status: 429 });
    await prisma.inquiry.create({
      data,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
