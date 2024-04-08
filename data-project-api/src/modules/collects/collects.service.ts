import { Injectable } from '@nestjs/common';
import { Collect, Prisma } from '@prisma/client';
import { CollectsRepository } from './collects.repository';

@Injectable()
export class CollectsService {
  constructor(private readonly collectsRepository: CollectsRepository) {}

  async getAll(query: Prisma.CollectFindManyArgs): Promise<Collect[]> {
    return this.collectsRepository.findAll(query);
  }

  async getOne(id: number): Promise<Collect | null> {
    return this.collectsRepository.findById(id);
  }

  async update(id: number, data: Partial<Collect>): Promise<Collect | null> {
    return this.collectsRepository.update(id, data);
  }

  async delete(id: number): Promise<Collect | null> {
    return this.collectsRepository.delete(id);
  }
}
