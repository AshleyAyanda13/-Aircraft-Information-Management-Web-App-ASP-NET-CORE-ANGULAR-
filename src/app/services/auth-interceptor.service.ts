import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  

  const token = localStorage.getItem('jwtToken');

  if (token) {
    
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  console.log('AuthInterceptor: No token found, forwarding request');
  return next(req);
};
