export interface IliotAsset {
  id?: string; // Optional, as it's only needed for updates
  machine: {
    id?: string; // ##PK##
    name: string; // ID (TAG)
    machine_type: string; // Tipo
    serial_number: string; // Número de serie
    manufacturer: string; // Fabricante
    model: string; // Modelo
    manufacture_year: number; // Ano de fabricação
    customer_id: string; // Cliente
    site_id: string; // Localidade
    project_id: string; // Projeto/Contrato
    acquisition_date: string; // Data da aquisição
    purchase_date: string; // Data da venda
    installation_date: string; // Data de instalação
    warranty_in_months: number; // Tempo de garantia, em meses
    warranty_start_date: string; // Data de início da garantia
    owner: string; // Proprietário
    cost_center: string; // Centro de custo
    account: string; // Conta contábil
    price: number; // Preço
    criticality: '1' | '2' | '3'; // Valores de 1 a 3, do menos crítico ao mais crítico
    initial_reading_date: string; // Data da leitura inicial
    last_reading_date: string; // Data da aferição
    load_working_time: number; // Última leitura do horímetro carga
    working_time: number; // Última leitura do horímetro
    sensors_attributes: Array<{
      sensor_type_id: string; // Id
      name: string; // Nome
      vendor_code: string; // Código Sensor
      start_time: string; // Data instalação sensor
      has_temperature_monitor_1: boolean; // Cadastro alertas temperatura
      temperature_monitor_value_1?: number; // Valor crítico de temperatura
      warning_temperature_monitor_1?: number; // Valor alerta de temperatura
      temperature_monitor_name_1?: string; // Nome do alerta
      has_geofence: boolean; // Cadastro alertas cerca virtual
      geofence_distance?: number; // Raio do local demarcado (km)
    }>;
    has_virtual_sensor: boolean; // Possui horímetro virtual?
    virtual_sensor_name?: string; // Nome/descrição
    virtual_sensor_daily_hours?: number; // Tempo de funcionamento estimado diário (horas)
    virtual_sensor_days_in_week?: number; // Nº de dias trabalhados na semana
    obs?: string; // Observação
    machine_modules_attributes: Array<{
      serial_number: string; // Número de Série
      manufacturer: string; // Fabricante
      machine_module_model: string; // Modelo
      machine_module_type_id?: string; // (Opcional) Tipo
      module_type_machine: string; // Tipo
      obs?: string; // Observação
    }>;
  };
}
