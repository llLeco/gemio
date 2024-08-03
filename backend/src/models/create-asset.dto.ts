import { IsString, IsDate, IsObject, IsEnum, IsNumber } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsDate()
  manufactureDate: Date;

  @IsDate()
  lastMaintenanceDate: Date;

  @IsDate()
  nextMaintenanceDate: Date;

  @IsEnum(['operational', 'maintenance', 'offline'])
  status: 'operational' | 'maintenance' | 'offline';

  @IsObject()
  location: {
    latitude: number;
    longitude: number;
  };

  @IsObject()
  specifications: {
    [key: string]: string | number;
  };

  @IsObject()
  currentPerformance: {
    [key: string]: number;
  };
}
