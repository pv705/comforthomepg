import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, type, acPrice, nonAcPrice, description, amenities, totalRooms, availableRooms, status, images } = body;

    const room = await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        acPrice: parseFloat(acPrice),
        nonAcPrice: parseFloat(nonAcPrice),
        description,
        amenities: JSON.stringify(amenities || []),
        totalRooms: parseInt(totalRooms),
        availableRooms: parseInt(availableRooms),
        status,
        images: {
          deleteMany: {},
          create: (images || []).map((url: string) => ({ url })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.room.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
