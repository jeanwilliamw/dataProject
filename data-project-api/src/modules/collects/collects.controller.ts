import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CollectsService } from './collects.service';
import { UpdateCollectDto } from './dto/update-collect.dto';
import { Auth } from '../../decorators/auth.decorator';
import { FindAllCollectDto } from './dto/find-all-collect.dto';

@Controller('collects')
export class CollectsController {
  constructor(private readonly collectsService: CollectsService) {}

  @Get()
  @Auth()
  findAll(@Query() query: FindAllCollectDto) {
    return this.collectsService.getAll(query);
  }

  @Get(':id')
  @Auth(['ADMIN'])
  findOne(@Param('id') id: string) {
    return this.collectsService.getOne(+id);
  }

  @Patch(':id')
  @Auth(['ADMIN'])
  update(@Param('id') id: string, @Body() updateCollectDto: UpdateCollectDto) {
    return this.collectsService.update(+id, updateCollectDto);
  }

  @Delete(':id')
  @Auth(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.collectsService.delete(+id);
  }
}
