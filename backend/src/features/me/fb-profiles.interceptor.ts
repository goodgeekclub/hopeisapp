import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { isValidObjectId } from 'mongoose';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class FbProfilesInterceptor implements NestInterceptor {
  constructor(private service: ProfilesService) {}

  readonly basePath = '/me';
  readonly validatePaths = [
    '/profile'
  ]
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user, url } = context.getArgByIndex(0);
    const subPath = url.substring(this.basePath.length);
    if (!this.validatePaths.some(path => subPath.includes(path))) {
      return next.handle();
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return from(this.service.findByFbId(user.uid)).pipe(
      switchMap(profile => {
        if (profile) {
          return next.handle();
        } else {
          throw new NotFoundException('User have not sync with profile id yet...');
        }
      })
    )
  }
}
