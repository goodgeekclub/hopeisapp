import { User } from '../models/user.model';

export class AuthDecorator {
    
  public static formatUser(user: any, credential: any): User {
    return {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      token: credential?.accessToken,
    };
  }
}
