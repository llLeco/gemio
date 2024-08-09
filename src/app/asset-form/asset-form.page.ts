import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { IliotAsset, createEmptyIliotAsset } from '../shared/modules/iliot-asset.module';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.page.html',
  styleUrls: ['./asset-form.page.scss'],
})
export class AssetFormPage implements OnInit {
  assetForm: FormGroup = new FormGroup({});
  collectionId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
  }

  createForm() {
    const mockAsset: IliotAsset = createEmptyIliotAsset();
    mockAsset.machine = {
      name: "Industrial Pump XYZ",
      machine_type: "Centrifugal Pump",
      serial_number: "ABC123XYZ",
      manufacturer: "PumpCo Industries",
      model: "SuperPump 3000",
      manufacture_year: 2022,
      customer_id: "CUST001",
      site_id: "SITE123",
      project_id: "PROJ456",
      acquisition_date: "2023-01-15",
      purchase_date: "2023-01-10",
      installation_date: "2023-02-01",
      warranty_in_months: 24,
      warranty_start_date: "2023-02-01",
      owner: "ACME Corporation",
      cost_center: "CC001",
      account: "1234-5678-9012",
      price: 15000.00,
      criticality: "2",
      initial_reading_date: "2023-02-01",
      last_reading_date: "2023-08-01",
      load_working_time: 1000,
      working_time: 2000,
      sensors_attributes: [
        {
          sensor_type_id: "TEMP001",
          name: "Temperature Sensor 1",
          vendor_code: "TS1234",
          start_time: "2023-02-01",
          has_temperature_monitor_1: true,
          temperature_monitor_value_1: 80,
          warning_temperature_monitor_1: 70,
          temperature_monitor_name_1: "High Temperature Alert",
          has_geofence: false,
          geofence_distance: undefined
        }
      ],
      has_virtual_sensor: true,
      virtual_sensor_name: "Virtual Flow Meter",
      virtual_sensor_daily_hours: 16,
      virtual_sensor_days_in_week: 5,
      obs: "This pump is crucial for our main production line.",
      machine_modules_attributes: [
        {
          serial_number: "MOD001",
          manufacturer: "ModuleCo",
          machine_module_model: "Efficiency Booster X1",
          machine_module_type_id: "EB001",
          module_type_machine: "Efficiency Module",
          obs: "Increases pump efficiency by 15%"
        }
      ]
    };

    this.assetForm = this.formBuilder.group({
      name: [mockAsset.machine.name, Validators.required],
      machine_type: [mockAsset.machine.machine_type, Validators.required],
      serial_number: [mockAsset.machine.serial_number, Validators.required],
      manufacturer: [mockAsset.machine.manufacturer, Validators.required],
      model: [mockAsset.machine.model, Validators.required],
      manufacture_year: [mockAsset.machine.manufacture_year, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      customer_id: [mockAsset.machine.customer_id, Validators.required],
      site_id: [mockAsset.machine.site_id, Validators.required],
      project_id: [mockAsset.machine.project_id, Validators.required],
      acquisition_date: [mockAsset.machine.acquisition_date, Validators.required],
      purchase_date: [mockAsset.machine.purchase_date, Validators.required],
      installation_date: [mockAsset.machine.installation_date, Validators.required],
      warranty_in_months: [mockAsset.machine.warranty_in_months, [Validators.required, Validators.min(0)]],
      warranty_start_date: [mockAsset.machine.warranty_start_date, Validators.required],
      owner: [mockAsset.machine.owner, Validators.required],
      cost_center: [mockAsset.machine.cost_center, Validators.required],
      account: [mockAsset.machine.account, Validators.required],
      price: [mockAsset.machine.price, [Validators.required, Validators.min(0)]],
      criticality: [mockAsset.machine.criticality, [Validators.required, Validators.pattern(/^[123]$/)]],
      initial_reading_date: [mockAsset.machine.initial_reading_date, Validators.required],
      last_reading_date: [mockAsset.machine.last_reading_date, Validators.required],
      load_working_time: [mockAsset.machine.load_working_time, [Validators.required, Validators.min(0)]],
      working_time: [mockAsset.machine.working_time, [Validators.required, Validators.min(0)]],
      sensors_attributes: this.formBuilder.array(mockAsset.machine.sensors_attributes.map(sensor => this.createSensorFormGroup(sensor))),
      has_virtual_sensor: [mockAsset.machine.has_virtual_sensor],
      virtual_sensor_name: [mockAsset.machine.virtual_sensor_name],
      virtual_sensor_daily_hours: [mockAsset.machine.virtual_sensor_daily_hours, [Validators.min(0), Validators.max(24)]],
      virtual_sensor_days_in_week: [mockAsset.machine.virtual_sensor_days_in_week, [Validators.min(0), Validators.max(7)]],
      obs: [mockAsset.machine.obs],
      machine_modules_attributes: this.formBuilder.array(mockAsset.machine.machine_modules_attributes.map(module => this.createMachineModuleFormGroup(module)))
    });
  }

  createMachineModuleFormGroup(module: any) {
    return this.formBuilder.group({
      serial_number: [module.serial_number, Validators.required],
      manufacturer: [module.manufacturer, Validators.required],
      machine_module_model: [module.machine_module_model, Validators.required],
      machine_module_type_id: [module.machine_module_type_id],
      module_type_machine: [module.module_type_machine, Validators.required],
      obs: [module.obs]
    });
  }

  createSensorFormGroup(sensor: any) {
    return this.formBuilder.group({
      sensor_type_id: [sensor.sensor_type_id, Validators.required],
      name: [sensor.name, Validators.required],
      vendor_code: [sensor.vendor_code, Validators.required],
      start_time: [sensor.start_time, Validators.required],
      has_temperature_monitor_1: [sensor.has_temperature_monitor_1],
      temperature_monitor_value_1: [sensor.temperature_monitor_value_1],
      warning_temperature_monitor_1: [sensor.warning_temperature_monitor_1],
      temperature_monitor_name_1: [sensor.temperature_monitor_name_1],
      has_geofence: [sensor.has_geofence],
      geofence_distance: [sensor.geofence_distance]
    });
  }

  get machineForm() {
    return this.assetForm.get('machine') as FormGroup;
  }

  removeSensor(index: number) {
    this.sensors.removeAt(index);
  }

  removeMachineModule(index: number) {
    this.machineModules.removeAt(index);
  }

  addSensor() {
    const sensorForm = this.formBuilder.group({
      sensor_type_id: ['', Validators.required],
      name: ['', Validators.required],
      vendor_code: ['', Validators.required],
      start_time: ['', Validators.required],
      has_temperature_monitor_1: [false],
      temperature_monitor_value_1: [null],
      warning_temperature_monitor_1: [null],
      temperature_monitor_name_1: [''],
      has_geofence: [false],
      geofence_distance: [null]
    });

    this.sensors.push(sensorForm);
  }

  addMachineModule() {
    const moduleForm = this.formBuilder.group({
      serial_number: ['', Validators.required],
      manufacturer: ['', Validators.required],
      machine_module_model: ['', Validators.required],
      machine_module_type_id: [''],
      module_type_machine: ['', Validators.required],
      obs: ['']
    });

    this.machineModules.push(moduleForm);
  }

  get sensors() {
    return this.assetForm.get('sensors_attributes') as FormArray;
  }

  get machineModules() {
    return this.assetForm.get('machine_modules_attributes') as FormArray;
  }

  async onSubmit() {
    if (this.assetForm.valid) {
      const assetData: IliotAsset = {
        machine: this.assetForm.value
      };
      assetData.machine.id = this.collectionId ? this.collectionId : undefined;

      try {
        await this.errorHandler.showLoading('Creating asset...');
        await this.assetService.createAsset(assetData);
        this.errorHandler.showToast('Asset created successfully');
        await this.errorHandler.hideLoading();
        this.router.navigate(['/dashboard']);
      } catch (error) {
        await this.errorHandler.hideLoading();
        this.errorHandler.handleError(error);
      }
    } else {
      this.errorHandler.showToast('Please fill all required fields correctly');
    }
  }
}
