import { PrismaClient, Collect, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class CollectsRepository {
  async create(data: Prisma.CollectCreateInput): Promise<Collect> {
    return prisma.collect.create({ data });
  }

  async findAll(query: Prisma.CollectFindManyArgs): Promise<Collect[]> {
    return prisma.collect.findMany({ ...query });
  }

  async findById(id: number): Promise<Collect | null> {
    return prisma.collect.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Collect>): Promise<Collect | null> {
    return prisma.collect.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Collect | null> {
    return prisma.collect.delete({ where: { id } });
  }
}
