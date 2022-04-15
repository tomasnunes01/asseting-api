import { Controller, Get } from '@nestjs/common';
import { Escritorio } from './escritorio.entity';
import { EscritorioService } from './escritorio.service';

@Controller('escritorio')
export class EscritorioController {
  constructor(private readonly escritorioService: EscritorioService) {}

  @Get('findAll')
  async findAll(): Promise<Escritorio[]> {
    return this.escritorioService.findAll();
  }
  @Get('teste')
  async teste(): Promise<Escritorio[]> {
    return this.escritorioService.findAll();
  }
}
