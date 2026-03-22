import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.sessionStatus() === 'authenticated') {
    return true;
  }

  authService.logout({ redirectToLogin: false });

  return router.createUrlTree(['/login']);
};
