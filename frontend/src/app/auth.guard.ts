import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth, idToken } from '@angular/fire/auth';
import { catchError, from, map, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private isLoggedInSubscriber: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly angularFireAuth: Auth
  ) {}

  ngOnDestroy(): void {
    this.isLoggedInSubscriber.unsubscribe();
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const firebaseUser = from(idToken(this.angularFireAuth));

    const isLoggedInObservable = firebaseUser.pipe(
      map((token: string | null) => {
        return token !== null;
      }),
      catchError((error) => {
        console.error('AuthGuard.canActivate: ', error);
        return of(false);
      })
    );

    this.isLoggedInSubscriber = isLoggedInObservable.subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/test/login']);
        }
      },
    });
    return true;
  }
}
