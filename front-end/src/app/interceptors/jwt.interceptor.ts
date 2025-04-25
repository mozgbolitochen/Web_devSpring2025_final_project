import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { switchMap } from 'rxjs/operators';
import { catchError, switchMap, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (req.url.includes('/auth')) {
    return next(req);
  }
  
  const token = auth.getToken();

  
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(
      catchError(error => {
        // Обрабатываем только 401 ошибки и не для refresh-запросов
        if (error.status === 401 && !req.url.includes('/refresh')) {
          return auth.refreshToken().pipe(
            switchMap(() => {
              const newToken = auth.getToken();
              if (!newToken) {
                throw error;
              }
              
              // Повторяем оригинальный запрос с новым токеном
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              }));
            }),
            catchError(refreshError => {
              // Если refresh не удался - разлогиниваем
              auth.logout();
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};