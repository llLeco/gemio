import { IsString, IsDate, IsObject, IsEnum, IsOptional } from 'class-validator';

export class UpdateAssetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsDate()
  manufactureDate?: Date;

  @IsOptional()
  @IsDate()
  lastMaintenanceDate?: Date;

  @IsOptional()
  @IsDate()
  nextMaintenanceDate?: Date;

  @IsOptional()
  @IsEnum(['operational', 'maintenance', 'offline'])
  status?: 'operational' | 'maintenance' | 'offline';

  @IsOptional()
  @IsObject()
  location?: {
    latitude: number;
    longitude: number;
  };

  @IsOptional()
  @IsObject()
  specifications?: {
    [key: string]: string | number;
  };

  @IsOptional()
  @IsObject()
  currentPerformance?: {
    [key: string]: number;
  };
}
