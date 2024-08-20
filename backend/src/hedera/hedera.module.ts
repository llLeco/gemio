import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HederaService } from './hedera.service';
import { HederaController } from './hedera.controller';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [HederaService],
  controllers: [HederaController],
  exports: [HederaService],
})
export class HederaModule {}
