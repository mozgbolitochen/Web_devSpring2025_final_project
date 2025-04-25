import { Injectable, inject} from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, tap, delay, of, catchError, throwError } from 'rxjs'; 
import { Router} from '@angular/router';
import { environment } from '../environments/environment';

interface AuthTokens {
  access: string;
  refresh: string;
}

interface RegisterResponse {
  id?: number;
  username?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
 
  login(credentials: { username: string; password: string }) {
    return this.http.post<AuthTokens>(`${this.apiUrl}/token/`,credentials).pipe(
      tap(response => {
        this.setTokens(response.access, response.refresh);  
      }),
      catchError(error => {
        this.clearTokens();
        
        if (error.status === 401) {
          throw new Error('Неверные учетные данные');
        } else {
          throw new Error('Ошибка сервера. Попробуйте позже.');
        }
      })
    );
  }

  // login(credentials: { username: string; password: string }) {
  //   const isSuccess = credentials.username === 'admin' && credentials.password === '123'; 
    
  //   // return this.http.post<{ token: string }>('/api/login', credentials);

  //   return of({ 
  //     token: 'fake-jwt-token',
  //     refreshToken: 'fake-refresh-token' 
  //   }).pipe(
  //       delay(1000), 
  //       tap(response => {
  //       if (isSuccess) {
  //         this.setTokens(response.token, response.refreshToken);
  //         } else {
  //           throw new Error('Неверные учетные данные');
  //         }
  //       }),
  //     catchError(error => {
  //       this.clearTokens();
  //       throw error;
  //     }));
  // } 

  setTokens(token: string, refreshToken: string) {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false; // Если токен поврежден
    }
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return throwError(() => new Error('No refresh token'));
    
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, { refresh }).pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.token);
      }),
      catchError(error => {
        this.clearTokens();
        throw error;
      })
    );
  }

  
  logout() {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
  getUsername(): string {
    return 'Admin'; 
  }
  getToken(): string | null {
    return localStorage.getItem('jwt_token'); 
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  register(userData: { username: string; email: string; password: string }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register/`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }}).pipe(
      catchError(this.handleError)

    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Неизвестная ошибка';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = this.parseBackendErrors(error.error);
      } else {
        errorMessage = `Код ошибки: ${error.status}\nСообщение: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  private parseBackendErrors(errors: any): string {
    if (errors.email) return `Email: ${errors.email.join(', ')}`;
    if (errors.username) return `Логин: ${errors.username.join(', ')}`;
    if (errors.password) return `Пароль: ${errors.password.join(', ')}`;
    return JSON.stringify(errors);
  }


}