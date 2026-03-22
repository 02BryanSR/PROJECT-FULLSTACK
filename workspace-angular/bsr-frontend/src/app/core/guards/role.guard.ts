import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

export const roleGuard =
  (allowedRoles: readonly UserRole[]): CanActivateFn =>
  () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.sessionStatus() !== 'authenticated') {
      return router.createUrlTree(['/login']);
    }

    if (authService.isAuthenticated() && authService.hasAnyRole(allowedRoles)) {
      return true;
    }

    return router.createUrlTree(['/login']);
  };
