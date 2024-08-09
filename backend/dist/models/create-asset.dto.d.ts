declare class SensorAttributeDto {
    sensor_type_id: string;
    name: string;
    vendor_code: string;
    start_time: Date;
    has_temperature_monitor_1: boolean;
    temperature_monitor_value_1?: number;
    warning_temperature_monitor_1?: number;
    temperature_monitor_name_1?: string;
    has_geofence: boolean;
    geofence_distance?: number;
}
declare class MachineModuleAttributeDto {
    serial_number: string;
    manufacturer: string;
    machine_module_model: string;
    machine_module_type_id?: string;
    module_type_machine: string;
    obs?: string;
}
export declare class CreateAssetDto {
    name: string;
    machine_type: string;
    serial_number: string;
    manufacturer: string;
    model: string;
    manufacture_year: number;
    customer_id: string;
    site_id: string;
    project_id: string;
    acquisition_date: Date;
    purchase_date: Date;
    installation_date: Date;
    warranty_in_months: number;
    warranty_start_date: Date;
    owner: string;
    cost_center: string;
    account: string;
    price: number;
    criticality: '1' | '2' | '3';
    initial_reading_date: Date;
    last_reading_date: Date;
    load_working_time: number;
    working_time: number;
    sensors_attributes: SensorAttributeDto[];
    has_virtual_sensor: boolean;
    virtual_sensor_name?: string;
    virtual_sensor_daily_hours?: number;
    virtual_sensor_days_in_week?: number;
    obs?: string;
    machine_modules_attributes: MachineModuleAttributeDto[];
    collectionId: string;
}
export {};
