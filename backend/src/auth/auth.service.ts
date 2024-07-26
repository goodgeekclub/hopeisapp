import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor() { }
  getHello(): string {
    return 'Hello World!';
  }

  listUser(pageToken?: string) {
    return auth().listUsers(100, pageToken);
  }

  getUser(search: { uid?: string, email?: string }) {
    const { uid, email } = search;
    if (uid) {
      return auth().getUser(uid);
    }
    if (email) {
      return auth().getUserByEmail(email);
    }
  }

  setCustomClaim(target: { uid?: string, email?: string }, data?: any) {
    return this.getUser(target)
      .then((user) => auth().setCustomUserClaims(user.uid, data))
      .then((_) => this.getUser(target));
  }
}
