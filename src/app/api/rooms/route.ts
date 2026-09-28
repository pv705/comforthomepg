import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: { images: true },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { name, type, acPrice, nonAcPrice, description, amenities, totalRooms, availableRooms, images } = body;

    const room = await prisma.room.create({
      data: {
        name,
        type,
        acPrice: parseFloat(acPrice),
        nonAcPrice: parseFloat(nonAcPrice),
        description,
        amenities: JSON.stringify(amenities || []),
        totalRooms: parseInt(totalRooms),
        availableRooms: parseInt(availableRooms),
        images: {
          create: (images || []).map((url: string) => ({ url })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
