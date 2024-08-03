import { Injectable, NotFoundException } from '@nestjs/common';
import { HederaService } from '../hedera/hedera.service';
import { Asset } from '../models/asset.model';
import { CreateAssetDto } from '../models/create-asset.dto';
import { UpdateAssetDto } from '../models/update-asset.dto';

@Injectable()
export class AssetService {
  private assets: Asset[] = [];

  constructor(private readonly hederaService: HederaService) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    const tokenId = await this.hederaService.createNFTCollection(
      `${createAssetDto.type} Collection`,
      createAssetDto.type.toUpperCase()
    );

    const initialMetadata = {
      version: 1,
      timestamp: new Date().toISOString(),
      data: createAssetDto
    };

    const metadataFileId = await this.hederaService.createFile(JSON.stringify(initialMetadata));

    const serialNumber = await this.hederaService.mintNFT(tokenId, metadataFileId);

    const asset = new Asset({
      ...createAssetDto,
      id: `${tokenId}:${serialNumber}`,
      tokenId: tokenId,
      metadataFileId: metadataFileId,
    });

    this.assets.push(asset);

    // Registrar evento de criação no HCS
    const createEvent = {
      type: 'ASSET_CREATED',
      assetId: asset.id,
      timestamp: new Date().toISOString(),
      details: { ...createAssetDto }
    };
    await this.hederaService.submitMessage(JSON.stringify(createEvent));

    return asset;
  }

  async getAllAssets(): Promise<Asset[]> {
    return this.assets;
  }

  async getAssetById(id: string): Promise<Asset> {
    const asset = this.assets.find(a => a.id === id);
    if (!asset) {
      throw new NotFoundException(`Asset with ID "${id}" not found`);
    }

    const metadataHistory = await this.getAssetMetadataHistory(asset.metadataFileId);
    const latestMetadata = metadataHistory[metadataHistory.length - 1].data;

    return { ...asset, ...latestMetadata };
  }

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.getAssetById(id);

    const metadataHistory = await this.getAssetMetadataHistory(asset.metadataFileId);
    const newVersion = metadataHistory.length + 1;

    const newMetadata = {
      version: newVersion,
      timestamp: new Date().toISOString(),
      data: { ...asset, ...updateAssetDto }
    };

    await this.hederaService.appendToFile(asset.metadataFileId, JSON.stringify(newMetadata));

    const updatedAsset = { ...asset, ...updateAssetDto };
    const assetIndex = this.assets.findIndex(a => a.id === id);
    this.assets[assetIndex] = updatedAsset;

    // Registrar evento de atualização no HCS
    const updateEvent = {
      type: 'ASSET_UPDATED',
      assetId: id,
      timestamp: new Date().toISOString(),
      details: updateAssetDto
    };
    await this.hederaService.submitMessage(JSON.stringify(updateEvent));

    return updatedAsset;
  }

  async deleteAsset(id: string): Promise<void> {
    const assetIndex = this.assets.findIndex(a => a.id === id);
    if (assetIndex === -1) {
      throw new NotFoundException(`Asset with ID "${id}" not found`);
    }

    const asset = this.assets[assetIndex];
    const deletionMetadata = {
      version: 'DELETED',
      timestamp: new Date().toISOString(),
      data: null
    };

    await this.hederaService.appendToFile(asset.metadataFileId, JSON.stringify(deletionMetadata));

    this.assets.splice(assetIndex, 1);

    console.log(`Asset ${id} marked as deleted in Hedera File Service`);

    // Registrar evento de exclusão no HCS
    const deleteEvent = {
      type: 'ASSET_DELETED',
      assetId: id,
      timestamp: new Date().toISOString()
    };
    await this.hederaService.submitMessage(JSON.stringify(deleteEvent));
  }

  private async getAssetMetadataHistory(fileId: string): Promise<any[]> {
    const fileContents = await this.hederaService.getFileContents(fileId);
    let metadataHistory: any[] = [];
    try {
      metadataHistory = JSON.parse(fileContents);
      if (!Array.isArray(metadataHistory)) {
        metadataHistory = [metadataHistory];
      }
    } catch (error) {
      console.error('Error parsing metadata:', error);
      // Se não conseguirmos analisar como JSON, retornamos um array vazio
      metadataHistory = [];
    }
    return metadataHistory;
  }

  async getAssetEvents(assetId: string, startTime: Date): Promise<any[]> {
    const messages = await this.hederaService.getMessages(startTime);
    return messages
      .map(msg => JSON.parse(msg))
      .filter(event => event.assetId === assetId);
  }
}
