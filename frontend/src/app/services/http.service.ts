import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
export function authInjectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const user = inject(Auth).currentUser;
  
  if (user) {
    return from(user.getIdToken(true)).pipe(
      switchMap((token) => {
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'x-api-key': environment.backend.apiKey
            },
          });
          return next(authReq);
        } else {
          return next(req);
        }
      })
    );
  }
  return next(req);
}
