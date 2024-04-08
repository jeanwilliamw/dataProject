import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoriesModule {}
