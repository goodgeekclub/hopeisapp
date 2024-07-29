import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { auth } from 'firebase-admin';

export enum AuthRole {
  User = 'user',
  Admin = 'admin',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const role = () => (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles)
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(ctx: ExecutionContext) {
    const isPublic = this.getReflector(ctx, IS_PUBLIC_KEY);
    if (isPublic) {
      return true
    }
    const requiredRoles = this.reflector.getAllAndOverride<AuthRole[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]).map(r => r.toLocaleLowerCase());
    if (!requiredRoles) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return auth().verifyIdToken(token)
      .then(user => {
        request['user'] = user;
        if (requiredRoles.length === 0 || requiredRoles.includes('user')) {
          return true;
        }
        // const isAuthorize = requiredRoles.some((role) => user.roles?.includes(role));
        return requiredRoles.some((role) => user.roles?.includes(role));
      }).catch(e => {
        // console.log(e);
        const { code, message } = e;
        throw new UnauthorizedException({ name: 'Unauthorized', code, message });
      });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getReflector(ctx: ExecutionContext, key: string) {
    return this.reflector.getAllAndOverride<boolean>(key, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }
}