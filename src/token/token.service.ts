import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Token } from './token.entity';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    const objToken = await getRepository(Token)
      .createQueryBuilder('token')
      .where('token.username = :username', { username: username })
      .getOne();
    if (objToken) {
      await this.tokenRepository.update(objToken.id, { hash: hash });
    } else {
      await this.tokenRepository.insert({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await getRepository(Token)
      .createQueryBuilder('token')
      .where('token.hash = :hash', { hash: oldToken })
      .getOne();
    if (objToken) {
      const user = await this.userService.findOne(objToken.username);
      return this.authService.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
