export declare class UpdateAssetDto {
    name?: string;
    type?: string;
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    manufactureDate?: Date;
    lastMaintenanceDate?: Date;
    nextMaintenanceDate?: Date;
    status?: 'operational' | 'maintenance' | 'offline';
    location?: {
        latitude: number;
        longitude: number;
    };
    specifications?: {
        [key: string]: string | number;
    };
    currentPerformance?: {
        [key: string]: number;
    };
}
