import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
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
    this.auth = getAuth();
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
}

// {
//   "Effect": "Allow",
//   "Principal": {
//     "Federated": "arn:aws:iam::907877978309:oidc-provider/securetoken.google.com/520520413022"
//   },
//   "Action": "sts:AssumeRoleWithWebIdentity",
//   "Condition": {
//     "StringEquals": {
//       "securetoken.google.com/520520413022:aud": "520520413022"
//     }
//   }
// },