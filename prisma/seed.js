const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@comforthomepg.in' },
    update: {},
    create: {
      email: 'admin@comforthomepg.in',
      name: 'Admin',
      passwordHash,
    },
  });
  console.log('Admin user created: admin@comforthomepg.in / admin123');

  // Create rooms
  const rooms = [
    {
      name: 'Single Occupancy',
      type: 'Single',
      acPrice: 15500,
      nonAcPrice: 14000,
      description: 'All to yourself — spacious room with natural light and modern amenities.',
      amenities: ['Spacious room', 'Natural light', 'Furnished bed', 'WiFi included', 'Study desk', 'Wardrobe'],
      totalRooms: 5,
      availableRooms: 2,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    },
    {
      name: 'Double Sharing',
      type: 'Double',
      acPrice: 10500,
      nonAcPrice: 9500,
      description: 'Split the rent — comfortable sharing with ample space and privacy.',
      amenities: ['Spacious & bright', 'Study desk', 'Furnished beds', 'WiFi included', 'Wardrobe', 'Natural light'],
      totalRooms: 8,
      availableRooms: 3,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    },
    {
      name: 'Triple Sharing',
      type: 'Triple',
      acPrice: 7500,
      nonAcPrice: 6500,
      description: 'Most affordable — perfect for students and budget-conscious professionals.',
      amenities: ['Large spacious room', 'Study area', 'Furnished beds', 'WiFi included', 'Wardrobe', 'Natural light'],
      totalRooms: 10,
      availableRooms: 4,
      images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800'],
    },
  ];

  for (const room of rooms) {
    const existing = await prisma.room.findFirst({ where: { name: room.name } });
    if (!existing) {
      await prisma.room.create({
        data: {
          ...room,
          amenities: JSON.stringify(room.amenities),
          images: {
            create: room.images.map((url) => ({ url })),
          },
        },
      });
      console.log(`Created room: ${room.name}`);
    } else {
      console.log(`Room already exists: ${room.name}`);
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
