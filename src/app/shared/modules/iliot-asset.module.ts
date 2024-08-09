import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IliotAsset } from '../models/iliot-asset.interface';

export { IliotAsset } from '../models/iliot-asset.interface';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: []
})
export class IliotAssetModule {}

// You can add utility functions here if needed
export function createEmptyIliotAsset(): IliotAsset {
  return {
    machine: {
      name: '',
      machine_type: '',
      serial_number: '',
      manufacturer: '',
      model: '',
      manufacture_year: new Date().getFullYear(),
      customer_id: '',
      site_id: '',
      project_id: '',
      acquisition_date: '',
      purchase_date: '',
      installation_date: '',
      warranty_in_months: 0,
      warranty_start_date: '',
      owner: '',
      cost_center: '',
      account: '',
      price: 0,
      criticality: '1',
      initial_reading_date: '',
      last_reading_date: '',
      load_working_time: 0,
      working_time: 0,
      sensors_attributes: [],
      has_virtual_sensor: false,
      machine_modules_attributes: []
    }
  };
}
