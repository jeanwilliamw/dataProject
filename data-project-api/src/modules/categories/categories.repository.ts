import { PrismaClient, Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

const prisma = new PrismaClient();

export class CategoryRepository {
  async create(data: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({ data });
  }

  async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async findById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Category | null> {
    return prisma.category.delete({ where: { id } });
  }
}
