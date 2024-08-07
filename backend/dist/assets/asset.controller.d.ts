import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
export declare class AssetController {
    private readonly assetService;
    constructor(assetService: AssetService);
    createAsset(createAssetDto: CreateAssetDto): Promise<import("../models/asset.model").Asset>;
    createAssetEvent(id: string, event: any): Promise<void>;
    getAssetEvents(id: string, startTime: string): Promise<any>;
    getAssetDetails(id: string): Promise<{
        nftInfo: any;
        name: string;
        manufacturer: string;
        model: string;
        serialNumber: string;
        manufactureDate: Date;
        collectionId: string;
        id: string;
        topicId: string;
    }>;
}
