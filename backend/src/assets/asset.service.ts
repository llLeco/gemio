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

  async getCollectionInfo(collectionId: string): Promise<any> {
    try {
      return await this.hederaService.getCollectionInfo(collectionId);
    } catch (error) {
      console.error(`Error fetching collection info for ID ${collectionId}`, error);
      throw new BadRequestException(`Failed to fetch collection info: ${error.message}`);
    }
  }

  async getIliotAsset(assetId: string): Promise<any> {
    try {
      const [collectionId, serialNumber] = assetId.split(':');

      if (!collectionId || !serialNumber) {
        throw new BadRequestException('Invalid asset ID format');
      }

      const nftInfo = await this.hederaService.getNFTInfo(collectionId, serialNumber);

      if (!nftInfo || !nftInfo.metadata) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      const fileId = Buffer.from(nftInfo.metadata).toString('utf8');

      if (!fileId) {
        throw new BadRequestException('Asset metadata file ID is invalid or missing');
      }

      const fileContents = await this.hederaService.getFileContents(fileId);

      if (!fileContents || !fileContents.asset) {
        throw new BadRequestException('Asset data is invalid or missing');
      }

      return fileContents.asset;
    } catch (error) {
      console.error(`Error fetching Iliot asset with ID ${assetId}`, error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to fetch Iliot asset: ${error.message}`);
    }
  }
}
