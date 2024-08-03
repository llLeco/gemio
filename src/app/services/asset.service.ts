import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets'; // Ajuste conforme necessário

  constructor(private http: HttpClient) { }

  getAssetEvents(assetId: string, startTime?: string): Observable<any[]> {
    let url = `${this.apiUrl}/${assetId}/events`;
    if (startTime) {
      url += `?startTime=${startTime}`;
    }
    return this.http.get<any[]>(url);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllAssets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAssetById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAsset(assetData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, assetData, { headers: this.getHeaders() });
  }

  updateAsset(id: string, assetData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, assetData, { headers: this.getHeaders() });
  }

  deleteAsset(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
