import { IsEmail, IsString } from 'class-validator';
import { IsRoleEnum } from './is-role-dto';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsRoleEnum()
  role: Role;
}
