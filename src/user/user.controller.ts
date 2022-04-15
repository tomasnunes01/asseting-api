import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Conta } from './user.entity';
import { ResultadoDto } from '../dto/resultado.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserUpdateDto } from './dto/user.update.dto';

@Controller('conta')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('findAll')
  async findAll(): Promise<Conta[]> {
    return this.userService.findAll();
  }

  @Get('getUserData')
  async getUserData(@Query('username') data: string) {
    return this.userService.getUserData(data);
  }

  @Post('registar')
  async register(@Body() data: UserRegisterDto): Promise<ResultadoDto> {
    return this.userService.registar(data);
  }

  @Patch('myAccountUpdate')
  async update(@Body() body: UserUpdateDto): Promise<ResultadoDto> {
    return this.userService.myAccountUpdate(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
