import { CollectionService } from './collection.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    createCollection(collectionData: {
        name: string;
        symbol: string;
        description: string;
    }): Promise<Collection>;
    getCollection(id: string): Promise<Collection>;
    getAssetsInCollection(collectionId: string): Promise<Asset[]>;
    createAsset(collectionId: string, assetData: Partial<Asset>): Promise<Asset>;
    getCollectionsAndNFTs(req: any): Promise<{
        collections: Collection[];
        nfts: Asset[];
    }>;
}
