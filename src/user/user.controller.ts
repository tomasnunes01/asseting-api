import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Patch,
  Delete,
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

  @Get('findByID')
  async findByID(@Query('id') id: number) {
    return await this.userService.findByID(id);
  }

  @Get('getUserData')
  async getUserData(@Query('username') data: string) {
    return this.userService.getUserData(data);
  }

  @Post('registar')
  async register(@Body() data: UserRegisterDto): Promise<ResultadoDto> {
    return this.userService.registar(data);
  }

  @Patch('AccountUpdate')
  async update(@Body() body: UserUpdateDto): Promise<ResultadoDto> {
    return await this.userService.AccountUpdate(body);
  }

  @Delete()
  async delete(@Query('id') id: number): Promise<ResultadoDto | any> {
    return this.userService.delete(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
