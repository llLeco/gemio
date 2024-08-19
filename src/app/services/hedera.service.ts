import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HederaService {
  private apiUrl = `${environment.apiUrl}/hedera`;

  constructor(private http: HttpClient) {}

  getMessages(topicId: string, startTime: Date): Observable<string[]> {
    const url = `${this.apiUrl}/messages`;
    const params = {
      topicId: topicId,
      startTime: startTime.toISOString()
    };

    return this.http.get<string[]>(url, { params });
  }
}
