import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HederaService {
  private apiUrl = 'http://localhost:3000'; // URL do backend

  constructor(private http: HttpClient) { }

  testBackendConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/assets`);
  }
}
