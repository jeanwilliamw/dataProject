// category.service.ts

import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(data);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    return this.categoryRepository.update(id, data);
  }

  async delete(id: number): Promise<Category | null> {
    return this.categoryRepository.delete(id);
  }
}
