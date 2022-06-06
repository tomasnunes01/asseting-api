import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('findTypeByID')
  async findTypeByID(@Query('id') id: string) {
    return this.computadorService.findTypeByID(id);
  }

  @Post('registar')
  async register(@Body() data: ComputadorRegisterDto): Promise<ResultadoDto> {
    return this.computadorService.registar(data);
  }

  @Get('findAll')
  async findAll(): Promise<Computador[]> {
    return this.computadorService.findAll();
  }

  @Get('findByID')
  async findByID(@Query('id') id: string) {
    return this.computadorService.findByID(id);
  }

  @Patch('atualizar')
  async update(@Body() body: ComputadorRegisterDto): Promise<ResultadoDto> {
    return await this.computadorService.atualizar(body);
  }

  @Delete()
  async delete(@Query('nr_serie') id: string): Promise<ResultadoDto | any> {
    return this.computadorService.delete(id);
  }

  @Get('handleCron')
  async handleCron() {
    return this.computadorService.Cron_fimEmprestimo();
  }
}
