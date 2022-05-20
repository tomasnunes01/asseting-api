import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ComputadorService } from './computador.service';
import { Computador, TipoComputador } from './computador.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { ComputadorRegisterDto } from './dto/computador.register.dto';

@Controller('computador')
export class ComputadorController {
  constructor(private readonly computadorService: ComputadorService) {}

  @Get('listTypes')
  async listTypes(): Promise<TipoComputador[]> {
    return this.computadorService.listTypes();
  }

  @Post('registar')
  async register(@Body() data: ComputadorRegisterDto): Promise<ResultadoDto> {
    return this.computadorService.registar(data);
  }

  @Get('findAll')
  async findAll(): Promise<Computador[]> {
    return this.computadorService.findAll();
  }
}
