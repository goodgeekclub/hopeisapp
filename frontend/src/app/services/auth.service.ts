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
<<<<<<< HEAD
      .then(async (result) => {
        return this.auth.currentUser;
=======
      .then((result) => {
        console.log('Result', result)
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user: User = {
          displayName: result?.user?.displayName || '',
          email: result?.user?.email || '',
          phoneNumber: result?.user?.phoneNumber || undefined,
          photoURL: result?.user?.photoURL || undefined,
          token: credential?.accessToken || '',
        };

        return user;
>>>>>>> 72fcec1 (feat: setup test script assume oidc)
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