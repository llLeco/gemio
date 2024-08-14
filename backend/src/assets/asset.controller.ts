import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly hederaService: HederaService
  ) {}

  @Post()
  async createAsset(@Body() createAsset: {collectionId: string, assetData: CreateAssetDto}) {
    return this.assetService.createAsset(createAsset.collectionId, createAsset.assetData);
  }

  @Post(':id/events')
  async createAssetEvent(@Param('id') id: string, @Body() event: any) {
    return this.assetService.createAssetEvent(id, event);
  }

  @Get(':id/events')
  async getAssetEvents(@Param('id') id: string, @Query('startTime') startTime: string) {
    const startDate = startTime ? new Date(startTime) : new Date(0);
    return this.assetService.getAssetEvents(id, startDate);
  }

  @Get(':id/details')
  async getAssetDetails(@Param('id') id: string) {
    return this.hederaService.getFileContents(id);
  }

  // get nft collectionId:serialNumber and return file metadata.asset
  @Get(':id')
  async getIliotAsset(@Param('id') assetId: string) {
    return this.assetService.getIliotAsset(assetId);
  }

  @Get(':id/topicId')
  async getTopicId(@Param('id') assetId: string) {
    return this.assetService.getTopicId(assetId);
  }
}
