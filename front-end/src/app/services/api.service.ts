import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
interface UserProfile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  

  constructor(private http: HttpClient) {}
  // 1. Запрос данных (GET)
  getPublicData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  // 2. Отправка формы (POST)
  submitContactForm(data: any) {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }

  // 3. Регистрация (POST)
  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // 4. Получение профиля (GET с auth)
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
  }
  updateProfile(data: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/profile`, data);
  }

}
 