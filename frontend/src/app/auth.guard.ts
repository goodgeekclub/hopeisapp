import { Injectable } from '@angular/core';
import {
  CanActivate,
  // ActivatedRouteSnapshot,
  // RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth, idToken } from '@angular/fire/auth';
import { catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly angularFireAuth: Auth,
  ) {}

  public canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ) {
    return from(idToken(this.angularFireAuth)).pipe(
      map((token: string | null) => {
        if (token === null) {
          throw new Error('token is null');
        }
        return true;
      }),
      catchError((error) => {
        console.error('AuthGuard.canActivate: ', error);
        return this.router.navigate(['/test/login']);
      }),
    );
  }
}
