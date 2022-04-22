import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validarConta(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const { pass, ...result } = user;

    if (user && bcrypt.compareSync(password, pass)) {
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    await this.tokenService.save(token, user.username);
    return {
      access_token: token,
    };
  }
}
