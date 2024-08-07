import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from '../models/create-asset.dto';
import { HederaService } from '../hedera/hedera.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
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
    console.log('Getting asset details for ID', id);
    const asset = await this.assetService.getAssetById(id);
    console.log('Asset:', asset);
    const nftInfo = await this.assetService.getNFTInfo(asset.id);
    // const metadataHistory = await this.assetService.getAssetMetadataHistory(asset.metadataFileId);
    // const eventHistory = await this.assetService.getAssetEvents(id);

    return {
      ...asset,
      nftInfo,
      // metadataHistory,
      // eventHistory
    };
  }

  // @Get()
  // async getAllAssets() {
  //   return this.assetService.getAllAssets();
  // }

  // @Get(':id')
  // async getAssetById(@Param('id') id: string) {
  //   return this.assetService.getAssetById(id);
  // }

  // @Put(':id')
  // async updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetService.updateAsset(id, updateAssetDto);
  // }

  // @Delete(':id')
  // async deleteAsset(@Param('id') id: string) {
  //   await this.assetService.deleteAsset(id);
  //   return { message: 'Asset deleted successfully' };
  // }

  // @Get(':id/events')
  // async getAssetEvents(@Param('id') id: string, @Query('startTime') startTime: string) {
  //   const startDate = startTime ? new Date(startTime) : new Date(0); // Se não for fornecido, usa a data Unix epoch
  //   return this.assetService.getAssetEvents(id, startDate);
  // }
}
