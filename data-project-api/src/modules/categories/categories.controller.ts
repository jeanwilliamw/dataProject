import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post()
  @Auth(['ADMIN'])
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Patch(':id')
  @Auth(['ADMIN'])
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.categoriesService.delete(+id);
  }
}
