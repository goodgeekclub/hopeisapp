import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { auth } from 'firebase-admin';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ADMIN_KEY = 'isAdmin';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(ctx: ExecutionContext) {
    const isPublic = this.getReflector(ctx, IS_PUBLIC_KEY);
    const isAdmin = this.getReflector(ctx, IS_ADMIN_KEY);
    console.log('isAdmin:', isAdmin);
    if (isPublic) {
      return true
    }
    const request = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return auth().verifyIdToken(token)
      .then(user => {
        // console.log(user);
        request['user'] = user;
        if (isAdmin && !user.admin) {
          throw new UnauthorizedException()
        }
        return true;
      }).catch(e => {
        // console.log(e);
        throw new UnauthorizedException()
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