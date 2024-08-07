import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000/collections';

  constructor() { }

  private getHeaders(): { Authorization: string } {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  async getCollections(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl, { headers: this.getHeaders() });
      console.log('Collections:', response);
      return response.data.collections;
    } catch (error) {
      console.error('Error fetching collections', error);
      throw error;
    }
  }

  async getCollectionAssets(collectionId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/${collectionId}/assets`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error fetching collection NFTs', error);
      throw error;
    }
  }

  async createCollection(collectionData: any): Promise<any> {
    console.log('Creating collection', collectionData);
    try {
      const response = await axios.post(this.apiUrl, collectionData, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error creating collection', error);
      throw error;
    }
  }
}
