import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { HederaModule } from '../hedera/hedera.module';

@Module({
  imports: [HederaModule],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService]
})
export class AssetsModule {}
