import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { HederaService } from './hedera.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hedera')
// @UseGuards(JwtAuthGuard)
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

  @Get('test-connection')
  async testConnection() {
    return this.hederaService.testConnection();
  }

  @Post('nft/collection')
  async createNFTCollection(@Body() body: { name: string; symbol: string }) {
    return this.hederaService.createNFTCollection(body.name, body.symbol);
  }

  @Post('nft/mint')
  async mintNFT(@Body() body: { tokenId: string; metadata: string }) {
    return this.hederaService.mintNFT(body.tokenId, body.metadata);
  }

  @Get('nft/:tokenId')
  async getNFTInfo(@Param('tokenId') tokenId: string) {
    return this.hederaService.getNFTInfo(tokenId);
  }
}
