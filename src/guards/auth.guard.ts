import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthStateService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return authState
    .checkAuth()
    .pipe(map((authenticated) => authenticated || router.createUrlTree(['/login'])));
};
