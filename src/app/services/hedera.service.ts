import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HederaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMessages(topicId: string, startTime: Date): Observable<string[]> {
    const url = `${this.apiUrl}/hedera/messages`;
    const params = {
      topicId: topicId,
      startTime: startTime.toISOString()
    };

    return this.http.get<string[]>(url, { params });
  }
}
