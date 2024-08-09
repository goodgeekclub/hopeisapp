import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
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
      this.googleAuthProvider,
    )
      .then(() => {
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

  getUserState(): Observable<User> {
    return authState(this.auth);
  }

  getAccessToken(): Observable<string> {
    return authState(this.auth).pipe(
      map((auth: any) => auth!.accessToken),
      tap((token) => console.log('token:', token)),
    );
  }
}
