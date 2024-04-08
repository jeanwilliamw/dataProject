import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        username: 'normalUser',
        email: 'normalUser@dataproject.com',
        password:
          '$2b$10$WOiT/pOEts0lOqJVQUkDXustXKC2tFuyV3vxUXb9N4wDAqjETsmc2',
        role: 'USER',
      },
      {
        username: 'adminUser',
        email: 'adminUser@dataproject.com',
        password:
          '$2b$10$4OjB274hretoclPFRlmN3ecCNs9yzGcbP.DAZ5LRtwVBMwGalFyI6',
        role: 'ADMIN',
      },
    ],
  });
}

seedUsers()
  .catch((error) => {
    console.error('Error seeding users:', error);
    process.exit(1); // Exit with error code
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect Prisma client
  });
