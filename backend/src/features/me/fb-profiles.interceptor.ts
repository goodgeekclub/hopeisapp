import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class FbProfilesInterceptor implements NestInterceptor {
  constructor(private service: ProfilesService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user } = context.getArgByIndex(0);
    if (!user) {
      throw new UnauthorizedException();
    }
    return from(this.service.findByFbId(user.uid)).pipe(
      switchMap((profile) => {
        if (profile) {
          // Add Profile to Request
          const req = context.switchToHttp().getRequest();
          req.profile = profile;
          return next.handle();
        } else {
          throw new NotFoundException(
            'User have not sync with profile id yet...',
          );
        }
      }),
    );
  }
}
