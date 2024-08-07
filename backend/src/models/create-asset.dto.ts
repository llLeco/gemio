import { IsString, IsDate } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;

  @IsString()
  serialNumber: string;

  @IsDate()
  manufactureDate: Date;

  @IsString()
  collectionId: string;
}
