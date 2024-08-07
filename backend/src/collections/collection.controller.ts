import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from '../models/collection.model';
import { Asset } from '../models/asset.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private configService: ConfigService
  ) {}

  @Post()
  async createCollection(@Body() collectionData: { name: string; symbol: string; description: string }): Promise<Collection> {
    return this.collectionService.createCollection(collectionData.name, collectionData.symbol, collectionData.description);
  }

  @Get()
  async getAllCollections(): Promise<any> {
    return this.collectionService.getCollectionsAndNFTs(this.configService.get('HEDERA_ACCOUNT_ID'));
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionService.getCollection(id);
  }

  @Get(':id/assets')
  async getAssetsInCollection(@Param('id') collectionId: string): Promise<Asset[]> {
    return this.collectionService.getAssetsInCollection(collectionId);
  }
}
