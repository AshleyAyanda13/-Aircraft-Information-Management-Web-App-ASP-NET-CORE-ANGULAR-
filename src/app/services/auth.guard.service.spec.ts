import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard.service';

describe('AuthGuard', () => {
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }]
    });
  });

  it('should allow access if user is authenticated', () => {
    localStorage.setItem('token', 'test-token'); // Simulate logged-in user
    expect(authGuard(null, null)).toBeTrue();
  });

  it('should block access and redirect if user is not authenticated', () => {
    localStorage.removeItem('token'); // Simulate logged-out user
    expect(authGuard(null, null)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/loginn']);
  });
});
