import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleAuthGuard } from '../guards/role-auth-guard';

export function Auth(roles?: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard(), RoleAuthGuard),
  );
}
