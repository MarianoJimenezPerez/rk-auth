import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthStateService } from '../services/auth/auth.service';

function isLocalhost(): boolean {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.amonBaseUrl)) {
    return next(req);
  }

  const authState = inject(AuthStateService);
  const router = inject(Router);

  let cloned = req.clone({ withCredentials: true });

  if (isLocalhost()) {
    const token = authState.getToken();
    if (token) {
      cloned = cloned.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
  }

  return next(cloned).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/api/auth/login')) {
        authState.clearAuth();
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    }),
  );
};
