import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(`Tentando validar usuário: ${username}`);
    const user = await this.usersService.findOne(username);
    if (!user) {
      console.log(`Usuário não encontrado: ${username}`);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      console.log(`Usuário validado com sucesso: ${username}`);
      return result;
    } else {
      console.log(`Credenciais inválidas para o usuário: ${username}`);
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
