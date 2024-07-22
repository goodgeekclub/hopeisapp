import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleAuthProvider: GoogleAuthProvider;
  constructor(private readonly auth: Auth) {
    this.googleAuthProvider = new GoogleAuthProvider();
  }

  public async register(): Promise<User | null> {
    const registeredUser = await signInWithPopup(
      this.auth,
      this.googleAuthProvider
    )
      .then(async (result) => {
        return this.auth.currentUser;
      })
      .catch((error) => {
        console.error('AuthService.register', error.message);
        return null;
      });
    return registeredUser;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  getUserState() {
    return authState(this.auth);
  }

  getAccessToken(): Observable<string> {
    return authState(this.auth).pipe(
      map((auth: any) => auth!.accessToken)
    );
  }
}
