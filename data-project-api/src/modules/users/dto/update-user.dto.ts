import { IsOptional, IsString } from 'class-validator';
import { IsRoleEnum } from './is-role-dto';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsRoleEnum()
  @IsOptional()
  role?: Role;
}
