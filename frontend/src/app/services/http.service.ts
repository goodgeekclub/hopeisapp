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

  const noAuthReq = req.clone({
    setHeaders: {
      'x-api-key': `${environment.backend.apiKey}`,
    },
  });
  
  if (user) {
    return from(user.getIdToken(true)).pipe(
      switchMap((token) => {
        if (token) {
          const authReq = noAuthReq.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next(authReq);
        } else {
          return next(req);
        }
      })
    );
  }
  return next(noAuthReq);
}
