import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SoftwareService } from './software.service';
import { Software, TipoLicenca, TipoSoftware } from './software.entity';
import { SoftwareRegisterDto } from './dto/software.register.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { SoftwareUpdateDto } from './dto/software.update.dto';

@Controller('software')
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @Get('listTypes')
  async listTypes(): Promise<TipoSoftware[]> {
    return this.softwareService.listTypes();
  }

  @Get('listLicenses')
  async listLicenses(): Promise<TipoLicenca[]> {
    return this.softwareService.listLicenses();
  }

  @Get('findTypeByID')
  async findTypeByID(@Query('id') id: number) {
    return this.softwareService.findTypeByID(id);
  }

  @Post('registar')
  async register(@Body() data: SoftwareRegisterDto): Promise<ResultadoDto> {
    return this.softwareService.registar(data);
  }

  @Get('findByID')
  async findByID(@Query('id') id: string) {
    return this.softwareService.findByID(id);
  }

  @Patch('atualizar')
  async update(@Body() body: SoftwareUpdateDto): Promise<ResultadoDto> {
    return await this.softwareService.atualizar(body);
  }

  @Delete()
  async delete(@Query('id') id: number): Promise<ResultadoDto | any> {
    return this.softwareService.delete(id);
  }

  @Get('findAll')
  async findAll(): Promise<Software[]> {
    return this.softwareService.findAll();
  }
}
