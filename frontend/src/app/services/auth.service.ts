import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { AuthDecorator } from '../decorators/auth.decorator';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleAuthProvider: GoogleAuthProvider;

  constructor(private readonly auth: Auth) {
    this.auth = getAuth();
    this.googleAuthProvider = new GoogleAuthProvider();
  }

  public async register(): Promise<User | null> {
    const user = await signInWithPopup(this.auth, this.googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user = AuthDecorator.formatUser(result.user, credential);
        
        return user;
      })
      .catch((error) => {
        console.error('AuthService.register', error.message);
        return null;
      });
      return user
  }
}
