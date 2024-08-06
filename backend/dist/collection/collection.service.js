"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const hedera_service_1 = require("../hedera/hedera.service");
const collection_model_1 = require("../models/collection.model");
const asset_model_1 = require("../models/asset.model");
let CollectionService = class CollectionService {
    constructor(hederaService) {
        this.hederaService = hederaService;
    }
    async createCollection(name, symbol, description) {
        const tokenId = await this.hederaService.createNFTCollection(name, symbol);
        return new collection_model_1.Collection({
            id: tokenId,
            name,
            symbol,
            description,
            createdAt: new Date()
        });
    }
    async getCollection(collectionId) {
        const info = await this.hederaService.getNFTInfo(collectionId);
        return new collection_model_1.Collection({
            id: collectionId,
            name: info.name,
            symbol: info.symbol,
            description: 'Description not available',
            createdAt: new Date()
        });
    }
    async getCollectionsAndNFTs(hederaAccountId) {
        const collectionIds = await this.hederaService.getCollectionsForAccount(hederaAccountId);
        const collections = await Promise.all(collectionIds.map(id => this.getCollection(id)));
        const nfts = await Promise.all(collectionIds.map(async (collectionId) => {
            const nftsInCollection = await this.hederaService.getNFTsInCollection(collectionId);
            return nftsInCollection.map(nft => new asset_model_1.Asset(Object.assign(Object.assign({}, nft), { id: `${collectionId}:${nft.serialNumber}`, tokenId: collectionId })));
        }));
        return {
            collections,
            nfts: nfts.flat()
        };
    }
    async createAsset(collectionId, assetData) {
        const metadata = JSON.stringify(assetData);
        const serialNumber = await this.hederaService.mintNFT(collectionId, metadata);
        return new asset_model_1.Asset(Object.assign(Object.assign({}, assetData), { id: `${collectionId}:${serialNumber}`, collectionId }));
    }
    async getAssetsInCollection(collectionId) {
        const nfts = await this.hederaService.getNFTsInCollection(collectionId);
        return nfts.map(nft => new asset_model_1.Asset(Object.assign(Object.assign({}, nft), { id: `${collectionId}:${nft.serialNumber}`, tokenId: collectionId })));
    }
    async getAssetById(assetId) {
        return null;
    }
};
exports.CollectionService = CollectionService;
exports.CollectionService = CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hedera_service_1.HederaService])
], CollectionService);
//# sourceMappingURL=collection.service.js.map