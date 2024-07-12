// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
// import { auth } from 'firebase-admin';

// @Injectable()
// export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {

//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//         });
//     }

//     async validate(token: string) {
//         try {
//             return await auth()
//                 .verifyIdToken(token, true);
//         } catch (err) {
//             console.log(err);
//             throw new UnauthorizedException();
//         }
//     }
// }

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-firebase';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      issuer: `https://securetoken.google.com/${process.env.PROJECT_ID}`,
      audience: `${process.env.PROJECT_ID}`,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
