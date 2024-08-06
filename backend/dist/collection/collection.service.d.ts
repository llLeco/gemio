import { HederaService } from '../hedera/hedera.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';
export declare class CollectionService {
    private readonly hederaService;
    constructor(hederaService: HederaService);
    createCollection(name: string, symbol: string, description: string): Promise<Collection>;
    getCollection(collectionId: string): Promise<Collection>;
    getCollectionsAndNFTs(hederaAccountId: string): Promise<{
        collections: Collection[];
        nfts: Asset[];
    }>;
    createAsset(collectionId: string, assetData: Partial<Asset>): Promise<Asset>;
    getAssetsInCollection(collectionId: string): Promise<Asset[]>;
    private getAssetById;
}
