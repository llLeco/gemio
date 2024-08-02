import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetsService {
  findAll(): string {
    return 'This action returns all assets';
  }
}
