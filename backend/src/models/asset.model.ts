
export class Asset {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  manufactureDate: Date;
  lastMaintenanceDate: Date;
  nextMaintenanceDate: Date;
  status: 'operational' | 'maintenance' | 'offline';
  location: {
    latitude: number;
    longitude: number;
  };
  specifications: {
    [key: string]: string | number;
  };
  currentPerformance: {
    [key: string]: number;
  };
  tokenId: string; // ID do token não fungível na Hedera
  metadataFileId: string; // ID do arquivo de metadados na Hedera

  constructor(partial: Partial<Asset>) {
    Object.assign(this, partial);
  }
}
