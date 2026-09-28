import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const roomType = searchParams.get('roomType');

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'checkIn and checkOut dates are required' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Get all available rooms
    const where: any = { status: 'available' };
    if (roomType) {
      where.type = roomType;
    }

    const rooms = await prisma.room.findMany({
      where,
      include: { images: true },
    });

    // Check availability for each room
    const availability = await Promise.all(
      rooms.map(async (room) => {
        const overlapping = await prisma.booking.findFirst({
          where: {
            roomId: room.id,
            status: { in: ['Pending', 'Confirmed'] },
            OR: [
              {
                checkInDate: { lte: checkOutDate },
                checkOutDate: { gte: checkInDate },
              },
            ],
          },
        });

        return {
          ...room,
          isAvailable: !overlapping,
        };
      })
    );

    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}
