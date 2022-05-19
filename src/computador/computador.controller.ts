import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ComputadorService } from './computador.service';
import { Computador, TipoComputador } from './computador.entity';

@Controller('computador')
export class ComputadorController {
  constructor(private readonly computadorService: ComputadorService) {}

  @Get('listTypes')
  async listTypes(): Promise<TipoComputador[]> {
    return this.computadorService.listTypes();
  }
}
