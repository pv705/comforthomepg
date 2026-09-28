import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bookingSchema = z.object({
  roomId: z.string().transform((v) => parseInt(v)),
  guestName: z.string().min(2).max(100),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  checkInDate: z.string().datetime(),
  checkOutDate: z.string().datetime(),
  roomType: z.enum(['AC', 'Non-AC']),
  message: z.string().max(1000).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};
    const bookings = await prisma.booking.findMany({
      where,
      include: { room: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = bookingSchema.parse(body);
    const { roomId, guestName, phone, email, checkInDate, checkOutDate, roomType, message } = validated;

    // Validate room exists and is available
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    if (room.status !== 'available') {
      return NextResponse.json({ error: 'Room is not available' }, { status: 400 });
    }

    // Check for overlapping bookings
    const overlapping = await prisma.booking.findFirst({
      where: {
        roomId,
        status: { in: ['Pending', 'Confirmed'] },
        OR: [
          {
            checkInDate: { lte: new Date(checkOutDate) },
            checkOutDate: { gte: new Date(checkInDate) },
          },
        ],
      },
    });

    if (overlapping) {
      return NextResponse.json(
        { error: 'Room is already booked for the selected dates' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName,
        phone,
        email,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        roomType,
        message,
        status: 'Pending',
      },
      include: { room: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
