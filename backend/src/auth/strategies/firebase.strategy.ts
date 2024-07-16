import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';
import { catchError, from, map } from 'rxjs';

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
    return from(auth().verifyIdToken(token, true)).pipe(
    map((decodedToken) => {
        return !!decodedToken;
      }),
      catchError((error) => {
        throw new UnauthorizedException(error);
      }),
    );
  }
}
