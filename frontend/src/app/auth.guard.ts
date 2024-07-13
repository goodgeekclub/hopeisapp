import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth, idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly angularFireAuth: Auth
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const firebaseUser = idToken(this.angularFireAuth);

      return firebaseUser.subscribe((token: string | null) => {
        if (token !== null) {
          return true;
        } else {
          this.router.navigate(['/test/login']);
          throw new Error('Token not found');
        }
      });
    } catch (error) {
      this.router.navigate(['/test/login']);
      console.error('AuthGuard.canActivate', error);
      return false;
    }
  }
}
