import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'http://localhost:3000/assets';

  constructor() { }

  private getHeaders(): { Authorization: string } {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllAssets(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error fetching all assets', error);
      throw error;
    }
  }

  async getAssetById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset by ID ${id}`, error);
      throw error;
    }
  }

  async getAssetDetails(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}/details`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching asset details for ID ${id}`, error);
      throw error;
    }
  }

  async createAsset(assetData: any): Promise<any> {

    console.log('Creating asset', assetData);

    try {
      const response = await axios.post(this.apiUrl, assetData, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error creating asset', error);
      throw error;
    }
  }

  async updateAsset(id: string, assetData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${id}`, assetData, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error updating asset ID ${id}`, error);
      throw error;
    }
  }

  async deleteAsset(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error deleting asset ID ${id}`, error);
      throw error;
    }
  }

  async getAssetEvents(topicId: string, startTime?: Date): Promise<any[]> {
    try {
      const params = startTime ? { startTime: startTime.toISOString() } : {};
      const response = await axios.get(`${this.apiUrl}/${topicId}/events`, { headers: this.getHeaders(), params });
      console.log('getAssetEvents Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for asset ID ${topicId}`, error);
      throw error;
    }
  }

  async postAssetEvent(topicId: string, message: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/${topicId}/events/`, { message }, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error posting event for asset ID ${topicId}`, error);
      throw error;
    }
  }

  async getAssetMetadataHistory(fileId: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/metadata-history/${fileId}`, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching metadata history for file ID ${fileId}`, error);
      throw error;
    }
  }
}
