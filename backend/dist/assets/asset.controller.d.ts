import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';
export declare class AssetController {
    private readonly assetService;
    private readonly hederaService;
    constructor(assetService: AssetService, hederaService: HederaService);
    createAsset(createAssetDto: CreateAssetDto): Promise<import("../models/asset.model").Asset>;
    createAssetEvent(id: string, event: any): Promise<void>;
    getAssetEvents(id: string, startTime: string): Promise<any>;
    getAssetDetails(id: string): Promise<any>;
}
