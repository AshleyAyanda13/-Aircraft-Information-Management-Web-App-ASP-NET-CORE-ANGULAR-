import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('jwtToken'); // Check if logged in

  if (isAuthenticated) {
    router.navigate(['/home']); // Redirect to home if user is logged in
    return false;
  }
  return true;
};