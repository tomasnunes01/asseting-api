import { Controller, Get } from '@nestjs/common';
import { SoftwareService } from './software.service';
import { Software } from './software.entity';

@Controller('software')
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  /* @Get('listTypes')
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
  } */

  @Get('findAll')
  async findAll(): Promise<Software[]> {
    return this.softwareService.findAll();
  }
}
