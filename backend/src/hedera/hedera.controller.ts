import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { HederaService } from './hedera.service';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @Post('account')
  async createAccount() {
    return this.hederaService.createAccount();
  }

  @Get('balance/:accountId')
  async getBalance(@Param('accountId') accountId: string) {
    return this.hederaService.getAccountBalance(accountId);
  }

  @Post('transfer')
  async transferHbar(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('amount') amount: number,
  ) {
    return this.hederaService.transferHbar(from, to, amount);
  }

  @Post('nft/collection')
  async createNFTCollection(@Body() body: { name: string; symbol: string }) {
    return this.hederaService.createNFTCollection(body.name, body.symbol);
  }

  @Post('nft/mint')
  async mintNFT(@Body() body: { tokenId: string; metadata: string }) {
    return this.hederaService.mintNFT(body.tokenId, body.metadata);
  }

  @Get('colleciton/:id')
  async getCollectionInfo(@Param('id') tokenId: string) {
    return this.hederaService.getCollectionInfo(tokenId);
  }

  @Get('messages')
  async getMessages( @Query('topicId') topicId: string, @Query('startTime') startTime: string ): Promise<any> {
    return this.hederaService.getMessages(topicId, new Date(startTime), 10, 1000);
  }
}
