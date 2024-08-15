import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(private configService: ConfigService) {
    this.users = [
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'leco',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'creator',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'owner',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },
      {
        hederaAccountId: this.configService.get<string>('HEDERA_ACCOUNT_ID'),
        username: 'mainainer',
        password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
      },

    ];
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
}
