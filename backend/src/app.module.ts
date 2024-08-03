import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/asset.module';
import { AssetController } from './assets/asset.controller';
import { AssetService } from './assets/asset.service';
import { UsersModule } from './users/users.module';
import { HederaModule } from './hedera/hedera.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AssetsModule,
    HederaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [AppController, AssetController],
  providers: [AppService, AssetService],
})
export class AppModule {}
