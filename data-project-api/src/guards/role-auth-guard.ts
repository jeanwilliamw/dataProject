import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRole) {
      // If no role is specified, allow access
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    // Check if user has the required role

    return user && requiredRole.includes(user.role);
  }
}
