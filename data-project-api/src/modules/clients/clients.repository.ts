import { PrismaClient, Client, Prisma, Collect } from '@prisma/client';
import { CreateClientCalcuated, UpdateClientCalcuated } from './types/client';

const prisma = new PrismaClient();

export class ClientRepository {
  async createWithCollects(data: CreateClientCalcuated): Promise<Client> {
    const { collects, ...clientData } = data;

    const client = await prisma.client.create({
      data: {
        ...clientData,
        collects: {
          createMany: {
            data: collects.map((collect) => ({
              ...collect,
            })),
          },
        },
      },
      include: { collects: true },
    });

    return client;
  }

  async findAll(
    includeCollects = false,
  ): Promise<(Client & { collects?: Collect[] })[]> {
    return prisma.client.findMany(
      includeCollects
        ? { include: { collects: true } }
        : ({} as Prisma.ClientFindManyArgs),
    );
  }

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id },
      include: { collects: true },
    });
  }

  async update(
    id: string,
    data: UpdateClientCalcuated,
  ): Promise<Client | null> {
    const { collects, ...clientData } = data;

    if (collects) {
      await prisma.client.update({
        where: { id },
        data: {
          ...clientData,
          collects: {
            deleteMany: {},
            createMany: {
              data: collects.map((collect) => ({
                ...collect,
              })),
            },
          },
        },
      });
    } else {
      await prisma.client.update({ where: { id }, data: clientData });
    }

    return prisma.client.findUnique({
      where: { id },
      include: { collects: true },
    });
  }

  async delete(id: string): Promise<Client | null> {
    return prisma.client.delete({ where: { id } });
  }
}
