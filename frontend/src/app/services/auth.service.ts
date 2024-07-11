import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
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

  public async register(): Promise<User> {
    const registeredUser = await signInWithPopup(
      this.auth,
      this.googleAuthProvider
    )
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user: User = {
          displayName: result?.user?.displayName || '',
          email: result?.user?.email || '',
          phoneNumber: result?.user?.phoneNumber || undefined,
          photoURL: result?.user?.photoURL || undefined,
          token: credential?.accessToken || '',
        };

        return user;
      })
      .catch((error) => {
        console.error('AuthService.register', error.message);
        const user: User = {
          displayName: '',
          email: '',
          token: '',
        };
        return user;
      });
    return registeredUser;
  }
}
