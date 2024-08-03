import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRole } from 'src/auth/auth.guard';

export function Auth(...roles: AuthRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
}
