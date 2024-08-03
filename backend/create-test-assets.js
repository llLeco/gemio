const axios = require('axios');

const API_URL = 'http://localhost:3000/assets';

const testAssets = [
  {
    name: 'Industrial Pump A1',
    type: 'Pump',
    manufacturer: 'PumpCo',
    model: 'SuperPump 3000',
    serialNumber: 'SP3K-001',
    manufactureDate: new Date('2022-01-15').toISOString(),
    lastMaintenanceDate: new Date('2023-05-01').toISOString(),
    nextMaintenanceDate: new Date('2023-11-01').toISOString(),
    status: 'operational',
    location: { latitude: 40.7128, longitude: -74.0060 },
    specifications: { capacity: '500 l/min', power: '7.5 kW' },
    currentPerformance: { efficiency: 95, vibration: 0.15 }
  },
  {
    name: 'CNC Machine B2',
    type: 'CNC',
    manufacturer: 'MachineTech',
    model: 'PreciseCut X',
    serialNumber: 'PCX-002',
    manufactureDate: new Date('2021-11-30').toISOString(),
    lastMaintenanceDate: new Date('2023-04-15').toISOString(),
    nextMaintenanceDate: new Date('2023-10-15').toISOString(),
    status: 'maintenance',
    location: { latitude: 34.0522, longitude: -118.2437 },
    specifications: { axes: '5-axis', workArea: '1000x800x600 mm' },
    currentPerformance: { accuracy: 0.01, uptime: 92 }
  },
  {
    name: 'HVAC System C3',
    type: 'HVAC',
    manufacturer: 'CoolAir Inc.',
    model: 'EcoControl 500',
    serialNumber: 'EC500-003',
    manufactureDate: new Date('2023-02-28').toISOString(),
    lastMaintenanceDate: new Date('2023-06-01').toISOString(),
    nextMaintenanceDate: new Date('2023-12-01').toISOString(),
    status: 'operational',
    location: { latitude: 51.5074, longitude: -0.1278 },
    specifications: { capacity: '50 tons', energyRating: 'A+++' },
    currentPerformance: { efficiency: 98, energyConsumption: 45 }
  }
];

async function createTestAssets() {
  for (const asset of testAssets) {
    try {
      const response = await axios.post(API_URL, asset);
      console.log(`Created asset: ${response.data.name} with ID: ${response.data.id}`);
    } catch (error) {
      console.error(`Error creating asset ${asset.name}:`, error.response ? error.response.data : error.message);
    }
  }
}

createTestAssets();
