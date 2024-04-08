import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async findAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async findUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }
}
