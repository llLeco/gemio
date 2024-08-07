import { Injectable } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';

@Injectable()
export class CollectionService {
  constructor(private readonly hederaService: HederaService) {}

  async createCollection(name: string, symbol: string, description: string): Promise<Collection> {
    const tokenId = await this.hederaService.createNFTCollection(name, symbol);
    return new Collection({
      id: tokenId,
      name,
      symbol,
      description,
      createdAt: new Date()
    });
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const info = await this.hederaService.getNFTInfo(collectionId);
    return new Collection({
      id: collectionId,
      name: info.name,
      symbol: info.symbol,
      description: 'Description not available', // Hedera não fornece descrição no TokenInfo
      createdAt: new Date() // Hedera não fornece a data de criação, então usamos a data atual
    });
  }

  async getCollectionsAndNFTs(hederaAccountId) {
    console.log('hederaAccountId', hederaAccountId);
    const collectionIds = await this.hederaService.getCollectionsForAccount(hederaAccountId);
    const collections = await Promise.all(collectionIds.map(id => this.getCollection(id)));
    const nfts = await Promise.all(collectionIds.map(async (collectionId) => {
        const nftsInCollection = await this.hederaService.getNFTsInCollection(collectionId);
        return nftsInCollection.map(nft => new Asset(Object.assign(Object.assign({}, nft), { id: `${collectionId}:${nft.serialNumber}`, tokenId: collectionId })));
    }));
    return {
        collections,
        nfts: nfts.flat()
    };
}

  // async createAsset(collectionId: string, assetData: Partial<Asset>): Promise<Asset> {
  //   const metadata = JSON.stringify(assetData);
  //   const serialNumber = await this.hederaService.mintNFT(collectionId, metadata);
  //   // const metadataFileId = await this.hederaService.createFile(metadata);

  //   return new Asset({
  //     ...assetData,
  //     id: `${collectionId}:${serialNumber}`,
  //     tokenId: collectionId,
  //     // metadataFileId
  //   });
  // }

  async getAssetsInCollection(collectionId: string): Promise<any> {
    // call hedera service to get all NFTs in collection
    try {
      const nfts = await this.hederaService.getNFTsInCollection(collectionId);
      return nfts;
    } catch (error) {
      console.error('Error fetching assets', error);
      throw error;
    }
  }

  // async updateAssetMetadata(assetId: string, newMetadata: any): Promise<void> {
  //   const [collectionId, serialNumber] = assetId.split(':');
  //   const asset = await this.getAssetById(assetId);

  //   if (!asset) {
  //     throw new Error('Asset not found');
  //   }

  //   const updatedMetadata = JSON.stringify({ ...JSON.parse(await this.hederaService.getFileContents(asset.metadataFileId)), ...newMetadata });
  //   await this.hederaService.updateFile(asset.metadataFileId, updatedMetadata);
  // }

  // private async getAssetById(assetId: string): Promise<Asset | null> {
  //   // Implementação pendente: precisamos adicionar um método no HederaService para buscar um NFT específico
  //   // Por enquanto, retornamos null
  //   return null;
  // }
}
