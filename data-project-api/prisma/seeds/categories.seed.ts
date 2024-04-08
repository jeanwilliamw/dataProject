import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  try {
    await prisma.category.createMany({
      data: [
        { name: 'Alimentation' },
        { name: 'Boissons' },
        { name: 'Produits de nettoyage' },
        { name: 'Hygiène et beauté' },
        { name: 'Vêtements' },
        { name: 'Électronique' },
        { name: 'Maison et décoration' },
        { name: 'Jouets et jeux' },
        { name: 'Sports et loisirs' },
        { name: 'Papeterie' },
      ],
    });

    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1); // Exit with error code
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

seedCategories();
