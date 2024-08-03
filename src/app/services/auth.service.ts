import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
