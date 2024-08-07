import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      hederaAccountId: '0.0.534863',
      username: 'leco',
      password: '$2b$10$4zpsMBKFFkcj8OY4CJmuruf8Vedv4CS7pI5Q6/lfdggT5niK/x3KW',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }

}
