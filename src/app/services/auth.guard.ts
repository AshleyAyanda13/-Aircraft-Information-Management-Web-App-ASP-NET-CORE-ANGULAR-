import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('jwtToken'); // Check for token

  if (!isAuthenticated) {
    router.navigate(['/loginn']); // Redirect to login page if not authenticated
    return false;
  }
  return true;
};
