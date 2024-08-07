import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000/auth';
  private userInfo: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('hederaAccountId', response.hederaAccountId);

            this.userInfo = {
              username: response.username,
              hederaAccountId: response.hederaAccountId
            };
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('hederaAccountId');
    this.userInfo = null;
  }

  getUserInfo(): any {
    if (!this.userInfo) {
      this.userInfo = {
        username: localStorage.getItem('username'),
        hederaAccountId: localStorage.getItem('hederaAccountId')
      };
    }
    return this.userInfo;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
