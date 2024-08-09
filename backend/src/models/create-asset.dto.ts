import { IsString, IsDate, IsNumber, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class SensorAttributeDto {
  @IsString()
  sensor_type_id: string;

  @IsString()
  name: string;

  @IsString()
  vendor_code: string;

  @IsDate()
  start_time: Date;

  @IsBoolean()
  has_temperature_monitor_1: boolean;

  @IsNumber()
  @IsOptional()
  temperature_monitor_value_1?: number;

  @IsNumber()
  @IsOptional()
  warning_temperature_monitor_1?: number;

  @IsString()
  @IsOptional()
  temperature_monitor_name_1?: string;

  @IsBoolean()
  has_geofence: boolean;

  @IsNumber()
  @IsOptional()
  geofence_distance?: number;
}

class MachineModuleAttributeDto {
  @IsString()
  serial_number: string;

  @IsString()
  manufacturer: string;

  @IsString()
  machine_module_model: string;

  @IsString()
  @IsOptional()
  machine_module_type_id?: string;

  @IsString()
  module_type_machine: string;

  @IsString()
  @IsOptional()
  obs?: string;
}

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  machine_type: string;

  @IsString()
  serial_number: string;

  @IsString()
  manufacturer: string;

  @IsString()
  model: string;

  @IsNumber()
  manufacture_year: number;

  @IsString()
  customer_id: string;

  @IsString()
  site_id: string;

  @IsString()
  project_id: string;

  @IsDate()
  acquisition_date: Date;

  @IsDate()
  purchase_date: Date;

  @IsDate()
  installation_date: Date;

  @IsNumber()
  warranty_in_months: number;

  @IsDate()
  warranty_start_date: Date;

  @IsString()
  owner: string;

  @IsString()
  cost_center: string;

  @IsString()
  account: string;

  @IsNumber()
  price: number;

  @IsString()
  criticality: '1' | '2' | '3';

  @IsDate()
  initial_reading_date: Date;

  @IsDate()
  last_reading_date: Date;

  @IsNumber()
  load_working_time: number;

  @IsNumber()
  working_time: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SensorAttributeDto)
  sensors_attributes: SensorAttributeDto[];

  @IsBoolean()
  has_virtual_sensor: boolean;

  @IsString()
  @IsOptional()
  virtual_sensor_name?: string;

  @IsNumber()
  @IsOptional()
  virtual_sensor_daily_hours?: number;

  @IsNumber()
  @IsOptional()
  virtual_sensor_days_in_week?: number;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MachineModuleAttributeDto)
  machine_modules_attributes: MachineModuleAttributeDto[];

  @IsString()
  collectionId: string;
}
