import { Controller, Get } from '@nestjs/common';

@Controller('assets')
export class AssetsController {
  @Get()
  findAll(): string {
    return 'This action returns all assets';
  }
}
