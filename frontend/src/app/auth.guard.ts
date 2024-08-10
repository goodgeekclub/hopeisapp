import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

export enum ROLE {
  'ADMIN' = 'admin',
  'SUPERUSER' = 'superuser',
  'MEMBER' = 'member',
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkAccess(next, url)
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  checkAccess(route: ActivatedRouteSnapshot, url: any) {
    const accessRoles: string[] = route.data['roles'];
    return this.authService.getUserState().pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new Error('token is null');
        }
        return user.getIdTokenResult();
      }),
      map(result => {
        const roles: string[] = (result.claims as any).roles;
        if (accessRoles && !roles.some(r => accessRoles.findIndex(ar => ar === r) > -1)) {
          throw new Error('Uauthorized');
        }
        return true;
      }),
      catchError((error) => {
        console.error('AuthGuardError: ', error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
