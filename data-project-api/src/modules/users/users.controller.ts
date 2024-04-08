import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(['ADMIN'])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(['ADMIN'])
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(['ADMIN'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
