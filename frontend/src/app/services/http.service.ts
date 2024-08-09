import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export function authInjectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const user = inject(AuthService).getCurrentUser();
  console.log('Interceptor');
  const noAuthReq = req.clone({
    setHeaders: {
      'x-api-key': `${environment.backend.apiKey}`,
    },
  });
  console.log('user', user);

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
      }),
    );
  }
  return next(noAuthReq);
}
