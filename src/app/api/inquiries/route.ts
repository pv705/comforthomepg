import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};
    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: validated,
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
