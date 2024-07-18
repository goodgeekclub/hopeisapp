import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';
import { catchError, from, map, of } from 'rxjs';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(token: string) {
    // verifyIdToken throws an error which cannot be caught by the catchError operator in the Observable so we use .then and .catch
    return auth()
      .verifyIdToken(token, true)
      .then((res) => !!res)
      .catch((e) => {
        throw new UnauthorizedException('Invalid token');
      });
  }
}
