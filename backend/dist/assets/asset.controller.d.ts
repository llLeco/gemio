import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';
export declare class AssetController {
    private readonly assetService;
    private readonly hederaService;
    constructor(assetService: AssetService, hederaService: HederaService);
    createAsset(createAssetDto: CreateAssetDto): Promise<any>;
    createAssetEvent(topicId: string, event: any): Promise<string>;
}
