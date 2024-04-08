import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Auth(['ADMIN'])
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @Auth(['ADMIN'])
  findAll() {
    return this.clientsService.getAll();
  }

  @Get('/averageByWorkCategory')
  @Auth()
  getAverageByWorkCategory() {
    return this.clientsService.getAverageByWorkCategory();
  }

  @Get('/averageByCategoryByWorkCategory')
  @Auth()
  getAverageByCategoryByWorkCategory() {
    return this.clientsService.getAverageByCategoryByWorkCategory();
  }

  @Get(':id')
  @Auth(['ADMIN'])
  findOne(@Param('id') id: string) {
    return this.clientsService.getById(id);
  }

  @Patch(':id')
  @Auth(['ADMIN'])
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Auth(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
