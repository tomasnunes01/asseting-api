import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Escritorio } from './escritorio.entity';
import { EscritorioService } from './escritorio.service';
import { ResultadoDto } from '../dto/resultado.dto';
import { EscritorioRegisterDto } from './dto/escritorio.register.dto';

@Controller('escritorio')
export class EscritorioController {
  constructor(private readonly escritorioService: EscritorioService) {}
  @Get('findAll')
  async findAll(): Promise<Escritorio[]> {
    return this.escritorioService.findAll();
  }

  @Get('findByID')
  async findByID(@Query('id') id: number) {
    return this.escritorioService.findByID(id);
  }

  @Post('registar')
  async register(@Body() data: EscritorioRegisterDto): Promise<ResultadoDto> {
    return this.escritorioService.registar(data);
  }

  @Delete()
  async delete(
    @Query('cod_escritorio') id: number,
  ): Promise<ResultadoDto | any> {
    return this.escritorioService.delete(id);
  }
}
