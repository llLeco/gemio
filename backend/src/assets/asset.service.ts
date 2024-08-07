import { Injectable, NotFoundException } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Asset } from '../models/asset.model';
import { CreateAssetDto } from '../models/create-asset.dto';

@Injectable()
export class AssetService {
  private assets: Asset[] = [];

  constructor(private readonly hederaService: HederaService) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    try {

      console.log('Creating asset:', createAssetDto);

      const topicId = await this.hederaService.createTopic(createAssetDto);
      console.log('Topic ID:', topicId);

      const initialMetadata = {
        data: createAssetDto,
        timestamp: new Date().toISOString(),
        topicId: topicId
      };
      console.log('Initial metadata:', initialMetadata);

      const serialNumber = await this.hederaService.mintNFT(createAssetDto.collectionId, initialMetadata);

      const asset = new Asset({
        ...createAssetDto,
        id: `${createAssetDto.collectionId}:${serialNumber}`,
        collectionId: createAssetDto.collectionId,
        topicId: topicId,
      });

      console.log('Asset:', asset);

      this.assets.push(asset);

      // Registrar evento de criação no HCS
      const createEvent = {
        type: 'ASSET_CREATED',
        assetId: asset.id,
        timestamp: new Date().toISOString(),
        details: { ...createAssetDto }
      };

      await this.hederaService.submitMessage(topicId, JSON.stringify(createEvent));

      return asset;
    } catch (error) {
      console.error('Error creating asset', error);
      throw error;
    }
  }

  async createAssetEvent(topicId: string, event: any): Promise<void> {
    try {
      await this.hederaService.submitMessage(topicId, JSON.stringify(event));
    } catch (error) {
      console.error('Error creating asset event', error);
      throw error;
    }
  }

  async getAssetEvents(assetId: string, startDate: Date): Promise<any> {
    // hedera service to get messages
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
      throw error;
    }
  }

  // async getAssetById(id: string): Promise<Asset> {
  //   // get from hedera service

  // }

  async getNFTInfo(tokenId: string): Promise<any> {
    return this.hederaService.getNFTInfo(tokenId);
  }
}
