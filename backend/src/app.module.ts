import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { AssetsController } from './assets/assets.controller';
import { AssetsService } from './assets/assets.service';

@Module({
  imports: [AssetsModule],
  controllers: [AppController, AssetsController],
  providers: [AppService, AssetsService],
})
export class AppModule {}
