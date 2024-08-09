import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Asset } from '../models/asset.model';
import { CreateAssetDto } from '../models/create-asset.dto';

class AssetCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssetCreationError';
  }
}

class AssetEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssetEventError';
  }
}

@Injectable()
export class AssetService {
  private assets: Asset[] = [];

  constructor(private readonly hederaService: HederaService) {}

  async createAsset(collectionId: string, createAsset: CreateAssetDto): Promise<Asset> {
    try {
      // Ensure createAssetDto is not undefined
      if (!createAsset) {
        throw new BadRequestException('Asset data is required');
      }

      console.log('Creating asset', createAsset);

      // Create a topic for the asset
      const topicId = await this.hederaService.createTopic(createAsset);
      console.log('Topic ID:', topicId);

      // Prepare initial metadata
      const initialMetadata = {
        asset: createAsset,
        timestamp: new Date().toISOString(),
        topicId: topicId
      };

      // Mint NFT
      const serialNumber = await this.hederaService.mintNFT(collectionId, initialMetadata);

      // Create asset object
      const asset = new Asset({
        ...createAsset,
        id: `${collectionId}:${serialNumber}`,
        collectionId: collectionId,
        topicId: topicId,
      });

      return asset;
    } catch (error) {
      console.error('Error creating asset', error);
      throw new AssetCreationError(`Failed to create asset: ${error.message}`);
    }
  }

  async createAssetEvent(topicId: string, event: any): Promise<void> {
    try {
      await this.hederaService.submitMessage(topicId, JSON.stringify(event));
    } catch (error) {
      console.error('Error creating asset event', error);
      throw new AssetEventError(`Failed to create asset event: ${error.message}`);
    }
  }

  async getAssetEvents(assetId: string, startDate: Date): Promise<any> {
    try {
      const asset = this.assets.find((a) => a.id === assetId);
      if (!asset) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      const { topicId } = asset;
      const messages = await this.hederaService.getMessages(topicId, startDate, 10, 1000);
      return messages;
    } catch (error) {
      console.error(`Error fetching events for asset ID ${assetId}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch asset events: ${error.message}`);
    }
  }

  async getNFTInfo(tokenId: string): Promise<any> {
    try {
      return await this.hederaService.getNFTInfo(tokenId);
    } catch (error) {
      console.error(`Error fetching NFT info for token ID ${tokenId}`, error);
      throw new BadRequestException(`Failed to fetch NFT info: ${error.message}`);
    }
  }
}
